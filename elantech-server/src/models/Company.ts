import { Model } from 'sequelize';

interface CompanyAttributes {
    id: number;
    companyType: string;
    companyName: string;
    companyRep: string;
    phoneNumber: string;
    email: string;
    location: string;
    comments: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Company extends Model<CompanyAttributes>
    implements CompanyAttributes {
        id: number;

        companyType: string;

        companyName: string;

        companyRep!: string;

        phoneNumber!: string;

        email!: string;

        location!: string;

        comments!: string;

        static associate(models: any) {
          Company.hasMany(models.quote, { foreignKey: 'companyId' });
        }
  }

  Company.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    comments: {
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
