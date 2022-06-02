import Joi from 'joi'
let schemaBody = Joi.object({
    email: Joi.string().required()
}).required()
export const postSchemaForgotPassword = {
    schema: {
        body: schemaBody
    },
    validatorCompiler: ({ schema: { body } }) => {
        return data => schemaBody.validate(data, body)
    }
}