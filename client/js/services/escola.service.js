(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('escolaService', ['baseResource', function (baseResource) {
            // variables
            var _url = '/api/escolas';
            var _paramDefaults = {};
            var _actions = {};
            var _options = {};
            var _endpoint = baseResource.getResource(_url, _paramDefaults, _actions, _options);

            // methods
            function _getEscolasByUsuario() {
                
                var params = {};
                return _endpoint.query(params);
            }

            // service interface
            return {
                getEscolasByUsuario: _getEscolasByUsuario
            }
        }]);
})();