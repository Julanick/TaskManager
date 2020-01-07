import { url } from './config/url'

function getTaskById(id) {
    return $.ajax({
        type: "GET",
        url: url + "/tasks/" + id
    });
};

function createTask(task) {
    return $.ajax({
        type: "POST",
        url: url + "/tasks",
        data: task,
    });
};

function updateTask(task) {
    return $.ajax({
        type: "PUT",
        url: url + "/tasks/" + task._id,
        data: task,
    });
};

function deleteTask(id) {
    return $.ajax({
        type: "DELETE",
        url: url + "/tasks/" + id
    });
};

function getAllDayTasks(date) {
    return $.ajax({
        type: "GET",
        url: url + "/days",
        data: { date: date.toISOString() },
    });
}

export { getTaskById, createTask, updateTask, deleteTask, getAllDayTasks }