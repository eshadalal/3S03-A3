import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

// Test 1: Check the case where the login is valid
test('valid login leads to inventory page', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);
});

// Test 2: Check the case where the login is invalid
test('invalid login shows error message', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Username').fill('wrong');
  await page.getByPlaceholder('Password').fill('wrong');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.error-message-container')).toBeVisible();
});

// Test 3: Check the case where the user adds an product to the cart
test('user can add item to cart', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await page.locator('.shopping_cart_link').click();

await expect(page).toHaveURL(/cart/);
await expect(page.locator('.cart_item')).toHaveCount(1);
});

// Test 4: Check the case where the user successfully places an order
test('user completes checkout successfully', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill('James');
  await page.getByPlaceholder('Last Name').fill('Bond');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

// Test 5: Check the case where the user tries to checkout without filling the personal information fields
test('checkout shows error when fields are missing', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('.error-message-container')).toBeVisible();
});

// Test 6: Check the case where the user continues shopping after adding an item to the cart
test('user can continue shopping after adding item to cart', async ({ page }) => {
  await page.goto(BASE_URL);
  
  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await expect(page).toHaveURL(/inventory/);
}
);

// Test 7: Check the case where the user removes an item from the cart  
test('user can remove item from cart', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Remove' }).click();
  
  await expect(page.locator('.cart_item')).toHaveCount(0);
}

);

// Test 8: Check the case where the user decides not the continue the checkout 
test('user can cancel checkout', async ({ page }) => {
  await page.goto(BASE_URL);
  
  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
} 
);