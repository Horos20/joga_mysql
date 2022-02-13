const express = require('express')
const app = express()

const path = require('path')

const hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.engine ('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

app.use(express.static('public'));

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

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
        articles: articles
        })
    })
})

app.get('/article/:slug', (req, res) => {
    let query = `SELECT * , article.name as article_name, author.name as author_name, author.id as author_id  FROM article inner join author on article.author_id=author.id WHERE slug="${req.params.slug}"`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        res.render('article', {
            article: article
        })
    });
});

app.get('/author/:author_id', (req, res) => {
    let query = `SELECT *, article.name AS article_name FROM article INNER JOIN author ON article.author_id = author.id WHERE author.id="${req.params.author_id}"`;
    let articles = []
    let author = `select name from author where author.id="${req.params.author_id}"`;
    let authors = []
    con.query(query, (err,result) => {
        if (err) throw err;
        articles = result
        con.query(author, (err, result) => {
            if (err) throw err;
            authors = result;
            res.render('author', {
                authors: authors,
                articles: articles
            })
        })
    })
});

app.listen(3001, () => {
    console.log("App started http://localhost:3001")
});
