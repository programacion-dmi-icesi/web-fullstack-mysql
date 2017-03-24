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

	userRouter.route('/')

	.get(function(req, res, next) {
		usersController.getAll(function(error, users) {
			if (!error) {
				// res.json(photos);
				res.render("users", {
					users : users
				});
			}
		});
	})

	.post(
			function(req, res, next) {

				// Hacer el registro en base de datos
				usersController.create(req.body.name, req.body.nickname,
						req.body.pass, req.body.email, function(err, result) {
							if (err)
								throw err;
							res.json(result);
						});

			});
	
	userRouter.route('/:userId/posts')
	.get(function(req, res, next){
		// Debo conusltar los post de un usuario en particular
	});

	return userRouter;
})();