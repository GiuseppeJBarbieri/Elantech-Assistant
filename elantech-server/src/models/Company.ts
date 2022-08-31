import { Model } from 'sequelize';

interface CompanyAttributes {
    id: string;
    customerType: number;
    companyName: string;
    repName: string;
    phoneNumber: string;
    emailAddress: string;
    location: string;
    comment: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Company extends Model<CompanyAttributes>
    implements CompanyAttributes {
        id: string;

        customerType: number;

        companyName: string;

        repName: string;

        phoneNumber: string;

        emailAddress: string;

        location: string;

        comment: string;

        static associate(models: any) {
          Company.hasMany(models.quote, { foreignKey: 'id' });
        }
  }

  Company.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    customerType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'company',
    paranoid: true,
  });

  return Company;
};
