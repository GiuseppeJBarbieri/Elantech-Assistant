import { Model } from 'sequelize';

interface ReceivingAttributes {
  id: number;
  poNumber: string;
  companyId: number;
  userId: number;
  shippingId: number;
  orderType: string;
  trackingNumber: string;
  dateReceived: Date;
  shippedVia: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Receiving extends Model<ReceivingAttributes>
    implements ReceivingAttributes {
    id: number;

    poNumber: string;

    companyId: number;

    userId: number;

    shippingId: number;

    orderType: string;

    trackingNumber: string;

    dateReceived: Date;

    shippedVia: string;

    static associate(models: any) {
      Receiving.belongsTo(models.inventory, { foreignKey: 'poId' });
      // Receiving.hasMany(models.Merchandise, { foreignKey: 'shippingId' });
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
    shippingId: {
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
  }, {
    sequelize,
    modelName: 'receiving',
    paranoid: true,
  });

  return Receiving;
};
