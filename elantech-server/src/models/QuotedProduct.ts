import { Model, DataTypes, Sequelize } from 'sequelize';

interface QuotedProductAttributes {
    id: number;
    quoteId: number;
    productId: number;
    quantity: number;
    quotedPrice: number;
    productCondition: string;
    comment: string;
}

export default (sequelize: Sequelize) => {
  class QuotedProduct extends Model<QuotedProductAttributes>
    implements QuotedProductAttributes {
        id: number;

        quoteId: number;

        productId: number;

        quantity: number;

        quotedPrice: number;

        productCondition: string;

        comment: string;

        static associate(models: any) {
          QuotedProduct.belongsTo(models.quote, { foreignKey: 'quoteId' });
          QuotedProduct.belongsTo(models.product, { foreignKey: 'productId' });
        }
  }

  QuotedProduct.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quoteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quotedPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    productCondition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'quotedProduct',
    paranoid: true,
  });

  return QuotedProduct;
};
