import express from "express";
import cors from "cors";
import mainRouter from "./main.router.js";
import sequelize, { initializeModels } from "./shared/database/sequelize.js";
import { basePath } from "./config.js";
import fileUpload from "express-fileupload";
import path from "path";
import requestLogMiddleware from "./shared/middlewares/request-log.middleware.js";
import errorHandlerMiddleware from "./shared/middlewares/error-handler.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({ useTempFiles: true, tempFileDir: path.join(basePath, "tmp") })
);
app.use(requestLogMiddleware);
app.use("/", mainRouter);
app.use(errorHandlerMiddleware);

const port = 5000;

process.on("unhandledRejection", (reason) => {
  console.log("unhandledRejection");
  console.error(reason);
});

app.listen(port, async () => {
  console.log(`⚡ server is ready on  http://localhost:${port}/`);
  await initializeModels();
  await sequelize.authenticate();
  console.log(`💾 database (${process.env.DB_NAME}) connection is ready`);
});
