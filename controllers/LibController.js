var bookService = require(projectPath + '/service/BookService');

function handle(app) {
    app.get('/find', function (req, res) {
        bookService.find(req.query.bookTitle, req.query.bookAuthor).then((value) => {
            var values = value;
            res.render('findResult', { found: values });
            res.end();
        })
    });

    app.get('/order', function (req, res) {
        bookService.order(req.query.bookIndex, req.query.abonent).then((value) => {
            var values = value;
            res.render('findResult', { found: values });
            res.end();
        })
    });

    app.get('/return', function (req, res) {
        bookService.returnBook(req.query.bookIndex).then((value) => {
            var values = value;
            res.render('findResult', { found: values });
            res.end();
        })
    });

    app.get('/', function (req, res) {
        res.render('index');
        res.end();
    });

    app.use(function (req, res, next) {
        res.status(404).end('404:Not found');
    });
}

module.exports.handle = handle;