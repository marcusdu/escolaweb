(function () {
    'use strict';

    // config hook
    angular.module('escolaweb')
        .config(['$resourceProvider', function (resourceProvider) {
            $resourceProvider.defaults.actions.update = {
                method: 'PUT'
            };
        }]);
})();