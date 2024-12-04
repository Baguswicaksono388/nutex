"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const config = require(__dirname + "/../config/config");
require("dotenv").config();

const db = {};

let core;
const databaseCore = config.core;

core = new Sequelize(
  databaseCore.database,
  databaseCore.username,
  databaseCore.password,
  {
    dialect: databaseCore.dialect,
  }
);

// Load models from the "core" directory
fs.readdirSync(path.join(__dirname, "core"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, "core", file))(core, DataTypes);
    db[model.name] = model;
  });

// Handle model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add helper for raw queries
db.rawQuery = async (
  query,
  replacements,
  queryType = Sequelize.QueryTypes.SELECT
) => {
  try {
    const results = await core.query(query, {
      replacements,
      type: queryType,
    });
    return results;
  } catch (error) {
    console.error("Error executing raw query:", error);
    throw error;
  }
};

// Expose Sequelize transaction and core
db.transaction = async (callback) => {
  try {
    return await core.transaction(callback);
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
};

db.core = core; // Sequelize instance
db.Sequelize = Sequelize; // Sequelize library

module.exports = db;
