import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import dns from 'dns'

// dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],

  server: {
    host: 'localhost',
    port: 3000
  },

  build: {
    sourcemap: true
  }
})