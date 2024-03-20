<template>
    <div class="row">
        <div class="col-auto">
            <div class="input-group">
                <IconButton icon="clear" class="btn-outline-secondary" @click="handleReset" />
                <input v-model.lazy.trim="searchObject.q" class="form-control" :style="{ width: $screen.layout == 'xs' ? '10rem' : undefined }" :placeholder="$t('keywords')" @change="handleUpdate" />
                <IconButton icon="search" class="btn-outline-primary" @click="handleUpdate" />
            </div>
            <small v-if="filterIsActive" class="italic-muted">{{ $t("filtersAreApplied") }}</small>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFilter, type FilterEmits } from "@/regira_modules/vue/entities"
import SearchObject from "./SearchObject"
import { useVModelField } from "@/regira_modules/vue/vue-helper"

interface Emits extends /* @vue-ignore */ FilterEmits {}

const emit = defineEmits<Emits>()
const props = withDefaults(
    defineProps<{
        modelValue: SearchObject
        resultCount?: number | null
    }>(),
    {
        modelValue: () => new SearchObject(),
    }
)
const searchObject = useVModelField<SearchObject>(props, emit)

const { filterIsActive, handleReset, handleUpdate } = useFilter({ searchObject, emit, Constructor: SearchObject })
</script>
