export declare const issueService: {
    createIssueService: (payload: any) => Promise<any>;
    getAllIssueService: () => Promise<import("pg").QueryResult<any>>;
    getSingleIssueService: (id: string) => Promise<import("pg").QueryResult<any>>;
    putIssueService: (payload: any, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteIssueService: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=issue.service.d.ts.map