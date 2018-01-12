var book = require(projectPath+'/model/Book');

function convertDataToBook(data) {
    try {
        var splitedData = data.split('\n');
        var index = splitedData[0].substr(splitedData[0].indexOf('=') + 1);
        var author = splitedData[1].substr(splitedData[1].indexOf('=') + 1);
        var title = splitedData[2].substr(splitedData[2].indexOf('=') + 1);
        var issued = splitedData[3].substr(splitedData[3].indexOf('=') + 1);
        var issuedTo = splitedData[4].substr(splitedData[4].indexOf('=') + 1);
        var result = new book(index, author, title, issued, issuedTo);
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
        var result = 'Index=' + index + '\n'
            + 'Author=' + author + '\n'
            + 'Name=' + title + '\n'
            + 'Issued=' + issued + '\n'
            + 'Issuedto=' + issuedTo;
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports.convertDataToBook = convertDataToBook;
module.exports.convertBookToData = convertBookToData;