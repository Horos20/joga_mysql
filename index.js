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

const articleRoutes = require('./routes/article');

app.use('/', articleRoutes);
app.use('/article', articleRoutes);

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
