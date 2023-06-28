import { Handler } from '@netlify/functions'
import nodemailer from 'nodemailer';

export const handler: Handler = async (event, context) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'menerke',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
  const mailOptions = {
    from: 'menerke@gmail.com',
    to: 'menerke@gmail.com',
    subject: "It works!",
    text: `You just received a mail!`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    }

  }
}
