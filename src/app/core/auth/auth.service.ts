import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable } from 'rxjs';
import { User, Role, AuthResponse, LoginRequest, RegisterRequest } from '../../models/auth.models';
import { TokenService } from '../../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private tokenService = inject(TokenService);
    private router = inject(Router);

    private currentUserSignal = signal<User | null>(null);
    currentUser = this.currentUserSignal.asReadonly();
    isAuthenticated = signal<boolean>(false);

    private readonly API_URL = 'http://localhost:3000/api'; // Replace with actual API endpoint

    constructor() {
        this.autoLogin();
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
            tap(response => this.handleAuthentication(response.user, response.token))
        );
    }

    register(data: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, data).pipe(
            tap(response => this.handleAuthentication(response.user, response.token))
        );
    }

    logout(): void {
        this.currentUserSignal.set(null);
        this.isAuthenticated.set(false);
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${this.API_URL}/auth/forgot-password`, { email });
    }

    private handleAuthentication(user: User, token: string): void {
        this.currentUserSignal.set(user);
        this.isAuthenticated.set(true);
        this.tokenService.saveToken(token);
    }

    private autoLogin(): void {
        const token = this.tokenService.getToken();
        if (token) {
            // Fetch the user profile from the server to verify the token
            // If the endpoint is not available or token is expired, logout gracefully
            this.http.get<User>(`${this.API_URL}/auth/me`).pipe(
                tap(user => {
                    this.currentUserSignal.set(user);
                    this.isAuthenticated.set(true);
                }),
                catchError((error) => {
                    // If the me endpoint fails (404, 401, etc.), assume token is invalid and clear auth
                    // This prevents the error from propagating to the component
                    console.warn('Auto-login failed:', error.message);
                    this.tokenService.removeToken();
                    return of(null);
                })
            ).subscribe();
        }
    }

    hasRole(allowedRoles?: Role[]): boolean {
        if (!allowedRoles || allowedRoles.length === 0) return true;
        const user = this.currentUserSignal();
        if (!user) return false;
        return allowedRoles.includes(user.role);
    }
}

