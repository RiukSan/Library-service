var libraryService = require('../service/LibraryService');

function create(req, res) {
    var title = req.query.libTitle;
    var type = req.query.libType;
    var address = req.query.libAddress;
    libraryService.createLibrary(title, type, address);
    libraryService.findAll().then((value) => {
        res.render('library-index', { found: value });
        res.end();
    });
};

function updateLibrary(req, res) {
    var title = req.query.libTitle;
    var type = req.query.libType;
    var address = req.query.libAddress;
    var newTitle = req.query.newLibTitle;
    var newType = req.query.newLibType;
    var newAddress = req.query.newLibAddress;
    libraryService.updateLibrary(title, type, address, newTitle, newType, newAddress);
    libraryService.findAll().then((value) => {
        res.render('library-index', { found: value });
        res.end();
    });
}

function deleteLibrary(req, res) {
    var title = req.query.libTitle;
    var type = req.query.libType;
    var address = req.query.libAddress;
    libraryService.deleteLibrary(title, type, address);
    libraryService.findAll().then((value) => {
        res.render('library-index', { found: value });
        res.end();
    });
};

function start(req, res) {
    libraryService.findAll().then((value) => {
        res.render('library-index', { found: value });
        res.end();
    });
};

module.exports.create = create;
module.exports.deleteLibrary = deleteLibrary;
module.exports.updateLibrary = updateLibrary;
module.exports.start = start;