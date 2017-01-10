(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('escolaService', ['$resource', function ($resource) {
            // variables
            var _url = '/api/escolas';
            var _paramDefaults = {};
            var _actions = {};
            var _options = {};
            var _endpoint = $resource(_url, _paramDefaults, _actions, _options);

            // methods
            function _getEscolasByUsuario(usuario) {
                if (!usuario || typeof usuario !== 'string') throw new Error('Parâmetro usuário inválido!');

                var params = {};
                return _endpoint.query(params);
            }

            // service interface
            return {
                getEscolasByUsuario: _getEscolasByUsuario
            }
        }]);
})();