(function(){
    'use strict';

    // controller constructor
    function HomeProfessorController(){
        var ctx = this;
    }

    // register DI
    HomeProfessorController.$inject = [];

    // controller registration
    angular.module('escolaweb').controller('HomeProfessorController', HomeProfessorController);
})();