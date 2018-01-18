var userDao = require('../dao/UserDao');
var user = require('../model/User');
var csvUserUtil = require('../utils/csvUserUtil');

function createUser(name, surname, age, sex) {
    var tempUser = new user(name, surname, age, sex);
    userDao.create(tempUser);
};

function deleteUser(name, surname, age, sex) {
    var tempUser = new user(name, surname, age, sex);
    userDao.remove(tempUser);
};

function updateUser(oldName, oldSurname, oldAge, oldSex, newTitle, newType, newAddress, newSex) {
    var oldUser = new user(oldName, oldSurname, oldAge, oldSex);
    var newUser = new user(newTitle, newType, newAddress, newSex);
    userDao.update(oldUser, newUser);
}

function findAll() {
    return new Promise(function (resolve, reject) {
        userDao.findAll().then((value) => {
            var result = {};
            result.ALL = [];
            for (item in value) {
                try {
                    var data = value[item].data;
                    var tempArr = csvUserUtil.convertDataToUser(data);
                    for (item in tempArr) {
                        var curUser = tempArr[item];
                        result.ALL.push(curUser);
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

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.findAll = findAll;