import { DataTypes } from "sequelize";
import db from "../../../shared/database/db.js";

const Deck = db.define(
  "Deck",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["id"] }],
  }
);

export default Deck;
