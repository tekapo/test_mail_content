import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: '**/e2e-tests/**/*.spec.ts',
  timeout: 30000,
};
export default config;
