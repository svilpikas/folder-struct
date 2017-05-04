(function () {
    'use strict';

    angular.module('app').controller('CreateFolderController', CreateFolderController);

    function CreateFolderController(ngDialog, $scope, $rootScope) {
        var vm = this;
        var data = $scope.ngDialogData ? $scope.ngDialogData : false;
        vm.saveFolder = saveFolder;
        vm.closeModal = closeModal;
        function saveFolder(valid) {
            if (valid) {
                var folder = {
                    name: vm.data.name,
                    parent_id: data.id
                };
                $rootScope.$broadcast('create-folder', folder);
                ngDialog.closeAll();
            }
        }

        function closeModal() {
            ngDialog.closeAll();
        }

    }
})();