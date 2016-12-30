// routes configuration
angular.module('escolaweb')
    .config(function ($stateProvider, $urlRouterProvider) {
        // state registration
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'templates/home-alunos.html',
            controller: 'HomeAlunosController',
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

        $urlRouterProvider.otherwise('/home');
    });