var express = require('express');
var path = require('path');

global.LIBRARY_FOLDER = process.env.npm_package_config_lib_folder;
global.projectPath = path.dirname(require.main.filename);

var mainController = require(projectPath+'/controllers/LibController');


var app = express();

app.set('view engine', 'pug');
app.set('views', './view');

mainController.handle(app);
app.listen(process.env.npm_package_config_port);