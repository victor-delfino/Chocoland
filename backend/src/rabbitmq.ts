/**
 * Módulo de conexão com o RabbitMQ.
 * Usado tanto pelo server (producer) quanto pelo worker (consumer).
 *
 * Conceitos:
 * - Connection: socket TCP com o RabbitMQ
 * - Channel: canal lógico dentro da connection (onde publicamos/consumimos)
 * - Queue: fila onde as mensagens ficam armazenadas até serem consumidas
 * - assertQueue: cria a fila se não existir (idempotente — seguro chamar várias vezes)
 */
import amqplib from "amqplib";

const RABBITMQ_URL = "amqp://chocoland:chocoland123@localhost:5672";

export const QUEUES = {
  NEWSLETTER_SUBSCRIPTIONS: "newsletter_subscriptions",
} as const;

export async function connectRabbitMQ() {
  const conn = await amqplib.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();

  // Garante que a fila existe. Se já existir, não faz nada.
  // durable: true → a fila sobrevive a reinícios do RabbitMQ
  await channel.assertQueue(QUEUES.NEWSLETTER_SUBSCRIPTIONS, { durable: true });

  console.log("✅ Conectado ao RabbitMQ");
  return { conn, channel };
}

export async function publishToQueue(
  channel: amqplib.Channel,
  queue: string,
  data: object,
) {
  // Converte o objeto para Buffer (formato que o RabbitMQ entende)
  // persistent: true → a mensagem sobrevive a reinícios do RabbitMQ
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
}
