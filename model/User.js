import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

const UserSchema = new mongoose.Schema({
  name: {
    required: [true, "please provide a name"],
    type: String,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    required: [true, "please provide an email"],
    type: String,
    validator: [validator.isEmail, "please provide valid email"],
    unique: true,
  },
  password: {
    required: [true, "please provide a password"],
    type: String,
    minLength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.createJwt = function () {
  console.log(JWT_LIFETIME, JWT_SECRET);
  return jwt.sign({ userId: this._id, name: this.name }, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
