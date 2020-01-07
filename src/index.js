import angular from 'angular';
import _ from 'lodash';
import { getTaskById, createTask, updateTask, deleteTask, getAllDayTasks } from './taskDataProvider';

var app = angular.module("AppModule", ['ui.bootstrap']);

app.controller("TasksCntr", function($scope) {

    var newTaskTemplate = { _id: "", name: "", text: "", urgency: "Low", status: "New" };
    $scope.newTaskModel = _.clone(newTaskTemplate);
    $scope.create = function() {

        $scope.newTaskModel.date = $scope.dt.toISOString();

        createTask($scope.newTaskModel)
            .done(function(data) {
                $scope.newTaskModel._id = data;
                $scope.tasks.push($scope.newTaskModel);
                $scope.newTaskModel = _.clone(newTaskTemplate);
                $scope.$apply();
            })
            .fail(function(data) {
                alert("Task creation error!")
            });
    };
    $scope.update = function() {
        updateTask($scope.selectedTask)
            .done(function(data) {
                var existingTask = _.find($scope.tasks, function(task) { return task._id === $scope.selectedTask._id; });
                existingTask.title = data.title;
                existingTask.text = data.text;
                existingTask.status = data.status;
                existingTask.urgency = data.urgency;
                $scope.$apply();
            })
            .fail(function(data) {
                alert("Task update error!");
            });
    };

    $scope.delete = function(id) {
        deleteTask(id)
            .done(function(data) {
                _.remove($scope.tasks, function(task) { return task._id === id; });
                $scope.$apply();
            })
            .fail(function(data) {
                alert("Task delete error!");
            });

    };
    $scope.select = function(id) {
        $scope.selectedTask = _.clone(_.find($scope.tasks, function(task) { return task._id === id; }));
    };

    // -------------------------------

    $scope.today = function() {
        $scope.dt = new Date();
        $scope.dt.setHours(0, 0, 0, 0);
    };

    $scope.selectDate = function(dt) {
        dt.setHours(0, 0, 0, 0);
        getAllDayTasks(dt)
            .done(function(data) {

                $scope.tasks = data;
                $scope.selectedTask = $scope.tasks[0];
                $scope.$apply();
            })
            .fail(function(data) {
                alert("Error getting task for selected date!")
            });
    }

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

    $scope.selectDate($scope.dt);
});

app.controller("SelectUrgencCntr", function($scope) {
    $scope.urgencys = ['Low', 'Moderate', 'High', 'Extreme'];
    $scope.selected = "Low";
});

app.controller("SelectStatusCntr", function($scope) {
    $scope.statuses = ['New', 'In progress', 'Closed'];
    $scope.selected = "New";
});