let taskList = document.getElementById("list-container");

let taskForm = document.getElementById("new-todo-form");

let inputId = document.getElementById("id-input-form");
let textInput = document.getElementById("task-form");
let descriptionInput = document.getElementById("description-form");
let groupSelection = document.getElementById("group-options");
let dueDateInput = document.getElementById("due-date-form")
let addToDoBotton = document.getElementById("add-todo");



//Read-get
async function showTasks() {
    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    console.log(data)
    data.forEach(task => {
        taskList.innerHTML += `
        <div class="list-item-container">
            <div id="list-box-structure">
                <div id="todo-first-line">
                <label class="checkbox-container">
                    <input type="checkbox" class="taskCheckbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="updateCompletedTask(${task.id}, this.checked)">
                    <span class="checkmark"></span>
                </label>
                    <h4 id="task-item-text">${task.text}</h4>
                </div>
                <p id="description-item-text">${task.description}</p>
                <div class="task-group-duedate">
                    <p id="group-task-item">${task.group}</p>
                    <p id="due-date-item">${task.dueDate}</p>
                </div>
            </div>
            <div id="todo-line-icons"> 
                <img onclick="editTask(${task.id})" id="edit-icon" src="images/icons/edit-icon.png" alt="edit-icon">
                <img onclick="removeTask(${task.id})" id="delete-icon" src="images/icons/delete-icon.png" alt="delete-icon">
            </div>
        </div>`;
    });
};

document.addEventListener("DOMContentLoaded", showTasks);


//Create-post
addToDoBotton.addEventListener("click", async () => {
    let idInput = inputId.value
    let taskText = textInput.value;
    let taskDescripcion = descriptionInput.value;
    let dueDateSelected = dueDateInput.value;
    let groupSelected = groupSelection.value;

    if (taskText !== "") {
    let response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: idInput,
            completed: false,
            text: taskText,
            description: taskDescripcion, 
            dueDate: dueDateSelected,
            group: groupSelected
        }),
    });

    if (response.ok) {
        // Si la solicitud POST es exitosa, agregar la nueva tarea a la lista en la interfaz
        const newTask = await response.json();
        tasks.push(newTask);
        createTasks(newTask);
    }
    }
});

function createTasks(task) {
    taskList.innerHTML += `
        <div class="list-item-container">
            <div id="list-box-structure">
                <div id="todo-first-line">
                <label class="checkbox-container">
                    <input type="checkbox" class="taskCheckbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="updateCompletedTask(${task.id}, this.checked)">
                    <span class="checkmark"></span>
                </label>
                    <h4 id="task-item-text">${task.text}</h4>
                </div>
                <p id="description-item-text">${task.description}</p>
                <div class="task-group-duedate">
                    <p id="group-task-item">${task.group}</p>
                    <p id="due-date-item">${task.dueDate}</p>
                </div>
            </div>
            <div id="todo-line-icons"> 
                <img onclick="editTask(${task.id})" id="edit-icon" src="images/icons/edit-icon.png" alt="edit-icon">
                <img onclick="removeTask(${task.id})" id="delete-icon" src="images/icons/delete-icon.png" alt="delete-icon">
            </div>
        </div>`;
    
    resetForm();
};

let resetForm = ()=>{
    textInput.value = textInput.placeholder;
    descriptionInput.value  = descriptionInput.placeholder;
    dueDateInput.value = "";
    groupSelection.value  = " ";
};


//Delete-delete
async function removeTask (id){
    let result = await fetch("http://localhost:3000/tasks");
    let data = await result.json();
    data.forEach( async task =>{
        if( id === task.id){
            const response = await fetch (`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE', })
        };
    });
    document.location.reload();
}



//Update-patch
async function editTask(id){
    let result = await fetch(`http://localhost:3000/tasks/${id}`)
    let data = await result.json()

    let hideContainerTask = document.getElementsByClassName("list-item-container");

    inputId.value = data.id;
    textInput.value = data.text;
    descriptionInput.value = data.description;
    dueDateInput = data.dueDate;
    groupSelection.value = data.group;

};

async function updateCompletedTask(id, completed){
    let result = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed})
    })
}

//data-bs-toggle="form" data-bs-target="#form"
