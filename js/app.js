'use strict';
const $ = document;
const taskInput = $.querySelector('.task-input');
const addBtn = $.querySelector('.task-add');
const deleteAllBtn = $.querySelector('.task-delete-all');
const taskList = $.querySelector('#task-list');
let taskArr = [];
console.log(taskArr);
let taskId = 0;
// Functions
// Add Taks 
function addTask() {
    // Creating Task Object
    let taskObj = {
        id: taskArr.length + 1,
        title: taskInput.value,
        compelete: false,
    };

    taskArr.push(taskObj);

    // setting task to localstorage
    setLocalStorage(taskArr);

    // Create Task Element and Appending it to List (DOM) 
    taskGenerator(taskArr);
    taskInput.value = '';
    taskInput.focus();
};

// Add task  to Localstoraeg
function setLocalStorage(taskArray) {
    localStorage.setItem('tasks', JSON.stringify(taskArray))
};

// Creating Tasks From Task Array 
function taskGenerator(taskArray) {
    let newTaskRow, newTaskElement, newDeleteBtn;
    taskList.innerHTML = '';
    taskArray.forEach((el) => {
        //Creating DOM Elements 
        newTaskRow = $.createElement('li');
        newTaskRow.classList = 'task-row row list-group-item d-flex justify-content-around align-items-center rounded-0';

        newTaskElement = $.createElement('p');
        newTaskElement.textContent = el.title;
        newTaskElement.classList = 'task-link col-8 text-start px-2';

        newDeleteBtn = $.createElement('i');
        newDeleteBtn.classList = 'fa fa-trash fa-2x text-danger task-remove text-center col-4';
        newDeleteBtn.setAttribute('onclick', `removeTask(${el.id})`);

        newTaskRow.append(newTaskElement, newDeleteBtn);
        taskList.append(newTaskRow);
    });
};
// Store Dom after Load 
function getLocalStorage() {
    let arrayTasks = JSON.parse(localStorage.getItem('tasks'));
    if (arrayTasks) {
        taskArr = arrayTasks;
    } else {
        taskArr = [];
    };
    taskGenerator(taskArr);
};

// Delete All Tasks from Dom 
function clearTasks() {
    localStorage.clear();
    taskList.innerHTML = '';
    taskArr = [];
};

// Delete Btn 
function removeTask(id) {
    let loclstorageArr = JSON.parse(localStorage.getItem('tasks'));
    taskArr = loclstorageArr;
    let taskIndex = taskArr.findIndex((taskList) => {
        return taskList.id === id
    });
    taskArr.splice(taskIndex, 1);
    setLocalStorage(taskArr);
    taskGenerator(taskArr);
};
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (el) => { if (el.key === 'Enter') addTask() });
window.addEventListener('load', getLocalStorage);
deleteAllBtn.addEventListener('click', clearTasks)
