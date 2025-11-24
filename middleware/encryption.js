import { decryptData } from "../utils/encryption.js";
import responsehandler from "../utils/responsehandler.js";

export const decryptBody = (req, res, next) => {
  if (req.body && req.body.encrypted) {
    try {
      req.body = decryptData(req.body.encrypted);
    } catch (error) {
      console.log(error, "invalid encrypt body");
      responsehandler(res, true, "Invalid encrypt data", null, 400);
    }
  }
  next();
};
