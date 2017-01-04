// routes configuration
angular.module('escolaweb')
    .config(function ($stateProvider, $urlRouterProvider) {
        // rota de home
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            controllerAs: 'ctx',
            resolve: {
                controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        type: 'js',
                        path: 'js/controllers/home.controller.js'
                    }]);
                }]
            }
        });

        // rota de configurações
        $stateProvider.state('configuracoes', {
            url: '/configuracoes',
            templateUrl: 'templates/home-config.html',
            controller: 'ConfiguracoesController',
            controllerAs: 'ctx',
            resolve:{
                controller: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        type: 'js',
                        path: 'js/controllers/configuracoes.controller.js'
                    });
                }]
            }
        });

        // rota de alunos
        $stateProvider.state('alunos', {
            url: '/alunos',
            abstract: true
        });
        $stateProvider.state('alunos.home', {
            url: '/home',
            templateUrl: 'templates/home-alunos.html',
            controller: 'HomeAlunoController',
            controllerAs: 'ctx',
            resolve: {
                controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        type: 'js',
                        path: 'js/controllers/home.alunos.controller.js'
                    }]);
                }]
            }
        });

        // rota de escolas
        $stateProvider.state('escolas', {
            url: '/escolas',
            abstract: true
        });
        $stateProvider.state('escolas.home', {
            url: '/home',
            templateUrl: 'templates/home-escolas.html',
            controller: 'HomeEscolaController',
            controllerAs: 'ctx',
            resolve: {
                controller: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        type: 'js',
                        path: 'js/controllers/home.escola.controller.js'
                    });
                }]
            }
        });

        $urlRouterProvider.otherwise('/home');
    });