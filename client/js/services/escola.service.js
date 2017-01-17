(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('escolaService', ['baseResource', function (baseResource) {


            // methods
            function _getEscolasByUsuario(fn) {
                // variables
                var _url = '/api/escolas';
                var _paramDefaults = {};
                var _actions = {};
                var _options = {};
                var _endpoint = baseResource.getResource(_url, _paramDefaults, _actions, _options);

                var params = {};
                if (fn && typeof fn === 'function')
                    return _endpoint.get(params, fn).$promise;
                else
                    return _endpoint.get(params).$promise;
            }

            function _getEscolaById(id) {
                if(!id || id.length === 0) throw new Error('id');

                // variables
                var _url = '/api/escolas/:id';
                var _paramDefaults = {};
                var _actions = {};
                var _options = {};
                var _endpoint = baseResource.getResource(_url, _paramDefaults, _actions, _options);

                var params = {
                    id: id
                };

                return _endpoint.get(params).$promise;
            }

            // service interface
            return {
                getEscolasByUsuario: _getEscolasByUsuario,
                getEscolaById: _getEscolaById
            }
        }]);
})();