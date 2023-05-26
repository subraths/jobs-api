import { StatusCodes } from "http-status-codes";
import CustomErrorApi from "./custom-error-api.js";

class NotFound extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFound;
