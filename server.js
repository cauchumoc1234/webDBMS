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
    var query = "SELECT * FROM customers";
    if(req.body.cusname){
        query += " WHERE firstName LIKE '%" + req.body.cusname +"%' ";
    }
    if(req.body.city){
        var city = "(SELECT * FROM `cities` WHERE `cityName` = '%"+ req.body.city + "%') "
        query += " JOIN "+city +" c ON c.id = customers.cityID "
    }
    if(req.body.state){
        var state = "(SELECT * FROM `states` WHERE `name` = '%"+ req.body.state + "%') "
        query += " JOIN "+ state +" s ON c.id = customers.cityID "
    }
    if(query.search("LIMIT") < 0){
        query += " LIMIT 10";
    }
    else{
        query += " LIMIT "+ req.body.limit;
    }
    connection.query(query,(error,results)=>{
        if (error) throw error;
        res.send(results);
    })
    // res.send(query)
})
