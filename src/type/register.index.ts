export type UserRole = "contributor" | "maintainer";
export interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export const User_Role = {
  contributor : "contributor",
  maintainer : "maintainer"
} as const;

export type Role = "contributor" | "maintainer"