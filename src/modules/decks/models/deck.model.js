import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/database/sequelize.js";
import Card from "./card.model.js";
export default class Deck extends Model {
  static associate() {
    Deck.hasMany(Card, {
      foreignKey: "deckId",
      as: "cards",
    });
  }
}
Deck.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);
