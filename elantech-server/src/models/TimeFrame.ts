import { Model } from 'sequelize';

interface TimeFrameAttributes {
    orderId: number;
    storeId: number;
    driverId: number;
    customerName: string;
    town: string;
    orderNumber: string;
    timeFrame: string;
    orderDate: Date;
}

export default (sequelize: any, DataTypes: any) => {
  class TimeFrame extends Model<TimeFrameAttributes>
    implements TimeFrameAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     orderId!: number;

     storeId!: number;

     driverId!: number;

     customerName!: string;

     town!: string;

     orderNumber!: string;

     timeFrame!: string;

     orderDate!: Date;

     static associate(models : any) {
       TimeFrame.belongsTo(models.Drivers, {
         foreignKey: 'driverId',
       });
       TimeFrame.belongsTo(models.Stores, {
         foreignKey: 'storeId',
       });
     }
  }

  TimeFrame.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    town: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timeFrame: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'TimeFrames',
    paranoid: true,
  });

  return TimeFrame;
};
