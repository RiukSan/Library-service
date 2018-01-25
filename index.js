var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

global.DB_TYPE = process.env.npm_package_config_db_type;
global.LIBRARY_FOLDER = process.env.npm_package_config_lib_folder;
global.USER_FOLDER = process.env.npm_package_config_usr_folder;
global.LIB = process.env.npm_package_config_lib;

var mainRouter = require('./router/mainRouter');


var app = express();

app.set('view engine', 'pug');
app.set('views', './view');

if (DB_TYPE == "mongo") {
    mongoose.connect('mongodb://localhost/Library_service', function (err) {
        if (err) throw err;
        console.log('Successfully connected');
        mainRouter.handle(app);
    });
} else {
    mainRouter.handle(app);
}
app.listen(process.env.npm_package_config_port);