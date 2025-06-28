import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import path from 'path';

test.describe('Track Management', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000');
	});

	test('should allow user to create a new track', async ({ page }) => {
		const title = faker.music.songName();
		const artist = faker.music.artist();

		await page.click('[data-testid="create-track-button"]');
		await page.fill('[data-testid="input-title"]', title);
		await page.fill('[data-testid="input-artist"]', artist);
		await page.waitForSelector('[data-testid="genre-selector"]');
		await page.selectOption('[data-testid="genre-selector"]', { label: 'Pop' });
		await page.click('[data-testid="submit-button"]');

		await expect(page.locator('.toaster-container')).toHaveText(/Success!/, { timeout: 5000 });

		const trackTitle = page.locator('[data-testid^="track-item-"][data-testid$="-title"]', {
			hasText: title,
		});
		await expect(trackTitle).toBeVisible();
	});

	test('should allow user to upload audio file via dropzone', async ({ page }) => {
		const audioPath = path.resolve(__dirname, 'fixtures', 'sample-audio.mp3');

		const uploadButtons = page.locator('[data-testid^="upload-track-"]');
		await uploadButtons.first().click();

		const dropzone = page.locator('[data-testid="dropzone-add-file"]');
		await expect(dropzone).toBeVisible();

		const fileInput = dropzone.locator('input[type="file"]');
		await fileInput.setInputFiles(audioPath);

		await page.click('[data-testid="confirm-add-file"]');
		await expect(page.locator('.toaster-container')).toHaveText(/Done!/, { timeout: 5000 });
	});

	test('should allow user to delete an uploaded file', async ({ page }) => {
		const deleteFile = page.locator('[data-testid^="delete-file-"]');
		await deleteFile.first().click();

		const confirmDeleteButton = page.locator('[data-testid="confirm-delete-file"]');
		await expect(confirmDeleteButton).toBeVisible();
		await confirmDeleteButton.click();

		await expect(page.locator('.toaster-container')).toHaveText(/Success!/, { timeout: 5000 });
	});

	test('should allow user to delete the first available track', async ({ page }) => {
		const deleteButtons = page.locator('[data-testid^="delete-track-"]');
		await deleteButtons.first().click();

		const confirmButton = page.locator('[data-testid="confirm-delete"]');
		await expect(confirmButton).toBeVisible();
		await confirmButton.click();

		await expect(page.locator('.toaster-container')).toHaveText(/Success!/, { timeout: 5000 });
	});
});
