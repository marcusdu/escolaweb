// modulos

// log
console.log('setup route registration started');

var express = require('express');

var Setup = function (app, mongoose, passport) {
    // get router
    var router = express.Router();
    var Estados = mongoose.model('Estado');

    // novo doador
    router.post('/setup', passport.authenticate('jwt', { session: false }), function (req, res) {
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
        Estados.collection.insert(estados, function (err, docs) {
            if (err) return res.status(500).json({
                message: 'Ocorreu um erro durante o processamento da requisição'
            });

            // return status
            return res.status(200).json({
                message: 'Estados criados com sucesso!'
            });
        });
    })

    // log
    console.log('setup route registration finished');

    return router;
};

module.exports = Setup;