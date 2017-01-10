(function(){
    'use strict';

    // controller registration
    angular.module('escolaweb')
        .controller('LoginController', ['authService', function(authService){
            var ctx = this;

            ctx.model = {
                usuario: {
                    email: '',
                    password: ''
                }
            };

            ctx.login = function(){
                return authService.login(ctx.model.usuario);
            };
        }]);
})();