const express = require("express"); // Web Framework
const app = express();
const sql = require("mssql"); // MS Sql Server client
const cors = require("cors");
const constants = require("./Utils/constants");
const chalk = require("chalk");

const sqlConfig = {
  user: constants.databaseConfig.databaseUser,
  password: constants.databaseConfig.databasePassword,
  server: constants.databaseConfig.databaseHost,
  port: constants.databaseConfig.databasePort,
  db: constants.databaseConfig.databaseName
};

// Start server and listen on http://localhost:8081/
const server = app.listen(8081, function() {
  const port = server.address().port;

  console.log(
    chalk.bgBlack(chalk.white("API listening at http://localhost:" + port))
  );
  console.log(chalk.bgGreen(chalk.cyanBright("API startup successuful")));
});

app.get("/time-zones", cors(constants.corsOptions), function(req, res) {
  sql.connect(sqlConfig, function(err) {
    if (err) throw err;
    var request = new sql.Request();
    request.query("select * from TimeZones", function(err, recordset) {
      if (err) console.log(err);
      res.end(JSON.stringify(recordset));
    });
  });
});
