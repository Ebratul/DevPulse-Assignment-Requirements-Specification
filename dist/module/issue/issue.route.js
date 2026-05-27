import { Router } from "express";
import { userController } from "./issue.controller.js";
import auth from "../../middleware/auth.middleware.js";
const router = Router();
router.post("/", userController.createIssueControl);
router.get("/", userController.getAllIssueControl);
router.get("/:id", userController.getSingleIssueControl);
router.patch("/:id", userController.patchIssueControl);
router.delete("/:id", userController.deleteIssuecontrol);
export const issuesRouter = router;
//# sourceMappingURL=issue.route.js.map