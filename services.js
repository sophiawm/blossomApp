let taskList = document.getElementById("list-container");
let addToDoBotton = document.getElementById("add-todo");

//Read-get
async function showTasks () {
    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    data.forEach(task => {
        taskList.innerHTML += `
        <div id="list-box-structure">
            <div id="todo-first-line">
                <label class="checkbox-container">
                    <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="updateCompletedTask(${data.id}, this.checked)>
                    <span class="checkmark"></span>
                </label>
                <h4 id="task-item-text">${task.text}</h4>
            </div>
            <p id="description-item-text">${task.description}</p>
            <p id="group-task-item">${task.group}</p>
        </div>
        <div id="todo-line-icons"> 
            <img onclick="editTask(${task.id})" id="edit-icon" src="images/icons/edit-icon.png" alt="edit-icon">
            <img onclick="removeTask(${task.id})" id="delete-icon" src="images/icons/delete-icon.png" alt="delete-icon">
        </div>`;
    });
};

//document.addEventListener("DOMContentLoaded", showTasks);


//Create-post
async function createTask(){

};
