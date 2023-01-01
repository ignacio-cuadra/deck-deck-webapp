import { DataTypes } from "sequelize";
import db from "../../../shared/database/db.js";
import Deck from "./deck.model.js";

const Card = db.define(
  "Card",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    front: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    back: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["id"] }],
  }
);

Deck.hasMany(Card);

export default Card;
