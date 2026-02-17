import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { isEmail, minLen } from "../utils/validators.js";
import User from "../models/User.js";

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const updateMe = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!minLen(name, 2)) throw new AppError("Name must be at least 2 characters.", 400);
  if (!isEmail(email)) throw new AppError("Invalid email address.", 400);

  const existing = await User.findOne({
    email: email.toLowerCase(),
    _id: { $ne: req.user._id },
  });

  if (existing) throw new AppError("Email already in use.", 409);

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { name: name.trim(), email: email.toLowerCase().trim() },
    { new: true }
  ).select("-passwordHash");

  res.json({ user: updated });
});
