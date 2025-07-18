/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['tests/e2e/**', 'node_modules', 'dist', '.next'],
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'lib/api'),
      '@lib': path.resolve(__dirname, 'lib'),
      '@ui': path.resolve(__dirname, 'components/ui'),
      '@components': path.resolve(__dirname, 'components'),
      '@context': path.resolve(__dirname, 'context'),
      '@models': path.resolve(__dirname, 'models'),
      '@gen': path.resolve(__dirname, 'gen'),
      '@store': path.resolve(__dirname, 'store')
    }
  }
});