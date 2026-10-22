import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueDevTools from "vite-plugin-vue-devtools"

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    base: "/admin/",
    server: {
        port: 5173,
        // the Admin API lists this origin in Authentication:AccountEmails:AllowedOrigins: a moved port is another origin,
        // and password recovery answers 400 — fail rather than move to the next free port
        strictPort: true,
    },
})
