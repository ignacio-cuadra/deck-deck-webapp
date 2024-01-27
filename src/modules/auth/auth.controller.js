import { comparePlainWithHash, hash } from "../../shared/utilities/crypt.js";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";
import sequelize from "../../shared/database/sequelize.js";
import { sendActivationTokenService } from "./services/send-activation-token.service.js";
import { NotFoundException } from "../../shared/utilities/errors/NotFoundException.js";

export async function signup(req, res) {
  const { id, email, name, password } = req.body;
  if (await User.findOne({ where: { email } })) {
    return res.status(422).json({
      status: "fail",
      message: "The email already exists.",
      data: {},
    });
  }
  const transaction = await sequelize.transaction();
  const user = await User.create(
    {
      id,
      name,
      email,
      password,
    },
    { transaction }
  );
  await sendActivationTokenService(user, transaction);
  await transaction.commit();
  user.password = undefined;
  return res.status(200).json({ user });
}

export async function sendActivationToken(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.json({ status: "fail", message: "user not exists", data: {} });
  }
  if (user.status === "Active") {
    return res.status(422).json({
      status: "fail",
      message: "user is already active",
      data: {},
    });
  }
  await sendActivationTokenService(user);
  return res.json({ status: "success", data: {} });
}

export async function activateUser(req, res) {
  const { token, password } = req.body;
  const activationToken = await ActivationToken.findOne({ where: { token } });
  if (!activationToken)
    return res.status(400).json({
      status: "fail",
      message: "El token no existe o ha expirado",
      data: {},
    });
  const user = await User.findByPk(activationToken.userId);
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "El usuario ya no existe",
      data: {},
    });
  }
  if (user.status == "Active") {
    return res.status(400).json({
      status: "fail",
      message: "El usuario ya ha sido activado",
      data: {},
    });
  }
  const transaction = await sequelize.transaction();
  await user.update(
    { password: hash(password), status: "Active" },
    { transaction }
  );
  await activationToken.destroy({ transaction });
  await transaction.commit();
  return res.json({
    status: "success",
    data: {},
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.unscoped().findOne({ where: { email } });
  if (!user || !comparePlainWithHash(password, user.password))
    return res.status(423).json({
      status: "fail",
      message: "Las credenciales administrados no son validas",
      data: {},
    });
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.PRIVATE_KEY
  );
  await AccessToken.create({ token, userId: user.id });
  return res.status(200).json({
    status: "success",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
}

export async function getLoggedInUser(req, res) {
  return res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
}

export async function updateLoggedInUserPassword(req, res) {
  const { currentPassword, newPassword, destroySessions } = req.body;
  const user = await User.unscoped().findByPk(req.user.id);
  if (!comparePlainWithHash(currentPassword, user.password))
    return res.status(422).json({
      status: "fail",
      message: "Las credenciales enviadas no son válidas",
      data: {},
    });
  const data = { password: hash(newPassword) };
  User.update(data, {
    where: {
      id: req.user.id,
    },
  });
  if (destroySessions) {
    await AccessToken.destroy({ where: { userId: req.user.id } });
  }
  return res.status(200).json({
    status: "success",
    data: {},
  });
}

export async function sendRecoverPasswordToken(req, res) {
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res
      .status(404)
      .json({ status: "fail", message: "El usuario no existe", data: {} });
  }
  if (user.status !== "Active") {
    return res.json({
      status: "fail",
      message:
        "El usuario no se encuentra activo, busque en su correo electrónico el correo de activación y realice los pasos ahí indicados. Si no lo encuentra puede solicitar a un administrador que se lo reenvie.",
      data: {},
    });
  }
  await sendRecoverPasswordTokenService(user);
  return res.json({ status: "success", data: {} });
}

export async function recoverPassword(req, res) {
  const { token, password } = req.body;
  const recoverPasswordToken = await RecoverPasswordToken.findOne({
    where: { token },
  });
  if (!recoverPasswordToken)
    return res.status(400).json({
      status: "fail",
      message: "El token no existe o ha expirado",
      data: {},
    });
  const user = await User.findByPk(recoverPasswordToken.userId);
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "El usuario ya no existe",
      data: {},
    });
  }
  const transaction = await sequelize.transaction();
  await user.update({ password: hash(password) }, { transaction });
  await recoverPasswordToken.destroy({ transaction });
  await transaction.commit();
  return res.json({
    status: "success",
    data: {},
  });
}
