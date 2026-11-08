import { test, expect } from '@playwright/test';

test('academy first load mounts a visible React home page without exceptions', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message + '\\n' + error.stack));
  page.on('requestfailed', req => errors.push('Request failed: ' + req.url() + ' => ' + req.failure()?.errorText));
  page.on('response', res => { if (res.status() >= 400) errors.push('HTTP ' + res.status() + ': ' + res.url()); });
  page.on('console', msg => { if (msg.type() === 'error') errors.push('Console: '+msg.text()); });
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await page.waitForTimeout(750);
  if (errors.length) console.log('Browser startup errors:', errors.join('\\n'));
  await expect(page.locator('#root')).not.toBeEmpty();
  await expect(page.getByRole('heading', { name: /understand the systems/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /explore cluster 1\.1/i })).toBeVisible();
  expect(errors, 'Browser runtime errors').toEqual([]);
});

test('roadmap, blueprint and interactive lab load through navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#root')).not.toBeEmpty();
  await page.locator('nav[aria-label="Main navigation"] a[href="#/roadmap"]').click();
  await expect(page.getByRole('heading', { name: /master roadmap/i })).toBeVisible();
  await page.locator('nav[aria-label="Main navigation"] a[href="#/blueprint"]').click();
  await expect(page.getByRole('heading', { name: /business workflows/i })).toBeVisible();
  await page.locator('nav[aria-label="Main navigation"] a[href="#/lab"]').click();
  await expect(page.getByRole('heading', { name: /make a race condition/i })).toBeVisible();
  await page.getByRole('button', { name: /yes, both succeed/i }).click();
  await page.getByRole('button', { name: /run modeled execution/i }).click();
  await expect(page.getByRole('heading', { name: /invariant violated/i })).toBeVisible();
  expect(errors, 'Browser runtime errors during navigation').toEqual([]);
});
