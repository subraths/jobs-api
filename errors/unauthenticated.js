import { StatusCodes } from "http-status-codes";
import CustomErrorApi from "./custom-error-api.js";

class UnauthenticatedError extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
