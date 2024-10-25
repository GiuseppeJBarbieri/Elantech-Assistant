import { Model } from 'sequelize';

interface RemovedAttributes {
  id: number;
  userId: number;
  orderId: number;
  reasonType: string;
  reason: string;
  dateRemoved: Date;
}

export default (sequelize: any, DataTypes: any) => {
  class Removed extends Model<RemovedAttributes>
    implements RemovedAttributes {
    id: number;

    userId: number;

    orderId!: number;

    reasonType: string;

    reason: string;

    dateRemoved: Date;

    static associate(models: any) {
      Removed.belongsTo(models.inventory, { foreignKey: 'removedId' });
    }
  }

  Removed.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
