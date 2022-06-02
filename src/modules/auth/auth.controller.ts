import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.services";
import Queue from '../../lib/Queue';
import { makeid } from "../../utils/helper";

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
            let checkEmail = await this.authService.checkEmail(email);
            if (!checkEmail) {
                return reply.code(400).send({
                    code: 400,
                    message: "The Email Not Found"
                })
            }
            checkEmail.hashCode = makeid(10);
            let save = await this.authService.updateAndAddHashCode(checkEmail);
            if (!save) {
                return reply.code(400).send({
                    code: 400,
                    message: "Failed cannot save user"
                })
            }
            await Queue.add('ForgotPasswordMail', { email, hashCode: makeid(10) });
            await Queue.add('UserReport', { email });
            return reply.send({
                code: 200,
                message: 'Success save user'
            });
        } catch (error) {
            console.log(error)
            reply.code(500).send('Something Went Wrong')
        }
    }

    async changePassword(
        request: FastifyRequest<{
            Body: {
                password: string,
                password_confirmation: string
            },
            Params: {
                code: string
            }
        }>,
        reply: FastifyReply
    ) {
        const { password } = request.body
        const { code } = request.params
        try {
            let checkHashCode = await this.authService.checkHashCode(code)
            console.log(code)
            if (!checkHashCode) {
                return reply.code(400).send({
                    code: 400,
                    message: "The Code Has Not Found"
                })
            }
            checkHashCode.hashCode = null
            checkHashCode.password = password
            let save = await this.authService.updateAndAddHashCode(checkHashCode);
            if (!save) {
                return reply.code(400).send({
                    code: 400,
                    message: "Failed cannot update password"
                })
            }
            await Queue.add('ChangePasswordMail', { password, email: checkHashCode.email });
            await Queue.add('UserReport', { email: checkHashCode.email });
            return reply.send({
                code: 200,
                message: 'Success update password'
            });
        } catch (error) {
            console.log(error)
            return reply.code(500).send('Something Went Wrong')
        }
    }
}