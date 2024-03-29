import {
  signup,
  login,
  getLoggedInUser,
  updateLoggedInUserPassword,
} from "./auth.controller.js";

import {
  signupValidations,
  updateLoggedInUserValidations,
} from "./auth.validator.js";

import apiRouter from "../../shared/utilities/api-router.js";

const authRouter = apiRouter();

authRouter.post("/signup", signup, { validations: signupValidations });
authRouter.post("/login", login);
authRouter.get("/get-logged-in-user", getLoggedInUser, { authenticate: true });
authRouter.patch(
  "/update-logged-in-user-password",
  updateLoggedInUserPassword,
  {
    authenticate: true,
    validations: updateLoggedInUserValidations,
  }
);

export default authRouter.router;
