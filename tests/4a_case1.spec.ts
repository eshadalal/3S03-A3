import { test, expect } from '@playwright/test';

const BASE_URL = 'https://the-internet.herokuapp.com';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/forgot_password`);
  });

  // Test 1: Forgot Password page loads correctly
  test('Page should load correctly', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Forgot Password');
  });

  // Test 2: Email input box exists
  test('Email input field should be visible', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible();
  });

  // Test 3: Test the case where a user enters a valid email 
  test('Valid email', async ({ page }) => {
    await page.fill('#email', 'abc@test.com');
    await page.click('#form_submit');

    // Site shows internal server error usually
    await expect(page.locator('h1')).toBeVisible();
  });

  // Test 4: Test the case where the users submits an empty email field 
  test('Empty email', async ({ page }) => {
    await page.click('#form_submit');

    // internal server error is shown
    await expect(page.locator('h1')).toBeVisible();
  });

  // Test 5: Test the case where the user enters an invalid email 
  test('Invalid email format', async ({ page }) => {
    await page.fill('#email', '123');
    await page.click('#form_submit');

    // internal server error is shown
    await expect(page.locator('h1')).toBeVisible();
  });

  // Test 6: Test the case where the user enters special characters in the email field
  test('Special characters', async ({ page }) => {
    await page.fill('#email', '#!@$%^&*()');
    await page.click('#form_submit');

    // internal server error is shown 
    await expect(page.locator('h1')).toBeVisible();
  });

;