import { DataTypes } from "sequelize";
import db from "../../shared/database/db.js";
const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
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
  },
  {
    indexes: [{ unique: true, fields: ["id"] }],
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  }
);

export default User;
