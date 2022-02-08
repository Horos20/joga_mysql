const express = require('express')
const app = express()

const path = require('path')

const hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// Database connection

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to joga_mysql");
});

app.listen(3000, () => {
    console.log("App started http:/localhost:3000")
});