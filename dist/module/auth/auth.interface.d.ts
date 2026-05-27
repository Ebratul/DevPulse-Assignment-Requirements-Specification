export type UserRole = "contributor" | "maintainer";
export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}
export interface LoginPayload {
    email: string;
    password: string;
}
//# sourceMappingURL=auth.interface.d.ts.map