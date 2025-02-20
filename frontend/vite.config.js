import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-username' and 'your-repo-name'
export default defineConfig({
  plugins: [react()],
  base: '/task-manager/frontend/',  // Must match the repo's subdirectory
});
