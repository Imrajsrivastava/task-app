import { Task } from "../models/task.model.js";

export const createTask = async (ownerId, data) => {
  const task = new Task({ ...data, owner: ownerId });
  return await task.save();
};

export const getTasks = async (ownerId, { page = 1, limit = 10, q = "", status = "all" }) => {
  const skip = (page - 1) * limit;
  const filter = { owner: ownerId };

  if (status !== "all") filter.status = status;
  if (q) filter.$or = [
    { title: { $regex: q, $options: "i" } },
    { description: { $regex: q, $options: "i" } },
  ];

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  return { tasks, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const getTaskById = async (id, ownerId) => {
  const task = await Task.findById(id);
  if (!task || task.owner.toString() !== ownerId.toString()) return null;
  return task;
};

export const updateTask = async (id, ownerId, updates) => {
  const task = await getTaskById(id, ownerId);
  if (!task) return null;

  Object.assign(task, updates);
  return await task.save();
};

export const deleteTask = async (id, ownerId) => {
  const task = await getTaskById(id, ownerId);
  if (!task) return null;

  await task.deleteOne();
  return true;
};
