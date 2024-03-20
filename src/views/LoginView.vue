<template>
    <section>
        <h1>Sign in</h1>

        <LoginForm :username="username" @success="handleLogin" @forgot-password="handleForgotPassword" />
    </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import LoginForm from "@/components/auth/LoginForm.vue"

defineProps<{
    username?: string
}>()

const router = useRouter()

function handleLogin() {
    const { url }: { url?: string } = router.currentRoute.value.query
    const redirectRoute = router.resolve(url || "/")
    console.debug("handleLogin", { url, route: router.currentRoute.value, redirectRoute })
    router.replace(redirectRoute)
}

function handleForgotPassword(username?: string) {
    router.push({ name: "forgotPassword", query: { username } })
}
</script>
