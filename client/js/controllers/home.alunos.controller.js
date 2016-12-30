(function () {
    'use strict';

    // controller registration
    angular.module('escolaweb')
        .controller('HomeAlunosController', HomeAlunosController);

    // controller constructor
    function HomeAlunosController($scope) {
        // save the context
        var ctx = this;

        ctx.msg = 'Home Alunos';
    }

    // DI registration
    HomeAlunosController.$inject = ['$scope'];
})();