import { Model } from 'sequelize';

interface SessionAttributes {
  uuid: string; // TODO: Sequelize.DataTypes.UUID?
  expiresAt: Date;
  active: boolean;
  expired: boolean;
  userId: number
}

export default (sequelize: any, DataTypes: any) => {
  class Session extends Model<SessionAttributes>
    implements SessionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     uuid!: string; // TODO: Sequelize.DataTypes.UUID?

     expiresAt!: Date;

     active!: boolean;

     expired!: boolean;

     userId!: number

     static associate(models: any) {
       Session.belongsTo(models.Users, {
         foreignKey: 'userId',
       });
     }
  }

  Session.init({
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    expired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Sessions',
  });

  return Session;
};
