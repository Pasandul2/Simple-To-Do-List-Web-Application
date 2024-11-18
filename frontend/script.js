const apiBaseUrl = "http://localhost:3000/tasks";

const addTaskButton = document.getElementById("addTaskButton");
const taskPopup = document.getElementById("taskPopup");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const cancelButton = document.getElementById("cancelButton");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const popupTitle = document.getElementById("popupTitle");

let editingTask = null;

// Show Feedback Message
function showFeedback(message, type) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;

    setTimeout(() => {
        feedback.classList.remove("show");
    }, 2000); 
}

// Open Popup
function openPopup(title, task = null) {
    popupTitle.textContent = title;
    taskTitle.value = task?.title || "";
    taskDescription.value = task?.description || "";
    editingTask = task;
    taskPopup.classList.remove("hidden");
    taskTitle.focus();

}

// Close Popup
function closePopup() {
    taskPopup.classList.add("hidden");
    taskForm.reset();
    editingTask = null;
}

// Fetch tasks from the backend
async function fetchTasks() {
    try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
        const tasks = await response.json();
        taskList.innerHTML = ""; 
        tasks.forEach((task) => {
            const taskElement = createTaskElement(task);
            task.element = taskElement;
            taskList.appendChild(taskElement);
        });
    } catch (error) {
        showFeedback(error.message, "error");
    }
}

// Add a new task via the backend
async function addTaskToServer(task) {
    const response = await fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add task");
    }
    return response.json();
}

// Delete a task via the backend
async function deleteTaskFromServer(id) {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete task");
    }
}

// Update task details via the backend
async function updateTask(task) {
    const response = await fetch(`${apiBaseUrl}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update task");
    }
}

// Create Task Element
function createTaskElement(task) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskInfo = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed || false;

    // Apply styles for completed tasks
    if (task.completed) {
        li.classList.add("completed");
        editButton.style.display = "none";
        deleteButton.style.backgroundColor = "#ff6666";
    }

    checkbox.addEventListener("change", async () => {
        task.completed = checkbox.checked;
        li.classList.toggle("completed", task.completed);
        editButton.style.display = checkbox.checked ? "none" : "inline-block";
        deleteButton.style.backgroundColor = task.completed ? "#ff6666" : "";

        try {
            await updateTask(task);
            showFeedback(
                task.completed ? "Task marked as completed!" : "Task unmarked!",
                "success"
            );
        } catch (error) {
            showFeedback(error.message, "error");
        }
    });

    taskInfo.innerHTML = `<strong class="task-title">${task.title}</strong><br><span class="task-desc">${task.description}</span>`;
    taskInfo.classList.add("task-info");

    editButton.textContent = "Edit";
    editButton.classList.add("btn");
    editButton.addEventListener("click", () => openPopup("Edit Task", task));

    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "cancel");
    deleteButton.addEventListener("click", async () => {
        try {
            await deleteTaskFromServer(task.id);
            taskList.removeChild(li);
            showFeedback("Task deleted successfully!", "success");
        } catch (error) {
            showFeedback(error.message, "error");
        }
    });

    li.appendChild(checkbox);
    li.appendChild(taskInfo);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
}

// Capitalize the first letter in input fields
document.querySelectorAll('input[type="text"], textarea').forEach((input) => {
    input.addEventListener('input', function () {
        const value = input.value;
        if (value.length > 0) {
            input.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
    });
});




// Form Submit Handler
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const task = {
        title: taskTitle.value,
        description: taskDescription.value,
        completed: editingTask?.completed || false,
    };

    try {
        if (editingTask) {
            // Update existing task
            editingTask.title = task.title;
            editingTask.description = task.description;
            editingTask.element.querySelector("strong").textContent = task.title;
            editingTask.element.querySelector("div").innerHTML = `<strong>${task.title}</strong><br>${task.description}`;

            await updateTask(editingTask);
            showFeedback("Task updated successfully!", "success");
        } else {
            // Add new task
            const newTask = await addTaskToServer(task);
            const taskElement = createTaskElement(newTask);
            task.element = taskElement;
            taskList.appendChild(taskElement);
            showFeedback("Task added successfully!", "success");
        }
    } catch (error) {
        showFeedback(error.message, "error");
    }

    closePopup();
});


addTaskButton.addEventListener("click", () => openPopup("Add Task"));

cancelButton.addEventListener("click", closePopup);

document.addEventListener("DOMContentLoaded", fetchTasks);
