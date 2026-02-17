import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { isEmail, minLen } from "../utils/validators.js";

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!minLen(name, 2)) throw new AppError("Name must be at least 2 characters.", 400);
  if (!isEmail(email)) throw new AppError("Invalid email address.", 400);
  if (!minLen(password, 6)) throw new AppError("Password must be 6+ characters.", 400);

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new AppError("Email already registered.", 409);

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
  });

  const token = signToken(user._id);

  res.status(201).json({
    token,
    user: { _id: user._id, name: user.name, email: user.email },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!isEmail(email)) throw new AppError("Invalid email address.", 400);
  if (!minLen(password, 6)) throw new AppError("Password must be 6+ characters.", 400);

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new AppError("Invalid email or password.", 401);

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError("Invalid email or password.", 401);

  const token = signToken(user._id);

  res.status(200).json({
    token,
    user: { _id: user._id, name: user.name, email: user.email },
  });
});
