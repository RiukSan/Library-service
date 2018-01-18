var user = require('../model/User');
var csvUserUtil = require('../utils/csvUserUtil');
var fs = require('fs');
var walk = require('walk');
var path = require('path');
var rimraf = require('rimraf');

function create(user) {
    return new Promise(function (resolve, reject) {
        var name = user.name;
        var userObjectPath = USER_FOLDER + "/" + name + ".csv";
        var data = csvUserUtil.convertUserToData(user);
        fs.writeFile(userObjectPath, data, 'utf8', (err) => {
            if (err) throw err;
            console.log(userObjectPath + ' was saved.');
        });
        resolve(true);
    })
};

function update(oldUser, newUser) {
    return new Promise(function (resolve, reject) {
        var oldTitle = oldUser.name;
        var newTitle = newUser.name;
        var userPath = USER_FOLDER + "/" + oldTitle + ".csv";
        var newuserPath = USER_FOLDER + "/" + newTitle + ".csv";
        var data = csvUserUtil.convertUserToData(newUser);
        fs.renameSync(userPath, newuserPath, (err) => {
            if (err) throw err;
            console.log('User rename completed');
        });
        fs.writeFile(newuserPath, data, 'utf8', (err) => {
            if (err) throw err;
            console.log(newuserPath + ' was saved.');
        });
        resolve(true);
    })
};

function remove(user) {
    return new Promise(function (resolve, reject) {
        var name = user.name;
        var userObjectPath = USER_FOLDER + "/" + name + ".csv";
        fs.unlink(userObjectPath, (err) => {
            if (err) throw err;
            console.log('successfully deleted ' + userObjectPath);
        });
        resolve(true);
    })
};

function findAll() {
    return new Promise(function (resolve, reject) {
        var result = [];
        walker = walk.walk(USER_FOLDER);
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

module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
module.exports.findAll = findAll;