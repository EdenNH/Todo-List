'use strict'
const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : []
}


function createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAtMS: Date.now(),
        importance: 1
    }
}

function getTodos() {
    return gTodos.filter(function (todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
}

function setSort(sortValue) {
    switch (sortValue) {
        case 'text':
            sortByKey(gTodos, 'txt')
            break;
        case 'created':
            sortByKey(gTodos, 'createdAt')
            break;
        case 'importance':
            sortByKey(gTodos, 'importance')
            break;
    }
}


function addTodo(todoTxt) {
    gTodos.unshift(createTodo(todoTxt));
    saveToStorage(KEY_TODOS, gTodos);

}


function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}


function setFilter(statusFilter) {
    gTodosFilter = statusFilter;
}


function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}


function getTodoCount() {
    return gTodos.length;
}


function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}


function todoImportance(todoId, elTodo) {
    var currTodo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    currTodo.importance = elTodo.value;
    saveToStorage(KEY_TODOS, gTodos);
    saveToStorage(todoId, elTodo.value)
}

