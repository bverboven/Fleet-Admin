<template>
    <section>
        <router-view></router-view>

        <Debug
            :modelValue="{
                userId: $auth.authData.sub,
                username: $auth.authData.name,
                auth: $auth,
            }"
        />
    </section>
</template>
