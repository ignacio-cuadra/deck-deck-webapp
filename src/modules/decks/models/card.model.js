import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/database/sequelize.js";
import Deck from "./deck.model.js";

export default class Card extends Model {
  static associate() {
    Card.belongsTo(Deck, {
      foreignKey: "deckId",
      as: "deck",
    });
  }
}
Card.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
  { sequelize }
);
