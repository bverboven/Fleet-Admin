<template>
    <section>
        <div class="row">
            <div class="col-auto">
                <ul class="list-group">
                    <li class="list-group-item">
                        <Icon name="user" class="mx-1 me-2" />
                        {{ $auth.authData?.displayName ?? $auth.authData?.name }}
                    </li>
                    <li class="list-group-item">
                        <button type="button" class="btn btn-default p-1" @click="showChangePassword = !showChangePassword">
                            <Icon name="security" class="me-1" />
                            {{ $t("auth.changePassword") }}
                        </button>
                    </li>
                    <li class="list-group-item">
                        <button type="button" class="btn btn-default p-1" @click="handleLogout">
                            <Icon name="exit" class="me-1" />
                            {{ $t("auth.signOut") }}
                        </button>
                    </li>
                </ul>
            </div>
            <div class="col"></div>
        </div>
    </section>

    <Teleport to="#modals">
        <MyModal :is-visible="showChangePassword" :title="$t('auth.changePassword')" :show-footer="false" @close="showChangePassword = false" @cancel="showChangePassword = false">
            <ChangePasswordForm @success="showChangePassword = false" />
        </MyModal>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "regira_modules/vue/auth"
import { ChangePasswordForm } from "regira_modules/vue/auth"

const showChangePassword = ref(false)

const authStore = useAuthStore()
const handleLogout = () => {
    authStore.logout()
}
</script>
