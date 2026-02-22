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
import { connectRabbitMQ, publishToQueue, QUEUES } from "./rabbitmq.js";

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Permite requisições do frontend (cross-origin)
app.use(express.json()); // Parseia JSON do body das requisições

// Conectar ao RabbitMQ ao iniciar
let channel: Awaited<ReturnType<typeof connectRabbitMQ>>["channel"];

async function start() {
  try {
    const rabbit = await connectRabbitMQ();
    channel = rabbit.channel;
  } catch (err) {
    console.error("❌ Falha ao conectar ao RabbitMQ:", err);
    console.log("⚠️  API vai rodar sem RabbitMQ (mensagens serão logadas)");
  }

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
      // Publica na fila — o worker vai consumir depois
      await publishToQueue(channel, QUEUES.NEWSLETTER_SUBSCRIPTIONS, message);
      console.log(`📤 Mensagem publicada na fila: ${email}`);
    } else {
      // Fallback: loga no console se RabbitMQ não estiver conectado
      console.log(`📝 [sem RabbitMQ] Inscrição recebida:`, message);
    }

    res.status(201).json({
      success: true,
      message: "Inscrição realizada com sucesso!",
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
  });
}

start();
