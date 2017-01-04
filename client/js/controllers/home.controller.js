(function () {
    'use strict';

    // controller registration
    angular.module('escolaweb')
        .controller('HomeController', HomeController);

    // controller constructor
    function HomeController($scope, $state) {
        // save the context
        var ctx = this;

        ctx.titulo = 'Home';
        ctx.estado = $state.is('home') ? 'home state' : '!home state';
    }

    // DI registration
    HomeController.$inject = ['$scope', '$state'];
})();