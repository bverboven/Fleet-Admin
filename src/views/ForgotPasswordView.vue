<template>
    <section>
        <h1>Forgot password</h1>

        <ForgotPassword :username="username" @login="openLogin" />
    </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import ForgotPassword from "@/components/auth/ForgotPassword.vue"

defineProps<{
    username?: string
}>()

const router = useRouter()
function openLogin(username?: string) {
    router.push({ name: "login", query: { username } })
}
</script>
