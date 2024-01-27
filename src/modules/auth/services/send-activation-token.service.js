import jwt from "jsonwebtoken";
import ActivationToken from "../models/activation-token.model.js";
import sendEmail from "../../../shared/services/send-email.service.js";
import emailTemplate from "../../../shared/templates/email.template.js";
export async function sendActivationTokenService(user, transaction) {
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.PRIVATE_KEY
  );
  const activationToken = await ActivationToken.create(
    {
      userId: user.id,
      token,
    },
    { transaction }
  );
  await sendEmail({
    to: user.email,
    subject: "Activación de cuenta",
    html: emailTemplate({
      name: user.name,
      message:
        "Bienvenido a Deck Deck, puedes activar tu cuenta haciendo click en el siguiente enlace.",
      label: "Activar Cuenta",
      link:
        process.env.WEBAPP_URL + "activate-account/" + activationToken.token,
    }),
  });
}
