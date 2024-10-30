import { Model } from 'sequelize';

interface ReceivingAttributes {
  id: number;
  poNumber: string;
  companyId: number;
  userId: number;
  orderType: string;
  trackingNumber: string;
  dateReceived: Date;
  shippedVia: string;
  comment: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Receiving extends Model<ReceivingAttributes>
    implements ReceivingAttributes {
    id: number;

    poNumber: string;

    companyId: number;

    userId: number;

    orderType: string;

    trackingNumber: string;

    dateReceived: Date;

    shippedVia: string;

    comment: string;

    static associate(models: any) {
      Receiving.hasMany(models.receivedItem, { foreignKey: 'orderId' });
      Receiving.hasMany(models.inventory, { foreignKey: 'poId' });
      Receiving.belongsTo(models.company, { foreignKey: 'companyId' });
      Receiving.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }

  Receiving.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    poNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateReceived: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shippedVia: {
      type: DataTypes.STRING,
      allowNull: false,
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
