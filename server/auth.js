// modules

// log
console.log('auth registration started');

var Q = require('q');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var Auth = function (passport, mongoose, config) {
    // get user model
    var Usuario = mongoose.model('Usuario');

    // config auth strategy
    passport.use(Usuario.createStrategy());
    passport.serializeUser(Usuario.serializeUser());
    passport.deserializeUser(Usuario.deserializeUser());

    // use jwt authentication
    passport.use(new JwtStrategy({
        secretOrKey: config.auth.secretKey,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'), // get from Authorization Bearer XXXXX
        issuer: config.auth.issuer,
        audience: config.auth.audience,
        ignoreExpiration: false
    }, function (jwtpayload, done) {
        // get parameters from jwt sent in the header
        var _email = jwtpayload.sub;

        // // validate the token before passing to the application
        // jwt.verify(jwtpayload, config.auth.secretKey, {
        //     issuer: config.auth.issuer,
        //     audience: config.auth.audience
        // }, function (err, decoded) {
        //     if(err){ return done(err, false); }

        // fetch user based on the username in jwt and validate the current valid access_token for the user
        Usuario.findByUsername(_email, function (err, usuario) {
            if (err) { return done(err, false); }
            if (usuario) { done(null, usuario); }
            else { done(null, false); }
        });
        // });
    }));

    // log
    console.log('auth registration finished');
};

module.exports = Auth;