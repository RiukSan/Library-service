var book = require('../model/Book');

function convertDataToBook(data) {
    try {
        var result = [];
        var booksData = data.split('\n');
        for (item in booksData) {
            var splitedData = booksData[item].split(',');
            if (splitedData[0] != "") {
                var index = splitedData[0];
                var author = splitedData[1];
                var title = splitedData[2];
                var issued = splitedData[3];
                var issuedTo = splitedData[4];
                result.push(new book(index, author, title, issued, issuedTo));
            }
        }
        return result;
    } catch (err) {
        throw err;
    }
}

function convertBookToData(bookToConvert) {
    try {
        var index = bookToConvert.getIndex();
        var author = bookToConvert.author;
        var title = bookToConvert.title;
        var issued = bookToConvert.issued;
        var issuedTo = bookToConvert.issuedTo;
        var result = index + ',' + author + ',' + title + ',' + issued + ',' + issuedTo + '\n';
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports.convertDataToBook = convertDataToBook;
module.exports.convertBookToData = convertBookToData;