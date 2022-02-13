const con = require('../utils/db');

const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
};

const getArticleBySlug = (req, res) => {
    let query = `SELECT * , article.name as article_name, author.name as author_name, author.id as author_id  FROM article inner join author on article.author_id=author.id WHERE slug="${req.params.slug}"`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        res.render('article', {
            article: article
        })
    });
};

module.exports = {
    getAllArticles,
    getArticleBySlug
};
