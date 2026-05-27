import { pool } from "../../db";
import type { CreateIssuePayload } from "./issue.interface";



const createIssueService = async ( payload: CreateIssuePayload) => {
const { title, description,type,reporter_id} = payload;

  if (!title || !description || !type) {
    throw new Error("All fields are required");
  }

  if (description.length < 20) {
    throw new Error(
      "Description must be at least 20 characters"
    );
  }

  if (!["bug", "feature_request"].includes(type)) {
    throw new Error(
      "Type must be bug or feature_request"
    );
  }

  const result = await pool.query(
    `
    INSERT INTO issues (title,description,type, reporter_id)
    VALUES ($1, $2, $3, $4) RETURNING *
    `,[ title,description,type,reporter_id]
  );
  return result.rows[0];
};



const getAllIssueService = async (query: any) => {
  const {sort = "newest",type,status,}= query;

  let sql = `SELECT * FROM issues`;

  const conditions: string[] = [];
  const values: any[] = [];

  // filter by type
  if (type) {
    values.push(type);
    conditions.push(
      `type = $${values.length}`
    );
  }

  // filter by status
  if (status) {
    values.push(status);
    conditions.push(
      `status = $${values.length}`
    );
  }

  // WHERE clause
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(
      " AND "
    )}`;
  }

  // sorting
  sql += `
    ORDER BY created_at
    ${sort === "oldest"
      ? "ASC"
      : "DESC"}
  `;

  // fetch issues
  const issuesResult = await pool.query(sql, values);

  const issues = issuesResult.rows;

  // no issue found
  if (!issues.length) {
    return [];
  }

  // get reporter ids
  const reporterIds =
    issues.map((issue) =>issue.reporter_id);

  // fetch reporters
  const reportersResult =
    await pool.query(
      `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
      `,
      [reporterIds]
    );

  // reporter map
  const reporterMap =
    reportersResult.rows.reduce((acc, reporter) => {
        acc[reporter.id] = reporter;
        return acc;
      },
      {} as Record<number,any>
    );

  // format response
  const formattedIssues =
    issues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      description:
        issue.description,
      type: issue.type,
      status: issue.status,
      reporter:
        reporterMap[
          issue.reporter_id
        ] || null,
      created_at:
        issue.created_at,
      updated_at:
        issue.updated_at,
    }));

  return formattedIssues;
};



const getSingleIssueService = async ( id: string) => {
  // get issue
  const issueResult =await pool.query(
      `
      SELECT * FROM issues
      WHERE id = $1
      `,[id]
    );

  // issue exists?
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // get reporter
  const reporterResult = await pool.query(
      `
      SELECT id, name, role FROM users
      WHERE id = $1
      `,[issue.reporter_id]
    );

  const reporter = reporterResult.rows[0];

  // formatted response
  return {
    id: issue.id,
    title: issue.title,
    description:
      issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};



const putIssueService = async (payload: any,id: string,user: any) => {
  const { title, description, type } = payload;

  // 1. get issue first
  const issueResult = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // 2. role logic
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error(
        "You can only update your own issue"
      );
    }

    if (issue.status !== "open") {
      throw new Error(
        "You can only update open issues"
      );
    }
  }

  // 3. update issue
  const result = await pool.query(
    `
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      status = 'in_progress',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
    `,
    [title, description, type, id]
  );

  return result.rows[0];
};


const deleteIssueService = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM issues
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error("Issue not found");
  }

  return result.rows[0];
};



export const issueService = {
  createIssueService,
  getAllIssueService,
  getSingleIssueService,
  putIssueService,
  deleteIssueService
};