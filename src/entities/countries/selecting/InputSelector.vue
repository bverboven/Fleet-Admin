<template>
    <div class="input-group text-nowrap">
        <slot name="prepend">
            <div class="input-group-text">
                <Icon :name="Entity.name" />
            </div>
        </slot>
        <slot>
            <Autocomplete
                class="form-control"
                v-model="item"
                :filter-defaults="filterDefaults"
                :readonly="readonly"
                :placeholder="placeholder"
                :auto-select="autoSelect"
                @change="handleSelect"
                ref="autoEl"
            />
        </slot>
        <slot name="append">
            <template v-if="!readonly">
                <button type="button" :disabled="item == null" class="btn btn-outline-secondary" @click="handleSelect(undefined)"><Icon name="clear" /></button>
                <SelectorModalButton v-model="item" :filter-defaults="filterDefaults" :disabled="readonly" @select="handleSelect" class="btn btn-outline-info" />
            </template>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, onMounted } from "vue"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"
import Autocomplete from "./Autocomplete.vue"
import SelectorModalButton from "./SelectorModalButton.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args?: Entity): void
    (e: "update:idValue", args?: string): void
    (e: "select", args?: Entity): void
}>()
const props = defineProps<{
    modelValue?: Entity
    idValue?: string
    filterDefaults?: Record<string, any>
    autoSelect?: boolean
    readonly?: boolean
    placeholder?: string
}>()
const autoEl = ref<any>(null)
const { fromPool, fromCache } = useEntityStore()
const item = computed<Entity | undefined>({
    get: () => fromPool(props.modelValue) as Entity,
    set: (value) => {
        emit("update:modelValue", value as Entity)
        emit("update:idValue", value?.code)
    },
})

function handleSelect(selected?: Entity) {
    if (item.value?.id != selected?.id) {
        item.value = selected // emit
        emit("select", selected)
    }

    if (selected == null) {
        // empty q in autocomplete
        const { resetQ } = autoEl.value
        resetQ()
    }
}

onMounted(() => {
    if (!item.value && props.idValue) {
        const items = computed(() => (fromCache() as Array<Ref<Entity>>)!.map((x) => x.value))
        item.value = items.value.find((x) => x.id == props.idValue)
    }
})
</script>
