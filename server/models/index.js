// return application models
var models = function(mongoose){
    function _require(model){
        return require(model)(mongoose);
    }

    return {
        estado: _require('./estado'),
        escola: _require('./escola'),
        aluno: _require('./aluno'),
        professor: _require('./professor'),
        usuario: _require('./usuario'),
        perfil: _require('./perfil'),
        acesso: _require('./acesso'),
        serie: _require('./serie'),
        turma: _require('./turma'),
        usuarioEscola: _require('./usuarioEscola')
    };
};
module.exports = models;