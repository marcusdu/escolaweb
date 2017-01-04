(function(){
    'use strict';

    // controller constructor
    function HomeAlunoController($scope){
        // get the context
        var ctx = this;


    }

    // register DI
    HomeAlunoController.$inject = ['$scope'];

    // controller registration
    angular.module('escolaweb').controller('HomeAlunoController', HomeAlunoController);
})();