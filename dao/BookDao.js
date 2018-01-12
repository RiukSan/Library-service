var book = require(projectPath+'/model/Book');
var fs = require('fs');
var walk = require('walk');
var csvBookUtil = require(projectPath+'/utils/csvBookUtil');
var textBookUtil = require(projectPath+'/utils/textBookUtil');

function find(title, author) {
    return new Promise(function (resolve, reject) {
        var result = [];
        walker = walk.walk(LIBRARY_FOLDER);
        walker.on('file', function (root, fileStats, next) {
            fs.readFile(root + '/' + fileStats.name, 'utf8', (err, data) => {
                try {
                    var curBook = null;
                    if (root.indexOf('CSV_') != -1) {
                        curBook = csvBookUtil.convertDataToBook(data);
                    } else if (root.indexOf('TEXT_') != -1) {
                        curBook = textBookUtil.convertDataToBook(data);
                    }
                    curBook.libPath = root;
                    curBook.fileName = fileStats.name;
                    if ((author != '' || title != '') && curBook.title.indexOf(title) != -1 && curBook.author.indexOf(author) != -1) {
                        result.push(curBook);
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + data);
                } finally {
                    next();
                }
            });
        });
        walker.on('end', function () {
            resolve(result);
        })
    })
};

function findById(index) {
    return new Promise(function (resolve, reject) {
        var result = [];
        walker = walk.walk(LIBRARY_FOLDER);
        walker.on('file', function (root, fileStats, next) {
            fs.readFile(root + '/' + fileStats.name, 'utf8', (err, data) => {
                try {
                    var curBook = null;
                    if (root.indexOf('CSV_') != -1) {
                        curBook = csvBookUtil.convertDataToBook(data);
                    } else if (root.indexOf('TEXT_') != -1) {
                        curBook = textBookUtil.convertDataToBook(data);
                    }
                    curBook.libPath = root;
                    curBook.fileName = fileStats.name;
                    if (index != '' && curBook.getIndex() == index) {
                        result.push(curBook);
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + data);
                } finally {
                    next();
                }
            });
        });
        walker.on('end', function () {
            resolve(result);
        })
    })
};

function update(bookToUpdate) {
    return new Promise(function (resolve, reject) {
        var fullBookPath = bookToUpdate.libPath + '/' + bookToUpdate.fileName;
        var data = '';
        if (bookToUpdate.libPath.indexOf('CSV_') != -1) {
            data = csvBookUtil.convertBookToData(bookToUpdate);
        } else if (bookToUpdate.libPath.indexOf('TEXT_') != -1) {
            data = textBookUtil.convertBookToData(bookToUpdate);
        }
        fs.writeFile(fullBookPath, data, 'utf8', (err) => {
            if (err) throw err;
            console.log(fullBookPath+' was saved.');
        });
        resolve();
    })
};

module.exports.findById = findById;
module.exports.find = find;
module.exports.update = update;