(function(){
    'use strict';

    // controller constructor
    function HomeEscolaController(){
        var ctx = this;
    }

    // register DI
    HomeEscolaController.$inject = [];

    // controller registration
    angular.module('escolaweb').controller('HomeEscolaController', HomeEscolaController);
})();