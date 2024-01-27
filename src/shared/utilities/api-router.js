import express from "express";
import expressAsyncHandler from "express-async-handler";
import validateMiddleware from "../middlewares/validate.middleware.js";
import verifyTokenMiddleware from "../middlewares/verify-token.middleware.js";
export default function apiRouter() {
  const router = express.Router();
  const serviceWrapper =
    (fn) =>
    (
      route,
      action,
      { authenticate, middlewares, validations } = {
        authenticate: false,
        middlewares: [],
        validations: undefined,
      }
    ) => {
      fn = fn.bind(router);
      const params = [route];
      if (authenticate) params.push(verifyTokenMiddleware);
      if (middlewares) params.push(...middlewares);
      if (validations) params.push(validations, validateMiddleware);
      params.push(expressAsyncHandler(action));
      return fn(...params);
    };
  return {
    router,
    get: serviceWrapper(router.get),
    post: serviceWrapper(router.post),
    patch: serviceWrapper(router.patch),
    delete: serviceWrapper(router.delete),
  };
}
