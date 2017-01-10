(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('authService', ['$auth', function ($auth) {
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

            

            // service interface
            return {
                login: _login
            };
        }]);
})();