import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL ,
          changeOrigin: true,
          secure: false,
          timeout: 60000,
          // Uncomment below if Django endpoints don't include '/api/' in their URLs
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})