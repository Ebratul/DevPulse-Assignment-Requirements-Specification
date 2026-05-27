import type {NextFunction,Request,Response} from "express";
import jwt, {type JwtPayload} from "jsonwebtoken";

import configFile from "../config/env";
import { pool } from "../db";
import type { Role } from "../type/register.index";


const auth = (...requiredRoles: Role[]) =>async (req: Request,res: Response, next: NextFunction) => {
    try {
      // get token
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access. Token missing.",
        });
      }

      // verify token
      const decoded = jwt.verify(token, configFile.JWT_SECRET as string) as JwtPayload;

      // console.log("decode = ",decoded);

      // find user from DB using id
      const userData = await pool.query(
          `
          SELECT id, name, email, role, created_at, updated_at 
          FROM users
          WHERE id = $1
          `,
          [decoded.id]
        );

        // console.log("userdata = ", userData)

      // user exists?
      if (userData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const user = userData.rows[0];

      // console.log(requiredRoles.length);

      // role authorization
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      // attach user to request
      req.user = user;

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }
  };

export default auth;