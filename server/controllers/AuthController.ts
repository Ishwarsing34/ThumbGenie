import { Request, Response } from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        message: "User already exists with this email",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPass,
    });

    req.session.isLoggedIn = true;
    req.session.userId = newUser._id;

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    req.session.isLoggedIn = true;
    req.session.userId = user._id;

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "Logout failed",
        });
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        message: "Logout successful",
      });
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};