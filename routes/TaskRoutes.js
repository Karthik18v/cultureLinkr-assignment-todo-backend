const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.post("/todos", async (request, response) => {
  try {
    const newTask = new Task(request.body);
    await newTask.save();
    response.status(200).json({ message: "Successfully Created Todo" });
  } catch (error) {
    response.status(500).json({ error: "Failed Create Todo" });
  }
});

router.get("/todos", async (request, response) => {
  try {
    const todos = await Task.find();
    response.status(200).json(todos);
  } catch (error) {
    response.status(500).json({ error: "Failed to Fetch Todos" });
  }
});

router.put("/todos/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const updateTask = await Task.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    if (!updateTask) {
      return res.status(404).json({ error: "Todo not found" });
    }
    response.status(200).json(updateTask);
  } catch (error) {
    response.status(500).json({ error: "Failed to Update Todos" });
  }
});

router.get("/todos/:id", async (request, response) => {
  try {
    const todo = await Task.findById(request.params.id);
    console.log(todo);
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }
    return response.status(200).json(todo);
  } catch (error) {
    response.status(500).json({ error: "Failed to Get Todo" });
  }
});

router.delete("/todos/:id", async (request, response) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(request.params.id);
    //console.log(deleteTask);
    if (!deleteTask) {
      return response.status(404).json({ error: "Todo not found" });
    }
    return response.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    response.status(500).json({ error: "Failed to Delete Todo" });
  }
});

router.patch("/todos/:id", async (request, response) => {
  try {
    const task = await Task.findById(request.params.id);
    console.log(task);
    if (!task) {
      return response.status(404).json({ error: "Todo not found" });
    }
    task.status = !task.status;
    await task.save();
    response.status(200).json(task);
  } catch (error) {
    response.status(500).json({ error: "Failed to Patch Todo" });
  }
});

module.exports = router;
