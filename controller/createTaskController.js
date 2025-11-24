import { encyrptData } from "../utils/encryption.js";
import responsehandler from "../utils/responsehandler.js";
import db from "../config/database.js"

export const handleCreateTask = async (request, response) => {
  try {
    const { name, description = "", isComplete = false } = request.body;
    if (!name) {
      responsehandler(response, true, "Task name is required", null, 400);
    }
    const [result] = await db.query(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
      [title, description, isComplete]
    );
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [
      result.insertId,
    ]);
    const encrypted = encyrptData(rows[0]);
    responsehandler(
      response,
      false,
      "Tasks created successfully",
      encrypted,
      201
    );
  } catch (error) {
    console.log(error, "error");
    responsehandler(response, true, "Error in creating task", null, 500);
  }
};
