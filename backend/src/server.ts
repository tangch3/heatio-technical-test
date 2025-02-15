import cors from "cors";
import express from "express";
import { todos } from "./todos";

export const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/all-todos", (req, res) => {
  res.status(200).json({ message: "Data retrieved successfully", todos });
});

app.post("/add-todo", (req, res) => {
  const { task } = req.body;

  if (!task) {
    res.status(204).json({ message: "You must add a task", task });
    return;
  }

  const createNewTask = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    task: task,
    completed: false,
  };

  todos.push(createNewTask);

  res.status(201).json({ message: "Task added successfully", task });
});

app.delete("/delete-todo/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === parseInt(id));

  if (index === -1) {
    res.status(400).json({ message: "Todo not found" });
    return;
  }

  todos.splice(index, 1);

  res.status(200).json({ message: "Task deleted successfully" });
});

app.put("/update-status/:id", (req, res) => {
  const { id } = req.params;

  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    res.status(400).json({ message: "Todo not found" });
    return;
  }

  todo.completed = !todo.completed;

  res.status(200).json({ message: "Todo updated" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
