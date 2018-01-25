var libraryService = require('../../service/mongo/LibraryService');
var bookService = require('../../service/mongo/BookService');

function create(req, res) {
    var title = req.query.libTitle;
    var type = req.query.libType;
    var address = req.query.libAddress;
    libraryService.createLibrary(title, type, address).then(() => {
        libraryService.findAll().then((value) => {
            bookService.find().then((books) => {
                res.render('library-index', { found: value, db_type: "mongo", books: books });
                res.end();
            });
        })
    })
};

function assignBookToLibrary(req, res) {
    var libId = req.query.libId;
    var bookId = req.query.bookId;
    libraryService.assignBookToLibrary(libId, bookId).then(() => {
        libraryService.findAll().then((value) => {
            bookService.find().then((books) => {
                res.render('library-index', { found: value, db_type: "mongo", books: books });
                res.end();
            });
        });
    })
}

function updateLibrary(req, res) {
    var id = req.query.libId;
    var newTitle = req.query.newLibTitle;
    var newType = req.query.newLibType;
    var newAddress = req.query.newLibAddress;
    libraryService.updateLibrary(id, newTitle, newType, newAddress).then(() => {
        libraryService.findAll().then((value) => {
            bookService.find().then((books) => {
                res.render('library-index', { found: value, db_type: "mongo", books: books });
                res.end();
            });
        });
    })
}

function deleteLibrary(req, res) {
    var id = req.query.libraryId;
    libraryService.deleteLibrary(id).then(() => {
        libraryService.findAll().then((value) => {
            bookService.find().then((books) => {
                res.render('library-index', { found: value, db_type: "mongo", books: books });
                res.end();
            });
        });
    })
};

function start(req, res) {
    libraryService.findAll().then((value) => {
        bookService.find().then((books) => {
            res.render('library-index', { found: value, db_type: "mongo", books: books });
            res.end();
        });
    });
};

module.exports.create = create;
module.exports.deleteLibrary = deleteLibrary;
module.exports.updateLibrary = updateLibrary;
module.exports.start = start;
module.exports.assignBookToLibrary = assignBookToLibrary;