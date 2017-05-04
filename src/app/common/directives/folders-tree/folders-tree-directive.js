(function () {
    angular.module('app').directive('folderTree', folderTree);
    function folderTree() {
        var directive = {
            bindToController: true,
            link: link,
            controller: FoldersTreeDirectiveController,
            controllerAs: 'vm',
            templateUrl: 'app/common/directives/folders-tree/explorer-tree.html',
            restrict: 'E',
            scope: {
                all: '=',
                breadcrumb: '=',
                currentiteration: '='
            }
        };

        function link(scope, element, attrs) {
        }

        return directive;


    }

    function FoldersTreeDirectiveController($scope, $rootScope) {
        var vm = this;
        vm.formatedReleationData = $scope.vm.all;
        vm.breadcrumb = $scope.vm.breadcrumb;
        vm.currentIteration = $scope.vm.currentiteration;
        vm.goTo = goTo;
        function goTo(folder) {
            $rootScope.$broadcast('changed-folder', folder);
        }
    }
})();