import { issueService } from "./issue.service.js";
const createIssueControl = async (req, res) => {
    try {
        const user = req.user;
        const payload = {
            ...req.body,
            reporter_id: user.id,
        };
        const result = await issueService.createIssueService(payload);
        return res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "createIssue=" + error.message,
            error,
        });
    }
};
const getAllIssueControl = async (req, res) => {
    console.log(req.user);
    try {
        const result = await issueService.getAllIssueService();
        res.status(200).json({
            success: true,
            message: "all issue retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "getAllIssueControl=" + error.message,
            error: error,
        });
    }
};
const getSingleIssueControl = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id = ", id);
        const result = await issueService.getSingleIssueService(id);
        res.status(200).json({
            success: true,
            message: "single issue retrieved successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "getSingleIssueControl=" + error.message,
            error: error,
        });
    }
};
const patchIssueControl = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await issueService.putIssueService(req.body, id);
        res.status(200).json({
            success: true,
            message: "update successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "patchIssueControl=" + error.message,
            error: error,
        });
    }
};
const deleteIssuecontrol = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await issueService.deleteIssueService(id);
        res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "deleteIssuecontrol=" + error.message,
            error: error,
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
//# sourceMappingURL=issue.controller.js.map