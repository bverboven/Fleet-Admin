<template>
    <InputSelector v-model="item" :placeholder="placeholder" @select="handleSelect" />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import type Entity from "../data/Entity"
import useEntityStore from "../data/store"
import InputSelector from "./InputSelector.vue"

const emit = defineEmits<{
    (e: "update:modelValue", args?: Entity): void
    (e: "update:idValue", args?: string): void
}>()
const props = defineProps<{
    modelValue?: Entity
    idValue?: string
    placeholder?: string
}>()

const { fromPool, details } = useEntityStore()
const item = computed<Entity>({
    get: () => fromPool(props.modelValue) as Entity,
    set: (value) => emit("update:modelValue", value),
})

function handleSelect(selected?: Entity) {
    console.debug("handleSelect", { selected })
    emit("update:idValue", selected?.id)
    emit("update:modelValue", selected)
}
// function handleRemove(selected: Entity) {
//     console.debug("handleRemove", { selected })
//     emit("update:idValue", undefined)
//     emit("update:modelValue", undefined)
// }

onMounted(async () => {
    console.debug("Selector.Mount", { modelValue: props.modelValue, id: props.idValue })
    if (props.idValue && props.modelValue == null) {
        const model = await details(props.idValue)
        //item.value = model
        emit("update:modelValue", model!)
    }
})
</script>
