import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserTypeAttributes {
  id: number;
  createdBy: number;
  type: string;
}

export default (sequelize: Sequelize) => {
  class UserType extends Model<UserTypeAttributes>
    implements UserTypeAttributes {
    /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
    id!: number;

    type!: string;

    createdBy!: number;

    editedBy: number;

    static associate(models: any) {
      UserType.hasMany(models.user, { foreignKey: 'userTypeId' });
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
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'userType',
    paranoid: true,
  });

  return UserType;
};
