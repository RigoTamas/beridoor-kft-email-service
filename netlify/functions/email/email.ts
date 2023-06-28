import { Handler } from '@netlify/functions'
import nodemailer, { SendMailOptions } from 'nodemailer';

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
    attachments: body.imageName ? [{ filename: body.imageName, content: body.image, encoding: 'base64' }] : [],
    html: `<h2>Név:</h2>
<span>${body.name}</span>
<h2>Email cím:</h2>
<span>${body.email}</span>
<h2>Telefonszám:</h2>
<span>${body.phone}</span>
<h2>Üzenet</h2>
${body.message.replaceAll('\n', '<br>')}`,
  }

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000,https://beridoor.hu,http://beridoor.hu',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
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
