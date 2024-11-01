import { Model, DataTypes, Sequelize } from 'sequelize';

interface CompanyAttributes {
    id: number;
    userId: number;
    type: string;
    name: string;
    representative: string;
    phone: string;
    email: string;
    location: string;
    comment: string;
}

export default (sequelize: Sequelize) => {
  class Company extends Model<CompanyAttributes>
    implements CompanyAttributes {
        id: number;

        userId: number;

        type: string;

        name: string;

        representative!: string;

        phone!: string;

        email!: string;

        location!: string;

        comment!: string;

        static associate(models: any) {
          Company.belongsTo(models.user, { foreignKey: 'userId' });
          Company.hasMany(models.quote, { foreignKey: 'companyId' });
          Company.hasMany(models.receiving, { foreignKey: 'companyId' });
        }
  }

  Company.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    representative: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'company',
    paranoid: true,
  });

  return Company;
};
