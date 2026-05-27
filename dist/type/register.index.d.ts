export type UserRole = "contributor" | "maintainer";
export interface SafeUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=register.index.d.ts.map