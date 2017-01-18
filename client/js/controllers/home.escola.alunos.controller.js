(function () {
    'use strict';

    function HomeEscolaAlunosController($state, $mdToast, alunoService) {
        // get the context
        var ctx = this;

        // model
        ctx.model = {
            aluno: null
        };

        // data
        ctx.data = {
            alunos: []
        };

        // constants
        ctx.constants = {
            image: 'http://placehold.it/32x32',
            hideDelay: 3000
        };

        // properties

        // model

        // loading
        ctx.loading = {
            load: function () {
                alunoService.getAlunosByEscola($state.params.id).then(function (response) {
                    ctx.data.alunos = response.data;
                }).catch(function (err) {
                    $mdToast.show($mdToast.simple()
                        .textContent('Ocorreu um erro durante a operação!')
                        .hideDelay(ctx.constants.hideDelay));
                });
            }
        };
    }

    HomeEscolaAlunosController.$inject = ['$state', '$mdToast', 'alunoService'];

    angular.module('escolaweb')
        .controller('HomeEscolaAlunosController', HomeEscolaAlunosController);
})();