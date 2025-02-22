import { Model, DataTypes, Sequelize } from 'sequelize';

interface ReceivedItemAttributes {
  id: number;
  receivingId: number;
  productId: number;
  quantity: number;
  cud: string;
  comment: string;
  finishedAdding: boolean;
}

export default (sequelize: Sequelize) => {
  class ReceivedItem extends Model<ReceivedItemAttributes>
    implements ReceivedItemAttributes {
      id: number;

      receivingId: number;

      productId: number;

      quantity: number;

      cud: string;

      comment: string;

      finishedAdding: boolean;

      static associate(models: any) {
        ReceivedItem.belongsTo(models.product, { foreignKey: 'productId' });
        ReceivedItem.belongsTo(models.receiving, { foreignKey: 'receivingId' });
      }
  }

  ReceivedItem.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    receivingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cud: {
      type: DataTypes.STRING,
      allowNull: true,
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
