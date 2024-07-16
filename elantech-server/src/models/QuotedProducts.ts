import { Model } from 'sequelize';

interface QuotedProductsAttributes {
    id: number;
    quoteId: number;
    productId: number;
    quantity: number;
    quotedPrice: number;
    productCondition: string;
    comment: string;
}

export default (sequelize: any, DataTypes: any) => {
  class QuotedProducts extends Model<QuotedProductsAttributes>
    implements QuotedProductsAttributes {
        id: number;

        quoteId: number;

        productId: number;

        quantity: number;

        quotedPrice: number;

        productCondition: string;

        comment: string;

        static associate(models: any) {
          QuotedProducts.belongsTo(models.quote, { foreignKey: 'quoteId' });
        }
  }

  QuotedProducts.init({
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
    modelName: 'quoted_products',
    paranoid: true,
  });

  return QuotedProducts;
};
