var user = require('../../model/mongo/User');

function save(userToSave) {
    return new Promise(function (resolve, reject) {
        userToSave.save(function (err) {
            if (err) throw err;
            resolve(userToSave._id);
        });
    })
};

function remove(user) {
    return new Promise(function (resolve, reject) {
        user.remove(function (err) {
            if (err) throw err;
            resolve(user);
        });
    })
};

function findAll() {
    return new Promise(function (resolve, reject) {
        user.find({}).exec((err, users) => {
            if (err) throw err;
            resolve(users);
        });
    })
}

function find(userToFind) {
    return new Promise(function (resolve, reject) {
        var query = {};
        var name = {};
        var useName = false;
        if (userToFind.name.firstName != undefined && userToFind.firstName != "") {
            name["firstName"] = userToFind.firstName;
            useName = true;
        }
        if (userToFind.name.surName != undefined && userToFind.surName != "") {
            name["surName"] = userToFind.surName;
            useName = true;
        }
        if(useName){
            query["name"] = name;
        }
        if (userToFind.age != undefined && userToFind.age != "") {
            query["age"] = userToFind.age;
        }
        if (userToFind._id != undefined && userToFind._id != "") {
            query["_id"] = userToFind._id;
        }
        if (userToFind.sex != undefined && userToFind.sex != "") {
            query["sex"] = userToFind.sex;
        }
        user.find(query).exec((err, users) => {
            if (err) throw err;
            resolve(users);
        });
    })
};

module.exports.save = save;
module.exports.remove = remove;
module.exports.findAll = findAll;
module.exports.find = find;