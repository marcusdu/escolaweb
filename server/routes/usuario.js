// modulos

// log
console.log('usuario route registration started');

var express = require('express');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var print = function(obj){
    if(!obj) return;

    for(var p in obj){
        console.log('{0} = {1}'.replace('{0}', p).replace('{1}', obj[p]));
    }
};

var Usuario = function (app, mongoose, passport, config) {
    var router = express.Router();
    var Usuarios = mongoose.model('Usuario');
    var Acessos = mongoose.model('Acesso');

    router.post('/usuario', function (req, res) {
        // obter dados da requisição
        var _nome = req.body.nome;
        var _email = req.body.email;
        var _password = req.body.password;
        
        console.log('nome = {0}, email = {1}, password = {2}'.replace('{0}', _nome).replace('{1}', _email).replace('{2}', _password));

        try {
            // verificações de segurança
            if (!_nome || _nome.length === 0) throw new Error('Nome inválido!');
            if (!_email || _email.length === 0) throw new Error('Usuário ou senha inválidos');
            if (!_password || _password.length <= 6) throw new Error('Usuário ou senha inválidos');

            Usuarios.findOne({ email: _email }, function (err, usuario) {
                // verificar se ocorreu algum erro na consulta
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

                // cadastrar novo usuário
                Usuarios.register(new Usuarios({
                    nome: _nome,
                    email: _email,
                    ativo: true,
                    emailConfirmado: false,
                    dataCriacao: new Date()
                }), _password, function (err, novoUsuario) {
                    if (err) {
                        // salvar log do erro no banco
                        return res.status(401).json({
                            status: 'error',
                            error: {
                                message: 'Ocorreu um erro durante a operação!',
                                code: '00001',
                                _obj: err
                            }
                        });
                    }

                    // execução com sucesso
                    return res.status(200).json({ message: 'Usuário criado com sucesso.' });
                });
            });
        } catch (e) {
            return res.status(504).json({
                message: 'Usuário ou senha inválidos!'
            });
        }
    });

    // POST api/usuario/login
    router.post('/usuario/login', passport.authenticate('local', { session: false }), function (req, res) {
        // obter parâmetros
        var _expiration = 60 * 60 * 24; // expires in 24 hours,
        var usuario = req.user._id;

        console.log('email = {0}, id = {1}'.replace('{0}', req.user.email).replace('{1}', req.user._id));

        // gerar a token
        var token = jwt.sign({
            email: req.user.email,
            id: req.user._id
        }, config.auth.secretKey, {
            issuer: config.auth.issuer,
            audience: config.auth.audience
        });

        console.log('gerando token = {0}'.replace('{0}', token));

        // registrar acesso no banco
        Acessos.create({
            usuario: usuario,
            token: token,
            ativo: true
        }, function (errCreate, acesso) {
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

    router.get('/usuario/me', passport.authenticate('jwt', { session: false }), function (req, res) {
        return res.status(200).json({
            nome: req.user.nome,
            email: req.user.email
        });
    });

    // log
    console.log('usuario route registration finished');
    return router;
};

module.exports = Usuario;