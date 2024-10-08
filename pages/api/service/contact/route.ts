import { NextApiRequest, NextApiResponse } from "next";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Mail = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body =====>", req.body);
  const { name, phone, email, message, subject } = req.body;

  try {
    const emailRes = await sgMail.send({
      from: {
        name: `${name} / ${email}`,
        email: email,
      },
      replayTo: email,
      to: `rick@capace.se`,
      subject: `Offertförfrågan för ${subject}`,
      html: `<div>
          <div>
              <p><strong style="color:#2B2B35;">Från: </strong>${name}</p>
              <p><strong style="color:#2B2B35;">Telefon: </strong>${phone}</p>
              <p><strong style="color:#2B2B35;">Email: </strong>${email}</p>
              <p><strong style="color:#2B2B35;">Tjänst: </strong>${subject}</p>
              <p><strong style="color:#2B2B35;">Meddelande: </strong>${message}</p>
          </div>
        </div>`,
    });
    if (emailRes[0].statusCode === 202) {
      console.log("MAIL SUCCESS", req.body);
      res.status(200).json(req.body);
    } else {
      console.log("MAIL ERROR => Something went wrong while sending email");
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

export default Mail;
