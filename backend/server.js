const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let tasks = [];
let idCounter = 1;

// API Endpoints

// GET tasks - Retrieve all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST tasks - Add a new task
app.post("/tasks", (req, res) => {
    const { title, description } = req.body;
   
    if (!title) {
        return res.status(400).json({ error: "Title is required." });
    }

    // Create the new task object
    const newTask = { 
        id: idCounter++, 
        title, 
        description: description || "",  
        completed: false 
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});


// DELETE tasks/:id - Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted successfully." });
});

// PUT tasks/:id - Update the completion status of a task
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { title, description ,completed } = req.body;

    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: "Task not found." });
    }

    
    if (title) task.title = title;
    if (description) task.description = description;
    task.completed = completed;
    res.status(200).json(task);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
