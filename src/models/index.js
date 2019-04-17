import dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';
import configuration from '../config/config.js';
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configuration[env];
const db = {};
dotenv.config();

const sequelize = new Sequelize(config.use_env_variable, config);
readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
