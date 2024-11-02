import { Model, DataTypes, Sequelize } from 'sequelize';

interface QuoteAttributes {
  id: number;
  companyId: number;
  userId: number;
  dateQuoted: Date;
  sold: boolean;
}

export default (sequelize: Sequelize) => {
  class Quote extends Model<QuoteAttributes>
    implements QuoteAttributes {
    id: number;

    companyId: number;

    userId: number;

    dateQuoted: Date;

    sold: boolean;

    static associate(models: any) {
      Quote.belongsTo(models.user, { foreignKey: 'userId' });
      Quote.belongsTo(models.company, { foreignKey: 'companyId' });
      Quote.hasMany(models.quotedProduct, { foreignKey: 'quoteId' });
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
