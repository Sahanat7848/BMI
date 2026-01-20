import { test, expect } from '@playwright/test';

test.describe('User Journey: Login and Weight Tracking', () => {
  // Unique user for each test run to avoid conflicts
  const user = {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    password: 'Password123!',
  };

  test('should allow a user to register, login, and add a weight record', async ({ page }) => {
    // 1. Register
    await page.goto('/register');
    
    // Check if we are on register page
    await expect(page).toHaveURL(/\/register/);
    
    // Fill registration form
    await page.fill('input[name="name"]', user.name);
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    
    // Click Register
    await page.click('button[type="submit"]');

    // 2. Handle Login (if redirected to login)
    // Wait for URL to change to login or dashboard
    await page.waitForURL(/\/login|\/dashboard/);
    
    if (page.url().includes('/login')) {
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.click('button[type="submit"]');
    }

    // 3. Verify Dashboard Access
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(user.name)).toBeVisible();

    // 4. Add Weight Record
    // Click "Add Record" card or link
    await page.click('a[href="/dashboard/add"]');
    await expect(page).toHaveURL(/\/dashboard\/add/);

    // Fill Weight and Height
    await page.fill('input[name="weight"]', '75.5');
    await page.fill('input[name="height"]', '180');
    
    // Submit
    await page.click('button[type="submit"]');

    // 5. Verify Record on Dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verify the values appear in the table
    // Using strict text matching might be flaky if formatting changes, but let's try
    await expect(page.getByText('75.5')).toBeVisible();
    await expect(page.getByText('180')).toBeVisible();
    
    // Verify BMI Calculation: 75.5 / (1.8 * 1.8) = 23.302... -> 23.3
    // 1. Check "Latest BMI" card
    await expect(
      page.locator('.glass-card').filter({ hasText: 'Latest BMI' }).getByText('23.3')
    ).toBeVisible();

    // 2. Check "Recent Records" table row
    await expect(
      page.getByRole('row').filter({ hasText: '75.5' }).getByText('23.3')
    ).toBeVisible();
  });
});
