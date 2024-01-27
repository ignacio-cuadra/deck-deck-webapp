import { validationResult } from "express-validator";

export default function validateMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(422).json({
    status: "fail",
    message: "validatinon error",
    errors: errors.errors,
  });
}
