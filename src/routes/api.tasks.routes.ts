import { Express, Router } from "express";
import {
    createTaskHandler,
    updateTaskHandler,
    getTaskHandler,
    deleteTaskHandler,
} from "../controller/task.controller";
import { validateRequest, requiresUser } from "../middleware";
import {
    createTaskValidationSchema,
    updateTaskValidationSchema,
    deleteTaskValidationSchema,
} from "../validator/task.validator";

export default function (app: Express) {
    const tasksRouter = Router();

    // Create a task
    tasksRouter.post(
        "/",
        [requiresUser, validateRequest(createTaskValidationSchema)],
        createTaskHandler
    );

    // Update a task
    tasksRouter.put(
        "/:taskId",
        [requiresUser, validateRequest(updateTaskValidationSchema)],
        updateTaskHandler
    );

    // Get a task
    tasksRouter.get("/:taskId", getTaskHandler);

    // Delete a task
    tasksRouter.delete(
        "/:taskId",
        [requiresUser, validateRequest(deleteTaskValidationSchema)],
        deleteTaskHandler
    );

    // Mount the tasks router under '/api/tasks'
    app.use("/api/tasks", tasksRouter);
}
