import express from "express";
import authRouter from "./modules/auth/auth.router.js";
import decksRouter from "./modules/decks/decks.router.js";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.json({ status: "on" });
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/decks", decksRouter);

export default mainRouter;
