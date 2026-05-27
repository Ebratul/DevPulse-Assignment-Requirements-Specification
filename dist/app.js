import express, {} from "express";
import logger from "./middleware/logger.js";
import { authrouter } from "./module/auth/auth.route.js";
import { issuesRouter } from "./module/issue/issue.route.js";
const app = express();
app.use(express.json());
// app.use(logger);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Ebratul server running",
    });
});
// post
app.use("/api/auth", authrouter);
app.use("/api/issues", issuesRouter);
export default app;
//# sourceMappingURL=app.js.map