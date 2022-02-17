import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import { viteExternalsPlugin } from 'vite-plugin-externals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteExternalsPlugin({
    electron: 'electron',
    'electron-fetch': 'electron-fetch',
    // stream: 'stream',
    // STATUS_CODES: 'STATUS_CODES',
    // http: 'http',
  })],
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
