/*
--------------------------------------------------------------------------
  Configurações da aplicação
--------------------------------------------------------------------------
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
/*Carregamento de dependencias*/
var consign = require('consign');
/*Logger*/
var morgan = require('morgan');
var compression = require('compression');
var helmet = require('helmet');

var error404 = require('./src/middlewares/error404');
var error500 = require('./src/middlewares/error500');
var logger = require('./src/middlewares/logger.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(helmet());
app.use(cors({
	methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('common', {
		stream: {
			write: function(message){
				logger.info(message);
			}
		}
}));

/*
--------------------------------------------------------------------------
  Implementação App
 --------------------------------------------------------------------------
*/

//Carregando modulos
consign()
  .include('src/models')
  .then('src/controllers')
  .then('routes')
  .into(app);

/*
--------------------------------------------------------------------------
  Tratamento de erros
--------------------------------------------------------------------------
*/

// catch 404 and forward to error handler
app.use(error404);

// error handler
app.use(error500);

/* Export do modulo */
module.exports = app;
