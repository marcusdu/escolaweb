(function () {
    'use strict';

    // config hook
    angular.module('escolaweb')
        .config(['$resourceProvider', '$authProvider', '$mdToastProvider', function ($resourceProvider, $authProvider, $mdToastProvider) {
            // configurando a autenticação da aplicação
            $authProvider.tokenPrefix = 'ew';
            $authProvider.tokenName = 'access_token';
            $authProvider.loginUrl = '/api/usuario/login';

            // configurando o toast da aplicação
        }]);
})();