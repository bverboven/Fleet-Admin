<template>
    <div class="row border-bottom border-bottom-1 py-2">
        <div class="col-auto">
            <router-link :to="{ name: config.key + 'Details', params: { id: item.$id } }" class="btn btn-link p-1">
                <Icon :name="config.key" />
            </router-link>
        </div>
        <div class="col text-truncate">
            {{ item.$title }}
        </div>
        <div class="col d-none d-lg-block text-truncate">
            {{ item.userName }}
        </div>
        <div class="col-2 col-lg-1 text-truncate">
            {{ item.culture }}
        </div>
        <div v-if="!readonly" class="col-auto d-none d-md-block">
            <ConfirmButton icon="delete" class="m-0 p-1" :modal-type="ModalType.danger" @confirm="$emit('request-remove', item)">{{ $t("deleteItem", { title: item?.$title }) }}</ConfirmButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ModalType, ConfirmButton } from "regira_modules/vue/ui"
import type { SaveResult } from "regira_modules/vue/entities"
import Entity from "../data/Entity"
import config from "../config/config"

const emit = defineEmits<{
    (e: "update:modelValue", args: Entity): void
    (e: "save", args: SaveResult<Entity>): void
    (e: "remove", args: Entity): void
    (e: "request-save", args: Entity): void
    (e: "request-remove", args: Entity): void
}>()
const props = defineProps<{
    readonly?: boolean
}>()

const item = defineModel<Entity>({ required: true })
</script>
