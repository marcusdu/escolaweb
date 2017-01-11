// modulos

// log
console.log('escola route registration started');

var express = require('express');

var Escola = function (app, mongoose, passport) {
    // get router
    var router = express.Router();
    var Escolas = mongoose.model('Escola');

    // GET /api/escolas
    router.get('/escolas', passport.authenticate('jwt'), function (req, res) {
        // query database
        Escolas.find({
            usuario: req.user._id
        }, function (err, escolas) {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: {
                        message: 'Ocorrreu um erro durante o processamento. Contacte o administrador do sistema.',
                        code: ''
                    }
                });
            }

            return res.status(200).json({
                status: 'success',
                data: escolas
            });
        });
    });

    // novo doador
    router.post('/escola', passport.authenticate('jwt'), function (req, res) {
        // get data from request
        var _usuario = req.body.usuario;
        var _nome = req.body.nome;
        var _endereco = req.body.endereco;

        // validate data
        Escolas.findOne({ nome: _nome, usuario: _usuario }, function (err, escola) {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: {
                        message: 'Ocorrreu um erro durante o processamento. Contacte o administrador do sistema.',
                        code: ''
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
                            status: 'error',
                            error: {
                                message: 'Ocorrreu um erro durante o processamento. Contacte o administrador do sistema.',
                                code: ''
                            }
                        });
                    }

                    return res.status(200).json({
                        status: 'success',
                        message: 'Escola criada com sucesso!'
                    });
                });
            }
            else {
                return res.status(400).json({
                    status: 'error',
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