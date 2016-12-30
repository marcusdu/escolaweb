// modulos
var express = require('express');

var Escola = function (app, mongoose, passport) {
    // get router
    var router = express.Router();
    var Doadores = mongoose.model('Escola');

    // get all doadores
    // passport.authenticate('jwt', { session: false })
    router.get('/escola/:id', function (req, res) {
        /* Doadores.find({}, function (err, doadores) {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: {
                        message: 'Ocorreu um erro durante o processamento. Contacte o administrador do sistema.',
                        code: ''
                    }
                });
            }

            // retorna o usuário encontrado
            return res.status(200).json({
                status: 'success',
                data: doadores
            });
        }); */

        return res.status(200).json({
            message: 'It works!'
        });
    });

    // novo doador
    router.post('/doadores/novo', passport.authenticate('jwt', { session: false }), function (req, res) {
        // get data from request
        /*var _nome = req.body.nome;
        var _dataNascimento = req.body.dataNascimento;
        var _naturalidade = req.body.naturalidade;
        var _endereco = req.body.endereco;
        var _telefone = req.body.telefone;
        var _profissao = req.body.profissao;

        // validate data
        Doadores.findOne({ nome: _nome }, function (err, doador) {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: {
                        message: 'Ocorrreu um erro durante o processamento. Contacte o administrador do sistema.',
                        code: ''
                    }
                });
            }

            if (!doador) {
                Doadores.create({
                    nome: _nome,
                    dataNascimento: _dataNascimento,
                    naturalidade: _naturalidade,
                    endereco: _endereco,
                    telefone: _telefone,
                    profissao: _profissao
                }, function (_err, _doador) {
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
                        message: 'Doador criado com sucesso!'
                    });
                });
            }
        });
        */
    })

    return router;
};

module.exports = Escola;