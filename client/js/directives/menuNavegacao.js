//  directive registration
angular.module('escolaweb')
    .directive('menuNavegacao', [function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/menu-navegacao.html',
            controller: function ($scope) {
                // informações do usuário
                $scope.usuario = {
                    nome: 'Flor de Maria',
                    email: 'flormapacheco@gmail.com'
                };

                // itens do menu normal
                $scope.menu = [{
                    titulo: 'Home',
                    estado: 'base.home',
                    icone: 'dashboard'
                },
                {
                    titulo: 'Gerenciar alunos',
                    estado: 'base.alunos',
                    icone: 'dashboard'
                },
                {
                    titulo: 'Gerenciar escolas',
                    estado: 'base.escolas',
                    icone: 'message'
                }];

                // itens do menu admin
                $scope.admin = [{
                    titulo: 'Configurações',
                    estado: 'base.configuracoes',
                    icone: 'settings'
                }];
            }
        };
    }]);