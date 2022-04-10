const form = document.querySelector("#task-form");
const taskList = document.querySelector(".container__row__box__card--action__ul");
const clearBtn = document.querySelector(".container__row__box__card--action__clear--tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");

    // add class
    
    li.className = "collection-item";
    
    li.appendChild(document.createTextNode(task));
    
    const link = document.createElement("a");
    
    link.className = "delete-item secondary-content";
    
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    link.style.float = "right";
    link.style.marginRight = "10px";
    link.style.marginTop = "1px";
    link.style.color = "red";
    
    li.style.padding = "10px 20px";
    li.style.border = "1px solid black";
    li.style.borderRadius = "3px";
    
    
    li.appendChild(link);
    
    taskList.appendChild(li);
});
}

/* add task */

function addTask(e) {
    if(taskInput.value === '') {
        alert("add task");
    }

    const li = document.createElement("li");

    // add class

    li.className = "collection-item";

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    link.style.float = "right";
    link.style.marginRight = "10px";
    link.style.marginTop = "1px";
    link.style.color = "red";

    li.style.padding = "10px 20px";
    li.style.border = "1px solid black";
    li.style.borderRadius = "3px";

    
    li.appendChild(link);
    
    taskList.appendChild(li);

    // store in ls

    storeTaskInLocalStorage(taskInput.value);
    
    // clear input
    taskInput.value = '';

    e.preventDefault(); 
}

// store Task

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}


function removeTask(e) {
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you Sure ?")) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}

// remove from ls

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice (index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll(".collection-item").forEach
    (function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });
}