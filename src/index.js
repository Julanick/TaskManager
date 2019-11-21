import angular from 'angular';
import ui from 'ui-bootstrap';

var app = angular.module("AppModule", [ui]);
app.controller("TableTaskCntr", function($scope, $uibModal) {
    $scope.tasks = [
        { name: "English", text: "Learn veb", flag: 1 },
        { name: "Ticket", text: "Buy ticket", flag: 1 },
        { name: "Contract", text: "Overwrite contract", flag: 1 },
        { name: "Meet", text: "Meet partners", flag: 1 },
        { name: "English", text: "Learn modal veb", flag: 1 },
    ];

    $scope.open = function() {
        var modalInstance = $uibModal.open({
            templateUrl: "modalContent.html",
            controller: "ModalContentCtrl",
            size: '',
        });

        modalInstance.result.then(function(response) {
            $scope.result = `${response} button hitted`;
        });

    };

});

app.controller('ModalContentCtrl', function($scope, $uibModalInstance) {

    $scope.ok = function() {
        $uibModalInstance.close("Ok");
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    }

});

app.controller("SelectUrgencCntr", function($scope) {
    $scope.urgencys = ['low', 'moderate', 'high', 'extreme'];
    $scope.selected = "low";
});

app.controller("SelectStatusCntr", function($scope) {
    $scope.statuses = ['new', 'in progress', 'closed'];
    $scope.selected = "new";
});