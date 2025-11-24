import responsehandler from "../utils/responsehandler.js";
import db from "../config/database.js";
import { encyrptData } from "../utils/encryption.js";
export const handleGetTasks = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const offset = (page - 1) * limit;
    const [rows] = await db.query("SELECT * FROM tasks LIMIT ? OFFSET ?", [
      limit,
      offset,
    ]);
    const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM tasks");
    const encrypted = encyrptData(rows);
    const pagination = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
    responsehandler(
      response,
      false,
      "Tasks fetched successfully",
      { encrypted, pagination },
      200
    );
  } catch (error) {
    console.log(error, "error");
    responsehandler(response, true, "Internal server error", null, 500);
  }
};
