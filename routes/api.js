import express from "express";
import { handleGetTasks } from "../controller/getTaskController.js";
import { handleCreateTask } from "../controller/createTaskController.js";
import { decryptBody } from "../middleware/encryption.js";
import { handleDeleteTask } from "../controller/deleteTaskController.js";
const router = express.Router();

router.get("/get-tasks", handleGetTasks);

router.post("/create-task", decryptBody, handleCreateTask);

router.delete("/delete-task/:id", handleDeleteTask)
// Update task
router.put('/tasks/:id', async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      const { id } = req.params;
  
      const updates = [];
      const values = [];
  
      if (title !== undefined) {
        updates.push('title = ?');
        values.push(title);
      }
      if (description !== undefined) {
        updates.push('description = ?');
        values.push(description);
      }
      if (completed !== undefined) {
        updates.push('completed = ?');
        values.push(completed);
      }
  
      if (updates.length === 0) {
        return res.status(400).json({ error: 'No updates provided' });
      }
  
      values.push(id);
      await db.query(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);
  
      const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const encrypted = encryptResponse(rows[0]);
      res.json(encrypted);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  });

export default router;
