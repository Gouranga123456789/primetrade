import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import Task from "../models/Task.js";
import { minLen } from "../utils/validators.js";

export const getTasks = asyncHandler(async (req, res) => {
  const { q, status } = req.query;

  const filter = { userId: req.user._id };

  if (status === "open") filter.completed = false;
  if (status === "done") filter.completed = true;

  if (q && q.trim()) {
    const regex = new RegExp(q.trim(), "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }

  const tasks = await Task.find(filter).sort({ updatedAt: -1 });

  res.json({ tasks });
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!minLen(title, 2)) throw new AppError("Title must be at least 2 characters.", 400);

  const task = await Task.create({
    userId: req.user._id,
    title: title.trim(),
    description: (description || "").trim(),
  });

  res.status(201).json({ task });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id, userId: req.user._id });
  if (!task) throw new AppError("Task not found.", 404);

  const { title, description, completed } = req.body;

  if (title !== undefined) {
    if (!minLen(title, 2)) throw new AppError("Title must be at least 2 characters.", 400);
    task.title = title.trim();
  }

  if (description !== undefined) task.description = (description || "").trim();
  if (completed !== undefined) task.completed = Boolean(completed);

  await task.save();

  res.json({ task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id, userId: req.user._id });
  if (!task) throw new AppError("Task not found.", 404);

  await task.deleteOne();

  res.json({ message: "Task deleted." });
});
