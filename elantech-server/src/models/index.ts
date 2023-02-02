import * as Sequelize from 'sequelize';

import config from '../config';
import Session from './Session';
import UserType from './UserType';
import User from './User';
import Product from './Product';
import Receiving from './Receiving';
import Inventory from './Inventory';
import Removed from './Removed';
import Company from './Company';
import Quote from './Quote';
import QuotedProducts from './QuotedProducts';

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

const company = Company(sequelize, Sequelize.DataTypes);
db[company.name] = company;

const quote = Quote(sequelize, Sequelize.DataTypes);
db[quote.name] = quote;

const quotedProducts = QuotedProducts(sequelize, Sequelize.DataTypes);
db[quotedProducts.name] = quotedProducts;

const session = Session(sequelize, Sequelize.DataTypes);
db[session.name] = session;

const user = User(sequelize, Sequelize.DataTypes);
db[user.name] = user;

const userType = UserType(sequelize, Sequelize.DataTypes);
db[userType.name] = userType;

const product = Product(sequelize, Sequelize.DataTypes);
db[product.name] = product;

const receiving = Receiving(sequelize, Sequelize.DataTypes);
db[receiving.name] = receiving;

const inventory = Inventory(sequelize, Sequelize.DataTypes);
db[inventory.name] = inventory;

const removedInventory = Removed(sequelize, Sequelize.DataTypes);
db[removedInventory.name] = removedInventory;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
