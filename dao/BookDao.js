var book = require('../model/Book');
var fs = require('fs');
var walk = require('walk');
var path = require('path');
var csvBookUtil = require('../utils/csvBookUtil');
var textBookUtil = require('../utils/textBookUtil');

function findAll() {
    return new Promise(function (resolve, reject) {
        var result = [];
        walker = walk.walk(LIBRARY_FOLDER);
        walker.on('file', function (root, fileStats, next) {
            fs.readFile(root + '/' + fileStats.name, 'utf8', (err, data) => {
                var dataObject = {};
                dataObject.data = data;
                dataObject.root = root;
                dataObject.fileName = fileStats.name;
                result.push(dataObject);
                next();
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
        ensureDirectoryExistence(fullBookPath);
        fs.writeFile(fullBookPath, data, 'utf8', (err) => {
            if (err) throw err;
            console.log(fullBookPath + ' was saved.');
        });
        resolve();
    })
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

module.exports.findAll = findAll;
module.exports.update = update;