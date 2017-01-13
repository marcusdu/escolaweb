(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('alunoService', ['baseResource', function (baseResource) {
            // variables
            var _url = '/api/alunos';
            var _paramDefaults = {};
            var _actions = {};
            var _options = {};
            var _endpoint = baseResource.getResource(_url, _paramDefaults, _actions, _options);

            // methods
            function _getAlunosByEscola() {                
                var params = {};
                return _endpoint.query(params).$promise;
            }

            // service interface
            return {
                getAlunosByEscola: _getAlunosByEscola
            }
        }]);
})();