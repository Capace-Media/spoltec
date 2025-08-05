"use server";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const subject = formData.get("subject") as string;

  try {
    const emailRes = await sgMail.send({
      from: {
        name: `${name} / ${email}`,
        email: email,
      },
      replayTo: email,
      to: (process.env.SEND_MAIL as string) || "info@spoltec.se",
      subject: `Offertförfrågan för ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="sv">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Offertförfrågan</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2B2B35 0%, #4A4A5A 100%); padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">
                Ny Offertförfrågan
              </h1>
              <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 16px;">
                Inkommande förfrågan från din webbsida
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              
              <!-- Contact Information Card -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #2B2B35; padding: 25px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2B2B35; margin: 0 0 20px 0; font-size: 20px; font-weight: bold;">
                  📋 Kontaktinformation
                </h2>
                
                <div style="display: table; width: 100%;">
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 8px 0; width: 100px; vertical-align: top;">
                      <strong style="color: #2B2B35;">👤 Namn:</strong>
                    </div>
                    <div style="display: table-cell; padding: 8px 0; color: #333333;">
                      ${name}
                    </div>
                  </div>
                  
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 8px 0; width: 100px; vertical-align: top;">
                      <strong style="color: #2B2B35;">📞 Telefon:</strong>
                    </div>
                    <div style="display: table-cell; padding: 8px 0; color: #333333;">
                      <a href="tel:${phone}" style="color: #2B2B35; text-decoration: none;">${phone}</a>
                    </div>
                  </div>
                  
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 8px 0; width: 100px; vertical-align: top;">
                      <strong style="color: #2B2B35;">✉️ Email:</strong>
                    </div>
                    <div style="display: table-cell; padding: 8px 0; color: #333333;">
                      <a href="mailto:${email}" style="color: #2B2B35; text-decoration: none;">${email}</a>
                    </div>
                  </div>
                  
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 8px 0; width: 100px; vertical-align: top;">
                      <strong style="color: #2B2B35;">🔧 Tjänst:</strong>
                    </div>
                    <div style="display: table-cell; padding: 8px 0; color: #333333;">
                      <span style="background-color: #2B2B35; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${subject}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Message Section -->
              <div style="background-color: #ffffff; border: 2px solid #e9ecef; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #2B2B35; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  💬 Meddelande
                </h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #2B2B35;">
                  <p style="color: #333333; line-height: 1.6; margin: 0; font-size: 15px; word-wrap: break-word;">
                    ${message.replace(/\n/g, "<br>")}
                  </p>
                </div>
              </div>

              <!-- Call to Action -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: Offertförfrågan för ${subject}" 
                   style="background: linear-gradient(135deg, #2B2B35 0%, #4A4A5A 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 25px; 
                          font-weight: bold; 
                          display: inline-block; 
                          font-size: 16px;
                          box-shadow: 0 4px 10px rgba(43, 43, 53, 0.3);
                          transition: all 0.3s ease;">
                  📧 Svara på förfrågan
                </a>
              </div>
              
            </div>

            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; margin: 0; font-size: 14px;">
                Detta meddelande skickades automatiskt från din webbsida
              </p>
              <p style="color: #6c757d; margin: 5px 0 0 0; font-size: 12px;">
                Mottaget: ${new Date().toLocaleString("sv-SE", {
                  timeZone: "Europe/Stockholm",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    if (emailRes[0].statusCode === 202) {
      console.log("MAIL SUCCESS", { name, phone, email, subject, message });
      return { success: true, data: { name, phone, email, subject, message } };
    } else {
      console.log("MAIL ERROR => Something went wrong while sending email");
      return { success: false, error: "Failed to send email" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Server error occurred" };
  }
}
