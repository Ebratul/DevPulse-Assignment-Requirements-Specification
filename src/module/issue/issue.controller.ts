import type { Request, Response } from "express";
import { issueService } from "./issue.service.js";

const createIssueControl = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    // console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }


    if (!["contributor", "maintainer"].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message:"You are not allowed to create issues",
      });
    }

    // reporter_id from JWT
    const payload = {
      ...req.body,
      reporter_id: user.id,
    };

    // console.log(payload);

    const result = await issueService.createIssueService(payload);

    return res.status(201).json({
      success: true,
      message:
        "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create issue",
    });
  }
};




const getAllIssueControl =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await issueService.getAllIssueService(
          req.query
        );

      return res
        .status(200)
        .json({
          success: true,
          data: result,
        });
    } catch (error: any) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };




const getSingleIssueControl =async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await issueService.getSingleIssueService(id as string);

      return res.status(200).json({
          success: true,
          data: result,
        });
    } catch (error: any) {
      return res.status(500).json({
          success: false,
          message:
            error.message,
        });
    }
  };


const patchIssueControl = async (req: Request,res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const result = await issueService.putIssueService(req.body,id as string, user);

    return res.status(200).json({
      success: true,
      message:
        "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "update failed",
    });
  }
};

const deleteIssuecontrol = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (user.role !== "maintainer") {
      return res.status(403).json({
        success: false,
        message: "Only maintainer can delete issues",
      });
    }

    const result = await issueService.deleteIssueService(id as string);

    return res.status(200).json({
      success: true,
      message:
        "Issue deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:"deleteIssuecontrol=" + error.message,
    });
  }
};

export const userController = {
  createIssueControl,
  getAllIssueControl,
  getSingleIssueControl,
  patchIssueControl,
  deleteIssuecontrol
};
