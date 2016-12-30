console.log('Routes registration');

var routes = function (app, mongoose, passport) {
    return {
        escola: require('./escola')(app, mongoose, passport),
    };
};

module.exports = routes;