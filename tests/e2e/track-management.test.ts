import { test, expect } from '@playwright/test';

test('User can create a new track', async ({ page }) => {
	await page.goto('http://localhost:3000');
	await page.click('button[data-testid="create-track-button"]');
	await page.fill('[data-testid="input-title"]', 'My Test');
	await page.fill('[data-testid="input-artist"]', 'Test Artis');
	await page.waitForSelector('[data-testid="genre-selector"]');
	await page.selectOption('[data-testid="genre-selector"]', {
		label: 'Pop',
	});
	await page.click('[data-testid="submit-button"]');

	await page.waitForTimeout(3000);
});
