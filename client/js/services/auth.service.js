(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('authService', ['$auth', 'baseResource', function ($auth, baseResource) {
            // get the context

            // enable two ways of invocation
            // authService.login({email:'', password: ''})
            // authService.login('email', 'password')
            var _login = function (email, password) {
                var usuario = {};
                if (typeof email === 'object') {
                    usuario = email
                } else {
                    usuario.email = email;
                    usuario.password = password;
                }

                return $auth.login(usuario);
            };

            var _myInfo = function () {
                // variables
                var _url = '/api/usuario/me';
                var _paramDefaults = {};
                var _actions = {};
                var _options = {};
                return baseResource.getResource(_url, _paramDefaults, _actions, _options).get({}).$promise;
            };



            // service interface
            return {
                login: _login,
                myInfo: _myInfo
            };
        }]);
})();