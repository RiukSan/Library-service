var library = require('../model/Library');
var csvLibraryUtil = require('../utils/csvLibraryUtil');
var fs = require('fs');
var walk = require('walk');
var path = require('path');
var rimraf = require('rimraf');

function create(library) {
    return new Promise(function (resolve, reject) {
        var libPath = LIBRARY_FOLDER + "/CSV_" + library.title;
        if (ensureDirectoryExistence(libPath)) {
            resolve(false);
        } else {
            var title = library.title;
            var address = library.address;
            var type = library.type;
            fs.mkdirSync(libPath);
            var libObjectPath = LIB + "/" + title + ".csv";
            var data = csvLibraryUtil.convertLibraryToData(library);
            fs.writeFile(libObjectPath, data, 'utf8', (err) => {
                if (err) throw err;
                console.log(libObjectPath + ' was saved.');
            });
            resolve(true);
        }
    })
};

function update(oldLib, newLib) {
    return new Promise(function (resolve, reject) {
        var oldTitle = oldLib.title;
        var newTitle = newLib.title;
        var libFolderPath = LIBRARY_FOLDER + "/CSV_" + oldTitle;
        var newLibFolderPath = LIBRARY_FOLDER + "/CSV_" + newTitle;
        if (ensureDirectoryExistence(libFolderPath)) {
            fs.renameSync(libFolderPath, newLibFolderPath, (err) => {
                if (err) throw err;
                console.log('Folder rename completed');
            });
            var libPath = LIB + "/" + oldTitle + ".csv";
            var newLibPath = LIB + "/" + newTitle + ".csv";
            fs.renameSync(libPath, newLibPath, (err) => {
                if (err) throw err;
                console.log('Lib rename completed');
            });
            var data = csvLibraryUtil.convertLibraryToData(newLib);
            fs.writeFile(newLibPath, data, 'utf8', (err) => {
                if (err) throw err;
                console.log(newLibPath + ' was saved.');
            });
            resolve(true);
        } else {
            resolve(false);
        }
    })
};

function remove(library) {
    return new Promise(function (resolve, reject) {
        var libPath = LIBRARY_FOLDER + "/CSV_" + library.title;
        if (ensureDirectoryExistence(libPath)) {
            rimraf(libPath, function () { console.log('successfully deleted ' + libPath); });
            var title = library.title;
            var libObjectPath = LIB + "/" + title + ".csv";
            fs.unlink(libObjectPath, (err) => {
                if (err) throw err;
                console.log('successfully deleted ' + libObjectPath);
            });
            resolve(true);
        } else {
            resolve(false);
        }
    })
};

function findAll() {
    return new Promise(function (resolve, reject) {
        var result = [];
        walker = walk.walk(LIB);
        walker.on('file', function (root, fileStats, next) {
            fs.readFile(root + '/' + fileStats.name, 'utf8', (err, data) => {
                var dataObject = {};
                dataObject.data = data;
                result.push(dataObject);
                next();
            });
        });
        walker.on('end', function () {
            resolve(result);
        })
    })
}

function ensureDirectoryExistence(filePath) {
    if (fs.existsSync(filePath)) {
        return true;
    } else {
        return false;
    }
}

module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
module.exports.findAll = findAll;