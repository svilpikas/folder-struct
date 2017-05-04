(function () {
    'use strict';

    angular.module('app').controller('FoldersTreeController', FoldersTreeController);

    function FoldersTreeController(ngDialog, $rootScope) {
        var vm = this;
        var fakeData = [
            {
                id: 1,
                name: "Namai",
                parent_id: 0,
                visible: 1,
                created_at: "2016-05-21",
                updated_at: "2016-05-21"
            },
            {
                id: 2,
                name: "Namai2",
                parent_id: 0,
                visible: 1,
                created_at: "2016-05-21",
                updated_at: "2016-05-21"
            },
            {
                id: 3,
                name: "Namai3",
                parent_id: 1,
                visible: 1,
                created_at: "2016-05-21",
                updated_at: "2016-05-21"
            },
            {
                id: 4,
                name: "Namai4",
                parent_id: 1,
                visible: 1,
                created_at: "2016-05-21",
                updated_at: "2016-05-21"
            },

            {
                id: 5,
                name: "Namai5",
                parent_id: 3,
                visible: 1,
                created_at: "2016-05-21",
                updated_at: "2016-05-21"
            },
            {
                id: 6,
                name: "Namai6",
                parent_id: 2,
                visible: 1,
                created_at: "2016-05-21",
                updated_at: "2016-05-21"

            }];

        vm.fakeData = angular.copy(fakeData);
        vm.formatedData = {};
        vm.formatedReleationData = {};
        vm.home = {
            id: 0,
            parent_id: 0,
            name: 'Home'
        };
        vm.current = vm.home;
        vm.breadcrumb = {};
        vm.getSubFolders = getSubFolders;
        vm.getParentFolder = getParentFolder;
        vm.goToCurrent = goToCurrent;
        vm.createFolder = createFolder;

        formatFoldersData(fakeData);
        generateBreadcrumb(vm.current);
        function formatFoldersData(folder) {
            if (angular.isDefined(folder) && folder.length > 0 && folder !== null && folder[0].hasOwnProperty('id')) {
                angular.forEach(folder, function (innerFolder) {
                    if (angular.isUndefined(vm.formatedReleationData[innerFolder.parent_id])) {
                        vm.formatedReleationData[innerFolder.parent_id] = [];
                    }
                    vm.formatedReleationData[innerFolder.parent_id].push(innerFolder);
                    vm.formatedData[innerFolder.id] = innerFolder;
                })
            }
        }


        function getSubFolders(folder) {
            vm.current = folder;
            vm.breadcrumb = [];
            generateBreadcrumb(vm.current);
        }

        function getParentFolder(folder) {
            if (folder.id !== 0) {
                if (folder.parent_id === 0) {
                    vm.current = vm.home;
                } else {
                    vm.current = vm.formatedData[folder.parent_id];
                }
            }
            vm.breadcrumb = [];
            generateBreadcrumb(vm.current);
        }

        function generateBreadcrumb(folder) {
            if (folder.id !== 0) {
                if (folder.parent_id === 0) {
                    generateBreadcrumb(vm.home);
                } else {
                    generateBreadcrumb(vm.formatedData[folder.parent_id]);
                }
            }
            vm.breadcrumb[folder.id] = folder;
        }

        function goToCurrent(folder) {
            vm.current = folder;
            vm.breadcrumb = [];
            generateBreadcrumb(vm.current);
        }

        function createFolder(params) {
            ngDialog.open({
                template: 'app/pages/folders-tree/modal/create-folder.html',
                controller: 'CreateFolderController',
                controllerAs: 'vm',
                showClose: true,
                data: angular.isDefined(params) ? params : {}
            });
        }

        $rootScope.$on('changed-folder', function (event, args) {
            goToCurrent(args);
        });
        $rootScope.$on('create-folder', function (event, args) {
            vm.fakeData.push(args);
            args.id = vm.fakeData.length;
            if (angular.isDefined(vm.formatedReleationData[args.parent_id])) {
                vm.formatedReleationData[args.parent_id].push(args);
                vm.formatedData[args.id] = args;
            } else {
                vm.formatedReleationData[args.parent_id] = [];
                vm.formatedData[args.id] = args;
                vm.formatedReleationData[args.parent_id].push(args);
            }
        })
    }
})();