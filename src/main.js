import express from "express";
import dotenv from "dotenv";

import mainRouter from "./main.router.js";
import db from "./shared/database/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/", mainRouter);
const port = 5000;

app.listen(port, async () => {
  console.log(`⚡ server is ready on  http://localhost:${port}/`);
  await db.authenticate();
  console.log(`💾 database (${process.env.DB_NAME}) connection is ready`);
});
