import { Hono } from "hono";
import { cors } from "hono/cors";

import { postRoutes } from "@/modules/posts";
import { aiRoutes } from "@/modules/ai/ai.routes";

import { logger } from "hono/logger";
import { errorHandler } from "@/pkg/middleware/error";
import { webhookRoutes } from "@/modules/webhooks/webhook.routes";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/health", (c) => {
  return c.text("OK");
});

// Create a base router with error handling
const api = app.basePath("/api");

// Register all routes
api.use("*", errorHandler());
api.route("/webhooks", webhookRoutes);
api.route("/posts", postRoutes);
api.route("/ai", aiRoutes);

export type AppType = typeof api;

export default {
  port: 3004,
  fetch: app.fetch,
  idleTimeout: 30,
};
