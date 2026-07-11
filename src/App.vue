<template>
    <div class="page">
        <Offline />

        <header class="container-fluid bg-light">
            <Header />
        </header>

        <section class="container-fluid feedback-container position-relative overflow-hidden">
            <Feedback :feedback="$feedback" :enable-error-popup="true" />
            <Debug />
        </section>

        <main class="container-fluid">
            <LoadingContainer :isLoading="$appStatus != AppStatus.Ready && (!$auth.enabled || $auth.isAuthenticated)">
                <Main />
            </LoadingContainer>
        </main>

        <footer class="container-fluid bg-light">
            <Footer />
        </footer>

        <Teleport to="#loginModal">
            <LoginModal v-if="showLogin" :title="$t('auth.signIn')">
                <LoginForm :username="username" class="mt-2" @forgot-password="openForgotPassword" />
            </LoginModal>
            <ForgotPasswordModal v-if="showForgotPassword" @close="showForgotPassword = false">
                <ForgotPassword :username="username" class="mt-2" @login="openLogin" />
            </ForgotPasswordModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Feedback, LoadingContainer } from "regira_modules/vue/ui"
import { LoginModal, ForgotPasswordModal, useAuthStore } from "regira_modules/vue/auth"
import { AppStatus } from "regira_modules/vue/app"
import Header from "@/components/layout/TheHeader.vue"
import Footer from "@/components/layout/TheFooter.vue"
import Main from "@/components/layout/Main.vue"
import Offline from "@/components/layout/Offline.vue"
import Debug from "@/components/layout/Debug.vue"
import LoginForm from "@/components/auth/LoginForm.vue"
import ForgotPassword from "@/components/auth/ForgotPassword.vue"

// const authStore = useAuthStore()
// const { enabled, isAuthenticated } = storeToRefs(authStore)
// console.debug("App", { authStore, cmp: getCurrentInstance() })
const showForgotPassword = ref(false)
const username = ref<string>()
function openForgotPassword(e?: string) {
    console.debug("openForgotPassword", { evt: e })
    showForgotPassword.value = true
    username.value = e || ""
}
const authStore = useAuthStore()
const showLogin = computed(() => {
    console.debug("showLogin", { isRequired: authStore.isRequired, isAuthenticated: authStore.isAuthenticated })
    return authStore.isRequired && !authStore.isAuthenticated
})
function openLogin(login?: string) {
    showForgotPassword.value = false
    username.value = login
}
</script>
