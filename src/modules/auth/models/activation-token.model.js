import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/database/sequelize.js";
import User from "./user.model.js";

export default class ActivationToken extends Model {
  static associate() {
    ActivationToken.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
ActivationToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize }
);
