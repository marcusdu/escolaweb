(function(){
    'use strict';

    // controller constructor
    function HomeEscolaController($log, escolaService){
        var ctx = this;


        ctx.loading = {
            load: function(){
                escolaService.getEscolasByUsuario().then(function(data){
                    $log.info(data);
                }, function(err){
                    $log.error(err);
                });
            }
        };

        // load page
        ctx.loading.load();
    }

    // register DI
    HomeEscolaController.$inject = ['$log', 'escolaService'];

    // controller registration
    angular.module('escolaweb').controller('HomeEscolaController', HomeEscolaController);
})();