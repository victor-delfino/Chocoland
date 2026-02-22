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

async function startWorker() {
  const { channel } = await connectRabbitMQ();

  console.log("👷 Worker aguardando mensagens...\n");

  // prefetch(1) → processa 1 mensagem por vez
  // Garante que se o worker estiver lento, ele não acumula mensagens
  channel.prefetch(1);

  channel.consume(QUEUES.NEWSLETTER_SUBSCRIPTIONS, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("═══════════════════════════════════════");
    console.log("📬 Nova inscrição na newsletter!");
    console.log(`   Nome:  ${data.name}`);
    console.log(`   Email: ${data.email}`);
    console.log(`   Data:  ${data.subscribedAt}`);
    console.log(`   Fonte: ${data.source}`);
    console.log("═══════════════════════════════════════\n");

    // Simula processamento (ex: enviar email de boas-vindas)
    console.log(`   ✉️  Simulando envio de email para ${data.email}...`);
    console.log(`   ✅ Email de boas-vindas "enviado"!\n`);

    // Confirma que a mensagem foi processada
    // Sem isso, o RabbitMQ entende que falhou e reenvia
    channel.ack(msg);
  });
}

startWorker().catch(console.error);
