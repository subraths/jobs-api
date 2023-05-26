import User from "../model/User.js";
import BadRequest from "../errors/bad-request.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.js";

export const register = async (req, res) => {
  const user = await User.create(req.body);

  const token = user.createJwt();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("please provide valid email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJwt();

  res.status(StatusCodes.OK).json({ user: { name: user.getName() }, token });
};
