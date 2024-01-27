import sequelize, { initializeModels } from "./sequelize.js";

console.log(
  `👾   Mode: ${process.env.NODE_ENV || "productive"} - 🗄️ Database: ${
    process.env.DB_NAME
  }`
);
console.log("⚠️    The migration will start in three seconds");
setTimeout(async () => {
  await initializeModels();
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  await sequelize.close();
  console.log("🎉   The migration has completed successfully");
}, 3000);
