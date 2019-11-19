import angular from 'angular';

 var app = angular.module("AppModule", []);
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


