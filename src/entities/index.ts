import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"

import { plugin as tenantPlugin } from "./tenants"
import { plugin as tenantUserPlugin } from "./users"

// order is important -> cf HomeView
export const plugins = [tenantPlugin, tenantUserPlugin]

export default {
    install(app: App<Element>, { routes }: { routes: Array<RouteRecordRaw> }) {
        app.config.globalProperties.$configs = {}

        plugins.forEach((plugin) => app.use(plugin, { routes }))
    },
}
