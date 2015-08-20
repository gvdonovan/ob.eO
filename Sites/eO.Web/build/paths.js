var path = require('path');

var appRoot = './wwwroot/';

module.exports = {
  bower: {
 	  directory: './bower_components/',
    bowerJson: require('../bower.json' )
  },
  client: appRoot + '',
  vendor: appRoot + 'vendor/',
  source: appRoot + 'app/**/*.js',
  html:   appRoot + '**/*.html',
  style:  appRoot + 'css/',
  less:   appRoot + 'less/',
  es6:    appRoot + 'es6/',
  lib:    appRoot + 'lib/'
};
