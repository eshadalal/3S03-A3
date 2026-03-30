import { test, expect } from '@playwright/test';

const BASE_URL = 'https://the-internet.herokuapp.com';

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/key_presses`);
});

// Test 1: Key presses page loads correctly
test('Page should load correctly', async ({ page }) => {
  await expect(page.locator('h3')).toHaveText('Key Presses');
  await expect(page.locator('p').first()).toHaveText('Key presses are often used to interact with a website (e.g., tab order, enter, escape, etc.). Press a key and see what you inputted.'); 
});

// Test 2: Test the case where the user clicks a letter 
test('Should detect letter key', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press('E');

  await expect(page.locator('#result')).toHaveText('You entered: E');
});

// Test 3: Test the case where the user clicks the down arrow key
test('Should detect Arrow key', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press('ArrowDown');

  await expect(page.locator('#result')).toHaveText('You entered: DOWN');
});

// Test 4: Test the case where the user clicks multiple keys 
test('Should display last key clicked', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press('A');
  await page.keyboard.press('5');
  await page.keyboard.press('C');

  await expect(page.locator('#result')).toHaveText('You entered: C');
});

// Test 5: Test the case where the user clicks a number 
test('Should detect number key', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press('4');
  
  await expect(page.locator('#result')).toHaveText('You entered: 4');
}); 

// Test 6: Test the case where the user clicks a special character
test('Should detect special character key', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press('Shift+7');
    
  // fails and reveals the site's limitation of not showing alternate keys
  await expect(page.locator('#result')).toHaveText('You entered: &');
});

// Test 7: Test the actual fallback behavior when alternate key is pressed 
test('Should detect actual fallback behavior of alternate keys', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press('Shift+7');
    
    await expect(page.locator('#result')).toHaveText('You entered: 7');
});

// Test 8: Test the case where the user clicks a punctuation key
test('Should detect punctuation key', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press(',');
    
  await expect(page.locator('#result')).toHaveText('You entered: COMMA');
});

// Test 9: Test the case where the user clicks an alternate punctuation key
test('Should detect alternate punctuation key', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press('Shift+/');
    
  // reveals the site's limitation of not showing alternate punctuation keys
  await expect(page.locator('#result')).toHaveText('You entered: SLASH');
});

// Test 10: Test the case where the user clicks the ; key 
test('Should detect semicolon key', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press(';');

    // fails because the site does not detect the semicolon key, instead showing nothing. 
    await expect(page.locator('#result')).toHaveText('You entered: SEMICOLON');
});

// Test 11: Test the case where the user clicks the space bar
test('Should detect space bar key', async ({ page }) => {
  await page.locator('#target').click();
  await page.keyboard.press('Space');
  
  await expect(page.locator('#result')).toHaveText('You entered: SPACE');
});

// Test 12: Test the case where the user clicks the Tab key 
test('Should detect Tab key', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press('Tab');
    await expect(page.locator('#result')).toHaveText('You entered: TAB');
});

// Test 13: Test the case where the user clicks a math key 
test('Should detect math key', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press('=');

    // fails because the site does not detect the = key, instead showing nothing. 
    await expect(page.locator('#result')).toHaveText('You entered: EQUAL');
});

// Test 14: Test the case where the user clicks the Shift key 
test('Should detect Shift key', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press('Shift');
    
    await expect(page.locator('#result')).toHaveText('You entered: SHIFT');
}); 

// Test 15: Test the case where the user clicks the Caps Lock key
test('Should detect Caps Lock key', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press('CapsLock');
    
    await expect(page.locator('#result')).toHaveText('You entered: CAPS_LOCK');
});

// Test 16: Test the case where the user clicks a modifier key (Control)
test('Should detect control key', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press('Control');
    
    await expect(page.locator('#result')).toHaveText('You entered: CONTROL');
});

// Test 17: Test the case where the user clicks a modifier key (Alt)
test('Should detect alt key', async ({ page }) => {
    await page.locator('#target').click();
    await page.keyboard.press('Alt');
    
    await expect(page.locator('#result')).toHaveText('You entered: ALT');
});



