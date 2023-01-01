import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    username: "email@email.com",
    password: "password",
  },
});
export default function sendEmail({ to, notification }) {
  //
}
