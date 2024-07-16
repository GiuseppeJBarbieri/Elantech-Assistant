import { Model } from 'sequelize';

interface MerchandiseAttributes {
    id: number;
    shippingId: number;
    productId: number;
    cud: string;
    finishedAdding: boolean;
}

export default (sequelize: any, DataTypes: any) => {
  class Merchandise extends Model<MerchandiseAttributes>
    implements MerchandiseAttributes {
        id: number;

        shippingId: number;

        productId: number;

        cud: string;

        finishedAdding: boolean;

        static associate(models: any) {
          Merchandise.belongsTo(models.receiving, { foreignKey: 'shippingId' });
          // Has Many Shipping
        }
  }

  Merchandise.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    shippingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finishedAdding: {
      type: DataTypes.boolean,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'merchandise',
    paranoid: true,
  });

  return Merchandise;
};
