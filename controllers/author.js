const con = require('../utils/db');

const getAllAuthors = (req, res) => {
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
};

module.exports = {
    getAllAuthors
};
