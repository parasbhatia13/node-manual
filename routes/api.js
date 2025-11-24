import express from "express";
import { handleGetTasks } from "../controller/getTaskController.js";
import { handleCreateTask } from "../controller/createTaskController.js";
import { decryptBody } from "../middleware/encryption.js";
import { handleDeleteTask } from "../controller/deleteTaskController.js";
const router = express.Router();

router.get("/get-tasks", handleGetTasks);

router.post("/create-task", decryptBody, handleCreateTask);

router.delete("/delete-task/:id", handleDeleteTask)

export default router;
