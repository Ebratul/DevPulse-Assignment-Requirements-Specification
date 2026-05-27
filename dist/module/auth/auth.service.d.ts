import type { LoginPayload, SignupPayload } from "./auth.interface.js";
export declare const authservice: {
    signupService: (payload: SignupPayload) => Promise<any>;
    loginService: (payload: LoginPayload) => Promise<{
        token: string;
        user: any;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map