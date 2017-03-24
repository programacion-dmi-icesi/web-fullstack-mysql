/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
//var async = require('async');

var PRODUCTION_DB = 'aplicacion_social'
  , TEST_DB = 'app_test_database'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: 'programacion-web-test.cejfwltsp021.sa-east-1.rds.amazonaws.com',
    user: 'damanzano',
    password: '4TohsakaRin',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  });

  state.mode = mode;
  done();
};

exports.getConnection = function() {
  return state.pool;
};