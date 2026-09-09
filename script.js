// 1. Element references
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDescription = document.getElementById('task-description');
const priority = document.getElementById('priority');
const taskList = document.getElementById('task-list');

// 2. Task storage

const tasks = [];

// Handle form submission

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
// Display tasks

function displayTasks() {

    taskList.innerHTML = "";

    for (const task of tasks) {
        const el = document.createElement("li");
        el.className = `task task-${task.priority}`;

        if (task.completed) {
            el.classList.add("task-completed");
        }

        const body = document.createElement("div");
        body.className = "task_body";

        const title = document.createElement("span");
        title.className = "task_title";
        title.textContent = task.title;
        body.appendChild(title);

        if (task.description) {
            const desc = document.createElement("span");
            desc.className = "task_desc";
            desc.textContent = task.description;
            body.appendChild(desc);
        }

        const badge = document.createElement("span");
        badge.className = "task_badge";
        badge.textContent = task.priority;

        const completeButton = document.createElement("button");
        completeButton.className = "button button-complete";
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "button button-delete";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            displayTasks();
        });

        const actions = document.createElement("div");
        actions.className = "task_actions";
        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        el.appendChild(body);
        el.appendChild(badge);
        el.appendChild(actions);
        taskList.appendChild(el);
    }
}