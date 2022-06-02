import { AppDataSource } from "./data-source"
import { FastifyInstance } from "fastify";
import createServer from "./utils/createServer";
import logger from "./utils/logger";

function gracefulShutdown(signal: string, app: FastifyInstance) {
  process.on(signal, async () => {
    logger.info(`Goodbye, got signal ${signal}`);
    app.close();
    AppDataSource.initialize().then(async connect => {
        await connect.destroy()
        logger.info('Database disconnected');
    }).catch(e => console.log(e));
    logger.info("Graceful Shutdown");
    process.exit(0);
  });
}

async function main() {
  const app = createServer();
  try {
    const url = await app.listen(4000, "0.0.0.0");
    logger.info(`Server is ready at ${url}`);
    AppDataSource.initialize().then(_ => {
        logger.info('Database Connected');
    }).catch(e => console.log('DB ', e))
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
  const signals = ["SIGTERM", "SIGINT"];

  for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i], app);
  }
}

main();