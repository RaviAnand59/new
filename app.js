const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy array to store tasks (in memory)
let tasks = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to add a new task
app.post('/addTask', (req, res) => {
    const { task } = req.body;
    tasks.push(task); // Add task to the tasks array
    res.json({ message: 'Task added successfully', task });
});

// Route to delete a task
app.delete('/deleteTask', (req, res) => {
    const { task } = req.body;
    tasks = tasks.filter(t => t !== task); // Remove task from the tasks array
    res.json({ message: 'Task deleted successfully', task });
});

// Route to fetch all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
