// modulos

// log
console.log('setup route registration started');

var express = require('express');

var Setup = function (app, mongoose, passport) {
    // get router
    var router = express.Router();
    var Perfis = mongoose.model('Perfil');
    var Estados = mongoose.model('Estado');

    // novo doador
    // passport.authenticate('jwt', { session: false })
    router.get('/setup', function (req, res) {
        Estados.find({}, function (err, estados) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }

            return res.status(200).json({
                data: estados
            });
        });
    });
    router.post('/setup/estados', function (req, res) {
        // criar Estados
        var estados = [
            {
                nome: 'Acre',
                sigla: 'AC'
            },
            {
                nome: 'Alagoas',
                sigla: 'AL'
            },
            {
                nome: 'Amapá',
                sigla: 'AP'
            },
            {
                nome: 'Amazonas',
                sigla: 'AM'
            },
            {
                nome: 'Bahia',
                sigla: 'BA'
            },
            {
                nome: 'Ceará',
                sigla: 'CE'
            },
            {
                nome: 'Distrito Federal',
                sigla: 'DF'
            },
            {
                nome: 'Espírito Santo',
                sigla: 'ES'
            },
            {
                nome: 'Goiás',
                sigla: 'GO'
            },
            {
                nome: 'Maranhão',
                sigla: 'MA'
            },
            {
                nome: 'Mato Grosso',
                sigla: 'MT'
            },
            {
                nome: 'Mato Grosso do Sul',
                sigla: 'MS'
            },
            {
                nome: 'Minas Gerais',
                sigla: 'MG'
            },
            {
                nome: 'Pará',
                sigla: 'PA'
            },
            {
                nome: 'Paraíba',
                sigla: 'PB'
            },
            {
                nome: 'Paraná',
                sigla: 'PR'
            },
            {
                nome: 'Pernambuco',
                sigla: 'PE'
            },
            {
                nome: 'Piauí',
                sigla: 'PI'
            },
            {
                nome: 'Rio de Janeiro',
                sigla: 'RJ'
            },
            {
                nome: 'Rio Grande do Norte',
                sigla: 'RN'
            },
            {
                nome: 'Rio Grande do Sul',
                sigla: 'RS'
            },
            {
                nome: 'Rondônia',
                sigla: 'RO'
            },
            {
                nome: 'Roraima',
                sigla: 'RR'
            },
            {
                nome: 'Santa Catarina',
                sigla: 'SC'
            },
            {
                nome: 'São Paulo',
                sigla: 'SP'
            },
            {
                nome: 'Sergipe',
                sigla: 'SE'
            },
            {
                nome: 'Tocantins',
                sigla: 'TO'
            }];

        // salvar estados
        Estados.collection.insert(estados, function (err, estados) {
            if (err) return res.status(500).json({
                message: 'Ocorreu um erro durante o processamento da requisição'
            });

            // return status
            return res.status(200).json({
                message: 'Estados criados com sucesso!'
            });
        });
    });

    router.post('/setup/perfis', function (req, res) {
        var perfis = [{
            nome: 'Administrador',
            ativo: true
        }, {
            nome: 'Estudante',
            ativo: true
        }];

        Perfis.collection.insert(perfis, function (err2, perfisSalvos) {
            // return status
            return res.status(200).json({
                message: 'Perfis criados com sucesso!'
            });
        });
    });

    router.post('/setup/series', function (req, res) {
        var Series = mongoose.model('Serie');
        var _series = [{
            nome: '1ª Série',
            ativo: true
        }, {
            nome: '2ª Série',
            ativo: true
        },
        {
            nome: '3ª Série',
            ativo: true
        },
        {
            nome: '4ª Série',
            ativo: true
        },
        {
            nome: '5ª Série',
            ativo: true
        },
        {
            nome: '6ª Série',
            ativo: true
        }];

        Series.collection.insert(_series, function (err, seriesSalvas) {
            if(err){
                return res.status(400).json({
                    message: 'Ocorreu um erro durante a operação!'
                });
            }

            // return status
            return res.status(200).json({
                message: 'Séries criadas com sucesso!'
            });
        });
    });

    // log
    console.log('setup route registration finished');

    return router;
};

module.exports = Setup;