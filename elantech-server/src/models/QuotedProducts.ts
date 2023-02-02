import { Model } from 'sequelize';

interface QuotedProductsAttributes {
    id: number;
    quoteID: number;
    productID: number;
    orderID: number;
    quantity: number;
    quotedPrice: number;
    productCondition: string;
    comment: string;
}

export default (sequelize: any, DataTypes: any) => {
  class QuotedProducts extends Model<QuotedProductsAttributes>
    implements QuotedProductsAttributes {
        id: number;

        quoteID: number;

        productID: number;

        orderID: number;

        quantity: number;

        quotedPrice: number;

        productCondition: string;

        comment: string;

        static associate(models: any) {
          QuotedProducts.belongsTo(models.quote, { foreignKey: 'quoteID' });
        }
  }

  QuotedProducts.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quoteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: 'quoted_products',
    paranoid: true,
  });

  return QuotedProducts;
};
