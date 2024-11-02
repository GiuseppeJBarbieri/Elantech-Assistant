import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  userTypeId: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes>
    implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;

    userTypeId!: number;

    email!: string;

    firstName!: string;

    lastName!: string;

    password!: string;

    phoneNumber!: string;

    static associate(models: any) {
      User.belongsTo(models.userType, {
        foreignKey: 'userTypeId',
      });
      User.hasMany(models.session, {
        as: 'session',
        foreignKey: 'userId',
      });
      User.hasMany(models.product, {
        as: 'product',
        foreignKey: 'userId',
      });
      User.hasMany(models.company, {
        as: 'company',
        foreignKey: 'userId',
      });
      User.hasMany(models.quote, {
        as: 'quote',
        foreignKey: 'userId',
      });
      User.hasMany(models.receiving, {
        as: 'receiving',
        foreignKey: 'userId',
      });
      User.hasMany(models.removedInventory, {
        as: 'removedInventory',
        foreignKey: 'userId',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'user',
    paranoid: true,
  });

  return User;
};
