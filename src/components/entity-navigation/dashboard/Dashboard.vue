<template>
    <div v-if="dashboardTree != null">
        <template v-for="node in dashboardTree.roots" :key="node.value.id">
            <DashboardContainer v-if="node.children.length" :node="node" :is-collapsed="isCollapsed" />
        </template>
        <Debug :modelValue="{ tree: dashboardTree.getValues() }" />
    </div>
</template>

<script setup lang="ts">
import { useNavigation } from "../functions"
import DashboardContainer from "./DashboardContainer.vue"

defineProps<{
    isCollapsed?: boolean
}>()

const { dashboardTree } = useNavigation()
</script>
