import { Model } from 'sequelize';

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
  ebayLink: string;
  websiteLink: string;
  quickSpecsLink: string;
  relatedTags: string;
  reasonForRemoval: string;
}

export default (sequelize: any, DataTypes: any) => {
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

    ebayLink!: string;

    websiteLink!: string;

    quickSpecsLink!: string;

    relatedTags!: string;

    reasonForRemoval!: string;

    static associate(models: any) {
      Product.belongsTo(models.user, { foreignKey: 'userId' });
      Product.hasMany(models.inventory, { foreignKey: 'productId' });
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
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    altNumber2: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    altNumber3: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    altNumber4: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    altNumber5: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    altNumber6: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
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
    reasonForRemoval: {
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
