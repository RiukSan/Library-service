var userService = require('../../service/mongo/UserService');

function create(req, res) {
    var name = req.query.userName;
    var surname = req.query.userSurname;
    var age = req.query.userAge;
    var sex = req.query.userSex;
    userService.createUser(name, surname, age, sex).then(() => {
        userService.findAll().then((value) => {
            res.render('user-index', { found: value, db_type: "mongo" });
            res.end();
        });
    });
};

function updateUser(req, res) {
    var id = req.query.userId;
    var newName = req.query.newUserName;
    var newSurname = req.query.newUserSurname;
    var newAge = req.query.newUserAge;
    var newSex = req.query.newUserSex;
    userService.updateUser(id, newName, newSurname, newAge, newSex).then(() => {
        userService.findAll().then((value) => {
            res.render('user-index', { found: value, db_type: "mongo" });
            res.end();
        });
    })
}

function deleteUser(req, res) {
    var id = req.query.userId;
    userService.deleteUser(id).then(() => {
        userService.findAll().then((value) => {
            res.render('user-index', { found: value, db_type: "mongo" });
            res.end();
        });
    })
};

function start(req, res) {
    userService.findAll().then((value) => {
        res.render('user-index', { found: value, db_type: "mongo" });
        res.end();
    });
};

module.exports.create = create;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.start = start;