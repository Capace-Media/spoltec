import { applicationSchema, cvFileSchema } from "@lib/types/application";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const row = (label: string, value: string) => `
  <div style="display: table-row;">
    <div style="display: table-cell; padding: 8px 0; width: 120px; vertical-align: top;">
      <strong style="color: #2B2B35;">${label}</strong>
    </div>
    <div style="display: table-cell; padding: 8px 0; color: #333333;">
      ${value}
    </div>
  </div>
`;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowedOrigins = [
    "https://www.spoltec.se",
    "https://spoltec.se",
    `${process.env.URL}`,
  ];
  if (
    !allowedOrigins.includes(origin || "") &&
    !referer?.includes(process.env.DOMAIN as string)
  ) {
    return new Response("Invalid origin", { status: 403 });
  }

  const form = await request.formData();
  const payload = form.get("payload");

  if (typeof payload !== "string") {
    return new Response("Invalid data", { status: 400 });
  }

  const parsed = applicationSchema.safeParse(JSON.parse(payload));

  if (!parsed.success) {
    return new Response("Invalid data", { status: 400 });
  }

  const data = parsed.data;

  if (data.website && data.website !== "") {
    return new Response("Bot detected", { status: 400 });
  }

  const { name, email, phone, message, linkedin, position, positionUrl } = data;

  const upload = form.get("cv");
  let attachments: Array<{
    content: string;
    filename: string;
    type: string;
    disposition: "attachment";
  }> = [];

  if (upload) {
    const cv = cvFileSchema.safeParse(upload);

    if (!cv.success) {
      return new Response("Invalid CV file", { status: 400 });
    }

    attachments = [
      {
        content: Buffer.from(await cv.data.arrayBuffer()).toString("base64"),
        filename: cv.data.name,
        type: cv.data.type,
        disposition: "attachment",
      },
    ];
  }

  try {
    const emailRes = await sgMail.send({
      from: {
        name: `${name} / ${email}`,
        email: "info@spoltec.se",
      },
      replyTo: email,
      to: (process.env.SEND_MAIL as string) || "info@spoltec.se",
      subject: `Jobbansökan: ${position}`,
      ...(attachments.length > 0 && { attachments }),
      html: `
        <!DOCTYPE html>
        <html lang="sv">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Jobbansökan</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2B2B35 0%, #4A4A5A 100%); padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">
                Ny jobbansökan
              </h1>
              <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 16px;">
                ${escape(position)}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">

              <!-- Applicant Card -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #2B2B35; padding: 25px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2B2B35; margin: 0 0 20px 0; font-size: 20px; font-weight: bold;">
                  📋 Sökande
                </h2>

                <div style="display: table; width: 100%;">
                  ${row("💼 Söker tjänst:", `<span style="background-color: #2B2B35; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${escape(position)}</span>`)}
                  ${row("👤 Namn:", escape(name))}
                  ${row("📞 Telefon:", `<a href="tel:${escape(phone)}" style="color: #2B2B35; text-decoration: none;">${escape(phone)}</a>`)}
                  ${row("✉️ Email:", `<a href="mailto:${escape(email)}" style="color: #2B2B35; text-decoration: none;">${escape(email)}</a>`)}
                  ${row("📎 CV:", attachments[0] ? `Bifogad fil: ${escape(attachments[0].filename)}` : "Inget CV bifogat")}
                  ${linkedin ? row("🔗 LinkedIn:", `<a href="${escape(linkedin)}" style="color: #2B2B35;">${escape(linkedin)}</a>`) : ""}
                  ${positionUrl ? row("🔗 Annons:", `<a href="${escape(positionUrl)}" style="color: #2B2B35;">${escape(positionUrl)}</a>`) : ""}
                </div>
              </div>

              <!-- Message Section -->
              <div style="background-color: #ffffff; border: 2px solid #e9ecef; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #2B2B35; margin: 0 0 15px 0; font-size: 20px; font-weight: bold;">
                  💬 Meddelande
                </h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #2B2B35;">
                  <p style="color: #333333; line-height: 1.6; margin: 0; font-size: 15px; word-wrap: break-word;">
                    ${escape(message).replace(/\n/g, "<br>")}
                  </p>
                </div>
              </div>

              <!-- Call to Action -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${escape(email)}?subject=Re: Jobbansökan - ${escape(position)}"
                   style="background: linear-gradient(135deg, #2B2B35 0%, #4A4A5A 100%);
                          color: white;
                          padding: 15px 30px;
                          text-decoration: none;
                          border-radius: 25px;
                          font-weight: bold;
                          display: inline-block;
                          font-size: 16px;
                          box-shadow: 0 4px 10px rgba(43, 43, 53, 0.3);">
                  📧 Svara på ansökan
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
      console.log("MAIL SUCCESS", { name, phone, email, position });
      return new Response("OK", { status: 200 });
    }

    console.log("MAIL ERROR => Something went wrong while sending email");
    return new Response("Failed to send email", { status: 500 });
  } catch (error) {
    console.error("MAIL ERROR => ", error);
    return new Response("Server error occurred", { status: 500 });
  }
}
