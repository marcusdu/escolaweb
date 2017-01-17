// routes configuration
angular.module('escolaweb')
    .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
        // ===== auth filters =====
        var _skipIfLoggedIn = ['$q', '$auth', function ($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];

        var _loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }];

        // ===== auth filters =====

        // ===== rota base =====
        $stateProvider.state('base', {
            templateUrl: 'templates/layout.html',
            resolve: {
                authService: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        type: 'js',
                        path: 'js/services/auth.service.js'
                    }]);
                }]
            }
        });
        $stateProvider.state('base.home', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctx',
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                type: 'js',
                                path: 'js/controllers/home.controller.js'
                            }]);
                        }],
                        loginRequired: _loginRequired
                    }
                }
            }
        });

        // ===== rota de login =====
        $stateProvider.state('login', {
            url: '/login',
            views: {
                '@': {
                    controller: 'LoginController',
                    controllerAs: 'ctx',
                    templateUrl: 'templates/login-form.html',
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    type: 'js',
                                    path: 'js/services/auth.service.js'
                                },
                                {
                                    type: 'js',
                                    path: 'js/controllers/login.controller.js'
                                }]);
                        }],
                        skipIfLoggedIn: _skipIfLoggedIn
                    }
                }
            }
        });

        // rota de configurações
        $stateProvider.state('base.configuracoes', {
            url: '/configuracoes',
            views: {
                'content': {
                    templateUrl: 'templates/home-config.html',
                    controller: 'ConfiguracoesController',
                    controllerAs: 'ctx',
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                type: 'js',
                                path: 'js/controllers/configuracoes.controller.js'
                            });
                        }],
                        loginRequired: _loginRequired
                    }
                }
            }
        });

        // rota de alunos
        $stateProvider.state('base.alunos', {
            url: '/alunos',
            views: {
                'content': {
                    templateUrl: 'templates/home-alunos.html',
                    controller: 'HomeAlunoController',
                    controllerAs: 'ctx',
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                type: 'js',
                                path: 'js/services/aluno.service.js'
                            },
                            {
                                type: 'js',
                                path: 'js/controllers/home.alunos.controller.js'
                            }]);
                        }],
                        loginRequired: _loginRequired
                    }
                }
            }
        });

        // rota de escolas
        $stateProvider.state('base.escolas', {
            url: '/escolas',
            views: {
                'content': {
                    templateUrl: 'templates/home-escolas.html',
                    controller: 'HomeEscolaController',
                    controllerAs: 'ctx',
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    type: 'js',
                                    path: 'js/services/escola.service.js'
                                },
                                {
                                    type: 'js',
                                    path: 'js/controllers/home.escola.controller.js'
                                }]);
                        }],
                        loginRequired: _loginRequired
                    }
                }
            }
        });
        $stateProvider.state('base.escolas.detalhe', {
            url: '/:id',
            views: {
                'content@base': {
                    templateUrl: 'templates/home-escola.html',
                    controller: 'HomeEscolaController',
                    controllerAs: 'ctx',
                    /*resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    type: 'js',
                                    path: 'js/services/escola.service.js'
                                },
                                {
                                    type: 'js',
                                    path: 'js/controllers/home.escola.controller.js'
                                }]);
                        }],
                        loginRequired: _loginRequired
                    }*/
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    });