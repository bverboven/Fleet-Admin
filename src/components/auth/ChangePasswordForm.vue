<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-2">
            <Feedback :feedback="feedback" />
        </div>
        <input type="text" class="form-control-plaintext" name="username" :value="username" autocomplete="username" readonly />
        <LoadingContainer :is-loading="isLoading">
            <div class="row mb-2">
                <div class="col">
                    <input type="password" class="form-control" name="currentPassword" v-model="model.currentPassword" autocomplete="password" placeholder="********" required />
                    <FormLabel :label="t('currentPassword')" />
                </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <input type="password" class="form-control" name="newPassword" v-model="model.newPassword" autocomplete="new-password" required />
                    <FormLabel :label="t('newPassword')" />
                </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <input type="password" class="form-control" name="passwordRepeat" v-model="passwordRepeat" autocomplete="new-password" :class="{ 'is-invalid': !pwdMatches }" required />
                    <FormLabel :label="t('repeatPassword')" />
                    <div>
                        <small v-if="passwordRepeat && !pwdMatches" class="form-text text-danger">{{ t("passwordsMustMatch") }}</small>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-end">
                    <button type="submit" class="btn btn-success" :disabled="!isFormValid">{{ $t("submit") }}</button>
                </div>
            </div>
        </LoadingContainer>
    </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import { LoadingContainer, Feedback, useFeedback } from "@/regira_modules/vue/ui"
import { useAuth } from "@/regira_modules/vue/auth"
import { useUserLang } from "./useUserLang"

const emit = defineEmits<{
    (e: "change-password"): void
}>()
defineProps<{
    username: string
}>()

const { t } = useUserLang()
const feedback = useFeedback()
const { service } = useAuth()

const isLoading = ref(false)
const model = reactive({
    currentPassword: "",
    newPassword: "",
})
const passwordRepeat = ref("")
const pwdMatches = computed(() => model.newPassword == passwordRepeat.value)
const isFormValid = computed(() => pwdMatches.value)

async function handleSubmit() {
    console.debug("handleChangePwd", { model })
    feedback.reset()
    isLoading.value = true
    try {
        await service.changePassword(model)
        emit("change-password")
        feedback.success("Password is changed")
        model.currentPassword = ""
        model.newPassword = ""
        passwordRepeat.value = ""
    } catch (err: any) {
        console.error("Changing password failed", { err })
        feedback.fail("Changing password failed", err.response?.data)
    } finally {
        isLoading.value = false
    }
}
</script>
