import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

if (process.env.NODE_ENV == "development") {
  dotenv.config({ path: ".env.development" });
} else {
  dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
const currentPath = dirname(__filename);

export const basePath = path.join(currentPath, "..");
export const databaseCredentials = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};
export const emailCredentials = {
  user: process.env.EMAIL_USERNAME,
  pass: process.env.EMAIL_PASSWORD,
};
