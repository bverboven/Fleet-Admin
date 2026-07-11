<template>
    <div class="col-md mb-2">
        <div class="form-floating">
            <textarea v-model="item" :maxlength="maxLength" :readonly="readonly" :style="style" class="form-control"></textarea>
            <label>{{ label }}</label>
            <!-- <FormLabel :label="label" /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
    defineProps<{
        readonly?: boolean
        label?: string
        maxLength?: number
        style?: Record<string, any>
    }>(),
    {
        label: "Description",
        style: () => ({ height: "7.5rem" }),
    }
)

const item = defineModel<string>({ default: "" })
const label = computed(() => {
    let lblValue = props.label
    if (props.maxLength) {
        const charsLeft = props.maxLength - (item.value?.length || 0)
        lblValue = `${lblValue} (${charsLeft} characters left)`
    }
    return lblValue
})
</script>
