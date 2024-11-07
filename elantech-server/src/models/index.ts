import * as Sequelize from 'sequelize';

import config from '../config';
import Session from './Session';
import UserType from './UserType';
import User from './User';
import Product from './Product';
import Receiving from './Receiving';
import Inventory from './Inventory';
import Removed from './RemovedInventory';
import Company from './Company';
import Quote from './Quote';
import QuotedProduct from './QuotedProduct';
import ReceivedItem from './ReceivedItem';

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

const session = Session(sequelize);
db[session.name] = session;

const user = User(sequelize);
db[user.name] = user;

const userType = UserType(sequelize);
db[userType.name] = userType;

const product = Product(sequelize);
db[product.name] = product;

const company = Company(sequelize);
db[company.name] = company;

const quote = Quote(sequelize);
db[quote.name] = quote;

const quotedProduct = QuotedProduct(sequelize);
db[quotedProduct.name] = quotedProduct;

const inventory = Inventory(sequelize);
db[inventory.name] = inventory;

const removedInventory = Removed(sequelize);
db[removedInventory.name] = removedInventory;

const receiving = Receiving(sequelize);
db[receiving.name] = receiving;

const receivedItem = ReceivedItem(sequelize);
db[receivedItem.name] = receivedItem;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
