(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('alunoService', ['baseResource', function (baseResource) {
            // methods
            function _getAlunosByEscola(id) {
                // variables
                var _url = '/api/escolas/:escola/alunos';
                var _paramDefaults = {};
                var _actions = {};
                var _options = {};
                var _endpoint = baseResource.getResource(_url, _paramDefaults, _actions, _options);

                if (!id || id.length === 0) throw new Error('id');

                var params = {
                    escola: id
                };
                return _endpoint.get(params).$promise;
            }

            // service interface
            return {
                getAlunosByEscola: _getAlunosByEscola
            }
        }]);
})();