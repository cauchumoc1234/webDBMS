// var mysql = require('mysql');
// const { connect } = require('http2');
// var con;
// con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "dbms_pr",
//   charset:'utf8_general_ci'
// });
// con.timeout = 0;
// module.exports = con;
const mysql = require('mysql')
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbms_pr',
    charset:'utf8_general_ci'
  })
module.exports = connection;