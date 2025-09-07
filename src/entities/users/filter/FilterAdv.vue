<template>
    <div class="adv-filter">
        <div class="row">
            <div class="col mb-2" v-if="resultCount != null">
                <span class="text-info">{{ resultCount }} results</span>
                <small v-if="filterIsActive" class="ms-2 italic-muted">(Filters are applied)</small>
            </div>
            <div class="col mb-2 text-end">
                <IconButton icon="clear" @click="handleReset" :showText="true" />
            </div>
        </div>
        <div class="row">
            <!-- keywords -->
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="search" /></div>
                    <input v-model.lazy.trim="searchObject.q" class="form-control" :placeholder="$t('keywords')" />
                </div>
            </div>
        </div>
        <div class="row">
            <!-- tenant -->
            <div class="col mb-2">
                <TenantSelector v-model="tenant" v-model:idValue="searchObject.tenantId as number" :placeholder="$t('entities.tenant')" @select="handleUpdate">
                    <template #prepend>
                        <div class="input-group-text"><Icon :name="Tenant.name" /></div>
                    </template>
                </TenantSelector>
            </div>
        </div>
        <div class="row">
            <!-- title -->
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="title" /></div>
                    <input v-model.lazy.trim="searchObject.title" class="form-control" :placeholder="$t('name')" />
                </div>
            </div>
        </div>
        <div class="row">
            <!-- culture -->
            <div class="col mb-2">
                <div class="input-group">
                    <div class="input-group-text"><Icon name="language" /></div>
                    <select v-model="searchObject.culture" class="form-select">
                        <option :value="undefined"></option>
                        <option v-for="(lang, culture) in cultures" :key="culture" :value="culture">
                            {{ lang }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useVModelField } from "@/regira_modules/vue/vue-helper"
import { useFilter, type FilterEmits } from "@/regira_modules/vue/entities"
import { useConfig } from "@/app-config"
import { Entity as Tenant, InputSelector as TenantSelector } from "../../tenants"
import SearchObject from "./SearchObject"

interface Emits extends /* @vue-ignore */ FilterEmits {}

const emit = defineEmits<Emits>()
const props = defineProps<{
    modelValue: SearchObject
    resultCount?: number | null
}>()

const { cultures } = useConfig()

const searchObject = useVModelField<SearchObject>(props, emit)
const tenant = ref<Tenant>()

const { filterIsActive, handleReset, handleUpdate } = useFilter({ searchObject, emit, Constructor: SearchObject })
</script>
