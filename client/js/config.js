(function () {
    'use strict';

    // config hook
    angular.module('escolaweb')
        .config(['$resourceProvider', '$authProvider', '$mdToastProvider', 'ngMdIconServiceProvider', function ($resourceProvider, 
            $authProvider, 
            $mdToastProvider,
            ngMdIconServiceProvider) {

            // configurando a autenticação da aplicação
            $authProvider.tokenPrefix = 'ew';
            $authProvider.tokenName = 'access_token';
            $authProvider.loginUrl = '/api/usuario/login';

            // configurando o toast da aplicação

            // configurando conjuntos de ícones
        }]);
})();