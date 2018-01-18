var libraryDao = require('../dao/LibraryDao');
var library = require('../model/Library');
var csvLibraryUtil = require('../utils/csvLibraryUtil');

function createLibrary(title, type, address) {
    var tempLib = new library(title, type, address);
    libraryDao.create(tempLib);
};

function deleteLibrary(title, type, address) {
    var tempLib = new library(title, type, address);
    libraryDao.remove(tempLib);
};

function updateLibrary(oldTitle, oldType, oldAddress, newTitle, newType, newAddress) {
    var oldLib = new library(oldTitle, oldType, oldAddress);
    var newLib = new library(newTitle, newType, newAddress);
    libraryDao.update(oldLib, newLib);
}

function findAll() {
    return new Promise(function (resolve, reject) {
        libraryDao.findAll().then((value) => {
            var result = {};
            result.ALL = [];
            for (item in value) {
                try {
                    var data = value[item].data;
                    var tempArr = csvLibraryUtil.convertDataToLibrary(data);
                    for (item in tempArr) {
                        var curLib = tempArr[item];
                        result.ALL.push(curLib);
                    }
                } catch (err) {
                    console.log('Error was throwed with data:' + data);
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