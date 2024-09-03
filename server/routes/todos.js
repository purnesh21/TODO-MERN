const express = require("express");
const { login, register, profile } = require("../controller/auth");
const authMiddleware = require("../middlewaare/auth");
const {
  AddToDos,
  fetchTodos,
  deleteTodo,
  updateTodo,
} = require("../controller/todos");
const router = express.Router();

router.post("", authMiddleware, AddToDos);
router.get("", authMiddleware, fetchTodos);
router.delete("", authMiddleware, deleteTodo);
router.put("", authMiddleware, updateTodo);

module.exports = router;
