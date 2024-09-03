const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    date: { type: String, require: true },
    time: { type: String, require: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todosSchema);

module.exports = Todo;
