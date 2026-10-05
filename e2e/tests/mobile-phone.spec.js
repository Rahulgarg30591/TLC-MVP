const { test, expect } = require('@playwright/test');
const { phone, password } = require('./admin');

async function signInWithPhone(page) {
  await page.goto('/');
  const phoneField = page.getByRole('textbox', { name: 'Phone number' });
  await phoneField.fill(phone);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  const loginRequest = page.waitForRequest(
    (request) =>
      request.url().includes('/user/login') && request.method() === 'POST'
  );
  const loginResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/user/login') &&
      response.request().method() === 'POST'
  );
  await page.getByRole('button', { name: 'Continue' }).click();
  const request = await loginRequest;
  const body = request.postDataJSON();
  expect(body.email).toBe(phone);
  expect(String(body.email)).not.toContain('@');
  const response = await loginResponse;
  expect(response.ok(), await response.text()).toBeTruthy();
  await expect(page.getByText('Welcome back, Local Admin')).toBeVisible();
}

test.describe('mobile phone identity', () => {
  test.use({ viewport: { width: 393, height: 851 } });

  test('login screen asks for a phone number', async ({ page }) => {
    await page.goto('/');
    const phoneField = page.getByRole('textbox', { name: 'Phone number' });
    await expect(phoneField).toBeVisible();
    await expect(phoneField).toHaveAttribute('type', 'text');
    await expect(phoneField).toHaveAttribute(
      'placeholder',
      '10-digit mobile number'
    );
    await expect(page.getByRole('textbox', { name: 'Email Address' })).toHaveCount(0);
    await expect(page.getByText('Sign in to')).toBeVisible();
  });

  test('admin signs in with a phone number', async ({ page }) => {
    await signInWithPhone(page);
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('header').getByText('Admin', { exact: true })).toBeVisible();
  });

  test('profile keeps the phone and treats email as extra', async ({ page }) => {
    await signInWithPhone(page);
    await page.locator('header').getByText('Local Admin').click();
    await page.getByRole('link', { name: 'Edit Profile' }).click();
    await expect(page.getByText('Personal Information', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Phone Number')).toHaveValue(phone);
    await expect(page.getByText('Extra information', { exact: true })).toBeVisible();
    await expect(page.getByText('Email Address', { exact: true })).toBeVisible();
  });

  test('signup requires a phone and leaves email optional', async ({ page }) => {
    await page.goto('/signup');
    await expect(
      page.getByText('Phone is required. Email is optional extra information.')
    ).toBeVisible();
    const phoneField = page.getByLabel('Phone Number');
    await expect(phoneField).toHaveAttribute('required', '');
    await expect(phoneField).toHaveAttribute('placeholder', '10-digit mobile number');
    const emailField = page.getByLabel('Email Address');
    await expect(page.getByText('Extra information', { exact: true })).toBeVisible();
    await expect(emailField).toHaveAttribute('placeholder', 'Optional');
    await expect(emailField).not.toHaveAttribute('required', '');
  });

  test('volunteer list can be found by phone on a small screen', async ({ page }) => {
    await signInWithPhone(page);
    await page.locator('.hamIconBtn').click();
    await page.getByRole('link', { name: 'Volunteers' }).click();
    await expect(page.getByRole('columnheader', { name: 'Phone Number' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email (extra)' })).toBeVisible();
    await page.getByPlaceholder('Search name or email').fill(phone);
    const adminName = page.getByRole('gridcell', { name: /Local Admin/ });
    await expect(adminName).toBeVisible();
    await adminName.getByText('Local Admin', { exact: true }).click();
    await expect(
      page.getByText('Phone identifies this volunteer or admin.')
    ).toBeVisible();
    await expect(page.getByLabel('Phone Number')).toHaveValue(phone);
    await expect(page.getByText('Extra information', { exact: true })).toBeVisible();
  });
});
