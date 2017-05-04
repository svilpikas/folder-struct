(function() {

    'use strict';

    angular
        .module('app',['ui.router','ngDialog'])
        .config(function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/pages/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                })
                .state('folders-tree', {
                    url: '/folders-tree',
                    templateUrl: 'app/pages/folders-tree/folders-tree.html',
                    controller: 'FoldersTreeController',
                    controllerAs: 'vm'
                });

            $urlRouterProvider.otherwise('/home');
        });
})();




