(function () {
    'use strict';

    // controller constructor
    function HomeEscolaController($log, $scope, escolaService) {
        // get the context
        var ctx = this;        

        // properties
        var bookmark;
        ctx.data = {
            escolas: []
        };
        ctx.selected = [];
        ctx.query = {
            filter: '',
            order: 'nome',
            limit: 5,
            page: 1
        };
        ctx.promise = null;

        // actions
        ctx.actions = {
            onSuccess: function (response) {
                ctx.data.escolas = response.data;
            }
        };

        // loading
        ctx.loading = {
            load: function () {
                // ctx.promise = escolaService.getEscolasByUsuario(ctx.actions.onSuccess);

                escolaService.getEscolasByUsuario().then(function(response){
                    ctx.data.escolas = response.data;
                }).catch(function(err){
                    $log.error(err);
                });
            }
        };

        // watchers
        $scope.$watch('ctx.query.filter', function (newValue, oldValue) {
            if (!oldValue) {
                bookmark = $scope.ctx.query.page;
            }

            if (newValue !== oldValue) {
                $scope.ctx.query.page = 1;
            }

            if (!newValue) {
                $scope.ctx.query.page = bookmark;
            }

            ctx.loading.load();
        });
    }

    // register DI
    HomeEscolaController.$inject = ['$log', '$scope', 'escolaService'];

    // controller registration
    angular.module('escolaweb').controller('HomeEscolaController', HomeEscolaController);
})();