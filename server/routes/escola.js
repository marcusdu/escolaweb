// modulos

// log
console.log('escola route registration started');

var express = require('express');

var Escola = function (app, mongoose, passport) {
    // get router
    var router = express.Router();
    var Usuarios = mongoose.model('Usuario');
    var Alunos = mongoose.model('Aluno');
    var Perfis = mongoose.model('Perfil');
    var Escolas = mongoose.model('Escola');
    var UsuarioEscolas = mongoose.model('UsuarioEscola');

    // GET /api/escolas
    router.get('/escolas', passport.authenticate('jwt', { session: false }), function (req, res) {
        // query database
        Escolas.find({
            usuario: req.user._id
        }, function (err, escolas) {
            if (err) {
                return res.status(500).json({
                    error: {
                        message: 'Ocorreu um erro durante a operação!'
                    }
                });
            }

            return res.status(200).json({
                data: escolas
            });
        });
    });

    // GET /api/escolas/:id
    router.get('/escolas/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
        Escolas.findOne({ _id: req.params.id })
            .populate('endereco.estado', '-_id nome sigla')
            .select('-_id nome endereco.rua endereco.cidade endereco.estado')
            .exec(function (err, escola) {
                if (err) {
                    return res.status(500).json({
                        error: {
                            message: 'Ocorreu um erro durante a operação!'
                        }
                    });
                }

                if (!escola) {
                    return res.status(400).json({
                        message: 'A escola não existe!'
                    });
                }

                return res.status(200).json({
                    data: escola
                });
            });
    });

    // GET /api/escolas/:id
    router.get('/escolas/:id/alunos', passport.authenticate('jwt', { session: false }), function (req, res) {
        Alunos.find({ escola: req.params.id })
            .populate({
                path: 'escola',
                model: 'Escola',
                select: 'nome endereco.rua'
            })
            .populate({
                path: 'usuario',
                model: 'Usuario',
                select: 'nome email'
            })
            .populate({
                path: 'turma',
                model: 'Turma',
                select: 'nome turno serie',
                populate:{
                    path: 'serie',
                    model: 'Serie',
                    select: 'nome'
                }
            })
            .select('escola usuario pai.telefone mae.telefone turma')
            .exec(function (err, alunos) {
                if (err) {
                    return res.status(500).json({
                        error: {
                            message: 'Ocorreu um erro durante a operação!'
                        }
                    });
                }

                return res.status(200).json({
                    data: alunos
                });
            });
    });

    // POST api/escola
    router.post('/escola', passport.authenticate('jwt', { session: false }), function (req, res) {
        // get data from request
        var _nome = req.body.nome;
        var _endereco = req.body.endereco;
        var _usuario = req.body.usuario;

        // validate data
        Escolas.findOne({
            usuario: _usuario,
            nome: _nome
        }, function (err, escola) {
            if (err) {
                return res.status(500).json({
                    error: {
                        message: 'Ocorreu um erro durante a operação!'
                    }
                });
            }

            if (!escola) {
                Escolas.create({
                    usuario: _usuario,
                    nome: _nome,
                    endereco: _endereco
                }, function (_err, _escola) {
                    if (_err) {
                        return res.status(500).json({
                            error: {
                                message: 'Ocorreu um erro durante a operação!'
                            }
                        });
                    }

                    return res.status(200).json({
                        message: 'Escola criada com sucesso!'
                    });
                });
            }
            else {
                return res.status(400).json({
                    message: 'Já existe uma escola cadastrada com o mesmo nome!'
                });
            }
        });
    })

    // log
    console.log('escola route registration started');

    return router;
};

module.exports = Escola;