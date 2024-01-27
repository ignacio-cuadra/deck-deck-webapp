import nodemailer from "nodemailer";
import { emailCredentials } from "../../config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587, //465 seguro
  secure: false, //true 465
  auth: emailCredentials,
});

export default async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: {
      name: "Deck Deck",
      address: emailCredentials.user,
    },
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  await transport.sendMail(mailOptions);
}
