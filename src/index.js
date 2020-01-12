import angular from 'angular';
import _ from 'lodash';
import { getTaskById, createTask, updateTask, deleteTask, getAllDayTasks } from './taskDataProvider';

var app = angular.module("AppModule", ['ui.bootstrap']);

app.controller("TasksCntr", function($scope) {

    var newTaskTemplate = { _id: "", title: "", text: "", urgency: "Not urgent", status: "New" };
    $scope.newTaskModel = _.clone(newTaskTemplate);
    $scope.create = function(task) {

        task.date = $scope.dt.toISOString();

        var promise = createTask(task);

        promise.done(function(taskId) {
                task._id = taskId;
                $scope.tasks.push(task);
                $scope.newTaskModel = _.clone(newTaskTemplate);
                $scope.$apply();
            })
            .fail(function(data) {
                alert("Task creation error!")
            });
    };

    $scope.update = function(taskToUpdate) {

        var promise = updateTask(taskToUpdate);
        promise.done(function(updatedTaskFromBackend) {
                var existingTaskOnUI = _.find($scope.tasks, function(taskFromUI) { return taskFromUI._id === updatedTaskFromBackend._id; });
                existingTaskOnUI.title = updatedTaskFromBackend.title;
                existingTaskOnUI.text = updatedTaskFromBackend.text;
                existingTaskOnUI.status = updatedTaskFromBackend.status;
                existingTaskOnUI.urgency = updatedTaskFromBackend.urgency;
                $scope.$apply();
            })
            .fail(function() {
                alert("Task update error!");
            });
    };

    $scope.delete = function(id) {

        var promise = deleteTask(id);
        promise.done(function() {
                _.remove($scope.tasks, function(task) { return task._id === id; });
                $scope.$apply();
            })
            .fail(function() {
                alert("Task delete error!");
            });
    };

    $scope.cloneAndSelect = function(task) {
        $scope.selectedTaskClone = _.clone(task);
    };

    // -------------------------------

    $scope.today = function() {
        $scope.dt = new Date();
        $scope.dt.setHours(0, 0, 0, 0);
    };

    $scope.selectDate = function(date) {
        date.setHours(0, 0, 0, 0);

        var promise = getAllDayTasks(date);

        promise.done(function(tasksFromBackend) {
                $scope.tasks = tasksFromBackend;
                $scope.cloneAndSelect($scope.tasks[0]);
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
    $scope.urgencys = ['Not urgent', 'Medium', 'Extreme'];
    $scope.selected = 'Not urgent';
});

app.controller("SelectStatusCntr", function($scope) {
    $scope.statuses = ['New', 'In progress', 'Closed'];
    $scope.selected = 'New';
});