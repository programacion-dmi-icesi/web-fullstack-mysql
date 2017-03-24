/**
 * http://usejsdoc.org/
 */

// Importar módulos externos
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// Importar módulos locales
var databse = require("./database");
var userRouter = require("./routes/user-router");
var authRouter = require("./routes/auth-router"); 

// Crear nuestra aplicación express y comenzar a configurarla
var app = express();

// Configurar sistema de logging y conversión de datos
app.use(logger('dev'));

//Configurar el sistema de vistas handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('view cache', false);

// Aceptar solicitudes en formato application/json
app.use(bodyParser.json());

// Aceptar solicitudes en formato application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended : true
}));

// configurar donde iran nuestros archivos del front
app.use(express.static(__dirname + '/public'));

// Configurar las rutas en archivos separados
app.get('/',function(req,res,next){
	res.render('index');
});
app.use('/auth', authRouter);
app.use('/users', userRouter);

// Configurar la conexión a la base de datos
databse.connect(databse.MODE_PRODUCTION, function(err) {
	if (err) {
		// Si hubo errores cerrar la aplicación
		console.log('Unable to connect to MySQL.');
		process.exit(1)
	} else {
		// Si no hubo errores encender el servidor y comenzar a escuchar
		// solicitudes
		var hostname = 'localhost';
		var port = 3000;

		app.listen(port, hostname, function() {
			console.log('Servidor corriendo en http://' + hostname + ':' + port
					+ '/');
		});
	}
});
