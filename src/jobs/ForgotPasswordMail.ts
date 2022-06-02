import Mail from '../lib/Mail';

export default {
  key: 'ForgotPasswordMail',
  options: {
    delay: 5000,
  },
  async handle({ data }) {
    const { email, hashCode } = data;
    // console.log(data)
    await Mail.sendMail({
      from: 'Queue Test <queue@queuetest.com.br>',
      to: `afifarman <${email}>`,
      subject: 'Forgot Password',
      html: `Hello ${email}, forgot password account http://localhost:4000/api/users/forgot/${hashCode}`
    });
  },
};