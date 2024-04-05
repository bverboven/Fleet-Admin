<template>
    <form @submit.prevent="handleSubmit" :modelValue="item">
        <div class="row form-buttons">
            <div class="col col-md-auto order-1">
                <FormButtonsRow :item="item" :readonly="readonly" :feedback="feedback" :show-delete="item?.$id != 'new'" @cancel="handleCancel" @remove="handleRemove" @restore="handleRestore" />
            </div>
            <div class="col-auto order-2 order-md-3">
                <RouterLink v-if="isPopup" :to="{ name: `${Entity.name}Details`, params: { id: item.$id } }" class="btn btn-default py-1" target="_blank" :title="$t('forms.popOut')">
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
                <TabContainer :tabs="tabs" :active="initialTab" :use-route-nav="!isPopup">
                    <template #form>
                        <FormSection :title="$t(config.detailsTitle)" :readonly="readonly">
                            <div class="row">
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="title" /></div>
                                        <input v-model="item.title" maxlength="128" :readonly="readonly" class="form-control" />
                                    </div>
                                    <FormLabel :label="$t('name')" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="code" /></div>
                                        <input v-model="item.code" maxlength="8" :readonly="readonly" class="form-control" />
                                    </div>
                                    <FormLabel :label="$t('code')" />
                                </div>
                                <div class="col-md mb-2">
                                    <div class="input-group">
                                        <div class="input-group-text"><Icon name="language" /></div>
                                        <select v-model="item.defaultCulture" class="form-select">
                                            <option value=""></option>
                                            <option v-for="(lang, culture) in cultures" :key="culture" :value="culture">
                                                {{ lang }}
                                            </option>
                                        </select>
                                    </div>
                                    <FormLabel :label="$t('defaultCulture')" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-2">
                                    <DescriptionInput v-model="item.description" :label="$t('notes')" :readonly="readonly" />
                                </div>
                            </div>
                        </FormSection>
                    </template>

                    <template #users>
                        <UserOverview :owner="item" />
                    </template>
                </TabContainer>
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
import { computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { Feedback, TabContainer, Tab } from "@/regira_modules/vue/ui"
import { useLang } from "@/regira_modules/vue/lang"
import { useForm, type FormEmits, formDefaults } from "@/regira_modules/vue/entities"
import { useConfig } from "@/app-config"
import { FormButtonsRow } from "@/components/input"
import UserOverview from "../client-users/Overview.vue"
import config from "../config/config"
import Entity from "../data/Entity"
import useEntityStore from "../data/store"

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

const { cultures } = useConfig()

// Tabs
const { translate } = useLang()
const tabs = computed(() =>
    [Tab.create("form", { icon: "form", title: translate("form"), isDefault: true }), Tab.create("users", { icon: "people", title: translate("entities.users") })].filter((x) => x)
)
</script>
