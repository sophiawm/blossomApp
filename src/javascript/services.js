let taskList = document.getElementById("list-container");

let taskForm = document.getElementById("new-todo-form");
let textInput = document.getElementById("task-form");
let descriptionInput = document.getElementById("description-form");
let groupSelection = document.getElementById("group-options");
let dueDateInput = document.getElementById("due-date-form");


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
                <img onclick="editTask(${task.id})" id="edit-icon" src="../images/icons/edit-icon.png" alt="edit-icon">
                <img onclick="removeTask(${task.id})" id="delete-icon" src="../images/icons/delete-icon.png" alt="delete-icon">
            </div>
        </div>`;
    });
};

document.addEventListener("DOMContentLoaded", showTasks);


//Create-post
async function createTask(){

};

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    taskFormValidation();
});

let taskFormValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msgTaskInput.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msgTaskInput.innerHTML = "";
        acceptData();
    }
};


let acceptData = () => {
    data["text"] = textInput.value;
    data["description"] = descriptionInput.value;
    data["group"] = groupSelection.value;
    createTasks();
};

//Update-patch
async function updateTasks(id, task){

}


