import { Model } from 'sequelize';

interface UserTypeAttributes {
  id: number;
  value: string;
  createdBy: number;
  editedBy: number;
}

export default (sequelize: any, DataTypes: any) => {
  class UserType extends Model<UserTypeAttributes>
    implements UserTypeAttributes {
    /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
       id!: number;

       value!: string;

       createdBy!: number;

       editedBy: number;

       // eslint-disable-next-line no-unused-vars
       static associate(models: any) {
         // ...
       }
  }

  UserType.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    editedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'UserTypes',
    paranoid: true,
  });

  return UserType;
};
