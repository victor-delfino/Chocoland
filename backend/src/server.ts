/**
 * Server — API REST com Express.
 *
 * Endpoints:
 * - POST /api/subscribe → recebe email, publica na fila do RabbitMQ
 * - GET  /api/health    → verifica se a API está online
 *
 * Conceitos:
 * - Express: framework web minimalista para Node.js
 * - CORS: permite que o React (porta 5173) acesse a API (porta 3001)
 * - Producer pattern: o server PRODUZ mensagens na fila
 */
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connectRabbitMQ, publishToQueue, QUEUES } from "./rabbitmq.js";
import { getAllSubscribers, getSubscriberCount } from "./database.js";
import swaggerSpec from "./swagger.js";

export const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar ao RabbitMQ ao iniciar
let channel: Awaited<ReturnType<typeof connectRabbitMQ>>["channel"];

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    rabbitmq: channel ? "connected" : "disconnected",
  });
});

// Endpoint de inscrição na newsletter
app.post("/api/subscribe", async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    res.status(400).json({ error: "Email é obrigatório" });
    return;
  }

  const message = {
    email,
    name: name || "Assinante",
    subscribedAt: new Date().toISOString(),
    source: "landing-page",
  };

  if (channel) {
    await publishToQueue(channel, QUEUES.NEWSLETTER_SUBSCRIPTIONS, message);
    console.log(`📤 Mensagem publicada na fila: ${email}`);
  } else {
    console.log(`📝 [sem RabbitMQ] Inscrição recebida:`, message);
  }

  res.status(201).json({
    success: true,
    message: "Inscrição realizada com sucesso!",
  });
});

app.get("/api/subscribers", (_req, res) => {
  const subscribers = getAllSubscribers();
  const total = getSubscriberCount();
  res.json({ total, subscribers });
});

async function start() {
  try {
    const rabbit = await connectRabbitMQ();
    channel = rabbit.channel;
  } catch (err) {
    console.error("❌ Falha ao conectar ao RabbitMQ:", err);
    console.log("⚠️  API vai rodar sem RabbitMQ (mensagens serão logadas)");
  }

  app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
  });
}

start();
