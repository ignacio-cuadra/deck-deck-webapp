import { comparePlainWithHash, hash } from "../../shared/utilities/crypt.js";
import User from "./user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signup(req, res) {
  const { id, name, email, password } = req.body;
  if (await User.findOne({ where: { email } })) {
    return res.status(400).json({
      status: "fail",
      message: "the email already exist",
      data: {},
    });
  }
  const user = await User.create({ id, email, name, password: hash(password) });
  user.password = undefined;
  res.json({ user });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.unscoped().findOne({ where: { email } });
  if (!user || !comparePlainWithHash(password, user.password))
    return res.status(423).json({
      status: "fail",
      message: "the credentials supplied are not valid",
      data: {},
    });
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.PRIVATE_KEY
  );
  return res.status(200).json({
    status: "success",
    data: { token, user: { id: user.id, name: user.name } },
  });
}

export async function getLoggedInUser(req, res) {
  return res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
}

export async function updateLoggedInUser(req, res) {
  const { name, currentPassword, newPassword } = req.body;
  const user = await User.unscoped().findByPk(req.user.id);
  if (!comparePlainWithHash(currentPassword, user.password))
    return res.status(423).json({
      status: "fail",
      message: "the credentials supplied are not valid",
      data: {},
    });
  const data = {};
  if (name) data.name = name;
  if (newPassword) data.password = hash(newPassword);
  User.update(data, {
    where: {
      id: req.user.id,
    },
  });
  return res.status(200).json({
    status: "success",
    data: {},
  });
}
