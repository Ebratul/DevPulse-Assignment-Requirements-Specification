import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configFile from "../../config/env";
import { pool } from "../../db";
import type { LoginPayload, SignupPayload } from "./auth.interface";

const allowedRoles = ["contributor", "maintainer"];


const signupService = async (payload: SignupPayload) => {

  console.log("payload =="+payload);
  const { name, email, password, role } = payload;

  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role. Must be contributor or maintainer");
  }

  const hashPass = await bcrypt.hash(password, 15);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, email, hashPass, role],
  );

  return result.rows[0];
};


const loginService = async (payload: LoginPayload) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const result = await pool.query(
    `
    SELECT id, name, email, password, role, created_at, updated_at
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({
      id: user.id,
      name: user.name,
      role: user.role,
    },
    configFile.JWT_SECRET as string,
    {
      expiresIn: "1d",
    });

  // remove password before sending response
  delete user.password;

  return {
    token,
    user,
  };
};

export const authservice = {
  signupService,
  loginService,
};