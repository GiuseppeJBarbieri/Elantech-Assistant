import { Model } from 'sequelize';

interface QuotedProductsAttributes {
    id: number;
    quoteID: number;
    productNumber: string;
    orderID: number;
    quantity: number;
    quotedPrice: string;
    productCondition: string;
    comment: string;
}

export default (sequelize: any, DataTypes: any) => {
  class QuotedProducts extends Model<QuotedProductsAttributes>
    implements QuotedProductsAttributes {
        id: number;

        quoteID: number;

        productNumber: string;

        orderID: number;

        quantity: number;

        quotedPrice: string;

        productCondition: string;

        comment: string;
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
    productNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderID: {
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
    modelName: 'quotedProducts',
    paranoid: true,
  });

  return QuotedProducts;
};
