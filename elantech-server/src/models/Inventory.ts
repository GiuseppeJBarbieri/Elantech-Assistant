import { Model, DataTypes, Sequelize } from 'sequelize';

interface InventoryAttributes {
  id: number;
  productId: number;
  removedInventoryId: number;
  purchaseOrderId: number;
  serialNumber: string;
  condition: string;
  warrantyExpiration: Date;
  tested: boolean;
  testedDate: Date;
  comment: string;
  location: string;
  reserved: boolean;
}

export default (sequelize: Sequelize) => {
  class Inventory extends Model<InventoryAttributes>
    implements InventoryAttributes {
    id: number;

    productId: number;

    removedInventoryId!: number;

    purchaseOrderId!: number;

    serialNumber: string;

    condition: string;

    warrantyExpiration!: Date;

    tested: boolean;

    testedDate!: Date;

    comment!: string;

    location!: string;

    reserved: boolean;

    static associate(models: any) {
      Inventory.belongsTo(models.product, { foreignKey: 'productId' });
      Inventory.hasOne(models.removedInventory, { foreignKey: 'removedInventoryId' });
      Inventory.belongsTo(models.receiving, { foreignKey: 'purchaseOrderId' });
    }
  }

  Inventory.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    removedInventoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    purchaseOrderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warrantyExpiration: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    tested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    testedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reserved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'inventory',
    paranoid: true,
  });

  return Inventory;
};
