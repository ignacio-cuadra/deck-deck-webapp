import User from "../../modules/auth/user.model.js";
import Card from "../../modules/decks/card.model.js";
import Deck from "../../modules/decks/deck.model.js";
import db from "./db.js";
import dotenv from "dotenv";
dotenv.config();

console.log(
  `👾   Mode: ${process.env.NODE_ENV || "productive"} - 🗄️ Database: ${
    process.env.DB_NAME
  }`
);
console.log("⚠️    The migration will start in three seconds");
setTimeout(async () => {
  await db.authenticate();
  await User.sync({ alter: true });
  await Deck.sync({ alter: true });
  await Card.sync({ alter: true });
  await db.close();
  console.log("🎉   The migration has completed successfully");
}, 3000);
