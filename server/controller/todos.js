const Todo = require("../models/todos");

const AddToDos = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user,
    });
    await todo.save();

    if (todo) {
      res.status(201).json({
        message: "Todo added successfully",
        data: todo,
        success: true,
      });
    } else {
      res.status(400).json({ message: "Failed to add Todo", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const fetchTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Todos fetched successfully",
      todos: todos,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.query;
    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      user: req.user,
    });
    if (todo) {
      res
        .status(200)
        .json({ message: "Todo deleted successfully", success: true });
    } else {
      res
        .status(400)
        .json({ message: "Failed to delete Todo", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateTodo = async (req, res) => {
  try {
    console.log(req.body);
    const { todoId } = req.query;
    console.log({ todoId });
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, user: req.user },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }

    return res.status(200).json({ todo, success: false });
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error("Failed to update todo:", error);
    return res
      .status(500)
      .json({ message: "Failed to update todo", success: false });
  }
};

module.exports = {
  AddToDos,
  fetchTodos,
  deleteTodo,
  updateTodo,
};
