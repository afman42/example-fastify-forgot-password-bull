import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.services";
import Queue from '../../lib/Queue';

export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    async forgotPassword(
        request: FastifyRequest<{
            Body: {
                email: string
            }
        }>,
        reply: FastifyReply
    ) {
        const { email } = request.body
        try {
            let checkEmail = this.authService.checkEmail(email);
            // await Queue.add('RegistrationMail', { email });

            // await Queue.add('UserReport', { email });

            return reply.send(checkEmail);
        } catch (error) {
            console.log(error)
            reply.code(500).send('Something Went Wrong')
        }
    }
}