import fastify from "fastify";
import authRoutes from "../modules/auth/auth.route";
import { createBullBoard } from '@bull-board/api';
import { FastifyAdapter } from '@bull-board/fastify';
import QueueBull from '../lib/Queue';

function createServer() {
  const app = fastify();
  const serverAdapter = new FastifyAdapter();
  createBullBoard({
    queues: QueueBull.queues.map(queue => queue.bull),
    serverAdapter
  })
  serverAdapter.setBasePath('/ui');
  app.register(serverAdapter.registerPlugin(), { prefix: '/ui', basePath: '' });
  app.register(authRoutes, { prefix: "api/users" });
  return app;
}

export default createServer;