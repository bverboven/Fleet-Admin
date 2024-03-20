import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"

import { plugin as countryPlugin } from "./countries"
import { plugin as clientPlugin } from "./clients"
import { plugin as clientUserPlugin } from "./users"

// order is important -> cf HomeView
export const plugins = [countryPlugin, clientPlugin, clientUserPlugin]

export default {
    install(app: App<Element>, { routes }: { routes: Array<RouteRecordRaw> }) {
        app.config.globalProperties.$configs = {}

        plugins.forEach((plugin) => app.use(plugin, { routes }))
    },
}
