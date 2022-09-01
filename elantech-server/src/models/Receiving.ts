import { Model } from 'sequelize';

interface ReceivingAttributes {
  id: number;
  poNumber: string;
  companyId: number;
  userId: number;
  shippingType: string;
  orderType: string;
  trackingNumber: string;
  dateReceived: Date;
}

export default (sequelize: any, DataTypes: any) => {
  class Receiving extends Model<ReceivingAttributes>
    implements ReceivingAttributes {
    id: number;

    poNumber: string;

    companyId: number;

    userId!: number;

    shippingType!: string;

    orderType: string;

    trackingNumber: string;

    dateReceived!: Date;

    static associate(models: any) {
      Receiving.belongsTo(models.inventory, { foreignKey: 'poId' });
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingType: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'receiving',
    paranoid: true,
  });

  return Receiving;
};
