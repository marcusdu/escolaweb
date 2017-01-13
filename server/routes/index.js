console.log('Routes registration');

var routes = function (app, mongoose, passport, config) {
    return {
        escola: require('./escola')(app, mongoose, passport),
        aluno: require('./aluno')(app, mongoose, passport),
        usuario: require('./usuario')(app, mongoose, passport, config),
        setup: require('./setup')(app, mongoose, passport)
    };
};

module.exports = routes;