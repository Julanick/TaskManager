import angular from 'angular';

var app = angular.module("AppModule", ['ui.bootstrap']);
app.controller('DatepickerDemoCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
});



 app.controller("TableTaskCntr", function ($scope) {
     $scope.tasks = [
         { name: "English", text: "Learn veb", flag: 1 },
         { name: "Ticket", text: "Buy ticket", flag: 1 },
         { name: "Contract", text: "Overwrite contract", flag: 1 },
         { name: "Meet", text: "Meet partners", flag: 1 },
         { name: "English", text: "Learn modal veb", flag: 1 },
     ];
 });

 app.controller("SelectUrgencCntr", function ($scope) {
     $scope.urgencys = ['low', 'moderate', 'high', 'extreme'];
     $scope.selected = "low";
 });

 app.controller("SelectStatusCntr", function ($scope) {
     $scope.statuses = ['new', 'in progress', 'closed'];
     $scope.selected = "new";
 });


