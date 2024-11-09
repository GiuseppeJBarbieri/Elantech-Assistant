import { Model, DataTypes, Sequelize } from 'sequelize';

interface SessionAttributes {
  uuid: string; // TODO: Sequelize.DataTypes.UUID?
  userId: number;
  active: boolean;
  expired: boolean;
  expiresAt: Date;
}

export default (sequelize: Sequelize) => {
  class Session extends Model<SessionAttributes>
    implements SessionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     uuid!: string;

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
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'session',
  });

  return Session;
};
