import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 화면 묶음 버전 (CI가 MP_VER=1.0.xx 로 넣음, 로컬은 dev) — 앱 업데이트 비교용
  define: { __MP_WEB_VER__: JSON.stringify(process.env.MP_VER || 'dev') },
  build: { outDir: 'dist' },
  server: {
    host: true,
    allowedHosts: true   // 외부 주소(터널)로 접속 허용
  }
});
