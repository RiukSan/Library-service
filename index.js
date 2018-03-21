var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const args = require('yargs').argv;

global.DB_TYPE = args.db_type;
global.LIBRARY_FOLDER = args.lib_folder;
global.USER_FOLDER = args.usr_folder;
global.LIB = args.lib;

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
app.listen(args.port);