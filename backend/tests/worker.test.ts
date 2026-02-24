/**
 * Testes unitários — lógica do worker
 *
 * Conceitos:
 * - Testar lógica de negócio ISOLADA da infraestrutura
 * - Não precisamos do RabbitMQ rodando — extraímos a lógica
 *   de processamento e testamos ela diretamente
 * - vi.fn(): cria uma função "espiã" que registra chamadas
 * - toHaveBeenCalled(): verifica se a função foi chamada
 *
 * O worker real faz: consume msg → parse JSON → insertSubscriber → ack
 * Aqui testamos as partes que controlamos: parse + insert + tratamento de erro
 */
import { describe, it, expect, beforeEach } from "vitest";
import { createDatabase } from "../src/database.js";

let db: ReturnType<typeof createDatabase>;

/**
 * Simula a lógica que o worker executa ao receber uma mensagem.
 * Extraímos isso para poder testar sem RabbitMQ.
 */
function processMessage(
  rawMessage: string,
  deps: ReturnType<typeof createDatabase>,
) {
  const data = JSON.parse(rawMessage);
  deps.insertSubscriber(data);
  return data;
}

beforeEach(() => {
  db = createDatabase(":memory:");
});

describe("processamento de mensagem", () => {
  it("deve parsear e salvar uma mensagem válida", () => {
    const message = JSON.stringify({
      name: "Hugo",
      email: "hugo@teste.com",
      source: "landing-page",
      subscribedAt: "2026-02-24T10:00:00.000Z",
    });

    const data = processMessage(message, db);

    expect(data.email).toBe("hugo@teste.com");
    expect(db.getSubscriberCount()).toBe(1);
  });

  it("deve rejeitar JSON inválido", () => {
    expect(() => processMessage("isso não é json", db)).toThrow();
  });

  it("deve rejeitar mensagem sem campos obrigatórios", () => {
    const message = JSON.stringify({ email: "a@test.com" });

    // SQLite vai rejeitar porque 'name' é NOT NULL
    // Mas nosso producer sempre manda name, então isso é um edge case
    expect(() => processMessage(message, db)).toThrow();
  });

  it("deve rejeitar email duplicado", () => {
    const message = JSON.stringify({
      name: "Hugo",
      email: "hugo@teste.com",
      source: "landing-page",
      subscribedAt: "2026-02-24T10:00:00.000Z",
    });

    processMessage(message, db);

    // Segunda vez com mesmo email → UNIQUE constraint
    expect(() => processMessage(message, db)).toThrow(/UNIQUE/);
  });

  it("deve processar múltiplas mensagens diferentes", () => {
    const emails = ["a@test.com", "b@test.com", "c@test.com"];

    emails.forEach((email, i) => {
      const msg = JSON.stringify({
        name: `User ${i}`,
        email,
        source: "landing-page",
        subscribedAt: new Date().toISOString(),
      });
      processMessage(msg, db);
    });

    expect(db.getSubscriberCount()).toBe(3);
    expect(db.getAllSubscribers()).toHaveLength(3);
  });
});
