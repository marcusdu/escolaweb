(function () {
    'use strict';

    // service registration
    angular.module('escolaweb')
        .factory('baseResource', ['$http', '$resource', '$auth', function ($http, $resource, $auth) {
            // set up auth for each request
            var _getResource = function (url, paramDefaults, actions, options) {
                var _actions = {
                    get: { method: 'GET', transformRequest: _transformRequest },
                    save: { method: 'POST', transformRequest: _transformRequest },
                    query: { method: 'GET', isArray: true, transformRequest: _transformRequest },
                    remove: { method: 'DELETE', transformRequest: _transformRequest },
                    delete: { method: 'DELETE', transformRequest: _transformRequest },
                    update: { method: 'PUT', transformRequest: _transformRequest }
                };

                _actions = angular.extend(_actions, actions);

                return $resource(url, paramDefaults, _actions, options);
            };

            var _transformRequest = function(data, headersGetter){
                var headers = headersGetter();
                if($auth.isAuthenticated())
                {
                    angular.extend(headers, {
                        'Authorization': 'Bearer {0}'.replace('{0}', $auth.getToken())
                    });
                }

                return data;
            };

            return {
                getResource: _getResource
            };
        }]);
})();