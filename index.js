// modules
var compression = require('compression');
var path = require('path');
var config = require('./server/config')();
var _ = require('lodash');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var glob = require('glob');
var morgan = require('morgan');
var Q = require('q');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var utils = require('./server/utils');
var login = require('connect-ensure-login');
var express = require('express');
var expressSession = require('express-session');
var cookieSession = require('cookie-session');
var app = express();

// db connection
mongoose.connect(config.db, function(error){
    if(error){ console.error(error); }
});

// middleware configuration
app.use(express.static(path.join(__dirname, 'client')));
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan(config.log));
app.use(cookieParser(config.auth.secretKey));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.Router());

// custom modules registration
var models = require(utils.makePath('models'))(mongoose);

// set up user authentication
var auth = require(utils.makePath('auth'))(passport, mongoose, config);

// custom routes registration
var routes = require(utils.makePath('routes'))(app, mongoose, passport, config);
app.use('/api', routes.escola);
app.use('/api', routes.aluno);
app.use('/api', routes.usuario);
app.use('/api', routes.setup);

// error handling middleware
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        error:{
            message: 'Ocorreu um erro durante a operação.'
        }
    });
});

// start server
app.listen(config.port, function () {
    console.log('Aplicação iniciada na porta {0}'.replace('{0}', config.port));
});