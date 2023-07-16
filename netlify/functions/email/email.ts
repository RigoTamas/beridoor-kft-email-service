import { Handler } from '@netlify/functions'
import nodemailer, { SendMailOptions } from 'nodemailer';

const emailResponse = `<div id=":vp" class="a3s aiL msg-1983488461709975103">
  <div style="background-color: #e9ebed; margin: 0; width: 100%">
    <table
      role="presentation"
      width="100%"
      align="left"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="width: 100%; background-color: #e9ebed; margin: 0"
      bgcolor="#E9EBED"
    >
      <tbody>
        <tr>
          <td
            align="left"
            width="100%"
            valign="top"
            style="
              color: #353a3e;
              font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto,
                Helvetica, Arial, sans-serif;
              font-size: 16px;
              line-height: 24px;
            "
          >
            <div style="margin: 0 auto; max-width: 650px; width: 100%">
              <table
                role="presentation"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td width="100%" align="left" valign="top">
                      <div
                        class="m_-1983488461709975103block"
                        style="width: 100%; padding: 16px 0"
                      >
                      </div>

                      <div
                        class="m_-1983488461709975103card m_-1983488461709975103block"
                        style="width: 100%; margin-bottom: 24px"
                      >
                        <table
                          role="presentation"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="m_-1983488461709975103block__cell"
                                width="100%"
                                align="left"
                                valign="top"
                                style="
                                  background-color: #ffffff;
                                  border-radius: 8px;
                                  box-sizing: border-box;
                                  padding: 0 24px;
                                "
                                bgcolor="#FFFFFF"
                              >

                                <h1
                                  id="m_-1983488461709975103you-re-nearly-there"
                                  style="
                                    color: #353a3e;
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, “Segoe UI”, Roboto,
                                      Helvetica, Arial, sans-serif;
                                    font-size: 28px;
                                    line-height: 40px;
                                    margin: 40px 0;
                                    text-align: center;
                                    font-weight: 600;
                                  "
                                >
                                  Köszönjük megkeresését
                                </h1>
                                <p
                                  style="
                                    display: block;
                                    color: #353a3e;
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, “Segoe UI”, Roboto,
                                      Helvetica, Arial, sans-serif;
                                    font-size: 16px;
                                    line-height: 24px;
                                    margin: 40px 0;
                                  "
                                ></p>
                                <p
                                  style="
                                    display: block;
                                    color: #353a3e;
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, “Segoe UI”, Roboto,
                                      Helvetica, Arial, sans-serif;
                                    font-size: 16px;
                                    line-height: 24px;
                                    margin: 40px 0 20px;
                                    text-align: center;
                                  "
                                >
                                Üzenetét rendszerünk befogadta, kollégánk hamarosan felveszi önnel a kapcsolatot.
                                </p>
                                <div>
                                  <table
                                    role="presentation"
                                    width="100%"
                                    align="left"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          <table
                                            role="presentation"
                                            width="auto"
                                            align="center"
                                            border="0"
                                            cellspacing="0"
                                            cellpadding="0"
                                            style="margin: 16px auto 40px"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  style="
                                                    min-width: 144px;
                                                    padding: 8px 16px;
                                                  "
                                                >
                                                  <a
                                                    style="
                                                      text-decoration: none;
                                                      text-align: center;
                                                      display: inline-block;
                                                    "
                                                    href="https://beridoor.hu"
                                                    >
                                                  <img src="https://www.telikert-teraszbeepites.hu/wp-content/uploads/2015/12/brd_logo_400px.png" width="300px"></img>
                                                  </a >
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div
                        class="m_-1983488461709975103block"
                        style="
                          width: 100%;
                          color: #778089;
                          font-size: 14px;
                          line-height: 22px;
                          padding-top: 16px;
                          text-align: center;
                        "
                      >
                        <table
                          role="presentation"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                        >
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`

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
<h3>${body.name}<h3>
<h2>Email cím:</h2>
<h3>${body.email}</h3>
<h2>Telefonszám:</h2>
<h3>${body.phone}</h3>
<h2>Üzenet</h2>
<h3>${body.message.replaceAll('\n', '<br>')}<h3>`,
    }
    await transporter.sendMail(mailOptions);
    console.log(`email succesfully sent, name: ${body.name}, email: ${body.email}, phone: ${body.phone}`)
    if (body.email) {

      const responseMailOptions: SendMailOptions = {
        from: 'menerke@gmail.com',
        to: body.email,
        subject: 'Megkeresés befogadva',
        html: emailResponse,
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
