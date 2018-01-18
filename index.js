var express = require('express');
var path = require('path');

global.LIBRARY_FOLDER = process.env.npm_package_config_lib_folder;
global.LIB = process.env.npm_package_config_lib;

var mainRouter = require('./router/mainRouter');


var app = express();

app.set('view engine', 'pug');
app.set('views', './view');

mainRouter.handle(app);
app.listen(process.env.npm_package_config_port);