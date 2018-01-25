var book = require('../../model/mongo/Book');
var fs = require('fs');
var walk = require('walk');
var path = require('path');
var csvBookUtil = require('../../utils/csvBookUtil');
var textBookUtil = require('../../utils/textBookUtil');
var mongoose = require('mongoose');

function findAll() {
    return new Promise(function (resolve, reject) {
        book.find({}).exec((err, books) => {
            if (err) throw err;
            resolve(books);
        });
    })
};

function find(bookToFind) {
    return new Promise(function (resolve, reject) {
        var query = {};
        if (bookToFind.title != undefined && bookToFind.title != "") {
            query["title"] = bookToFind.title;
        }
        if (bookToFind.author != undefined && bookToFind.author != "") {
            query["author"] = bookToFind.author;
        }
        if (bookToFind._id != undefined && bookToFind._id != "") {
            query["_id"] = bookToFind._id;
        }
        if (bookToFind.issued != undefined && bookToFind.issued != "") {
            query["issued"] = bookToFind.issued;
        }
        if (bookToFind.issuedTo != undefined && bookToFind.issuedTo != "") {
            query["issuedTo"] = bookToFind.issuedTo;
        }
        book.find(query).exec((err, books) => {
            if (err) throw err;
            resolve(books);
        });
    })
};

function save(bookToSave) {
    return new Promise(function (resolve, reject) {
        bookToSave.save(function (err) {
            if (err) throw err;
            resolve(bookToSave._id);
        });
    })
}

function update(bookToUpdate) {
    return new Promise(function (resolve, reject) {
        var query = {};
        var params = {};
        if (bookToUpdate._id != undefined && bookToUpdate._id != "") {
            query["_id"] = bookToUpdate._id;
        }
        if (bookToUpdate.title != undefined && bookToUpdate.title != "") {
            params["title"] = bookToUpdate.title;
        }
        if (bookToUpdate.author != undefined && bookToUpdate.author != "") {
            params["author"] = bookToUpdate.author;
        }
        if (bookToUpdate.issued != undefined && bookToUpdate.issued != "") {
            params["issued"] = bookToUpdate.issued;
        }
        if (bookToUpdate.issuedTo != undefined && bookToUpdate.issuedTo != "") {
            params["issuedTo"] = bookToUpdate.issuedTo;
        }
        bookToUpdate.update(query, params, (err) => {
            if (err) throw err;
            resolve(bookToUpdate._id);
        })
    })
};

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.save = save;
module.exports.update = update;