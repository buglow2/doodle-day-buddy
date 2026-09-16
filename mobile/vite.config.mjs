import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
  server: {
    host: true,
    allowedHosts: true   // 외부 주소(터널)로 접속 허용
  }
});
