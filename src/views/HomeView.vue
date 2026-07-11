<template>
    <section>
        <h1 class="text-center">
            {{ $tm(homeTitle) }}
        </h1>

        <Dashboard />
    </section>
</template>

<script setup lang="ts">
import appConfig from "@/app-config"
import { Dashboard } from "@/components/entity-navigation"

const { title: homeTitle } = appConfig
</script>
