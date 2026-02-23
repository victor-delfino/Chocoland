const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "ChocoLand API",
    version: "1.0.0",
    description:
      "API da landing page ChocoLand — gerencia inscrições na newsletter via RabbitMQ + SQLite.",
  },
  servers: [{ url: "http://localhost:3001", description: "Desenvolvimento" }],
  paths: {
    "/api/health": {
      get: {
        summary: "Health check",
        description:
          "Verifica se a API está online e o status da conexão com o RabbitMQ.",
        tags: ["Sistema"],
        responses: {
          "200": {
            description: "API online",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    rabbitmq: {
                      type: "string",
                      enum: ["connected", "disconnected"],
                      example: "connected",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/subscribe": {
      post: {
        summary: "Inscrever na newsletter",
        description:
          "Recebe nome e email, publica uma mensagem na fila do RabbitMQ para o worker processar e salvar no banco.",
        tags: ["Newsletter"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "joao@email.com",
                  },
                  name: {
                    type: "string",
                    example: "João",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Inscrição realizada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: {
                      type: "string",
                      example: "Inscrição realizada com sucesso!",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Email não informado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Email é obrigatório",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/subscribers": {
      get: {
        summary: "Listar inscritos",
        description:
          "Retorna todos os inscritos salvos no banco SQLite, ordenados do mais recente.",
        tags: ["Newsletter"],
        responses: {
          "200": {
            description: "Lista de inscritos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    total: { type: "integer", example: 3 },
                    subscribers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          name: { type: "string", example: "João" },
                          email: {
                            type: "string",
                            example: "joao@email.com",
                          },
                          source: {
                            type: "string",
                            example: "landing-page",
                          },
                          subscribed_at: {
                            type: "string",
                            example: "2026-02-23T15:30:00.000Z",
                          },
                          created_at: {
                            type: "string",
                            example: "2026-02-23 15:30:00",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerSpec;
