var libraryDao = require('../../dao/mongo/LibraryDao');
var library = require('../../model/mongo/Library');
var mongoose = require('mongoose');
var bookService = require('../../service/mongo/BookService')

function assignBookToLibrary(libId, bookId) {
    return new Promise(function (resolve, reject) {
        bookService.findById(bookId).then((book) => {
            findById(libId).then((libraries) => {
                for (item in libraries) {
                    var library = libraries[item];
                    library.books = library.books.concat(book.FOUND,book.FOUNDMISSING);
                    libraryDao.save(library).then(() => {
                        resolve();
                    });
                }
            })
        })
    })
}

function createLibrary(title, type, address) {
    return new Promise(function (resolve, reject) {
        var tempLib = new library();
        tempLib._id = new mongoose.Types.ObjectId();
        tempLib.title = title;
        tempLib.type = type;
        tempLib.address = address;
        libraryDao.save(tempLib).then(() => {
            resolve();
        });
    })
};

function deleteLibrary(id) {
    return new Promise(function (resolve, reject) {
        var tempLib = new library();
        tempLib._id = new mongoose.Types.ObjectId(id);
        libraryDao.remove(tempLib).then(() => {
            resolve();
        });
    })
};

function updateLibrary(id, newTitle, newType, newAddress) {
    return new Promise(function (resolve, reject) {
        findById(id).then((value) => {
            for (item in value) {
                var tempLib = value[item];
                tempLib.title = newTitle;
                tempLib.type = newType;
                tempLib.address = newAddress;
                libraryDao.save(tempLib).then(() => {
                    resolve();
                });
            }
        })
    })
}

function findById(index) {
    return new Promise(function (resolve, reject) {
        var tempLib = new library();
        tempLib._id = new mongoose.Types.ObjectId(index);
        libraryDao.find(tempLib).then((value) => {
            resolve(value);
        })
    })
}

function findAll() {
    return new Promise(function (resolve, reject) {
        libraryDao.findAll().then((value) => {
            var result = {};
            result.ALL = [];
            for (item in value) {
                try {
                    var curLib = value[item];
                    result.ALL.push(curLib);
                } catch (err) {
                    console.log('Error was throwed with data:' + curLib);
                    continue;
                }
            }
            resolve(result);
        })
    })
};

module.exports.createLibrary = createLibrary;
module.exports.updateLibrary = updateLibrary;
module.exports.deleteLibrary = deleteLibrary;
module.exports.findAll = findAll;
module.exports.assignBookToLibrary = assignBookToLibrary;