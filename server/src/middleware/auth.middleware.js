import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Unauthorized. Missing token.", 401);
  }

  const token = header.split(" ")[1];

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new AppError("Unauthorized. Invalid token.", 401);
  }

  const user = await User.findById(payload.userId).select("-passwordHash");
  if (!user) throw new AppError("Unauthorized. User not found.", 401);

  req.user = user;
  next();
});
