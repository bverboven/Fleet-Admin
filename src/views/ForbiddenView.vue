<template>
    <section>
        <h1>Forbidden</h1>
        <p class="text-danger">You are not authorized to perform this action.</p>
        <router-link v-if="url" :to="url">{{ url }}</router-link>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    url?: string
}>()
</script>
