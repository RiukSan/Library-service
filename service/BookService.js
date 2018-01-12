var bookDao = require(projectPath+'/dao/BookDao');
var dateFormat = require('dateformat');

function find(title, author) {
    return new Promise(function (resolve, reject) {
        bookDao.find(title, author).then(function (value) {
            var result = '';
            if (value == 0) resolve('NOTFOUND');
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var index = tempBook.getIndex();
                var libTitle = tempBook.libPath.split('/')[2];
                var issued = tempBook.issued;
                if (checkBookAvailability(tempBook)) {
                    result += '{FOUND: {id:' + index + ',lib:' + libTitle + '}}';
                } else {
                    result += '{FOUNDMISSING: {id:' + index + ',lib:' + libTitle + ',issued:' + issued + '}}';
                }
                if (i != value.length - 1) {
                    result += '\n';
                }
            }
            resolve(result);
        });
    })
}

function findById(index) {
    return new Promise(function (resolve, reject) {
        bookDao.findById(index).then(function (value) {
            var result = '';
            if (value == 0) resolve('NOTFOUND');
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var index = tempBook.getIndex();
                var libTitle = tempBook.libPath.split('/')[2];
                var issued = tempBook.issued;
                if (checkBookAvailability(tempBook)) {
                    result += '{FOUND: {id:' + index + ',lib:' + libTitle + '}}';
                } else {
                    result += '{FOUNDMISSING: {id:' + index + ',lib:' + libTitle + ',issued:' + issued + '}}';
                }
                if (i != value.length - 1) {
                    result += '\n';
                }
            }
            resolve(result);
        });
    })
}

function order(index, abonent) {
    return new Promise(function (resolve, reject) {
        bookDao.findById(index).then(function (value) {
            var result = '';
            var now = dateFormat(new Date(), 'yyyy.mm.dd');
            if (value == 0) resolve('NOTFOUND');
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var issued = tempBook.issued;
                var issuedTo = tempBook.issuedTo;
                if (checkBookAvailability(tempBook)) {
                    tempBook.issuedTo = abonent;
                    tempBook.issued = now;
                    bookDao.update(tempBook)
                    result += '{OK: {abonent:' + abonent + ',date:' + now + '}}';
                } else {
                    result += '{RESERVED: {abonent:' + issuedTo + ',date:' + issued + '}}';
                }
                if (i != value.length - 1) {
                    result += '\n';
                }
            }
            resolve(result);
        });
    })
}

function returnBook(index) {
    return new Promise(function (resolve, reject) {
        bookDao.findById(index).then(function (value) {
            var result = '';
            var now = dateFormat(new Date(), 'yyyy.mm.dd');
            if (value == 0) resolve('NOTFOUND');
            for (i = 0; i < value.length; i++) {
                var tempBook = value[i];
                var issuedTo = tempBook.issuedTo;
                if (!checkBookAvailability(tempBook)) {
                    tempBook.issued = '';
                    tempBook.issuedTo = '';
                    bookDao.update(tempBook)
                    result += '{OK: {abonent:' + issuedTo + '}}';
                } else {
                    result += 'ALREADYRETURNED';
                }
                if (i != value.length - 1) {
                    result += '\n';
                }
            }
            resolve(result);
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