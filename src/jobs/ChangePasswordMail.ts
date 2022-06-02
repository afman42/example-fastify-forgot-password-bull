import Mail from '../lib/Mail';

export default {
  key: 'ChangePasswordMail',
  options: {
    delay: 5000,
  },
  async handle({ data }) {
    const { email } = data;
    // console.log(data)
    await Mail.sendMail({
      from: 'Queue Test <queue@queuetest.com.br>',
      to: `afifarman <${email}>`,
      subject: 'Forgot Password',
      html: `Hello ${email}, Change Password Success`
    });
  },
};