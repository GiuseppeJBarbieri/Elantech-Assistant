import { Model } from 'sequelize';

interface ProductAttributes {
  productNumber: string;
  userId: number;
  altNumber1: string;
  altNumber2: string;
  altNumber3: string;
  altNumber4: string;
  altNumber5: string;
  altNumber6: string;
  quantity: number;
  productType: string;
  brand: string;
  description: string;
  ebayLink: string;
  websiteLink: string;
  quickSpecsLink: string;
  relatedTags: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Product extends Model<ProductAttributes>
    implements ProductAttributes {
    productNumber: string;

    userId: number;

    altNumber1!: string;

    altNumber2!: string;

    altNumber3!: string;

    altNumber4!: string;

    altNumber5!: string;

    altNumber6!: string;

    quantity: number;

    productType: string;

    brand: string;

    description!: string;

    updatedAt: Date

    ebayLink!: string;

    websiteLink!: string;

    quickSpecsLink!: string;

    relatedTags!: string;

    static associate(models: any) {
      Product.belongsTo(models.user, { foreignKey: 'userId' });
      Product.hasMany(models.inventory, { foreignKey: 'productNumber' });
    }
  }

  Product.init({
    productNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    altNumber1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altNumber2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altNumber3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altNumber4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altNumber5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altNumber6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ebayLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    websiteLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quickSpecsLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relatedTags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'product',
    paranoid: true,
  });

  return Product;
};
