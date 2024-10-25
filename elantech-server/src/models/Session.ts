import { Model } from 'sequelize';

interface SessionAttributes {
  uuid: string; // TODO: Sequelize.DataTypes.UUID?
  userId: number;
  active: boolean;
  expired: boolean;
  expiresAt: Date;
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

     userId!: number

     active!: boolean;

     expired!: boolean;

     expiresAt!: Date;

     static associate(models: any) {
       Session.belongsTo(models.user, {
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
    userId: {
      type: DataTypes.INTEGER,
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
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'session',
  });

  return Session;
};
