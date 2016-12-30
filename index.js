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
var app = express();

// db connection
mongoose.connect(config.db, function(error){
    if(error){ console.error(error); }
});

// middleware configuration
app.use(express.static('client'));
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan(config.log));
app.use(cookieParser(config.auth.secretKey));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.Router());

// custom modules registration
var models = require(utils.makePath('models'))(mongoose);
// var authClient = require(utils.makePath('authClient'))(passport, mongoose);

// custom routes registration
var routes = require(utils.makePath('routes'))(app, mongoose, passport);
app.use('/api', routes.escola);
//app.use('/api', routes.auth);
//app.use('/api', routes.doador);

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