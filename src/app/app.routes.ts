import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: 'customers',
                loadComponent: () => import('./features/customers/customers.component').then(m => m.CustomersComponent)
            },
            {
                path: 'leads',
                loadComponent: () => import('./features/leads/leads.component').then(m => m.LeadsComponent)
            },
            {
                path: 'deals',
                loadComponent: () => import('./features/deals/deals.component').then(m => m.DealsComponent)
            },
            {
                path: 'tasks',
                loadComponent: () => import('./features/tasks/tasks.component').then(m => m.TasksComponent)
            },
            {
                path: 'tickets',
                loadComponent: () => import('./features/tickets/tickets.component').then(m => m.TicketsComponent)
            },
            {
                path: 'reports',
                loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

