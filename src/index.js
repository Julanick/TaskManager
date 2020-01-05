import angular from 'angular';
import _ from 'lodash';

var app = angular.module("AppModule", ['ui.bootstrap']);
app.controller('DatepickerDemoCtrl', function($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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


app.controller("TasksCntr", function($scope) {

    var newTaskTemplate = { id: "", name: "", text: "", flag: 1, urgency: "Low", status: "New" };

    $scope.tasks = [
        { id: uuidv4(), name: "English", text: "Learn veb", flag: 1, urgency: "Low", status: "New" },
        { id: uuidv4(), name: "Ticket", text: "Buy ticket", flag: 1, urgency: "Low", status: "New" },
        { id: uuidv4(), name: "Contract", text: "Overwrite contract", flag: 1, urgency: "Low", status: "New" },
        { id: uuidv4(), name: "Meet", text: "Meet partners", flag: 1, urgency: "Low", status: "New" }
    ];

    $scope.selectedTask = $scope.tasks[0];

    $scope.newTaskModel = _.clone(newTaskTemplate);

    $scope.create = function() {
        $scope.newTaskModel.id = uuidv4();

        $scope.tasks.push($scope.newTaskModel);
        $scope.newTaskModel = _.clone(newTaskTemplate);
    };
    $scope.update = function() {
        //alert("Updated" + selectedTask.id);
    };
    $scope.delete = function(id) {
        _.remove($scope.tasks, function(task) { return task.id === id; });
    };
    $scope.select = function(id) {
        $scope.selectedTask = _.find($scope.tasks, function(task) { return task.id === id; });
    };
});

app.controller("SelectUrgencCntr", function($scope) {
    $scope.urgencys = ['Low', 'Moderate', 'High', 'Extreme'];
    $scope.selected = "Low";
});

app.controller("SelectStatusCntr", function($scope) {
    $scope.statuses = ['New', 'In progress', 'Closed'];
    $scope.selected = "New";
});


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}