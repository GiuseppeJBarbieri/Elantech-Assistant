import { Model } from 'sequelize';

interface InventoryAttributes {
  id: number;
  productId: number;
  removedId: number;
  poId: number;
  serialNumber: string;
  condition: string;
  warrantyExpiration: Date;
  isTested: boolean;
  dateTested: Date;
  comment: string;
  location: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Inventory extends Model<InventoryAttributes>
    implements InventoryAttributes {
    id: number;

    productId: number;

    removedId!: number;

    poId!: number;

    serialNumber: string;

    condition: string;

    warrantyExpiration!: Date;

    isTested: boolean;

    dateTested!: Date;

    comment!: string;

    location!: string;

    static associate(models: any) {
      Inventory.belongsTo(models.product, { foreignKey: 'productId' });
      Inventory.hasMany(models.removedInventory, { foreignKey: 'removedId' });
      // Inventory.hasMany(models.receiving, { foreignKey: 'poId' });
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
    removedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    poId: {
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
      allowNull: false,
    },
    warrantyExpiration: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isTested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dateTested: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'inventory',
    paranoid: true,
  });

  return Inventory;
};
