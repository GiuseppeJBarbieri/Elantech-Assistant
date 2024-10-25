import { Model } from 'sequelize';

interface CompanyAttributes {
    id: number;
    userId: number;
    companyType: string;
    companyName: string;
    companyRep: string;
    phoneNumber: string;
    email: string;
    location: string;
    comment: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Company extends Model<CompanyAttributes>
    implements CompanyAttributes {
        id: number;

        userId: number;

        companyType: string;

        companyName: string;

        companyRep!: string;

        phoneNumber!: string;

        email!: string;

        location!: string;

        comment!: string;

        static associate(models: any) {
          Company.belongsTo(models.user, { foreignKey: 'userId' });
          Company.hasMany(models.quote, { foreignKey: 'companyId' });
          // Company.hasMany(models.user, { foreignKey: 'userId' });
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
    companyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyRep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
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
