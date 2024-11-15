const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: 'https://sinethemba-vitsha.github.io/my-todolist',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));


// MongoDB Atlas connection string (with URL-encoded password)
const mongoURI = 'mongodb+srv://vitsha:VITSHa%4097@todolist.o8nhn.mongodb.net/?retryWrites=true&w=majority&appName=Todolist';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

// Task schema and model
const taskSchema = new mongoose.Schema({ description: String });
const Task = mongoose.model('Task', taskSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task API');
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task({ description: req.body.description });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Vercel serverless function handler
module.exports = app;
