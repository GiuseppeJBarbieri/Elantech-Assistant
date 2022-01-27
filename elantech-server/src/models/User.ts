import { Model } from 'sequelize';

interface UserAttributes {
    id: number;
    createdBy: number;
    editedBy: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    userTypeId: number;
}

export default (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
    implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number;

     createdBy!: number;

     editedBy!: number;

     email!: string;

     firstName!: string;

     lastName!: string;

     password!: string;

     phoneNumber!: string;

     userTypeId!: number;

     static associate(models: any) {
       User.belongsTo(models.UserTypes, {
         foreignKey: 'userTypeId',
       });
     }
  }

  User.init({
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    editedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Users',
    paranoid: true,
  });

  return User;
};
