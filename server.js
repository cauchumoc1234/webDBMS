const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
app.set('view engine', 'pug');
app.set('views','./views');
var connection = require("./db_sql");
connection.connect();

var connection_adb = require("./db_adb");
var Customer = connection_adb.collection("customers");
app.use([
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    })
])
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.render("home");
})
app.post("/search",(req,res)=>{
    var query = "SELECT * FROM customers   JOIN (SELECT cities.* FROM cities JOIN (SELECT states.* FROM states JOIN (SELECT * FROM countries WHERE countries.name LIKE ?) ct ON 		states.country_id = ct.id WHERE states.name LIKE ?) s ON s.id = cities.state_id WHERE cities.cityName LIKE ?) c ON customers.cityID = c.id WHERE CONCAT(firstName , ' ' , lastName) LIKE ?  ";
    var cusname = "%" + (req.body.cusname ? req.body.cusname : "") + "%";
    var city = "%" + (req.body.city ? req.body.city : "") + "%";
    var state = "%" + (req.body.state ? req.body.state : "") + "%";
    var country = "%" + (req.body.country ? req.body.country : "") + "%";
    if(!req.body.limit){
        query += " LIMIT 10";
    }
    else{
        query += " LIMIT " + req.body.limit
    }
    connection.query(query,[country,state,city,cusname],(error,results)=>{
        if (error) throw error;
        res.send(results);
    })
})
