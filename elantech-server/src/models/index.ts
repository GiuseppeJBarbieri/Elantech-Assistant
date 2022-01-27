import * as Sequelize from 'sequelize';

import config from '../config';
import Session from './Session';
import User from './User';
import UserType from './UserType';
import Driver from './Driver';
import TimeFrame from './TimeFrame';
import Store from './Store';

const db: any = {};
const DB_PARAMS = config.db;

const sequelize = new Sequelize.Sequelize(DB_PARAMS.NAME, DB_PARAMS.USER, DB_PARAMS.PASSWORD, {
  host: DB_PARAMS.HOST,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const session = Session(sequelize, Sequelize.DataTypes);
db[session.name] = session;

const user = User(sequelize, Sequelize.DataTypes);
db[user.name] = user;

const userType = UserType(sequelize, Sequelize.DataTypes);
db[userType.name] = userType;

const timeFrame = TimeFrame(sequelize, Sequelize.DataTypes);
db[timeFrame.name] = timeFrame;

const driver = Driver(sequelize, Sequelize.DataTypes);
db[driver.name] = driver;

const store = Store(sequelize, Sequelize.DataTypes);
db[store.name] = store;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
