import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { AuthController } from "./auth.controller";
import { postSchemaChangePassword, postSchemaForgotPassword } from "./auth.schema";
import { AuthService } from "./auth.services";

function authRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void
) {
  let authController = new AuthController(new AuthService());
  app.post('/',postSchemaForgotPassword,authController.forgotPassword.bind(authController))
  app.put('/forgot/:code',postSchemaChangePassword,authController.changePassword.bind(authController))

  done();
}

export default authRoutes;