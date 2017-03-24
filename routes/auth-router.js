/**
 * Encargado de manejar todas las solicitudes que tengan que ver con información
 * de los usuarios
 */
var express = require('express');
var bodyParser = require('body-parser');
var usersController = require('../model-controllers/user-controller');
var fs = require('fs');

module.exports = (function() {
	var userRouter = express.Router();

	userRouter.use(bodyParser.json());

	userRouter.route('/signin')
	.post(
			function(req, res, next) {

				var email = req.body.email;
				var pass = req.body.password;
				
				usersController.getByEmail(function(err, user){
					if(user==null){
						// No hay un usuario con ese correo
						// retornar un error.
						res.render('index',{error:true, message:"el usuario "+email+" no existe"});
					}else{
						if(user.pass!=pass){
							res.render('index',{error:true, message:"contraseña errornea"});
						}else{
							usersController.setCurrentUser(user);
							res.redirect("/user/"+user.email+"/posts");
						}
					}
				});

			});
	
	userRouter.route('/signin')
	.post(function(req, res, next) {});

	return userRouter;
})();