import nodemailer, { SendMailOptions } from 'nodemailer';
import Fastify from 'fastify'
import cors from '@fastify/cors'

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
                                Köszönjük, hogy felvette cégünkkel a kapcsolatot. Munkatársunk hamarosan felkeresi a megadott elérhetőségek egyikén.
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

const main = async () => {

  const fastify = Fastify({
    logger: true,
    keepAliveTimeout: 120_000,
  })
  await fastify.register(cors, { origin: '*' })

  fastify.get('/', async (request, reply) => {
    reply.type('application/json');
    reply.code(200);
    return { success: true };
  })

  fastify.post('/send-email', { bodyLimit: 30_000_000 }, async (request, reply) => {
    reply.type('application/json');
    const body = request.body as { images: { base64Image: any[], imageName: string }[], subject: string, name: string, email: string, phone: string, message: string; location: string }
    if (!body) {
      reply.code(400)
      return {
        success: false,
        error: 'no body found in request',
      }
    }
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'beridoorkft',
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
      const attachments: any[] = []
      for (const image of body.images || []) {
        attachments.push({ filename: image.imageName, content: image.base64Image, encoding: 'base64' })
      }
      const mailOptions: SendMailOptions = {
        from: 'beridoorkft@gmail.com',
        to: 'beridoorkft@gmail.com',
        subject: body.subject,
        attachments,
        text: `Feladó: ${body.name}
E-mail cím: ${body.email}
Telefon: ${body.phone}
Kivitelezés helyszíne: ${body.location}

Üzenet:
${body.message}`,
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
      reply.statusCode = 200;
      return {
        success: true,
      }
    } catch (e) {
      console.log(e)
      reply.statusCode = 500;
      return {
        success: false,
        error: `${e}`,
      }

    }
  })

  fastify.listen({ host: '0.0.0.0', port: 3000 }, function (err, address) {
    console.log(`server listening on port ${address}`)
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

void main()