<template>
    <div class="text-info">
        <span>
            {{ visibleCount }} <template v-if="totalCount != null">/ {{ totalCount }}</template> {{ $t("overview.results") }}
        </span>
    </div>
</template>

<script setup lang="ts">
defineProps<{ visibleCount: number; totalCount?: number | null }>()
</script>
