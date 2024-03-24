<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row form-buttons">
            <div class="col col-md-auto order-1">
                <FormButtonsRow :item="item" :readonly="readonly" :feedback="feedback" :show-delete="item?.id > 0" @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col-md order-3 order-md-2">
                <Feedback :feedback="feedback" />
            </div>
            <div class="col-auto order-2 order-md-3">
                <RouterLink v-if="isPopup" :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }" class="btn btn-default py-1" target="_blank" :title="$t('forms.popOut')">
                    <Icon name="popOut" />
                </RouterLink>
                <RouterLink v-else-if="overviewUrl" :to="overviewUrl" class="btn btn-info py-1">
                    <Icon name="list" /> <span class="d-none d-md-inline ms-1">{{ $t("overview") }}</span>
                </RouterLink>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <FormSection :title="$t(config.detailsTitle)" :readonly="readonly">
                    <div class="row">
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text"><Icon name="email" /></div>
                                <input v-model="item.userName" maxlength="256" :readonly="readonly" class="form-control" />
                            </div>
                            <FormLabel :label="$t('usernameLabel')" />
                        </div>
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text"><Icon name="key" /></div>
                                <input v-model="item.newPassword" maxlength="256" :readonly="readonly" class="form-control" />
                            </div>
                            <FormLabel :label="$t('passwordLabel')" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text"><Icon name="title" /></div>
                                <input v-model="item.givenName" maxlength="256" :readonly="readonly" class="form-control" />
                            </div>
                            <FormLabel :label="$t('givenName')" />
                        </div>
                        <div class="col-md mb-2">
                            <div class="input-group">
                                <div class="input-group-text"><Icon name="title" /></div>
                                <input v-model="item.lastName" maxlength="256" :readonly="readonly" class="form-control" />
                            </div>
                            <FormLabel :label="$t('lastName')" />
                        </div>
                    </div>
                </FormSection>

                <FormSection :title="$t('permissions')">
                    <div v-for="client in item.clients" :key="client.id!" class="row">
                        <div class="col-sm mb-2">
                            <ClientInput :modelValue="client" />
                        </div>
                        <div class="col mb-2">
                            <ClientClaimsInput v-model="item.clientClaims!" :client="client" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm mb-2">
                            <ClientInput :modelValue="newClient" @select="handleAddClient" ref="newClientEl" />
                        </div>
                        <div class="col mb-2">
                            <ClientClaimsInput v-model="item.clientClaims!" :client="newClient" />
                        </div>
                    </div>
                </FormSection>
            </div>
        </div>

        <Debug
            :modelValue="{
                item,
            }"
        />
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { Feedback } from "@/regira_modules/vue/ui"
import { FormButtonsRow } from "@/components/input"
import { useForm, type FormEmits, formDefaults } from "@/regira_modules/vue/entities"
import config from "../config/config"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"
import ClientClaimsInput from "../claims/ClientClaimsInput.vue"
import { type Entity as Client, InputSelector as ClientInput } from "../../clients"
import Permissions from "@/infrastructure/permissions"

interface Emits extends /* @vue-ignore */ FormEmits<Entity> {}
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

const newClientEl = ref<any>(null)
const newClient = ref<Client>()
function handleAddClient(client?: Client) {
    if (client == null || item.value.clients?.some((c) => c.id == client?.id)) {
        return
    }
    item.value.clientClaims?.push({ clientId: client.id!, claimType: "permissions", claimValue: Permissions.CAN_READ })
    item.value.clients?.push(client)
    newClientEl.value.resetQ()
}
</script>
