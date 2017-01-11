(function () {
    'use strict';

    // controller registration
    angular.module('escolaweb')
        .controller('LoginController', ['$mdToast', '$location', 'authService', function ($mdToast, $location, authService) {
            // get the context
            var ctx = this;

            // constants
            ctx.constants = {
                hideDelay: 3000
            };

            // model
            ctx.model = {
                usuario: {
                    email: '',
                    password: ''
                }
            };

            // actions
            ctx.actions = {
                login: function () {
                    return authService.login(ctx.model.usuario).then(function () {
                        $mdToast.show($mdToast.simple()
                            .textContent('You have successfully signed in!')
                            .hideDelay(ctx.constants.hideDelay));

                        // redirecionar para home
                        $location.path('/');
                    }).catch(function (error) {
                        $mdToast.show($mdToast.simple()
                            .textContent(error.data.message)
                            .hideDelay(ctx.constants.hideDelay));
                    });
                }
            };
        }]);
})();