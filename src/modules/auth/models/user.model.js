import { DataTypes, Model } from "sequelize";
import sequelize from "../../../shared/database/sequelize.js";
import AccessToken from "./access-token.model.js";
import ActivationToken from "./activation-token.model.js";
import RecoverPasswordToken from "./recover-password-token.model.js";

export default class User extends Model {
  static associate() {
    User.hasMany(AccessToken, {
      foreignKey: "userId",
      as: "accessTokens",
    });

    User.hasMany(ActivationToken, {
      foreignKey: "userId",
      as: "activationTokens",
    });

    User.hasMany(RecoverPasswordToken, {
      foreignKey: "userId",
      as: "recoverPasswordTokens",
    });
  }
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Inactive",
      allowNull: false,
    },
  },
  { sequelize }
);
