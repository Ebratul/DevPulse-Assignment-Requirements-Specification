import { Router } from "express";
import { userController } from "./issue.controller";
import auth from "../../middleware/auth.middleware";
import { User_Role } from "../../type/register.index";

const router = Router();



// Create issue
router.post("/",auth(User_Role.contributor,User_Role.maintainer),
  userController.createIssueControl
);

// Get all issues
router.get("/",auth(User_Role.contributor,User_Role.maintainer),
  userController.getAllIssueControl
);

// Get single issue
router.get("/:id", auth(User_Role.contributor,User_Role.maintainer),
  userController.getSingleIssueControl
);

// Update issue (maintainer only)
router.patch("/:id", auth(User_Role.maintainer),
 userController.patchIssueControl
);

// Delete issue (maintainer only)
router.delete("/:id",auth(User_Role.maintainer),
  userController.deleteIssuecontrol
);

export const issuesRouter = router;