import { Model } from 'sequelize';

interface ReceivedItemsAttributes {
  id: number;
  productId: number;
  quantity: number;
  cud: string;
}

export default (sequelize: any, DataTypes: any) => {
  class ReceivedItems extends Model<ReceivedItemsAttributes>
    implements ReceivedItemsAttributes {
    productId: number;

    quantity: number;

    cud: string;

    id: number;

    static associate(models: any) {
      ReceivedItems.belongsTo(models.Receiving, { foreignKey: 'poId' });
    }
  }

  ReceivedItems.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    cud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'receivedItem',
    paranoid: true,
  });

  return ReceivedItems;
};
