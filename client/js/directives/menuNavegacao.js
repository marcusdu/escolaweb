//  directive registration
angular.module('escolaweb')
        .directive('menuNavegacao', [function(){
            return {
                restrict: 'E',
                templateUrl: 'templates/menu-navegacao.html'
            };
        }]);