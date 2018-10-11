'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();
    render();
}

function render() {
    renderTodos();
    renderStats();
}


function renderTodos() {
    var todos = getTodos();
    var strHtmls = todos.map(function (todo) {
        var timeToShow = timeCreatedToTimeFormat(todo.createdAt);
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')">
                   ${timeToShow} ${todo.txt}
                   <button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)">
                      &times;
                    </button>
                    <select id="todo-importance" 
                        onclick="event.stopPropagation()" 
                        onchange="onSetImportance('${todo.id}', this)">
                        <option ${todo.importance === "1" ? 'selected' : ''} value="1">1</option>
                        <option ${todo.importance === "2" ? 'selected' : ''} value="2">2</option>
                        <option ${todo.importance === "3" ? 'selected' : ''} value="3">3</option>
                    </select>
                </li>`;
    })
    document.querySelector('.todo-list').innerHTML = strHtmls.join('')
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render();
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
    render();
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var newTodoTxt = elNewTodoTxt.value;
    if (!newTodoTxt) return;
    addTodo(newTodoTxt);

    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function () {
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    render()
}

function onDeleteTodo(todoId, ev) {
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation();
    deleteTodo(todoId);
    render();
}

function onSetImportance(todoId, elTodo) {
    todoImportance(todoId, elTodo)
}


function onSetSort(sortOrder) {
    setSort(sortOrder)
    render()
}