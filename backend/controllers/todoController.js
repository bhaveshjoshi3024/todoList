const Todo = require("../models/todoModel");

// GET all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ updatedAt: -1 });
  res.json(todos);
};

// GET single todo
exports.getTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
};

// CREATE todo
exports.createTodo = async (req, res) => {
  const { title, description,date} = req.body;
  const newTodo = await Todo.create({ title, description,date });
  res.status(201).json(newTodo);
};

// UPDATE todo
exports.updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE todo
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
