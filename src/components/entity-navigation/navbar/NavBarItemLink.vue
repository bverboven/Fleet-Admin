<template>
    <RouterLink :to="{ name: item.routeName, query: (item.initialQuery || {}) as LocationQueryRaw }" @click="$emit('select', item.id)">
        <icon :name="item.icon ?? ''" />
        <slot>
            <span class="d-md-none d-xl-inline ms-2">{{ $t(item.title) }}</span>
        </slot>
    </RouterLink>
</template>

<script setup lang="ts">
import type { LocationQueryRaw } from "vue-router"
import type { INavItem } from "regira_modules/vue/entities"

defineEmits<{
    (e: "select", id: string): void
}>()

defineProps<{
    item: INavItem
}>()
</script>
