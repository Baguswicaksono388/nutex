'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config');
require('dotenv').config();

const db = {};

// Inisialisasi koneksi database
let core;
const databaseCore = config.core;

core = new Sequelize(databaseCore.database, databaseCore.username, databaseCore.password, databaseCore);

fs
  .readdirSync(path.join(__dirname, 'core'))
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, 'core', file))(core, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.rawQuery = async (query, replacements, queryType = Sequelize.QueryTypes.SELECT) => {
  try {
    const results = await core.query(query, {
      replacements,
      type: queryType,
    });
    return results;
  } catch (error) {
    console.error('Error executing raw query:', error);
    throw error;
  }
};

db.core = core;
db.Sequelize = Sequelize;

module.exports = db;