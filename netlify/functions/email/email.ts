import { Handler } from '@netlify/functions'
import nodemailer, { SendMailOptions } from 'nodemailer';
import {readFile} from 'fs/promises'

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  }
  try {
    if (!event.body) {
      throw new Error('No body found in request!')
    }
    const body = JSON.parse(event.body)
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
    await transporter.sendMail(mailOptions);
    console.log(`email succesfully sent, name: ${body.name}, email: ${body.email}, phone: ${body.phone}`)
    if (body.email) {

      const htmlRseponse = (await readFile('./response-email-template.html')).toString()
      const responseMailOptions: SendMailOptions = {
        from: 'menerke@gmail.com',
        to: body.email,
        subject: 'Megkeresés befogadva',
        html: htmlRseponse,
      }
      try {
        await transporter.sendMail(responseMailOptions);
        console.log(`response email sent succesfully to ${body.email}`);
      } catch (e) {
        console.log(`error sending response email to ${body.email}. Reason: ${e}`)
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: `${e}`,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }

  }
}
