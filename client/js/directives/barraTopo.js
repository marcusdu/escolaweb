//  directive registration
angular.module('escolaweb')
        .directive('barra-topo', [function(){
            return {
                restrict: 'E',
                templateUrl: 'templates/barra-topo.html'
            };
        }]);