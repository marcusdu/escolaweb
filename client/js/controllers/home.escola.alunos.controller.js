(function () {
    'use strict';

    function HomeEscolaAlunosController($state, $mdToast, $mdDialog, alunoService) {
        // get the context
        var ctx = this;

        // model
        ctx.model = {
            aluno: null
        };

        // data
        ctx.data = {
            alunos: [],
            aluno: null
        };

        // constants
        ctx.constants = {
            image: 'http://placehold.it/32x32',
            hideDelay: 3000
        };

        // properties

        // model

        // actions
        ctx.actions = {
            sendEmail: function(aluno, ev){
                // mostrar modal com editor de email
                $mdDialog.show({
                    controller: function($mdToast, $scope){

                    },
                    locals: {
                        aluno: aluno
                    },
                    bindToController: true,
                    template: '<h2>Enviar email para {{ aluno.usuario.email }}</h2>',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullScreen: false
                });
            }
        };

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

    HomeEscolaAlunosController.$inject = ['$state', '$mdToast', '$mdDialog', 'alunoService'];

    angular.module('escolaweb')
        .controller('HomeEscolaAlunosController', HomeEscolaAlunosController);
})();