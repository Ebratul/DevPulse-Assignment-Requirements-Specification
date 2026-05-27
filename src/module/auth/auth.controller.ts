import type { Request, Response } from "express";
import { authservice } from "./auth.service.js";

const signupController = async (req: Request, res: Response) => {
  try {
    const result = await authservice.signupService(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "signupController" + error.message,
    });
  }
};



const loginController = async (req: Request, res: Response) => {
  // console.log(req.body);

  try {
    console.log("login route hit");

    const result = await authservice.loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signupController,
  loginController,
};
