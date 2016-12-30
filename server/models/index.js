// return application models
var models = function(mongoose){
    function _require(model){
        return require(model)(mongoose);
    }

    return {
        estado: _require('./estado'),
        escola: _require('./escola')
    };
};
module.exports = models;