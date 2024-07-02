const $add = document.getElementById('add');
const $button = document.getElementById('button');
const $deleteAll = document.getElementById('deleteAll');

const $all = document.getElementById('all');
const $active = document.getElementById('active');
const $completed = document.getElementById('completed');
const $remove = document.getElementById('remove');

const $allAdd = document.getElementById('allAdd');
const $activeAll = document.getElementById('activeAll');
const $completedDele = document.getElementById('completedDele');

let todo = JSON.parse(localStorage.getItem("todo")) || [];
let check = JSON.parse(localStorage.getItem("check")) || [];
let nocheck = JSON.parse(localStorage.getItem("nocheck")) || [];

function render() {
    let string = "";
    for (let i = 0; i < todo.length; i++) {
        string += `
        <div class="task">
            <input type="checkbox" class="inputTask" data-id="${todo[i].id}" ${todo[i].completed ? 'checked' : ''}/>
            <label class="contectTask">${todo[i].task}</label>
        </div>
        `;
    }
    document.getElementById('list').innerHTML = string;
}

function renderCompleted() {
    let string = "";
    for (let i = 0; i < check.length; i++) {
        string += `
        <div class="task">
            <input type="checkbox" class="inputTask" data-id="${check[i].id}" checked/>
            <label class="contectTask">${check[i].task}</label>
            <button id="remove" data-id="${check[i].id}">Remove</button>
        </div>
        `;
    }
    document.getElementById('listDele').innerHTML = string;
}

function renderActive() {
    let string = "";
    for (let i = 0; i < nocheck.length; i++) {
        string += `
        <div class="task">
            <input type="checkbox" class="inputTask" data-id="${nocheck[i].id}"/>
            <label class="contectTask">${nocheck[i].task}</label>
        </div>
        `;
    }
    document.getElementById('listActive').innerHTML = string;
}

function add() {
    let value = $add.value.trim();
    if (value !== '') {
        const newTodo = {
            id: todo.length + 1,
            task: value,
            completed: false
        };
        todo.push(newTodo);
        nocheck.push(newTodo);
        localStorage.setItem("todo", JSON.stringify(todo));
        localStorage.setItem("nocheck", JSON.stringify(nocheck));
        render();
        renderActive();
    }
}

document.addEventListener('change', function(event) {
    if (event.target.classList.contains('inputTask')) {
        const taskId = parseInt(event.target.getAttribute('data-id'));
        const taskIndex = todo.findIndex(item => item.id === taskId);
        if (taskIndex !== -1) {
            todo[taskIndex].completed = event.target.checked;
            if (todo[taskIndex].completed) {
                check.push(todo[taskIndex]);
                const nocheckIndex = nocheck.findIndex(item => item.id === taskId);
                if (nocheckIndex !== -1) {
                    nocheck.splice(nocheckIndex, 1);
                }
            } else {
                nocheck.push(todo[taskIndex]);
                const checkIndex = check.findIndex(item => item.id === taskId);
                if (checkIndex !== -1) {
                    check.splice(checkIndex, 1);
                }
            }
            localStorage.setItem("todo", JSON.stringify(todo));
            localStorage.setItem("check", JSON.stringify(check));
            localStorage.setItem("nocheck", JSON.stringify(nocheck));
            renderCompleted();
            renderActive();
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.id === 'remove') {
        const taskId = parseInt(event.target.getAttribute('data-id'));
        const taskIndex = check.findIndex(item => item.id === taskId);
        if (taskIndex !== -1) {
            const todoIndex = todo.findIndex(item => item.id === taskId);
            if (todoIndex !== -1) {
                todo.splice(todoIndex, 1);
            }
            check.splice(taskIndex, 1);
            localStorage.setItem("todo", JSON.stringify(todo));
            localStorage.setItem("check", JSON.stringify(check));
            renderCompleted();
        }
    }
});

$all.onclick = function() {
    $allAdd.style.display = "inline";
    $activeAll.style.display = "none";
    $completedDele.style.display = "none";
    $all.style.borderBottom = "5px solid blue";
    $active.style.borderBottom = "5px solid white";
    $completed.style.borderBottom = "5px solid white";
    render();
}

$active.onclick = function() {
    $allAdd.style.display = "none";
    $activeAll.style.display = "inline";
    $completedDele.style.display = "none";
    $all.style.borderBottom = "5px solid white";
    $active.style.borderBottom = "5px solid blue";
    $completed.style.borderBottom = "5px solid white";
    renderActive();
}

$completed.onclick = function() {
    $allAdd.style.display = "none";
    $activeAll.style.display = "none";
    $completedDele.style.display = "inline";
    $all.style.borderBottom = "5px solid white";
    $active.style.borderBottom = "5px solid white";
    $completed.style.borderBottom = "5px solid blue";
    renderCompleted();
}

$button.onclick = function() {
    add();
    $add.value = ""; 
}

$deleteAll.onclick = function() {
    check.length = 0; 
    todo = todo.filter(item => !item.completed);
    localStorage.setItem("todo", JSON.stringify(todo));
    localStorage.setItem("check", JSON.stringify(check));
    renderCompleted();
    render();
}

todo.forEach(item => {
    if (item.completed) {
        check.push(item);
    } else {
        nocheck.push(item);
    }
});
localStorage.setItem("check", JSON.stringify(check));
localStorage.setItem("nocheck", JSON.stringify(nocheck));

render();
renderCompleted();
renderActive();
