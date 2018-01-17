var bookService = require('../service/BookService');

var self = this;

function find(req, res) {
    bookService.find(req.query.bookTitle, req.query.bookAuthor).then((value) => {
        var values = value;
        res.render('findResult', { found: values });
        res.end();
    })
};

function order(req, res) {
    bookService.order(req.query.bookIndex, req.query.abonent).then((value) => {
        var values = value;
        res.render('findResult', { found: values });
        res.end();
    })
};

function returnBook(req, res) {
    bookService.returnBook(req.query.bookIndex).then((value) => {
        var values = value;
        res.render('findResult', { found: values });
        res.end();
    })
};

function start(req, res) {
    res.render('index');
    res.end();
};

function create(req, res) {
    var title = req.query.bookTitle;
    var author = req.query.bookAuthor;
    var libName = req.query.libName;
    bookService.createBook(title, author, libName);
    res.render('index');
    res.end();
}

function error(req, res) {
    res.status(404).end('404:Not found');
};

module.exports.find = find;
module.exports.start = start;
module.exports.error = error;
module.exports.order = order;
module.exports.create = create;
module.exports.returnBook = returnBook;