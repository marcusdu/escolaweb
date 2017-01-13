(function(){
    'use strict';

    // controller constructor
    function HomeAlunoController($scope, $mdToast, alunoService){
        // get the context
        var ctx = this;

        ctx.model = {
            alunos: []
        };

        ctx.loading = {
            load: function(){
                alunoService.getAlunosByEscola().then(function(data){
                    ctx.model.alunos = data;
                }).catch(function(err){
                    $mdToast.show($mdToast.simple()
                            .textContent('Ocorreu um erro durante a operação!')
                            .hideDelay(3500));
                });
            }
        };
    }

    // register DI
    HomeAlunoController.$inject = ['$scope', '$mdToast', 'alunoService'];

    // controller registration
    angular.module('escolaweb').controller('HomeAlunoController', HomeAlunoController);
})();