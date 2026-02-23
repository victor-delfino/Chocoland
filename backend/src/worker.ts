/**
 * Worker — Consumidor de mensagens do RabbitMQ.
 *
 * Roda como processo separado do server.
 * Fica escutando a fila "newsletter_subscriptions" e processa cada mensagem.
 *
 * Conceitos:
 * - Consumer pattern: o worker CONSOME mensagens da fila
 * - channel.consume(): registra um callback que é chamado para cada mensagem
 * - channel.ack(): confirma que a mensagem foi processada com sucesso
 *   (sem ack, o RabbitMQ reenvia a mensagem para outro consumidor)
 *
 * Em produção, aqui você:
 * - Salvaria no banco de dados
 * - Enviaria email de boas-vindas (SendGrid, Resend, etc.)
 * - Notificaria via webhook
 */
import { connectRabbitMQ, QUEUES } from "./rabbitmq.js";
import { insertSubscriber, getSubscriberCount } from "./database.js";

async function startWorker() {
  const { channel } = await connectRabbitMQ();

  console.log("👷 Worker aguardando mensagens...\n");

  channel.prefetch(1);

  channel.consume(QUEUES.NEWSLETTER_SUBSCRIPTIONS, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("═══════════════════════════════════════");
    console.log("📬 Nova inscrição na newsletter!");
    console.log(`   Nome:  ${data.name}`);
    console.log(`   Email: ${data.email}`);
    console.log(`   Data:  ${data.subscribedAt}`);
    console.log("═══════════════════════════════════════\n");

    try {
      insertSubscriber(data);
      const total = getSubscriberCount();
      console.log(`   💾 Salvo no banco! Total de inscritos: ${total}\n`);
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        console.log(`   ⚠️  Email ${data.email} já cadastrado — ignorando\n`);
      } else {
        console.error("   ❌ Erro ao salvar:", err);
      }
    }

    channel.ack(msg);
  });
}

startWorker().catch(console.error);
