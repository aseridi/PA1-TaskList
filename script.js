// 1. Element references
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDescription = document.getElementById('task-description');
const priority = document.getElementById('priority');
const taskList = document.getElementById('task-list');

console.log(form, taskInput, taskDescription, priority, taskList);
// 2. Task storage

const tasks = [];

// 3. Handle form submission

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskInput.value.trim();
    const description = taskDescription.value.trim();
    if (title === "") {
        alert("Task title cannot be empty.");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        description: description,
        priority: priority.value,
        completed: false
    };
    tasks.push(task);
    form.reset();
    displayTasks();
});

// 4. Display tasks

function displayTasks() {

    taskList.innerHTML = "";

    for (const task of tasks) {

        const el = document.createElement("div");
        el.className = "task";

        const text = document.createElement("span");
        text.textContent = `${task.title} - [${task.priority}]`;

        if (task.completed) {
            el.classList.add("completed");
        }

        const completedButton = document.createElement("button");
        completedButton.textContent = "Complete";
        completedButton.className = "complete-button";
        completedButton.addEventListener("click", function () {
            task.completed = !task.completed;
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            displayTasks();
        });

        el.appendChild(text);
        el.appendChild(completedButton);
        el.appendChild(deleteButton);
        taskList.appendChild(el);
    }
}
