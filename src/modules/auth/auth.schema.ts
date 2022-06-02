import Joi from 'joi'

let schemaBody = Joi.object({
    email: Joi.string().required()
}).required()

let schemaBodyChangePassword = Joi.object({
    password: Joi.string().min(3).max(6).required().label('Password'),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required().options({ messages: { 'any.only': '{{#label}} does not match'}}).label('Password Confirmation')
})

const schemaBodyValidate = (schemaB) => {
    return {
        schema: {
            body: schemaB
        },
        validatorCompiler: ({ schema: { body } }) => {
            return data => schemaB.validate(data, body)
        }
    }

}

export const postSchemaForgotPassword = schemaBodyValidate(schemaBody)
export const postSchemaChangePassword = schemaBodyValidate(schemaBodyChangePassword)
