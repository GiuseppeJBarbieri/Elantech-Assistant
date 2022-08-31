import { Model } from 'sequelize';

interface QuoteAttributes {
    id: number;
    companyID: number;
    userID: number;
    dateQuoted: Date;
}

export default (sequelize: any, DataTypes: any) => {
  class Quote extends Model<QuoteAttributes>
    implements QuoteAttributes {
        id: number;

        companyID: number;

        userID: number;

        dateQuoted: Date;

        static associate(models: any) {
          Quote.hasOne(models.quotedProducts, { foreignKey: 'id' });
        }
  }

  Quote.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    companyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateQuoted: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'quote',
    paranoid: true,
  });

  return Quote;
};
