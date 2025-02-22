import { Model, DataTypes, Sequelize } from 'sequelize';

interface ProductAttributes {
  id: number;
  userId: number;
  productNumber: string;
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
  ebayUrl: string;
  websiteUrl: string;
  quickSpecsUrl: string;
  relatedTags: string;
  reasonForRemoval: string;
}

export default (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes>
    implements ProductAttributes {
    id: number;

    userId: number;

    productNumber: string;

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

    ebayUrl: string;

    websiteUrl: string;

    quickSpecsUrl: string;

    relatedTags!: string;

    reasonForRemoval!: string;

    static associate(models: any) {
      Product.belongsTo(models.user, { foreignKey: 'userId' });
      Product.hasMany(models.quotedProduct, { foreignKey: 'productId' });
      Product.hasMany(models.inventory, { foreignKey: 'productId' });
      Product.hasMany(models.receivedItem, { foreignKey: 'productId' });
    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    altNumber1: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
    },
    altNumber2: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
    },
    altNumber3: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
    },
    altNumber4: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
    },
    altNumber5: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
    },
    altNumber6: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productType: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(20000),
      allowNull: true,
    },
    ebayUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quickSpecsUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relatedTags: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    reasonForRemoval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'product',
    paranoid: true,
  });

  //  TOOD - make sure that we check that each field is unique
  // Product.beforeValidate((product: Product) => {
  //   // Add your validation logic here
  //   // For example:
  //   if (product.productNumber === product.altNumber1
  //     || product.productNumber === product.altNumber2
  //     || product.productNumber === product.altNumber3
  //     || product.productNumber === product.altNumber4
  //     || product.productNumber === product.altNumber5
  //     || product.productNumber === product.altNumber6
  //   ) {
  //     throw new Error('A value in one column cannot exist in another column');
  //   }
  // });

  return Product;
};
