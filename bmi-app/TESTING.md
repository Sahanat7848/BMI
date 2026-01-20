# Testing Strategy for BMI Tracker Pro

This document outlines the testing strategy for the BMI Tracker Pro application, ensuring high quality, reliability, and security.

## 1. Testing Methodology

We adopt a comprehensive testing approach covering multiple layers of the application:

### 1.1 Contract Testing
- **Objective**: Validate API contracts against specifications.
- **Tools**: Jest, Supertest (or Playwright API testing).
- **Scope**: Ensure request/response schemas (headers, body, status codes) match expected formats.

### 1.2 Functional Testing (E2E)
- **Objective**: Verify end-to-end user flows and business logic.
- **Tools**: **Playwright**.
- **Scope**:
  - Authentication (Login, Register, Logout).
  - Dashboard access and data visualization.
  - BMI calculation logic.
  - User profile management.
  - Edge cases (invalid inputs, network errors).

### 1.3 Performance Testing
- **Objective**: Measure response times and system stability.
- **Tools**: k6 or Playwright (basic performance metrics).
- **Metrics**:
  - Response time (p50, p90, p95, p99).
  - Throughput (requests per second).
  - Resource utilization (CPU, Memory).

### 1.4 Security Testing
- **Objective**: Identify vulnerabilities.
- **Scope**:
  - SQL Injection prevention (verified via Prisma usage).
  - XSS protection (React default escaping).
  - Authentication bypass attempts.
  - Authorization checks (RBAC).

## 2. Test Plan

### 2.1 Smoke Tests (Critical Path)
- App loads successfully.
- User can navigate to Login/Register.
- Public pages render correct content.

### 2.2 Functional Scenarios
- **User Registration**: Create new account, verify database entry (mocked or test DB).
- **Login**: Valid credentials -> Dashboard; Invalid -> Error message.
- **BMI Tracking**: Add new record, verify chart update.
- **History**: View past records, verify pagination/sorting.

### 2.3 Load Testing Strategy
- **Baseline**: 1 user to establish standard performance.
- **Stress**: Ramp up to find breaking point.
- **Spike**: Sudden influx of users.

## 3. Test Cases (Playwright)

We have implemented 5 core test cases using Playwright:

1.  **Homepage Load**: Verifies the landing page title and "Student ID" badge.
2.  **Navigation to Login**: Verifies clicking "Login" takes the user to `/login`.
3.  **Protected Route Guard**: Verifies accessing `/dashboard` without auth redirects to `/login`.
4.  **Register Page Elements**: Verifies the registration form fields exist.
5.  **Login Form Validation**: Verifies error handling when submitting empty forms.

## 4. Running Tests

### Prerequisites
- Node.js / Bun installed.
- Dependencies installed (`bun install`).
- Playwright browsers installed (`bunx playwright install`).

### Commands
```bash
# Run all E2E tests
bunx playwright test

# Run specific test file
bunx playwright test tests/e2e.spec.ts

# Show report
bunx playwright show-report
```
