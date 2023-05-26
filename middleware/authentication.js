import User from "../model/User.js";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.js";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication error");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to jobs route
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication error");
  }
};

export default auth;
