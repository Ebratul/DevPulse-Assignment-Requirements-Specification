import { pool } from "../../db/index.js";
const createIssueService = async (payload) => {
    const { title, description, type, reporter_id } = payload;
    const result = await pool.query(`
    INSERT INTO issues(title, description, type, reporter_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [title, description, type, reporter_id]);
    return result.rows[0];
};
const getAllIssueService = async () => {
    const result = await pool.query(`
        
            SELECT * FROM issues
        
        `);
    console.log("result=", result.rows);
    return result;
};
const getSingleIssueService = async (id) => {
    const result = await pool.query(`
        
            SELECT * FROM issues WHERE id=$1
        `, [id]);
    console.log("result=", result.rows[0]);
    return result;
};
const putIssueService = async (payload, id) => {
    const { title, description, type } = payload;
    const result = await pool.query(`
        
        UPDATE issues SET

        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type)
        WHERE id = $4 RETURNING *
        `, [title, description, type, id]);
    console.log(result.rows[0]);
    return result;
};
const deleteIssueService = async (id) => {
    const result = await pool.query(`
        
        DELETE FROM issues 
        WHERE id=$1 RETURNING *
        
        `, [id]);
    if (result.rowCount === 0) {
        throw new Error("404 Issue not found");
    }
    return result;
};
export const issueService = {
    createIssueService,
    getAllIssueService,
    getSingleIssueService,
    putIssueService,
    deleteIssueService
};
//# sourceMappingURL=issue.service.js.map