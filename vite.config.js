import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isAccountSite = repositoryName?.endsWith('.github.io');
const base = process.env.VITE_BASE_PATH
  ?? (process.env.GITHUB_ACTIONS && repositoryName && !isAccountSite ? `/${repositoryName}/` : '/');

export default defineConfig({
  base,
  plugins: [react()],
});
