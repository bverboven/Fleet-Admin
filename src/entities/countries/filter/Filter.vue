<template>
    <FilterInline v-model="searchObject" @filter="handleFilter" />
</template>

<script setup lang="ts">
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { useFilter, type FilterEmits } from "@/regira_modules/vue/entities"
import type SearchObject from "./SearchObject"
import FilterInline from "./FilterInline.vue"

interface Emits extends /* @vue-ignore */ FilterEmits {}

const emit = defineEmits<Emits>()
const props = defineProps<{
    modelValue: object
    modalTitle?: string
    resultCount?: number
}>()

const searchObject = useVModelField<SearchObject>(props, emit)

const { handleFilter } = useFilter({ searchObject, emit })
</script>
