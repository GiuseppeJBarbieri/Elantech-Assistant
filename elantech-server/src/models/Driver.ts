import { Model } from 'sequelize';
import IDriver from '../features/drivers/IDriver';

export default (sequelize: any, DataTypes: any) => {
  class Driver extends Model<IDriver>
    implements IDriver {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     driverId!: number;

     name!: string;

     static associate(models : any) {
       Driver.hasMany(models.TimeFrames, {
         foreignKey: {
           name: 'driverId',
         },
         onDelete: 'cascade',
       });
     }
  }

  Driver.init({
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'Drivers',
    paranoid: true,
  });

  return Driver;
};
