import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  public id?: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

UserModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  tableName: 'users',
  underscored: true,
  timestamps: false,
});

export default UserModel;
