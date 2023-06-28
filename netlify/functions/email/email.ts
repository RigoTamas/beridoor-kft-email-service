import { Handler } from '@netlify/functions'
import nodemailer, { SendMailOptions} from 'nodemailer';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    }
  }
  const body = JSON.parse(event.body || '')
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'menerke',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
  const mailOptions: SendMailOptions = {
    from: 'menerke@gmail.com',
    to: 'menerke@gmail.com',
    subject: body.subject,
    text: body.message,
    attachments: body.imageName ? [{ filename: body.imageName, content: body.image, encoding: 'base64' }] : [],
  }

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
