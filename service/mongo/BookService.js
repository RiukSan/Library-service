var bookDao = require('../../dao/mongo/BookDao');
var dateFormat = require('dateformat');
var book = require('../../model/mongo/Book');
var mongoose = require('mongoose');

var notFound = {};
notFound.RESULT = [];
notFound.RESULT.push("NOTFOUND");

function find(title, author) {
    return new Promise(function (resolve, reject) {
        var result = {};
        result.FOUND = []; result.FOUNDMISSING = [];
        var tempBook = new book();
        tempBook.title = title;
        tempBook.author = author;
        bookDao.find(tempBook).then((value) => {
            for (item in value) {
                var curBook = value[item];
                if (checkBookAvailability(curBook)) {
                    result.FOUND.push(curBook);
                } else {
                    result.FOUNDMISSING.push(curBook);
                }
            }
            if (result.FOUND == 0 && result.FOUNDMISSING == 0) resolve(notFound);
            resolve(result);
        });
    });
}

function findById(index) {
    return new Promise(function (resolve, reject) {
        var result = {};
        result.FOUND = []; result.FOUNDMISSING = [];
        var tempBook = new book();
        tempBook._id = index;
        bookDao.find(tempBook).then((value) => {
            for (item in value) {
                var curBook = value[item];
                if (checkBookAvailability(curBook)) {
                    result.FOUND.push(curBook);
                } else {
                    result.FOUNDMISSING.push(curBook);
                }
            }
            if (result.FOUND == 0 && result.FOUNDMISSING == 0) resolve(notFound);
            resolve(result);
        });
    })
}

function order(index, abonent) {
    return new Promise(function (resolve, reject) {
        findById(index).then(function (value) {
            var result = {};
            result.OK = []; result.RESERVED = [];
            var now = new Date();
            for (item in value) {
                try {
                    var data = value[item].data;
                    var root = value[item].root;
                    var fileName = value[item].fileName;
                    var tempArr = [];
                    var curBook = null;
                    tempArr = tempArr.concat(value[item]);
                    for (item in tempArr) {
                        var curBook = tempArr[item];
                        if (index != '' && curBook._id == index) {
                            if (checkBookAvailability(curBook)) {
                                curBook.issuedTo = new mongoose.mongo.ObjectId(abonent);
                                curBook.issued = now;
                                bookDao.save(curBook)
                                result.OK.push(curBook);
                            } else {
                                result.RESERVED.push(curBook);
                            }
                        }
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + index);
                    continue;
                }
            }
            if (result.OK == 0 && result.RESERVED == 0) resolve(notFound);
            resolve(result);
        });
    })
}

function returnBook(index) {
    return new Promise(function (resolve, reject) {
        findById(index).then(function (value) {
            var result = {};
            result.OK = []; result.ALREADYRETURNED = [];
            for (item in value) {
                try {
                    var data = value[item].data;
                    var root = value[item].root;
                    var fileName = value[item].fileName;
                    var tempArr = [];
                    var curBook = null;
                    tempArr = tempArr.concat(value[item]);
                    for (item in tempArr) {
                        var curBook = tempArr[item];
                        if (index != '' && curBook._id == index) {
                            if (!checkBookAvailability(curBook)) {
                                curBook.issuedTo = undefined;
                                curBook.issued = undefined;
                                bookDao.save(curBook)
                                result.OK.push(curBook);
                            } else {
                                result.ALREADYRETURNED.push(curBook);
                            }
                        }
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + index);
                    continue;
                }
            }
            if (result.OK == 0 && result.ALREADYRETURNED == 0) resolve(notFound);
            resolve(result);
        });
    })
}

function createBook(title, author, libName) {
    return new Promise(function (resolve, reject) {
        var tempBook = new book({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            author: author
        });
        bookDao.save(tempBook).then((value) => {
            resolve(value);
        });
    })
};

function checkBookAvailability(book) {
    if (book.issued != '' && book.issued != undefined) {
        return false;
    } else { return true; }
}

module.exports.find = find;
module.exports.findById = findById;
module.exports.order = order;
module.exports.returnBook = returnBook;
module.exports.createBook = createBook;