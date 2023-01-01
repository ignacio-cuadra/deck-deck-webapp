import { body } from "express-validator";

export const loginValidations = [
  body("email").isEmail(),
  body("password").notEmpty(),
];

export const signupValidations = [
  body("id").isUUID(),
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const updateLoggedInUserValidations = [
  body("name").optional().notEmpty(),
  body("currentPassword").notEmpty().isString(),
  body("newPassword").optional().isLength({ min: 6 }).isString(),
  body().custom((value, { req }) => {
    if (!req.body.name && !req.body.newPassword) {
      throw new Error("name and/or new password are required");
    }
    return true;
  }),
];
