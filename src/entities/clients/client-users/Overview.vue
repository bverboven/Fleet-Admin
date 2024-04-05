<template>
    <FormSection>
        <template #title>
            <div class="d-flex justify-content-between">
                <h3 class="p-2 mb-2">{{ $t("entities.users") }}</h3>
                <UserButton
                    :item-defaults="{ clients: [owner], culture: owner.defaultCulture, clientClaims: [{ clientId: owner.id, claimType: 'permissions', claimValue: Permissions.CAN_READ }] }"
                    class="btn btn-info py-1 my-1"
                    @save="load"
                >
                    <Icon name="new" />
                </UserButton>
            </div>
        </template>
        <LoadingContainer :is-loading="isLoading">
            <div class="row pb-2 border-bottom border-bottom-1">
                <div class="col-auto fw-bold"><Icon name="edit" class="m-1" /></div>
                <div class="col fw-bold">{{ $t("name") }}</div>
                <div class="col fw-bold">{{ $t("culture") }}</div>
            </div>
            <div v-for="item in items" :key="item.id" class="row border-bottom border-bottom-1 py-2">
                <div class="col-auto">
                    <UserButton :modelValue="item" :readonly="readonly" class="p-1" />
                </div>
                <div class="col text-truncate">
                    {{ item.$title }}
                </div>
                <div class="col-2 col-lg-1 text-truncate">
                    {{ item.culture }}
                </div>
            </div>
        </LoadingContainer>
    </FormSection>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { get } from "@/regira_modules/vue/ioc"
import Permissions from "@/infrastructure/permissions"
import type Supplier from "../data/Entity"
import { Entity, type EntityService, FormModalButton as UserButton } from "../../users"

const props = defineProps<{
    owner: Supplier
    readonly?: boolean
}>()

const service = get<EntityService>(Entity.name)!
const items = ref<Array<Entity>>()
const isLoading = ref(false)

async function load() {
    try {
        isLoading.value = true
        items.value = await service.list({ clientId: props.owner.id })
    } finally {
        isLoading.value = false
    }
}

onMounted(load)
</script>
