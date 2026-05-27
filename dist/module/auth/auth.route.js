import { Router } from "express";
import { authController } from "./auth.controller.js";
const router = Router();
router.post("/signup", authController.signupController);
router.post('/login', authController.loginController);
export const authrouter = router;
//# sourceMappingURL=auth.route.js.map