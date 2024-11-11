import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const port = env.REACT_PORT ? env.REACT_PORT : 3001;
    return {
        plugins: [react()],
        base: "/",
        preview: {
            port: port,
            strictPort: true,
        },
        server: {
            port: port,
            strictPort: true,
            host: true,
            origin: "http://0.0.0.0:" + port,
        }
    }
})
