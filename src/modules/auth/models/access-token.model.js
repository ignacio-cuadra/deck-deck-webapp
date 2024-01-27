import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/database/sequelize.js";
import User from "./user.model.js";

export default class AccessToken extends Model {
  static associate() {
    AccessToken.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
AccessToken.init(
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
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize }
);
