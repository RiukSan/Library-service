var userService = require('../service/UserService');

function create(req, res) {
    var name = req.query.userName;
    var surname = req.query.userSurname;
    var age = req.query.userAge;
    var sex = req.query.userSex;
    userService.createUser(name, surname, age,sex);
    userService.findAll().then((value) => {
        res.render('user-index', { found: value });
        res.end();
    });
};

function updateUser(req, res) {
    var name = req.query.userName;
    var surname = req.query.userSurname;
    var age = req.query.userAge;
    var sex = req.query.userSex;
    var newName = req.query.newUserName;
    var newSurname = req.query.newUserSurname;
    var newAge = req.query.newUserAge;
    var newSex = req.query.newUserSex;
    userService.updateUser(name, surname, age, sex, newName, newSurname, newAge, newSex);
    userService.findAll().then((value) => {
        res.render('user-index', { found: value });
        res.end();
    });
}

function deleteUser(req, res) {
    var name = req.query.userName;
    var surname = req.query.userSurname;
    var age = req.query.userAge;
    var sex = req.query.userSex;
    userService.deleteUser(name, surname, age, sex);
    userService.findAll().then((value) => {
        res.render('user-index', { found: value });
        res.end();
    });
};

function start(req, res) {
    userService.findAll().then((value) => {
        res.render('user-index', { found: value });
        res.end();
    });
};

module.exports.create = create;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.start = start;