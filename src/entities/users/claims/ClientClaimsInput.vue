<template>
    <div class="col mb-2">
        <div class="form-check form-check-inline">
            <label class="form-check-label">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :disabled="!client?.id"
                    :value="Permissions.CAN_READ"
                    :checked="hasClientClaim(Permissions.CAN_READ, client?.id)"
                    @click="toggleClientClaim(Permissions.CAN_READ, client?.id!)"
                />
                {{ $t("claims.canRead") }}
            </label>
        </div>
        <div class="form-check form-check-inline">
            <label class="form-check-label">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :disabled="!client?.id"
                    :value="Permissions.CAN_WRITE"
                    :checked="hasClientClaim(Permissions.CAN_WRITE, client?.id)"
                    @click="toggleClientClaim(Permissions.CAN_WRITE, client?.id!)"
                />
                {{ $t("claims.canWrite") }}
            </label>
        </div>
        <div class="form-check form-check-inline">
            <label class="form-check-label">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :disabled="!client?.id"
                    :value="Permissions.ADMIN"
                    :checked="hasClientClaim(Permissions.ADMIN, client?.id)"
                    @click="toggleClientClaim(Permissions.ADMIN, client?.id!)"
                />
                {{ $t("claims.admin") }}
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import Permissions from "@/infrastructure/permissions"
import type { IClientClaim } from "../data/Entity"
import { type Entity as Client } from "../../clients"

const emit = defineEmits<{
    (e: "update:modelValue", items: Array<IClientClaim>): void
}>()
const props = defineProps<{
    modelValue: Array<IClientClaim>
    client?: Client
}>()

const items = useVModelField<Array<IClientClaim>>(props, emit)
const client = ref(props.client)

function hasClientClaim(claimValue: string, clientId?: string) {
    return items.value?.some((c) => c.clientId == clientId && c.claimType == "permissions" && c.claimValue == claimValue && !c._deleted)
}
function toggleClientClaim(claimValue: string, clientId: string) {
    const claims = items.value ?? []
    let claim = claims.find((c) => c.clientId == clientId && c.claimType == "permissions" && c.claimValue == claimValue)
    if (claim != null) {
        claim._deleted = !claim._deleted
    } else {
        claim = { clientId, claimType: "permissions", claimValue }
        claims.push(claim)
    }
    emit("update:modelValue", [...claims])
}
</script>
