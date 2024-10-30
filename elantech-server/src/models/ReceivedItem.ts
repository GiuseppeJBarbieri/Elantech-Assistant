import { Model } from 'sequelize';

interface ReceivedItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  cud: string;
  comment: string;
  finishedAdding: boolean;
}

export default (sequelize: any, DataTypes: any) => {
  class ReceivedItem extends Model<ReceivedItemAttributes>
    implements ReceivedItemAttributes {
      id: number;

      orderId: number;

      productId: number;

      quantity: number;

      cud: string;

      comment: string;

      finishedAdding: boolean;

      static associate(models: any) {
        ReceivedItem.belongsTo(models.product, { foreignKey: 'productId' });
        ReceivedItem.belongsTo(models.receiving, { foreignKey: 'orderId' });
      }
  }

  ReceivedItem.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    orderId: {
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
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finishedAdding: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'receivedItem',
    paranoid: true,
  });

  return ReceivedItem;
};
