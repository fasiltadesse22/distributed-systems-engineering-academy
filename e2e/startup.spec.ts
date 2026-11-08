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
  console.log('STARTUP DIAGNOSTIC:', JSON.stringify({errors, root: await page.locator('#root').innerHTML(), body: (await page.locator('body').innerHTML()).slice(0, 700)}));
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
  await page.getByRole('link', { name: 'Master roadmap', exact: true }).click();
  await expect(page.getByRole('heading', { name: /master roadmap/i })).toBeVisible();
  await page.getByRole('link', { name: 'Cluster 1.1 blueprint', exact: true }).click();
  await expect(page.getByRole('heading', { name: /business workflows/i })).toBeVisible();
  await page.getByRole('link', { name: 'Interactive lab', exact: true }).click();
  await expect(page.getByRole('heading', { name: /make a race condition/i })).toBeVisible();
  await page.getByRole('button', { name: /yes, both succeed/i }).click();
  await page.getByRole('button', { name: /run modeled execution/i }).click();
  await expect(page.getByRole('heading', { name: /invariant violated/i })).toBeVisible();
  expect(errors, 'Browser runtime errors during navigation').toEqual([]);
});
