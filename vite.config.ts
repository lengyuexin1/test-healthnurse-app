import { defineConfig, loadEnv } from "vite"
import uniPlugin from "@dcloudio/vite-plugin-uni"
import viteCompression from 'vite-plugin-compression';

//@ts-ignore
const uni = uniPlugin.default
// console.error('uniPlugin: ', uniPlugin)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
            // deleteOriginFile: true,
        }),
        uni(),
    ],
    
})
