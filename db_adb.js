const arangojs = require("arangojs");
var dbConfig = {
    'url': 'http://127.0.0.1:8529', // The default URL for a local server
    'database': 'dbms', // The database name

    // Database user credentials to use
    'username': 'root',
    'password': ''
};
var db = new arangojs.Database({url: dbConfig.url});
db.useBasicAuth(dbConfig.username, dbConfig.password);
db.useDatabase(dbConfig.database);
module.exports = db;