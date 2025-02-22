import { Model, DataTypes, Sequelize } from 'sequelize';

interface ReceivingAttributes {
  id: number;
  companyId: number;
  userId: number;
  purchaseOrderNumber: string;
  orderType: string;
  trackingNumber: string;
  dateReceived: Date;
  shippedVia: string;
  comment: string;
}

export default (sequelize: Sequelize) => {
  class Receiving extends Model<ReceivingAttributes>
    implements ReceivingAttributes {
    id: number;

    companyId: number;

    userId: number;

    purchaseOrderNumber: string;

    orderType: string;

    trackingNumber: string;

    dateReceived: Date;

    shippedVia: string;

    comment: string;

    static associate(models: any) {
      Receiving.hasMany(models.receivedItem, { foreignKey: 'receivingId' });
      Receiving.hasMany(models.inventory, { foreignKey: 'purchaseOrderId' });
      Receiving.belongsTo(models.company, { foreignKey: 'companyId' });
      Receiving.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }

  Receiving.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseOrderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateReceived: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shippedVia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'receiving',
    paranoid: true,
  });

  return Receiving;
};
