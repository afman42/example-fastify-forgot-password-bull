# Example Fastify ForgotPasssword Jobs

ForgotPassword with background jobs API
Steps to run this project:

1. Run `npm i` command
2. Copy, paste file `.env.example` and rename file `.env` fill it
2. Setup database settings inside `data-source.ts` file
3. Run migration `npm run typeorm migration:run -- -d src/data-source`
4. Run `npm run dev` command

forgotPassword
```
{
    "email":""
}
```
changePassword
```
{
    "password":"",
    "password_confirmation":""
}
```
Customize from repo:
- https://github.com/rocketseat-content/masterclass-nodejs-background-jobs
- https://github.com/TomDoesTech/password-manager/tree/main/server

Just Learning Purpose