var library = require('../model/Library');

function convertDataToLibrary(data) {
    try {
        var result = [];
        var libsData = data.split('\n');
        for (item in libsData) {
            var splitedData = libsData[item].split(',');
            if (splitedData[0] != "") {
                var title = splitedData[0];
                var type = splitedData[1];
                var address = splitedData[2];
                result.push(new library(title, type, address));
            }
        }
        return result;
    } catch (err) {
        throw err;
    }
}

function convertLibraryToData(libraryToConvert) {
    try {
        var title = libraryToConvert.title;
        var type = libraryToConvert.type;
        var address = libraryToConvert.address;
        var result = title + ',' + type + ',' + address + '\n';
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports.convertLibraryToData = convertLibraryToData;
module.exports.convertDataToLibrary = convertDataToLibrary;