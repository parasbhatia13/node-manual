import responsehandler from "../utils/responsehandler.js";
import db from "../config/database.js"
export const handleDeleteTask = async (request, response) => {
  try {
    const id = request.params.id;
    if (!id) {
      responsehandler(response, true, "Task id is required", null, 400);
    }
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      responsehandler(response, true, "Task not found", null, 404);
    }
    responsehandler(response, false, "Task delete successfully ", null, 200);

  } catch (error) {
    console.log(error, "error");
    responsehandler(response, true, "Internal server error", null, 500);
  }
};
