import { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun.js';
import FormData from "form-data"

const mailgun = new Mailgun(FormData)
const API_KEY = process.env.MAILGUN_API_KEY as string
const DOMAIN = process.env.MAILGUN_DOMAIN as string
const client = mailgun.client({  username: "api", key: API_KEY});

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {  
  const { item } = req.body;

  console.log(API_KEY, DOMAIN, item)

  try {
    const messageData = {
      from: `Contact <contact@${DOMAIN}>`,
      to: 'rubbercapybara@gmail.com',
      subject: 'new item!',
      text: `Hello A new item: ${item}.
    `,
    };

    const emailRes = await client.messages.create(process.env.MAILGUN_DOMAIN as string, messageData);
    console.log(emailRes)
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending email' });
  }
}