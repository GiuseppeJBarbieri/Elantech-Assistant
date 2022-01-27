import { Model } from 'sequelize';
import IStore from '../features/stores/IStore';

export default (sequelize: any, DataTypes: any) => {
  class Store extends Model<IStore>
    implements IStore {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     storeId!: number;

     storeName!: string;

     emailAddress!: string;

     static associate(models : any) {
       Store.hasMany(models.TimeFrames, {
         foreignKey: {
           name: 'storeId',
         },
         onDelete: 'cascade',
       });
     }
  }

  Store.init({
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Stores',
    paranoid: true,
  });

  return Store;
};
