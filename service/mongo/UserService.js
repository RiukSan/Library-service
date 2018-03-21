var userDao = require('../../dao/mongo/UserDao');
var user = require('../../model/mongo/User');
var mongoose = require('mongoose');

function createUser(name, surname, age, sex) {
    return new Promise(function (resolve, reject) {
        var tempUser = new user();
        tempUser._id = new mongoose.Types.ObjectId();
        tempUser.name.firstName = name;
        tempUser.name.surName = surname;
        age = Number(age);
        tempUser.age = age;
        tempUser.sex = sex;
        userDao.save(tempUser).then(() => {
            resolve(tempUser._id);
        });
    })
};

function deleteUser(id) {
    return new Promise(function (resolve, reject) {
        var tempUser = new user();
        tempUser._id = new mongoose.Types.ObjectId(id);
        userDao.remove(tempUser).then(() => {
            resolve();
        });
    })
};

function updateUser(id, newFirstName, newSurName, newAge, newSex) {
    return new Promise(function (resolve, reject) {
        findById(id).then((value) => {
            for(item in value){
                var tempUser = value[item];
                tempUser.name.firstName = newFirstName;
                tempUser.name.surName = newSurName;
                tempUser.age = newAge;
                tempUser.sex = newSex;
                userDao.save(tempUser).then(() => {
                    resolve();
                });
            }
        })
    })
}

function findById(index) {
    return new Promise(function (resolve, reject) {
        var tempUser = new user();
        tempUser._id = new mongoose.Types.ObjectId(index);
        userDao.find(tempUser).then((value) => {
            resolve(value);
        })
    })
}

function findAll() {
    return new Promise(function (resolve, reject) {
        userDao.findAll().then((value) => {
            var result = {};
            result.ALL = [];
            for (item in value) {
                try {
                    var curUser = value[item];
                    result.ALL.push(curUser);
                } catch (err) {
                    console.log('Error was throwed with data:' + curUser);
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
module.exports.findById = findById;