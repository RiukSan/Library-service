var bookDao = require('../dao/BookDao');
var dateFormat = require('dateformat');
var csvBookUtil = require('../utils/csvBookUtil');
var textBookUtil = require('../utils/textBookUtil');
var book = require('../model/Book');

var notFound = {};
notFound.RESULT = [];
notFound.RESULT.push("NOTFOUND");

function find(title, author) {
    return new Promise(function (resolve, reject) {
        bookDao.findAll().then(function (value) {
            var result = {};
            result.FOUND = []; result.FOUNDMISSING = [];
            for (item in value) {
                try {
                    var data = value[item].data;
                    var root = value[item].root;
                    var fileName = value[item].fileName;
                    var tempArr = [];
                    var curBook = null;
                    if (root.indexOf('CSV_') != -1) {
                        tempArr = tempArr.concat(csvBookUtil.convertDataToBook(data));
                    } else if (root.indexOf('TEXT_') != -1) {
                        tempArr.push(textBookUtil.convertDataToBook(data));
                    }
                    for (item in tempArr) {
                        var curBook = tempArr[item];
                        curBook.libPath = root;
                        curBook.fileName = fileName;
                        if ((author != '' || title != '') && curBook.title.indexOf(title) != -1 && curBook.author.indexOf(author) != -1) {
                            if (checkBookAvailability(curBook)) {
                                result.FOUND.push(curBook);
                            } else {
                                result.FOUNDMISSING.push(curBook);
                            }
                        }
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + data);
                    continue;
                }
            }
            if (result.FOUND == 0 && result.FOUNDMISSING == 0) resolve(notFound);
            resolve(result);
        });
    })
}

function findById(index) {
    return new Promise(function (resolve, reject) {
        bookDao.findAll().then(function (value) {
            var result = {};
            result.FOUND = []; result.FOUNDMISSING = [];
            for (item in value) {
                try {
                    var data = value[item].data;
                    var root = value[item].root;
                    var fileName = value[item].fileName;
                    var tempArr = [];
                    var curBook = null;
                    if (root.indexOf('CSV_') != -1) {
                        tempArr = tempArr.concat(csvBookUtil.convertDataToBook(data));
                    } else if (root.indexOf('TEXT_') != -1) {
                        tempArr.push(textBookUtil.convertDataToBook(data));
                    }
                    for (item in tempArr) {
                        var curBook = tempArr[item];
                        curBook.libPath = root;
                        curBook.fileName = fileName;
                        if (index != '' && curBook.getIndex() == index) {
                            if (checkBookAvailability(curBook)) {
                                result.FOUND.push(curBook);
                            } else {
                                result.FOUNDMISSING.push(curBook);
                            }
                        }
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + data);
                    continue;
                }
            }
            if (result.FOUND == 0 && result.FOUNDMISSING == 0) resolve(notFound);
            resolve(result);
        });
    })
}

function order(index, abonent) {
    return new Promise(function (resolve, reject) {
        bookDao.findAll().then(function (value) {
            var result = {};
            result.OK = []; result.RESERVED = [];
            var now = dateFormat(new Date(), 'yyyy.mm.dd');
            for (item in value) {
                try {
                    var data = value[item].data;
                    var root = value[item].root;
                    var fileName = value[item].fileName;
                    var tempArr = [];
                    var curBook = null;
                    if (root.indexOf('CSV_') != -1) {
                        tempArr = tempArr.concat(csvBookUtil.convertDataToBook(data));
                    } else if (root.indexOf('TEXT_') != -1) {
                        tempArr.push(textBookUtil.convertDataToBook(data));
                    }
                    for (item in tempArr) {
                        var curBook = tempArr[item];
                        curBook.libPath = root;
                        curBook.fileName = fileName;
                        if (index != '' && curBook.getIndex() == index) {
                            if (checkBookAvailability(curBook)) {
                                curBook.issuedTo = abonent;
                                curBook.issued = now;
                                bookDao.update(curBook)
                                result.OK.push(curBook);
                            } else {
                                result.RESERVED.push(curBook);
                            }
                        }
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + data);
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
        bookDao.findAll().then(function (value) {
            var result = {};
            result.OK = []; result.ALREADYRETURNED = [];
            for (item in value) {
                try {
                    var data = value[item].data;
                    var root = value[item].root;
                    var fileName = value[item].fileName;
                    var tempArr = [];
                    var curBook = null;
                    if (root.indexOf('CSV_') != -1) {
                        tempArr = tempArr.concat(csvBookUtil.convertDataToBook(data));
                    } else if (root.indexOf('TEXT_') != -1) {
                        tempArr.push(textBookUtil.convertDataToBook(data));
                    }
                    for (item in tempArr) {
                        var curBook = tempArr[item];
                        curBook.libPath = root;
                        curBook.fileName = fileName;
                        if (index != '' && curBook.getIndex() == index) {
                            if (!checkBookAvailability(curBook)) {
                                curBook.issued = '';
                                curBook.issuedTo = '';
                                bookDao.update(curBook)
                                result.OK.push(curBook);
                            } else {
                                result.ALREADYRETURNED.push(curBook);
                            }
                        }
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + data);
                    continue;
                }
            }
            if (result.OK == 0 && result.ALREADYRETURNED == 0) resolve(notFound);
            resolve(result);
        });
    })
}

function createBook(title, author, libName) {
    var index = Math.round(Math.random() * 10000);
    var tempBook = new book(index, title, author);
    tempBook.fileName = title + ".csv";
    tempBook.libPath = LIBRARY_FOLDER + "/CSV_" + libName;
    bookDao.update(tempBook);
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
module.exports.createBook = createBook;