var bookDao = require(projectPath + '/dao/BookDao');
var dateFormat = require('dateformat');

var notFound = {};
notFound.RESULT = [];
notFound.RESULT.push("NOTFOUND");

function find(title, author) {
    return new Promise(function (resolve, reject) {
        bookDao.find(title, author).then(function (value) {
            var result = {};
            if (value == 0) resolve(JSON.parse(JSON.stringify(notFound)));
            result.FOUND = []; result.FOUNDMISSING = [];
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var index = tempBook.getIndex();
                var libTitle = tempBook.libPath.split('/')[2];
                var issued = tempBook.issued;
                if (checkBookAvailability(tempBook)) {
                    result.FOUND.push(tempBook);
                } else {
                    result.FOUNDMISSING.push(tempBook);
                }
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    })
}

function findById(index) {
    return new Promise(function (resolve, reject) {
        bookDao.findById(index).then(function (value) {
            var result = {};
            if (value == 0) resolve(JSON.parse(JSON.stringify(notFound)));
            result.FOUND = []; result.FOUNDMISSING = [];
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var index = tempBook.getIndex();
                var libTitle = tempBook.libPath.split('/')[2];
                var issued = tempBook.issued;
                if (checkBookAvailability(tempBook)) {
                    result.FOUND.push(tempBook);
                } else {
                    result.FOUNDMISSING.push(tempBook);
                }
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    })
}

function order(index, abonent) {
    return new Promise(function (resolve, reject) {
        bookDao.findById(index).then(function (value) {
            var result = {};
            var now = dateFormat(new Date(), 'yyyy.mm.dd');
            if (value == 0) resolve(JSON.parse(JSON.stringify(notFound)));
            result.OK = []; result.RESERVED = [];
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var issued = tempBook.issued;
                var issuedTo = tempBook.issuedTo;
                if (checkBookAvailability(tempBook)) {
                    tempBook.issuedTo = abonent;
                    tempBook.issued = now;
                    bookDao.update(tempBook)
                    result.OK.push(tempBook);
                } else {
                    result.RESERVED.push(tempBook);
                }
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    })
}

function returnBook(index) {
    return new Promise(function (resolve, reject) {
        bookDao.findById(index).then(function (value) {
            var result = {};
            var now = dateFormat(new Date(), 'yyyy.mm.dd');
            if (value == 0) resolve(JSON.parse(JSON.stringify(notFound)));
            result.OK = []; result.ALREADYRETURNED = [];
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var issuedTo = tempBook.issuedTo;
                if (!checkBookAvailability(tempBook)) {
                    tempBook.issued = '';
                    tempBook.issuedTo = '';
                    bookDao.update(tempBook)
                    result.OK.push(tempBook);
                } else {
                    result.ALREADYRETURNED.push(tempBook);
                }
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    })
}

function checkBookAvailability(book) {
    if (book.issued != '') {
        return false;
    } else { return true; }
}

module.exports.find = find;
module.exports.findById = findById;
module.exports.order = order;
module.exports.returnBook = returnBook;