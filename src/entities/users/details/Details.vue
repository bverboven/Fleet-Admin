<template>
    <section>
        <LoadingContainer :is-loading="isLoading">
            <RouterView v-slot="{ Component }">
                <Feedback :feedback="feedback" />
                <component :is="Component" v-if="item != null" v-model="item" :overviewUrl="overviewUrl" @change-state="isLoading = $event == FormStates.pending" @remove="handleRemove" />
            </RouterView>
        </LoadingContainer>
    </section>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router"
import { onAuthenticated, useAuth, useGlobalAuth } from "regira_modules/vue/auth"
import { LoadingContainer, Feedback } from "regira_modules/vue/ui"
import { useDetails } from "regira_modules/vue/entities/details"
import { FormStates } from "regira_modules/vue/entities/form"
import Entity from "../data/Entity"
import config from "../config/config"
import useEntityStore from "../data/store"

const { service } = useEntityStore()

const { item, isLoading, overviewUrl, load, feedback } = useDetails(service)

// (re)load once a token is present: sign-in, refresh, or a stored token restored on reload. Another
// account's record goes first: it must not stay on screen, or be saved
let shownFor = useGlobalAuth()?.authData?.userId // whose record is on screen
const shownToken = useAuth()?.tokenManager?.token // the stored token the mount fetch sends before onAuthenticated validates it
onAuthenticated(
    () => {
        const account = useGlobalAuth()?.authData?.userId
        if (useGlobalAuth()?.authData?.token === shownToken) shownFor = account
        if (account !== shownFor) item.value = undefined
        if (item.value == null) {
            shownFor = account
            load()
        }
    },
    { immediate: false }
)

const router = useRouter()
function handleRemove() {
    router.push(overviewUrl || { name: config.key + "Overview" })
}
</script>
