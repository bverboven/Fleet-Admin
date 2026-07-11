import { createApp } from "vue"
import { createPinia } from "pinia"
import type { RouteRecordRaw } from "vue-router"
import { initAxios } from "regira_modules/vue/http"
import { plugin as servicesPlugin, configureGlobals, type IServiceProvider } from "regira_modules/vue/ioc"
import { AppStatus, plugin as appPlugin, whenAppReady } from "regira_modules/vue/app"
import { plugin as langPlugin, useLang } from "regira_modules/vue/lang"
import { Anchor, FormSection, FormLabel, DateInput, NullableCheckBox, NullableLabel, iconPlugin, loadingPlugin, screenPlugin, modalPlugin, feedbackPlugin } from "regira_modules/vue/ui"
import { focus, grow, clickOutside } from "regira_modules/vue/directives"
import { plugin as isOnlinePlugin } from "regira_modules/vue/online"
import { plugin as debugPlugin } from "regira_modules/vue/debug"
import { preloaderPlugin, defaultPoolCache, PoolCache } from "regira_modules/vue/entities"
import { plugin as authPlugin, LocalStorageTokenManager } from "regira_modules/vue/auth"
import { formatDateTime } from "regira_modules/vue/formatters"
import appConfig, { createConfig, useConfig } from "@/app-config"
import { routerFactory } from "@/router"
import entityPlugins from "@/entities"

import App from "@/App.vue"
import DescriptionInput from "@/components/input/DescriptionInput.vue"
import FleetModal from "@/components/layout/FleetModal.vue"

// date serialization to JSON (without timezone)
import dateSerializer from "regira_modules/extensions/date-extensions"
dateSerializer.use()

// opt in to app-wide component registration (Icon, IconButton, Loading*, MyModal, Debug)
// — must be set before the plugins install
configureGlobals({ registerComponentsGlobally: true })

// Assets — Bootstrap 5 + icons via npm, library component styles (modal backdrop, autocomplete dropdown)
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "regira_modules/style.css"
import "@/assets/main.scss"
import loadingImg from "@/assets/images/loading.gif"

// load config
fetch(`${appConfig.baseUrl}/config.json?v=${formatDateTime(new Date(), "yyyyMMdd")}`)
    .then((r) => r.json())
    .then(async (config: Record<string, any>) => {
        // start init app
        console.debug("init", { config })
        // config (processed)
        const processedConfig = createConfig(config)
        const { api, includeCredentials } = processedConfig
        const axios = initAxios({ api, includeCredentials })

        // load translations
        const translations = await fetch(`${appConfig.baseUrl}/data/translations.json?v=${formatDateTime(new Date(), "yyyyMMdd")}`).then((r) => r.json())

        // app
        const app = createApp(App)
        // store
        app.use(createPinia())

        app.use(appPlugin, { culture: processedConfig.culture })

        // services
        app.use(servicesPlugin, {
            configure: (sp: IServiceProvider) => {
                return (
                    sp
                        // axios
                        .add("axios", () => axios)
                        // pooling
                        .add(PoolCache.name, () => defaultPoolCache)
                )
            },
        })

        // UI plugins (registerComponentsGlobally is on — plugins register their components app-wide)
        app.use(iconPlugin, { source: "bs", clearFirst: false })
        app.use(screenPlugin)
        app.use(isOnlinePlugin)
        app.use(loadingPlugin, { img: loadingImg })
        app.use(modalPlugin, { DefaultModal: FleetModal })
        app.use(feedbackPlugin, { autoHideDelay: 2500 })

        // global components not covered by the plugins (use explicit naming -> functions are renamed when minimized in build)
        app.component("MyAnchor", Anchor)
        app.component("FormSection", FormSection)
        app.component("FormLabel", FormLabel)
        app.component("DateInput", DateInput)
        app.component("NullableCheckBox", NullableCheckBox)
        app.component("NullableLabel", NullableLabel)
        app.component("DescriptionInput", DescriptionInput)

        // lang
        app.use(langPlugin, {
            defaultLang: "en",
            messages: translations, //() => fetch(`${appConfig.baseUrl}/data/translations.json`).then((r) => r.json()),
        })
        const { translate: t, translateMessage, setLangCode } = useLang()

        document.title = translateMessage(processedConfig.title)

        // global directives
        app.use(focus)
        app.use(grow)
        app.use(clickOutside)

        // entities + entity routes
        const entityRoutes: Array<RouteRecordRaw> = []
        app.use(entityPlugins, { routes: entityRoutes })

        // routing
        const router = routerFactory([...entityRoutes])
        app.use(router)

        // preloader
        app.use(preloaderPlugin)

        // debug (needs the router; shows only when ?debug=1 / isDebug)
        app.use(debugPlugin, { isDebug: config.isDebug })

        // auth last (needs the router on the app)
        app.use(authPlugin, {
            enabled: true,
            clientApp: processedConfig.clientApp,
            loginUrl: processedConfig.loginUrl,
            tokenManager: new LocalStorageTokenManager(),
            axios,
            onAuthenticationChange: async (auth) => {
                if (auth.isAuthenticated) {
                    app.config.globalProperties.$setAppStatus(AppStatus.Loading)
                    const welcomeMsg = t("welcome", { name: auth.displayName || auth.name })
                    app.config.globalProperties.$feedback.success(welcomeMsg)

                    // preloading
                    // const preloaderTypes = [Country]
                    // const { preload } = usePreloader()
                    // await preload(preloaderTypes as any)

                    // ready
                    if (auth.culture != null) {
                        app.config.globalProperties.$setCulture(auth.culture)
                    }
                    app.config.globalProperties.$setAppStatus(AppStatus.Ready)

                    setLangCode(auth.culture!.split("-")[0] || "en")
                    document.title = translateMessage(processedConfig.title)

                    console.debug("ready", {
                        app,
                        appConfig: useConfig(),
                        router,
                        routes: router.getRoutes(),
                        cache: defaultPoolCache,
                        icons: app.config.globalProperties.$icons.map,
                    })
                } else {
                    app.config.globalProperties.$feedback.fail(`User logged out`)
                }
            },
        })

        // mount
        app.config.globalProperties.$setAppStatus(AppStatus.Mounting)

        app.mount("#app")

        await whenAppReady()
    })
