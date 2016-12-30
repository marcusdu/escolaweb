//  directive registration
angular.module('escolaweb')
        .directive('bannerPrincipal', [function(){
            return {
                restrict: 'E',
                templateUrl: 'templates/banner-principal.html',
                scope:{
                    texto: '@'
                }
            };
        }]);