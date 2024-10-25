import { Model } from 'sequelize';

interface RemovedInventoryAttributes {
  id: number;
  userId: number;
  orderId: number;
  reasonType: string;
  reason: string;
  dateRemoved: Date;
}

export default (sequelize: any, DataTypes: any) => {
  class RemovedInventory extends Model<RemovedInventoryAttributes>
    implements RemovedInventoryAttributes {
    id: number;

    userId: number;

    orderId!: number;

    reasonType: string;

    reason: string;

    dateRemoved: Date;

    static associate(models: any) {
      RemovedInventory.belongsTo(models.inventory, { foreignKey: 'removedId' });
    }
  }

  RemovedInventory.init({
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

  return RemovedInventory;
};
