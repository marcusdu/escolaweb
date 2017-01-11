// modulos

// log
console.log('usuario route registration started');

var express = require('express');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var Usuario = function (app, mongoose, passport, config) {
    /*for (var i in config) {
        console.log('{0} = {1}'.replace('{0}', i).replace('{1}', config[i]));
    }*/

    // get router
    var router = express.Router();
    var Usuario = mongoose.model('Usuario');
    var Acessos = mongoose.model('Acesso');

    router.post('/usuario', function (req, res) {
        // get user data from request
        var _email = req.body.email;
        var _password = req.body.password;

        try {
            if (!_email || _email.length === 0) throw new Error('Usuário ou senha inválidos');
            if (!_password || _password.length <= 6) throw new Error('Usuário ou senha inválidos');

            Usuario.findOne({ email: _email }, function (err, usuario) {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        error: {
                            message: 'Ocorreu um erro durante o processamento. Contacte o administrador do sistema.',
                            code: ''
                        }
                    });
                }

                // verificar se o usuário existe
                if (usuario) {
                    return res.status(400).json({
                        status: 'error',
                        error: {
                            message: 'Nome de usuário já cadastrado.'
                        }
                    });
                }

                // register new user
                Usuario.register(new Usuario({
                    email: _email,
                    ativo: true,
                    emailConfirmado: false,
                    dataCriacao: new Date()
                }), _password, function (err, account) {
                    if (err) {
                        // save error code
                        return res.status(401).json({
                            status: 'error',
                            error: {
                                message: 'Ocorreu um erro durante a operação!',
                                code: '00001',
                                _obj: err
                            }
                        });
                    }

                    // return success status
                    return res.status(200).json({ status: 'success', message: 'Usuário criado com sucesso.' });
                });
            });
        } catch (e) {
            return res.status(504).json({
                message: 'Usuário ou senha inválidos!'
            });
        }
    });

    // TODO: Gerar resposta UNAUTHORIZED
    router.post('/usuario/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
        // obter parâmetros
        var usuario = req.user._id;

        console.log('usuario = {0}'.replace('{0}', usuario));

        console.log('log = {0}'.replace('{0}', config.log));

        var _expiration = 60 * 60 * 24; // expires in 24 hours,

        // TODO: make sure the user exists

        // TODO: make sure the password matches the hash

        // retornar token
        var token = jwt.sign(req.user, config.auth.secretKey, {
            issuer: config.auth.issuer,
            audience: config.auth.audience,
            subject: req.user.email
        });

        // verificar se já existe acesso do usuário no celular informado
        Acessos.findOneAndUpdate(
            {
                'usuario': req.user._id,
                'ativo': true
            },
            { 'ativo': false },
            { new: true }, function (errUpdate, acesso) {
                if (errUpdate) {
                    return res.status(500).json({
                        status: 'error',
                        error: {
                            message: 'Ocorreu um erro durante o processamento. Contacte o administrador do sistema.',
                            code: ''
                        }
                    });
                }

                // criar novo acesso
                Acessos.create({
                    usuario: usuario,
                    token: token,
                    ativo: true
                }, function (errCreate, novoAcesso) {
                    if (errCreate) {
                        return res.status(500).json({
                            status: 'error',
                            error: {
                                message: 'Ocorreu um erro durante o processamento. Contacte o administrador do sistema.',
                                code: ''
                            }
                        });
                    }

                    // retorna a token alterado
                    return res.status(200).json({ access_token: token });
                });
            });
    });

    // verificar se usuário já existe
    router.get('/usuario', function (req, res) {
        // buscar parâmetros da requisição
        var username = req.body.username;
        if (!username || typeof username !== 'string' || username.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Parâmetro username inválido!'
            });
        }

        // buscar usuário no banco
        Usuario.findByUsername(username, function (err, usuario) {
            // em caso de erro
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
                data: usuario
            });
        });
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/usuario/me', passport.authenticate('jwt', { session: false }), function (req, res) {
        return res.status(200).json({
            status: 'success',
            data: req.user
        });
    });

    // log
    console.log('usuario route registration finished');

    return router;
};

module.exports = Usuario;