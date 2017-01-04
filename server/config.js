// objeto de configuracao
exports = module.exports = function () {
    // obter configuracao atual de ambiente
    var _env = process.env.NODE_ENV || 'development';
    var _port = process.env.PORT || 3000;
    var _db = _env === 'development' ? 'mongodb://localhost:27017/escolaweb' : process.env.MONGODB_URI;

    var config = {
        development: {
            port: _port,
            address: '127.0.0.1',
            db: _db,
            options: {},
            log: 'dev',
            auth: {
                secretKey: '4b59eee28b47e80904a26c524305eedb49c1e3fa54a6a1829fd7e7a2fad511ce',
                issuer: 'escolaweb',
                audience: 'webapp',
                jwtSession: { session: false }
            }
        },
        production: {
            port: _port,
            db: _db,
            log: 'common',
            auth: {
                secretKey: '4b59eee28b47e80904a26c524305eedb49c1e3fa54a6a1829fd7e7a2fad511ce',
                issuer: 'escolaweb',
                audience: 'webapp',
                jwtSession: { session: false }
            }
        }
    };

    return config[_env];
};