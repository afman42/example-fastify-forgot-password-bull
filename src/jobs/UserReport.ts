export default {
  key: 'UserReport',
  options: {
    delay: 5000,
  },
  async handle({ data }) {
    const { email } = data;

    console.log(email);
  },
};