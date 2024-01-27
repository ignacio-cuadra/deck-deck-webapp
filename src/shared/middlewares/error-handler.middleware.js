import { NotFoundException } from "../utilities/errors/NotFoundException.js";
import { ValidationException } from "../utilities/errors/ValidationException.js";

export default function errorHandlerMiddleware(err, req, res, next) {
  console.error(err.stack);
  if (err instanceof NotFoundException) {
    return res.status(404).json({
      status: "fail",
      message: err.message === "" ? "not found" : err.message,
      data: err.stack,
    });
  }
  if (err instanceof ValidationException) {
    return res.status(422).json({
      status: "fail",
      message: err.message === "" ? "validation exception" : err.message,
      data: [],
    });
  }
  return res
    .status(500)
    .json({ status: "error", message: err.message, data: err.stack });
}
