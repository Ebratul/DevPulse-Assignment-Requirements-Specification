import { authservice } from "./auth.service.js";
const signupController = async (req, res) => {
    try {
        const result = await authservice.signupService(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const loginController = async (req, res) => {
    console.log(req.body);
    try {
        console.log("login route hit");
        const result = await authservice.loginService(req.body);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
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
//# sourceMappingURL=auth.controller.js.map