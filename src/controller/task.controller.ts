import { Request, Response } from "express";
import { get } from "lodash";
import {
  createTask,
  findTask,
  findAndUpdate,
  deleteTask,
} from "../service/task.service";

export async function createTaskHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const task = await createTask({ ...body, user: userId });

  return res.send(task);
}

export async function updateTaskHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const taskId = get(req, "params.taskId");
  const update = req.body;

  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (String(task.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedTask = await findAndUpdate({ taskId }, update, { new: true });

  return res.send(updatedTask);
}
export async function getTaskHandler(req: Request, res: Response) {
  const taskId = get(req, "params.taskId");
  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  return res.send(task);
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const taskId = get(req, "params.taskId");

  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (String(task.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteTask({ taskId });

  return res.sendStatus(200);
}
