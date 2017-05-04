(function () {
    'use strict';

    angular.module('app').controller('BaseController', BaseController);

    function BaseController($state) {
        var vm = this;
        vm.goHome = function(){
            $state.go('home');
        }

    }
})();