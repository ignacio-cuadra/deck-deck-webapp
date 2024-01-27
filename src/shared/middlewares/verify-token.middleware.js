import User from "../../modules/auth/models/user.model.js";
import AccessToken from "../../modules/auth/models/access-token.model.js";

export default async function verifyTokenMiddleware(req, res, next) {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ status: "fail", message: "unidentified user", data: {} });

  const token = authorizationHeader.replace(/^Bearer\s+/, "");
  try {
    const accessToken = await AccessToken.findOne({ where: { token } });
    if (accessToken == null) {
      throw Error("token not found");
    }
    const user = await User.findByPk(accessToken.userId);
    if (user == null) {
      throw Error("user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", message: "invalid token", data: {} });
  }
}
