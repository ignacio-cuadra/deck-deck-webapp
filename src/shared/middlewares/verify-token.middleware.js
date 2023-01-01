import jwt from "jsonwebtoken";

export default function verifyTokenMiddleware(req, res, next) {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ status: "fail", message: "unidentified user", data: {} });

  const token = authorizationHeader.replace(/^Bearer\s+/, "");
  try {
    const user = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", message: "invalid token", data: {} });
  }
}
