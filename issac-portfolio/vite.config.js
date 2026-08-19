import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// GitHub Pages(username.github.io/REPO_NAME)에 올릴 경우
// base를 '/REPO_NAME/'으로 바꿔주세요. (username.github.io 루트 레포면 '/' 유지)
export default defineConfig({
    base: '/issac-portfolio/',
    plugins: [react()],
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
    },
});
