import { Sequelize } from "sequelize";
import { basePath, databaseCredentials } from "../../config.js";
import { glob } from "glob";
import path from "path";

const sequelize = new Sequelize({
  dialect: "postgres",
  ...databaseCredentials,
  logging: false,
  dialectOptions:
    process.env.DB_SSL === "true"
      ? {
          ssl: {
            require: process.env.DB_SSL === "true",
          },
        }
      : undefined,
  define: {
    underscored: true,
  },
});

export async function initializeModels() {
  const models = [];
  const modelFiles = glob.sync(
    path.join(basePath, "./src/**/*.model.js").replace(/\\/g, "/")
  );
  for (const modelFile of modelFiles) {
    const path = "file://" + modelFile;
    const module = await import(path);
    const model = module.default;
    models.push(model);
  }
  models
    .filter((model) => typeof model.associate === "function")
    .forEach((model) => model.associate(models));
}

export default sequelize;
