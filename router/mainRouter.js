var bookController = require('../controllers/BookController');
var libraryController = require('../controllers/LibraryController');

function handle(app) {
    app.get('/find', function (req, res) {
        bookController.find(req, res);
    });

    app.get('/order', function (req, res) {
        bookController.order(req, res);
    });

    app.get('/return', function (req, res) {
        bookController.returnBook(req, res);
    });

    app.get('/create', function (req, res) {
        bookController.create(req, res);
    });

    app.get('/lib/createLibrary', function (req, res) {
        libraryController.create(req, res);
    });

    app.get('/lib/delete', function (req, res) {
        libraryController.deleteLibrary(req, res);
    });

    app.get('/lib/update', function (req, res) {
        libraryController.updateLibrary(req, res);
    });

    app.get('/lib', function (req, res) {
        libraryController.start(req, res);
    });

    app.get('/', function (req, res) {
        bookController.start(req, res);
    });

    app.use(function (req, res, next) {
        bookController.error(req, res);
    });
}

module.exports.handle = handle;