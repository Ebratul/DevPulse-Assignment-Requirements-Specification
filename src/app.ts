import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import logger from "./middleware/logger";
import { authrouter } from "./module/auth/auth.route";
import { issuesRouter } from "./module/issue/issue.route";

const app: Application = express();
app.use(express.json());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Ebratul server running",
  });
});

// post
app.use("/api/auth", authrouter);

app.use("/api/issues", issuesRouter);

export default app;
