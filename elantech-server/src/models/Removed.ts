import { Model } from 'sequelize';

interface RemovedAttributes {
    id: string;
    userId: string;
    orderId: number;
    reasonType: string;
    reason: string;
    dateRemoved: Date;
}

export default (sequelize: any, DataTypes: any) => {
  class Removed extends Model<RemovedAttributes>
    implements RemovedAttributes {
        id: string;

        userId: string;

        orderId!: number;

        reasonType: string;

        reason: string;

        dateRemoved: Date;
  }

  Removed.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reasonType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateRemoved: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'removedInventory',
    paranoid: true,
  });

  return Removed;
};
