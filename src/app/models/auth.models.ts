export type Role = 'ADMIN' | 'MANAGER' | 'USER';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}
