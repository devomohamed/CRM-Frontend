# CRM Project Information

This file tracks the CRM project features, details, and updates.

## Project Details
- **Project Name:** CRM (Customer Relationship Management)
- **Framework:** Angular
- **Status:** Development - Tools Configured (Tailwind 4, PrimeNG 21, ngx-translate, PWA)

## AI Architect Persona & Responsibilities
As the Angular Senior Architect AI, I am strictly bound to the following responsibilities for this CRM project:
1. Maintain scalable Angular architecture.
2. Optimize performance.
3. Follow Angular best practices.
4. Use PrimeNG components correctly.
5. Write maintainable TypeScript code.
6. Avoid business logic inside components.
7. Ensure lazy loading for feature modules.
8. Use OnPush change detection.
9. Use trackBy for ngFor loops.
10. Ensure UI responsiveness.

### Standard Development Workflow
For every new feature, I will strictly follow this 7-step process:
1. **Analyze feature requirements**
2. **Design component structure**
3. **Implement UI**
4. **Implement service layer**
5. **Add state management**
6. **Optimize performance**
7. **Write tests**

## Features List
- [x] Tailwind CSS 4 Integration
- [x] PrimeNG v21 Setup
- [x] ngx-translate (i18n) Configuration (EN/AR)
- [x] PWA (Service Worker) Setup
- [x] Responsive Layout (Mobile/Tablet/Desktop)
- [x] Localization RTL/LTR Support
- [x] Authentication Module (Login, Register, Forgot Password)
- [x] JWT Integration & Token Storage
- [x] Route Guards & Interceptors
- [x] Dashboard Module
- [x] Customers Module (CRUD with validation, RBAC: ADMIN, MANAGER)
- [x] Leads Module (CRUD with scoring system, RBAC: ADMIN, MANAGER, USER)
- [x] Deals Module (Basic scaffolding with route)
- [x] Tasks Module (CRUD with status management, priority levels)
- [x] Tickets Module (CRUD with priority and status tracking)
- [x] Reports Module (Dashboard view with multiple report types)
- [x] Settings Module (Company settings, notification preferences)

## Implemented Services (Backend Integration Ready)
- `CustomerService` - CRUD operations with pagination and search
- `LeadService` - Lead management with status and score tracking
- `TaskService` - Task management with status updates
- `TicketService` - Ticket management with status workflow
- All services use mock data (TODO: Replace with HTTP calls when backend is ready)

## Recent Implementations
- **Comprehensive CRM Module Suite Implemented (March 25, 2026)**
  - Created 6 feature modules: Customers, Leads, Tasks, Tickets, Reports, Settings
  - Implemented 4 backend services with CRUD operations
  - Business Logic:
    1. **Customers**: CRUD, status management (ACTIVE/INACTIVE/PROSPECT)
    2. **Leads**: CRUD, lead scoring (0-100), multi-source tracking, status workflow (NEW→CONTACTED→QUALIFIED→LOST)
    3. **Tasks**: CRUD, priority levels (LOW/MEDIUM/HIGH/URGENT), status tracking, due dates, relationship management
    4. **Tickets**: CRUD, priority handling, status workflow (OPEN→IN_PROGRESS→RESOLVED→CLOSED)
    5. **Reports**: Dashboard view of 6 key report types (Sales Pipeline, Revenue, Customer Analysis, Team Performance, Lead Conversion, Activity)
    6. **Settings**: Company configuration, notification preferences, timezone and currency settings
  - UI Implementation:
    - All components use PrimeNG tables with pagination, sorting, filtering
    - Modal dialogs for create/edit operations
    - Reactive Forms with validation (reactive form patterns, required fields, email validation, etc.)
    - Status badges with semantic color coding
    - Toast notifications for success/error feedback
    - OnPush change detection strategy for performance
    - TrackBy implementation for ngFor loops
  - i18n Support: Full EN/AR translations added for all new components
  - Architecture: All business logic in services, components handle UI/UX only
  - Routes: All modules lazy-loaded in app.routes.ts under protected routes with authGuard
  - Status: Fully implemented with mock data, ready for backend API integration
  - **TODO**: Replace mock data promises with actual HTTP calls when backend endpoints available

## Recent Fixes & Issues Resolved
- **Issue**: Clicking "Deals" sidebar button redirects to login page instead of going to deals page
  - **Root Cause**: Deals feature was not implemented - no route defined for `/deals`, so wildcard route redirected to login
  - **Fix**: 
    1. Created Deals feature module at `src/app/features/deals/`
    2. Added `deals.component.ts`, `deals.component.html`, `deals.component.scss`, and `deals.component.spec.ts`
    3. Added `/deals` route to `app.routes.ts` children array with lazy loading
    4. Added translation keys for deals in both EN and AR i18n files
  - **Status**: Fixed ✓

- **Issue**: GET `http://localhost:3000/api/auth/me` 404 (Not Found) during autoLogin
  - **Root Cause**: AuthService was attempting to validate stored tokens by calling `/auth/me` endpoint, which returns 404 when backend endpoint is unavailable
  - **Fix**: Modified `autoLogin()` method in [AuthService](src/app/core/auth/auth.service.ts) to:
    1. Gracefully handle 404 and other errors from the `/auth/me` endpoint
    2. Clear invalid token from localStorage when validation fails
    3. Log warning message instead of silent failure
    4. Allow app to start without blocking on unavailable backend endpoint
  - **Status**: Fixed ✓

## Project Architecture
The project follows a modular structure within `src/app`:
- `core/`: Core singleton services, guards, and interceptors.
- `shared/`: Shared components, directives, and pipes.
- `layout/`: Main layout components (Header, Sidebar, Footer).
- `features/`: Business functional modules.
- `state/`: Application state management (e.g., SignalStore or NgRx).
- `models/`: Interface and class definitions.
- `services/`: API and business logic services.
- `guards/`: Route guards.
- `interceptors/`: HTTP interceptors.

## Design & Implementation Roles
The following principles are MANDATORY for this project:
- **Angular Architecture**:
  - **Feature-Based**: Use a feature-based folder structure for all modules.
  - **Lazy Loading**: Every feature must be lazy-loaded to optimize performance.
  - **Clean Components**: Do not place business logic inside components; keep them focused on UI/UX.
  - **Service-Driven**: Services are strictly responsible for API calls and complex business logic.
  - **Reusable UI**: Use shared components for any UI element that appears in more than one place.
- **Reactive Forms**: All forms MUST use Angular `ReactiveFormsModule`. No template-driven forms.
- **Responsive UI**: All components MUST be designed for:
  - Mobile Screens (< 768px)
  - Tablets (768px - 1024px)
  - Large Screens (> 1024px)
- **Localization**:
  - Full support for English (EN) and Arabic (AR).
  - RTL (Right-to-Left) support for Arabic.
  - Consistent use of `TranslateService` and `translate` pipe.
- **Angular Performance**:
  - **OnPush Change Detection**: Use `ChangeDetectionStrategy.OnPush` whenever possible to minimize change detection cycles.
  - **TrackBy**: Use `trackBy` for all `*ngFor` loops to improve rendering performance.
  - **Subscription Management**: 
    - Avoid unnecessary manual subscriptions in components.
    - Prefer the `async` pipe over manual `subscribe` to handle stream cleanup automatically.
  - **Virtual Scrolling**: Implement virtual scrolling for large tables or lists.
  - **Lazy Loading**: Mandatory lazy loading for all feature modules (already specified in Architecture).
- **PrimeNG UI Development**:
  - **Reusable Components**: Prioritize creating reusable wrapper components based on PrimeNG.
  - **Standardized UI**: ALWAYS prefer PrimeNG components (Table, Dialog, Form elements) over building custom solutions from scratch.
  - **Premium Styling**: Follow established PrimeNG themes and use Tailwind for micro-adjustments only.
  - **Consistency**: Maintain pixel-perfect spacing and layout consistency across all modules.
- **API & HTTP Handling**:
  - **Component Isolation**: Components MUST NEVER call APIs directly. All HTTP requests go through dedicated Services.
  - **Authentication**: Use HTTP Interceptors to attach tokens and handle auth-related logic.
  - **Centralized Errors**: Implement a global error handling strategy (via Interceptors or a dedicated Error Service).
  - **Data Efficiency**: MANDATORY pagination for all large datasets to optimize network and browser performance.
- **Authentication & Authorization (JWT)**:
  - **Secure Storage**: Store JWT tokens securely (e.g., using HttpOnly cookies if possible, or tightly controlled LocalStorage/SessionStorage with XSS prevention).
  - **Route Guards**: ALL protected routes MUST be secured using Angular Route Guards (`CanActivate`, `CanMatch`).
  - **API Protection**: Interceptors MUST automatically attach JWT tokens to outgoing requests and handle 401/403 responses gracefully.
  - **Role Validation**: Enforce strict Role-Based Access Control (RBAC) on both the UI (hiding elements) and routing levels by validating user roles contained in or associated with the JWT.
- **Angular Coding Standards**:
  - **TypeScript Strict Mode**: Always develop with TypeScript strict mode enabled.
  - **Models as Interfaces**: Use TypeScript `interface` (not `class`) for all data models and DTOs.
  - **Small Components**: Avoid large, monolithic components. Break them down into smaller, focused presentation/dumb components.
  - **Pure Functions**: Prefer pure functions for data transformations and utility logic to ensure testability and predictability.
- **Testing Standards**:
  - **Service Testing**: All services must be thoroughly unit tested, especially those handling business logic.
  - **Component Testing**: Write tests for complex or critical UI components to ensure interactions and DOM updates work as expected.
  - **Mock APIs**: ALWAYS mock API responses in tests to prevent flaky tests and ensure tests run quickly without relying on a live backend.

## Roles & Permissions
The CRM implements Role-Based Access Control (RBAC) with the following roles:
- **ADMIN**: Full access to all system features, configuration, and user management.
- **MANAGER**: Access to dashboard, reports, customers, deals, and team management. Cannot access system configuration.
- **USER**: Basic access to assigned leads, tasks, and own profile. Restricted from seeing management reports.

## Component File Structure
Every component added to the project MUST consist of the following four files:
1. `[component-name].component.ts`: Logic and metadata.
2. `[component-name].component.html`: Template structure.
3. `[component-name].component.scss`: Styles.
4. `[component-name].component.spec.ts`: Unit tests.

*Reason: Ensures separation of concerns, scalability, and maintainability as the project grows.*

