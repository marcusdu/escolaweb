// modulos

// log
console.log('aluno route registration started');

var express = require('express');

var print = function (obj) {
    for (var p in obj) {
        if (obj[p])
            console.log('{0} = {1}'.replace('{0}', p).replace('{1}', obj[p]));
    }
};

var Aluno = function (app, mongoose, passport) {
    // get router
    var router = express.Router();
    var Usuarios = mongoose.model('Usuario');
    var Alunos = mongoose.model('Aluno');

    // GET /api/alunos
    router.get('/alunos', passport.authenticate('jwt', { session: false }), function (req, res) {
        // a partir do usuario, buscar a escola e depois os alunos dela
        /*console.log('paramUsuario.id = {0}'.replace('{0}', req.user._id));
        console.log('paramUsuario.nome = {0}'.replace('{0}', req.user.nome));
        console.log('paramUsuario.email = {0}'.replace('{0}', req.user.email));
        console.log('paramUsuario.escola = {0}'.replace('{0}', req.user.escola));*/

        // buscar o id do usuario
        Alunos.find({
            escola: req.user.escola
        }).populate('usuario')
        .exec(function (err, alunos) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }

            for(var i = 0; i < alunos.length; i++){
                console.log('aluno ' + alunos[i].usuario.nome + ', email ' + alunos[i].usuario.email);
            }

            return res.status(200).json(alunos.map(function (aluno) {
                return {
                    nome: aluno.usuario.nome,
                    email: aluno.usuario.email
                };
            }));
        });
    });

    // novo doador
    // POST api/aluno
    router.post('/aluno', passport.authenticate('jwt', { session: false }), function (req, res) {
        // get data from request
        var _escola = req.body.escola;
        var _usuario = req.body.usuario;
        var _nome = req.body.nome;
        var _pai = req.body.pai;
        var _mae = req.body.mae;
        var _endereco = req.body.endereco;

        // validate data
        Alunos.findOne({ nome: _nome, escola: _escola }, function (err, aluno) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }

            if (!aluno) {
                Alunos.create({
                    escola: _escola,
                    usuario: _usuario,
                    nome: _nome,
                    pai: _pai,
                    mae: _mae,
                    endereco: _endereco
                }, function (_err, _aluno) {
                    if (_err) {
                        return res.status(500).json({
                            error: _err
                        });
                    }

                    return res.status(200).json({
                        status: 'success',
                        message: 'Aluno criado com sucesso!'
                    });
                });
            }
            else {
                return res.status(400).json({
                    status: 'error',
                    message: 'Já existe um aluno cadastrada com o mesmo nome!'
                });
            }
        });
    })

    // log
    console.log('aluno route registration started');

    return router;
};

module.exports = Aluno;