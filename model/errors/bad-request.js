import { StatusCodes } from "http-status-codes";
import CustomErrorApi from "./custom-error-api";

class BadRequest extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
