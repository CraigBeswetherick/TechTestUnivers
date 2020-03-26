const mysql = require("mssql");
const fs = require("fs");
const parser = require("xml2json");
const constants = require("./constants");
const chalk = require("chalk");
const sqlString = require("sqlstring");

let con;

const parseData = () => {
  fs.readFile("../../data/data.xml", function(err, data) {
    var json = parser.toJson(data);
    console.log(chalk.bgGreen("Loaded XML : " + json));
    connectToServer(json);
  });
};

const connectToServer = async data => {
  try {
    con = await mysql.connect(
      "mssql://" +
        constants.databaseConfig.databaseUser +
        ":" +
        constants.databaseConfig.databasePassword +
        "@" +
        constants.databaseConfig.databaseHost +
        ":" +
        constants.databaseConfig.databasePort
    );

    console.log(chalk.bgGreen("Connected to SQL server"));
    createDatabase(data);
  } catch (err) {
    console.log(chalk.bgRed(err));
  }
};

const createDatabase = async data => {
  console.log(chalk.bgGreen("creating database."));
  var sql = "DROP DATABASE " + constants.databaseConfig.databaseName;
  await con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(chalk.bgGreen("Deleted old DB"));
    con.query(
      "CREATE DATABASE " + constants.databaseConfig.databaseName,
      function(err, result) {
        if (err) throw err;
        console.log(chalk.bgGreen("Created DB"));
        createTimeZoneTables(data);
      }
    );
  });
};

const createTimeZoneTables = async data => {
  let sql = "DROP TABLE TimeZones";
  await con.query(sql, function(err, result) {
    console.log(chalk.bgGreen("Old TimeZones table deleted"));
    let sql =
      "CREATE TABLE TimeZones (name VARCHAR(255), Hours VARCHAR(255), Mins VARCHAR(255), Secs VARCHAR(255))";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(chalk.bgGreen("TimeZones Table created"));
      createUserTables(data);
    });
  });
};

const createUserTables = async data => {
  let sql = "DROP TABLE Users";
  await con.query(sql, function(err, result) {
    console.log(chalk.bgGreen("Old Users table deleted"));
    sql =
      "CREATE TABLE Users (name VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(chalk.bgGreen("Users Table created"));
      console.log(chalk.bgGreen("Database tables have been created."));
      createEntries(data);
    });
  });
};

const createEntries = data => {
  const parsedData = JSON.parse(data).TimeZones.TimeZone;

  parsedData.forEach(entry => {
    console.log(entry + " found ", entry.Name);
    var sql =
      "INSERT INTO TimeZones (Name, Hours, Mins, Secs) VALUES (" +
      sqlString.escape(entry.Name) +
      ", " +
      entry.Hours +
      ", " +
      entry.Mins +
      ", " +
      entry.Secs +
      ")";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(entry.Name + " record inserted");
    });
  }, this);
};

parseData();
