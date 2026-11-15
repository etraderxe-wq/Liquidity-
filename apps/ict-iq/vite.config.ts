import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
// SINGLE=1 builds one self-contained index.html (for sharing as a single page)
export default defineConfig({ plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])], base: './', test: { environment: 'node' } } as never);
