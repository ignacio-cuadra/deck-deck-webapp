import sendEmail from "../../../shared/services/send-email.service.js";
import emailTemplate from "../../../shared/templates/email.template.js";
import jwt from "jsonwebtoken";
import RecoverPasswordToken from "../models/recover-password-token.model.js";

export async function sendRecoverPasswordToken(user) {
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.PRIVATE_KEY
  );
  const recoverPasswordToken = await RecoverPasswordToken.create({
    userId: user.id,
    token,
  });
  await sendEmail({
    to: user.email,
    subject: "Recuperación de contraseña",
    html: emailTemplate({
      name: user.name,
      message:
        "Se ha solicitado recuperar su contraseña, para continuar con el proceso haga click en el siguiente enlace.",
      label: "Recuperar Contraseña",
      link:
        process.env.WEBAPP_URL +
        "recover-password/" +
        recoverPasswordToken.token,
    }),
  });
}
