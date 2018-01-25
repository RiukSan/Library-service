var library = require('../../model/mongo/Library');
var mongoose = require('mongoose');

function save(libToSave) {
    return new Promise(function (resolve, reject) {
        libToSave.save(function (err) {
            if (err) throw err;
            resolve(libToSave._id);
        });
    })
};

function remove(lib) {
    return new Promise(function (resolve, reject) {
        lib.remove(function (err) {
            if (err) throw err;
            resolve(lib);
        });
    })
};

function find(libraryToFind) {
    return new Promise(function (resolve, reject) {
        var query = {};
        if (libraryToFind.address != undefined && libraryToFind.address != "") {
            query["address"] = libraryToFind.address;
        }
        if (libraryToFind._id != undefined && libraryToFind._id != "") {
            query["_id"] = libraryToFind._id;
        }
        if (libraryToFind.type != undefined && libraryToFind.type != "") {
            query["type"] = libraryToFind.type;
        }
        if (libraryToFind.title != undefined && libraryToFind.title != "") {
            query["title"] = libraryToFind.title;
        }
        if (libraryToFind.books != undefined && libraryToFind.books != "") {
            query["books"] = libraryToFind.books;
        }
        library.find(query).exec((err, libs) => {
            if (err) throw err;
            resolve(libs);
        });
    })
};

function findAll() {
    return new Promise(function (resolve, reject) {
        library.find({}).exec((err, libs) => {
            if (err) throw err;
            resolve(libs);
        });
    })
}

module.exports.save = save;
module.exports.remove = remove;
module.exports.find = find;
module.exports.findAll = findAll;