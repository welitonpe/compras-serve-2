import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const app = fastify();
const prisma = new PrismaClient();

app.get("/users", async () => {
  const users = await prisma.user.findMany();
  return users;
});

app.post("/users", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const { name, email } = createUserSchema.parse(request.body);
  await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return reply.status(201).send();
});

app.get("/markets", async () => {
  const market = await prisma.market.findMany();
  return market;
});

app.post("/markets", async (request, reply) => {
  const createMarketSchema = z.object({
    name: z.string(),
    local: z.string(),
  });

  const { name, local } = createMarketSchema.parse(request.body);
  await prisma.market.create({
    data: {
      name,
      local,
    },
  });
  return reply.status(201).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then((e) => {
    console.log(e);
    console.log("HTTP Server Running");
  });
