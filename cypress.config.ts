import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 4000,
    baseUrl: 'http://localhost:3000/',
  },
});
