import { test, expect } from '@playwright/test';

test.describe('Performance Benchmarks', () => {
  
  test('API Response Times should be within SLA', async ({ request }) => {
    const user = {
      name: 'Perf User',
      email: `perf-${Date.now()}@example.com`,
      password: 'Password123!',
    };

    // 1. Measure Registration Performance
    const startRegister = Date.now();
    const regRes = await request.post('/api/register', {
      data: user
    });
    const regDuration = Date.now() - startRegister;
    expect(regRes.ok()).toBeTruthy();
    console.log(`Registration Duration: ${regDuration}ms`);
    expect(regDuration).toBeLessThan(1000); // SLA: 1s

    // 2. Measure Login Performance (via API)
    // NextAuth usually handles login via form-data or specific endpoints, 
    // but for simple benchmarking we can test the load time of the login page or submit credentials
    // Here we'll test the API route if applicable, or just the page load in another test.
    // Let's test adding a BMI record via API (requires auth cookies, which is complex with pure API test in Playwright without state).
    // Instead, we'll stick to simple endpoint checks for now.
  });

  test('Page Load Performance (LCP)', async ({ page }) => {
    // Measure Login Page Load
    const startLogin = Date.now();
    await page.goto('/login');
    const loginLoadTime = Date.now() - startLogin;
    console.log(`Login Page Load: ${loginLoadTime}ms`);
    expect(loginLoadTime).toBeLessThan(1500); // SLA: 1.5s

    // Measure Register Page Load
    const startReg = Date.now();
    await page.goto('/register');
    const regLoadTime = Date.now() - startReg;
    console.log(`Register Page Load: ${regLoadTime}ms`);
    expect(regLoadTime).toBeLessThan(1500);
  });
});
