import jwt, {} from "jsonwebtoken";
import configFile from "../config/env.js";
import { pool } from "../db/index.js";
const auth = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access",
                });
            }
            const decode = jwt.verify(token, configFile.JWT_SECRET);
            const userData = await pool.query(`
        SELECT * FROM users
        WHERE email = $1
        `, [decode.email]);
            if (userData.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            req.user = userData.rows[0];
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.middleware.js.map