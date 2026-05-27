import type { Request, Response } from "express";
export declare const userController: {
    createIssueControl: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllIssueControl: (req: Request, res: Response) => Promise<void>;
    getSingleIssueControl: (req: Request, res: Response) => Promise<void>;
    patchIssueControl: (req: Request, res: Response) => Promise<void>;
    deleteIssuecontrol: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=issue.controller.d.ts.map