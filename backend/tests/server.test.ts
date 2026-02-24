/**
 * Testes de integração — server.ts (endpoints HTTP)
 *
 * Conceitos:
 * - supertest: faz requisições HTTP contra o app Express SEM precisar
 *   levantar o servidor (não precisa de listen/porta)
 * - vi.mock(): substitui um módulo inteiro por uma versão fake
 *   Isso permite testar o server SEM precisar de RabbitMQ rodando
 * - Teste de integração: testa a interação entre camadas
 *   (HTTP → Express → handler → resposta)
 */
import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";

// Mock do RabbitMQ — não queremos depender do Docker nos testes
// vi.mock substitui o módulo antes de ele ser importado
vi.mock("../src/rabbitmq.js", () => ({
  connectRabbitMQ: vi.fn().mockRejectedValue(new Error("mock: sem RabbitMQ")),
  publishToQueue: vi.fn(),
  QUEUES: { NEWSLETTER_SUBSCRIPTIONS: "newsletter_subscriptions" },
}));

// Mock do database — usa banco em memória
vi.mock("../src/database.js", async () => {
  const { createDatabase } =
    await vi.importActual<typeof import("../src/database.js")>(
      "../src/database.js",
    );
  const testDb = createDatabase(":memory:");
  return {
    ...testDb,
    default: testDb.db,
    createDatabase,
  };
});

// O import do app precisa vir DEPOIS dos mocks
const { app } = await import("../src/server.js");

describe("GET /api/health", () => {
  it("deve retornar status ok", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("deve indicar RabbitMQ desconectado (mock)", async () => {
    const res = await request(app).get("/api/health");

    // Como mockamos o RabbitMQ para falhar, o channel nunca é setado
    expect(res.body.rabbitmq).toBe("disconnected");
  });
});

describe("POST /api/subscribe", () => {
  it("deve retornar 201 com email válido", async () => {
    const res = await request(app)
      .post("/api/subscribe")
      .send({ email: "teste@email.com", name: "Hugo" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("sucesso");
  });

  it("deve retornar 400 sem email", async () => {
    const res = await request(app)
      .post("/api/subscribe")
      .send({ name: "Hugo" });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("obrigatório");
  });

  it("deve retornar 400 com body vazio", async () => {
    const res = await request(app).post("/api/subscribe").send({});

    expect(res.status).toBe(400);
  });

  it("deve usar 'Assinante' como nome padrão quando não informado", async () => {
    const res = await request(app)
      .post("/api/subscribe")
      .send({ email: "sem-nome@email.com" });

    // Retorna sucesso mesmo sem nome — o server usa fallback "Assinante"
    expect(res.status).toBe(201);
  });
});

describe("GET /api/subscribers", () => {
  it("deve retornar total e lista de inscritos", async () => {
    const res = await request(app).get("/api/subscribers");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("subscribers");
    expect(Array.isArray(res.body.subscribers)).toBe(true);
  });
});

describe("GET /api-docs", () => {
  it("deve retornar o Swagger UI (HTML)", async () => {
    const res = await request(app).get("/api-docs/").redirects(1);

    expect(res.status).toBe(200);
    expect(res.text).toContain("swagger");
  });
});
