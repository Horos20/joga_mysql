const express = require('express')
const app = express()

const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// Database connection

var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "qwerty",
    database: "joga_mysql"
})

con.connect(function (err){
    if (err) throw err;
    console.log("Connected")
})

// App start

app.listen(3306, () => {
    console.log("App started http://localhost:3306")
})