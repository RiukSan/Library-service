var user = require('../model/User');

function convertDataToUser(data) {
    try {
        var result = [];
        var usersData = data.split('\n');
        for (item in usersData) {
            var splitedData = usersData[item].split(',');
            if (splitedData[0] != "") {
                var name = splitedData[0];
                var surname = splitedData[1];
                var age = splitedData[2];
                var sex = splitedData[3];
                result.push(new user(name, surname, age, sex));
            }
        }
        return result;
    } catch (err) {
        throw err;
    }
}

function convertUserToData(userToConvert) {
    try {
        var name = userToConvert.name;
        var surname = userToConvert.surname;
        var age = userToConvert.age;
        var sex = userToConvert.sex;
        var result = name + ',' + surname + ',' + age + ',' + sex + '\n';
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports.convertDataToUser = convertDataToUser;
module.exports.convertUserToData = convertUserToData;