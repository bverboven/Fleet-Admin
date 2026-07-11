<template>
    <div class="col mb-2">
        <div class="form-check form-check-inline">
            <label class="form-check-label">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :disabled="!tenant?.id"
                    :value="Permissions.CAN_READ"
                    :checked="hasTenantClaim(Permissions.CAN_READ, tenant?.id)"
                    @click="toggleTenantClaim(Permissions.CAN_READ, tenant?.id!)"
                />
                {{ $t("claims.canRead") }}
            </label>
        </div>
        <div class="form-check form-check-inline">
            <label class="form-check-label">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :disabled="!tenant?.id"
                    :value="Permissions.CAN_WRITE"
                    :checked="hasTenantClaim(Permissions.CAN_WRITE, tenant?.id)"
                    @click="toggleTenantClaim(Permissions.CAN_WRITE, tenant?.id!)"
                />
                {{ $t("claims.canWrite") }}
            </label>
        </div>
        <div class="form-check form-check-inline">
            <label class="form-check-label">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :disabled="!tenant?.id"
                    :value="Permissions.ADMIN"
                    :checked="hasTenantClaim(Permissions.ADMIN, tenant?.id)"
                    @click="toggleTenantClaim(Permissions.ADMIN, tenant?.id!)"
                />
                {{ $t("claims.admin") }}
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Permissions from "@/infrastructure/permissions"
import type { ITenantClaim } from "../data/Entity"
import { type Entity as Tenant } from "../../tenants"

const props = defineProps<{
    tenant?: Tenant
}>()

const items = defineModel<Array<ITenantClaim>>({ required: true })
const tenant = ref(props.tenant)

function hasTenantClaim(claimValue: string, tenantId?: string) {
    return items.value?.some((c) => c.tenantId == tenantId && c.claimType == "permissions" && c.claimValue == claimValue && !c._deleted)
}
function toggleTenantClaim(claimValue: string, tenantId: string) {
    const claims = items.value ?? []
    let claim = claims.find((c) => c.tenantId == tenantId && c.claimType == "permissions" && c.claimValue == claimValue)
    if (claim != null) {
        claim._deleted = !claim._deleted
    } else {
        claim = { tenantId, claimType: "permissions", claimValue }
        claims.push(claim)
    }
    items.value = [...claims]
}
</script>
