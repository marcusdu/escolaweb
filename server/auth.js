// log
console.log('auth registration started');

var Q = require('q');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var print = function(obj){
    for(var p in obj){
        console.log('{0} = {1}'.replace('{0}', p).replace('{1}', obj[p]));
    }
};

var Auth = function (passport, mongoose, config) {
    var Usuarios = mongoose.model('Usuario');

    // configuração do passport-local-mongoose
    passport.use(Usuarios.createStrategy());
    
    // configuração do passport-jwt
    passport.use(new JwtStrategy({
        secretOrKey: config.auth.secretKey,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'), // get from Authorization Bearer XXXXX
        issuer: config.auth.issuer,
        audience: config.auth.audience,
        ignoreExpiration: false
    }, function (jwtpayload, done) {
        // selecionar os campos a serem retornados
        var fieldsToReturn = 'escola perfil nome email ativo';

        // get parameters from jwt sent in the header
        var _email = jwtpayload.email;

        // buscar o usuário com as credenciais contidas na bearer token
        Usuarios.findOne({
            email: _email
        }, fieldsToReturn, function(err, usuario){
            if (err) { return done(err, false); }
            if (usuario) { done(null, usuario); }
            else { done(null, false); }
        });
    }));

    // log
    console.log('auth registration finished');
};

module.exports = Auth;