import { defineConfig } from 'vite';
import { createAngularPlugin } from 'vite-plugin-angular';

export default defineConfig({
  plugins: [createAngularPlugin()],
  server: {
    open: true,
    port: 4200,
  },
});
