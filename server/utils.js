var _ = require('lodash');

var Utils = (function () {
    var _makePath = function (path) {
        return './server/{0}'.replace('{0}', path);
    };
    var _uid = function (len) {
        var buf = []
            , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            , charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[_getRandomInt(0, charlen - 1)]);
        }

        return _.join(buf, '');
    };

    var _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        makePath: _makePath,
        uid: _uid
    };
})();

// exportar módulo
module.exports = Utils;