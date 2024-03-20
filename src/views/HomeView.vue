<template>
    <section>
        <h1 class="text-center">
            {{ $tm(homeTitle) }}
        </h1>

        <Dashboard :items="dashboardItems" />
    </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, getCurrentInstance } from "vue"
import type { IConfig } from "@/regira_modules/vue/entities"
import { type IDashboardItem, toDashboardItem, Dashboard } from "@/components/dashboard"
import appConfig from "@/app-config"

const app = getCurrentInstance()!
const configs = Object.entries(app.appContext.config.globalProperties.$configs).map(([, config]) => config as IConfig)

const { title: homeTitle, dashboard: dashboardKeys } = appConfig
const dashboardItems = ref<Array<IDashboardItem>>([])

watchEffect(() => {
    dashboardItems.value = []
    dashboardKeys.forEach((key: string) => {
        const config = configs.find((d) => d.routePrefix == key)
        if (config == null) {
            console.warn(`Could not find dashboard item ${key}`)
        } else {
            const item = toDashboardItem(config)
            dashboardItems.value.push(item)
        }
    })
    if (app.appContext.config.globalProperties.$statistics?.enabled) {
        const statisticsItem: IDashboardItem = {
            name: "statistics",
            title: "statistics",
            icon: "statistics",
            description: "statisticsDescription",
        }
        dashboardItems.value.push(statisticsItem)
    }
})
</script>
