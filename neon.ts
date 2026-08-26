import { defineConfig } from '@neon/config/v1';

export default defineConfig({
  preview: {
    buckets: {
      cairrl: {
        access: 'public_read',
      },
    },
  },
});
