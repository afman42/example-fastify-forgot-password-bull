import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
  },
  async handle({ data }) {
    const { email } = data;

    await Mail.sendMail({
      from: 'Queue Test <queue@queuetest.com.br>',
      to: `afifarman <${email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá, ${email}, bem-vindo ao sistema de filas da Rocketseat :D`
    });
  },
};