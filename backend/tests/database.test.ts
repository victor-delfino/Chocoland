/**
 * Testes unitários — database.ts
 *
 * Conceitos:
 * - describe: agrupa testes relacionados (como uma "suíte")
 * - it/test: define um caso de teste individual
 * - expect: faz a asserção (verifica se o resultado é o esperado)
 * - beforeEach: roda antes de CADA teste (aqui recria o banco limpo)
 * - afterAll: roda depois de TODOS os testes (limpa recursos)
 *
 * Usamos ":memory:" para criar um banco SQLite em memória,
 * assim cada teste começa com um banco limpo e não afeta o banco real.
 */
import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { createDatabase } from "../src/database.js";

let db: ReturnType<typeof createDatabase>;

const mockSubscriber = {
  name: "João",
  email: "joao@teste.com",
  source: "landing-page",
  subscribedAt: "2026-02-24T10:00:00.000Z",
};

beforeEach(() => {
  // Cria um banco NOVO em memória antes de cada teste
  // Garante isolamento total — um teste não afeta o outro
  db = createDatabase(":memory:");
});

afterAll(() => {
  // Fecha a conexão após todos os testes
  db.db.close();
});

describe("insertSubscriber", () => {
  it("deve inserir um inscrito com sucesso", () => {
    const result = db.insertSubscriber(mockSubscriber);

    // changes = número de linhas afetadas pelo INSERT
    expect(result.changes).toBe(1);
  });

  it("deve rejeitar email duplicado", () => {
    db.insertSubscriber(mockSubscriber);

    // expect(() => ...).toThrow() verifica se a função lança um erro
    expect(() => db.insertSubscriber(mockSubscriber)).toThrow();
  });

  it("deve permitir emails diferentes", () => {
    db.insertSubscriber(mockSubscriber);

    const outro = { ...mockSubscriber, email: "maria@teste.com" };
    const result = db.insertSubscriber(outro);

    expect(result.changes).toBe(1);
  });
});

describe("getAllSubscribers", () => {
  it("deve retornar lista vazia quando não há inscritos", () => {
    const subscribers = db.getAllSubscribers();

    expect(subscribers).toEqual([]);
  });

  it("deve retornar inscritos ordenados por id DESC", () => {
    db.insertSubscriber(mockSubscriber);
    db.insertSubscriber({ ...mockSubscriber, email: "b@teste.com", name: "Maria" });

    const subscribers = db.getAllSubscribers();

    // O mais recente vem primeiro (ORDER BY id DESC)
    expect(subscribers).toHaveLength(2);
    expect(subscribers[0].name).toBe("Maria");
    expect(subscribers[1].name).toBe("João");
  });

  it("deve retornar todos os campos esperados", () => {
    db.insertSubscriber(mockSubscriber);

    const [subscriber] = db.getAllSubscribers();

    expect(subscriber).toMatchObject({
      id: 1,
      name: "João",
      email: "joao@teste.com",
      source: "landing-page",
      subscribed_at: "2026-02-24T10:00:00.000Z",
    });
    // created_at é gerado automaticamente pelo SQLite
    expect(subscriber.created_at).toBeDefined();
  });
});

describe("getSubscriberCount", () => {
  it("deve retornar 0 quando o banco está vazio", () => {
    expect(db.getSubscriberCount()).toBe(0);
  });

  it("deve contar corretamente após inserções", () => {
    db.insertSubscriber(mockSubscriber);
    db.insertSubscriber({ ...mockSubscriber, email: "a@teste.com" });
    db.insertSubscriber({ ...mockSubscriber, email: "b@teste.com" });

    expect(db.getSubscriberCount()).toBe(3);
  });
});
