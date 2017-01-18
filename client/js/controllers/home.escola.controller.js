(function () {
    'use strict';

    // controller constructor
    function HomeEscolaController($log, $scope, $state, escolaService) {
        // get the context
        var ctx = this;

        // properties
        ctx.$state = $state;
        var bookmark;
        ctx.data = {
            escolas: [],
            escola: null
        };
        ctx.selected = [];
        ctx.query = {
            filter: '',
            order: 'nome',
            limit: 5,
            page: 1
        };
        ctx.promise = null;

        // constants
        ctx.constants = {
            image: 'http://placehold.it/48x48'
        };

        // utils
        ctx.utils = {
            getState: function (id) {
                return { id: id };
            }
        };

        // actions
        ctx.actions = {
            onSuccess: function (response) {
                ctx.data.escolas = response.data;
            }
        };

        // loading
        ctx.loading = {
            load: function () {
                var state = $state.current;
                switch (state.name) {
                    case 'base.escolas':
                        escolaService.getEscolasByUsuario().then(function (response) {
                            ctx.data.escolas = response.data;
                        }).catch(function (err) {
                            $log.error(err);
                        });
                        break;
                    default:
                        escolaService.getEscolaById($state.params.id).then(function(response){
                            ctx.data.escola = response.data;
                        });
                        break;
                }
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
    HomeEscolaController.$inject = ['$log', '$scope', '$state', 'escolaService'];

    // controller registration
    angular.module('escolaweb').controller('HomeEscolaController', HomeEscolaController);
})();