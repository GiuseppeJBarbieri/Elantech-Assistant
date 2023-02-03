import { Model } from 'sequelize';

interface QuoteAttributes {
  id: number;
  companyId: number;
  userId: number;
  dateQuoted: Date;
  sold: boolean;
}

export default (sequelize: any, DataTypes: any) => {
  class Quote extends Model<QuoteAttributes>
    implements QuoteAttributes {
    id: number;

    companyId: number;

    userId: number;

    dateQuoted: Date;

    sold: boolean;

    static associate(models: any) {
      Quote.hasMany(models.quoted_products, { foreignKey: 'quoteId' });
      Quote.belongsTo(models.user, { foreignKey: 'userId' });
      Quote.belongsTo(models.company, { foreignKey: 'companyId' });
    }
  }

  Quote.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateQuoted: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sold: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'quote',
    paranoid: true,
  });

  return Quote;
};
