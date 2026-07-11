<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row form-buttons">
            <div class="col col-md-auto order-1">
                <FormButtonsRow :item="item" :readonly="readonly" :feedback="feedback" :show-delete="item?.$id != 'new'"
                    @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col-auto order-2 order-md-3">
                <RouterLink v-if="isPopup" :to="{ name: `${config.key}Details`, params: { id: item.$id } }"
                    class="btn btn-default py-1" target="_blank" :title="$t('forms.popOut')">
                    <Icon name="popOut" />
                </RouterLink>
                <RouterLink v-else-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1">
                    <Icon name="list" /> <span class="d-none d-md-inline ms-1">{{ $t("overview") }}</span>
                </RouterLink>
            </div>
            <div class="col-md order-3 order-md-2">
                <Feedback :feedback="feedback" />
            </div>
        </div>

        <div class="row">
            <div class="col">
                <FormSection :title="$t(config.detailsTitle ?? config.key)" :readonly="readonly">
                    <div class="row">
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text">
                                    <Icon name="email" />
                                </div>
                                <input v-model="item.email" maxlength="256" :readonly="readonly" class="form-control" />
                            </div>
                            <FormLabel :label="$t('usernameLabel')" />
                        </div>
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text">
                                    <Icon name="key" />
                                </div>
                                <input v-model="item.newPassword" maxlength="256" placeholder="********"
                                    :readonly="readonly" class="form-control" />
                            </div>
                            <FormLabel :label="$t('passwordLabel')" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text">
                                    <Icon name="title" />
                                </div>
                                <input v-model="item.givenName" maxlength="256" :readonly="readonly"
                                    class="form-control" />
                            </div>
                            <FormLabel :label="$t('givenName')" />
                        </div>
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text">
                                    <Icon name="title" />
                                </div>
                                <input v-model="item.lastName" maxlength="256" :readonly="readonly"
                                    class="form-control" />
                            </div>
                            <FormLabel :label="$t('lastName')" />
                        </div>
                        <div class="col-md-2 mb-2">
                            <div class="input-group">
                                <div class="input-group-text">
                                    <Icon name="language" />
                                </div>
                                <select v-model="item.culture" class="form-select">
                                    <option value=""></option>
                                    <option v-for="(lang, culture) in cultures" :key="culture" :value="culture">
                                        {{ lang }}
                                    </option>
                                </select>
                            </div>
                            <FormLabel :label="$t('language')" />
                        </div>
                    </div>
                </FormSection>

                <FormSection :title="$t('permissions')">
                    <div v-for="tenant in item.tenants" :key="tenant.id!" class="row mb-2"
                        :class="{ 'is-deleted': isTenantDeleted(tenant) }">
                        <div class="col-sm">
                            <TenantButton :modelValue="tenant" class="me-1" /> {{ tenant.title }}
                        </div>
                        <div class="col">
                            <TenantClaimsInput v-model="item.tenantClaims!" :tenant="tenant" />
                        </div>
                        <div class="col-auto">
                            <IconButton icon="delete" @click="handleRemoveTenant(tenant)" />
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-sm">
                            <TenantInput :modelValue="newTenant"
                                :filter-defaults="{ exclude: item.tenants?.map((x) => x.id) }" @select="handleAddTenant"
                                ref="newTenantEl" />
                        </div>
                        <div class="col">
                            <TenantClaimsInput v-model="item.tenantClaims!" :tenant="newTenant" />
                        </div>
                        <div class="col-auto">
                            <IconButton icon="new" disabled class="border-0" />
                        </div>
                    </div>
                </FormSection>
            </div>
        </div>

        <Debug :modelValue="{
            item,
        }" />
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { Feedback } from "regira_modules/vue/ui"
import { FormButtonsRow } from "@/components/input"
import { useForm, type FormEmits, formDefaults } from "regira_modules/vue/entities"
import { useConfig } from "@/app-config"
import config from "../config/config"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"
import TenantClaimsInput from "../claims/TenantClaimsInput.vue"
import { type Entity as Tenant, InputSelector as TenantInput, FormModalButton as TenantButton } from "../../tenants"
import Permissions from "@/infrastructure/permissions"

interface Emits extends /* @vue-ignore */ FormEmits<Entity> { }
const emit = defineEmits<Emits>()
const props = withDefaults(
    defineProps<{
        modelValue: Entity
        readonly?: boolean
        overviewUrl?: string | RouteRecordRaw
        isPopup?: boolean
        initialTab?: string
    }>(),
    { ...formDefaults }
)

const { service: entityService } = useEntityStore()

const { item, feedback, handleCancel, handleSubmit, handleRemove, handleRestore } = useForm<Entity>({ entityService, props, emit })

const { cultures } = useConfig()

const newTenantEl = ref<any>(null)
const newTenant = ref<Tenant>()

function isTenantDeleted(tenant: Tenant) {
    return !item.value.tenantClaims?.some((c) => c.tenantId == tenant.id && !c._deleted)
}
function handleAddTenant(tenant?: Tenant) {
    if (tenant == null || item.value.tenants?.some((c) => c.id == tenant?.id)) {
        return
    }
    item.value.tenantClaims?.push({ tenantId: tenant.id!, claimType: "permissions", claimValue: Permissions.CAN_READ })
    item.value.tenants?.push(tenant)
    newTenantEl.value.resetQ()
}
function handleRemoveTenant(tenant: Tenant) {
    item.value.tenantClaims = item.value.tenantClaims?.map((c) => ({ ...c, _deleted: c._deleted || c.tenantId == tenant.id }))
}
</script>
