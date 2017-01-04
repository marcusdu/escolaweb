(function () {
    'use strict';

    // controller registration
    angular.module('escolaweb')
        .controller('ConfiguracoesController', ConfiguracoesController);

    // controller constructor
    function ConfiguracoesController($scope) {
        // save the context
        var ctx = this;

        ctx.titulo = 'Configurações';
    }

    // DI registration
    ConfiguracoesController.$inject = ['$scope'];
})();