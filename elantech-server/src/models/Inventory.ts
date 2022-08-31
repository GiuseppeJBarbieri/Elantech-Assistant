import { Model } from 'sequelize';

interface InventoryAttributes {
  serialNumber: string;
  productNumber: string;
  removedId: number;
  poNumber: string;
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
        serialNumber: string;

        productNumber: string;

        removedId!: number;

        poNumber!: string;

        condition: string;

        warrantyExpiration!: Date;

        isTested: boolean;

        dateTested: Date;

        comment!: string;

        location!: string;

        static associate(models: any) {
          Inventory.belongsTo(models.product, { foreignKey: 'productNumber' });
          Inventory.hasOne(models.removedInventory, { foreignKey: 'removedId' });
        }
  }

  Inventory.init({
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    productNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    removedId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warrantyExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isTested: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    dateTested: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
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
