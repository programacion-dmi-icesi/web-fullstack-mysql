/**
 * en cargado de realizar todas las operaciones sobre base de datos que tengan que ver con usuarios
 */
var db = require('../database.js')
var current_user;

exports.create = function(name, nickname, pass, email, done) {
  var values = [author, place, photoPath, new Date().toISOString()];
  
  db.getConnection().query('INSERT INTO usuarios (nombre, ninckname, pass, correo) VALUES(?, ?, ?, ?)', values, function(err, result) {
    if (err) 
    	return done(err);
    done(null, result.insertId);
  });
};

exports.getAll = function(done) {
  db.getConnection().query('SELECT * FROM usuarios', function (err, rows) {
    if (err) 
    	return done(err);
    done(null, rows);
  });
};

exports.getByEmail = function(email){
	db.getConnection().query('SELECT * from usuarios WHERE email=?',email,function(err, rows){
		if(err)
			return done(err);
		done(null, rows[0]);
	});
};

exports.getCurrentUser = function(){
	return current_user;
};

exports.gsetCurrentUser = function(user){
	current_user = user;
};
