import type { RouteRecordRaw } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import AccountView from "@/views/AccountView.vue"
import AccountHome from "@/components/auth/Account.vue"
import ForgotPasswordView from "@/views/ForgotPasswordView.vue"
import ResetPasswordView from "@/views/ResetPasswordView.vue"
import UnauthorizedView from "@/views/UnauthorizedView.vue"
import ForbiddenView from "@/views/ForbiddenView.vue"
import NotFoundView from "@/views/NotFoundView.vue"

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    // account
    {
        name: "account",
        path: "/account",
        component: AccountView,
        redirect: { name: "accountHome" },
        children: [
            {
                name: "accountHome",
                path: "",
                component: AccountHome,
            },
            {
                name: "login",
                path: "login",
                component: LoginView,
                props: (to) => ({
                    username: to.query?.username,
                }),
                meta: {
                    allowAnonymous: true,
                },
            },
            {
                name: "forgotPassword",
                path: "forgot-password",
                component: ForgotPasswordView,
                props: (to) => ({
                    username: to.query?.username,
                }),
                meta: {
                    allowAnonymous: true,
                },
            },
            {
                name: "resetPassword",
                path: "reset-password",
                component: ResetPasswordView,
                meta: {
                    allowAnonymous: true,
                },
            },
        ],
    },
    {
        name: "unauthorized",
        path: "/401",
        component: UnauthorizedView,
        props: (to) => ({ url: to.query.url }),
        meta: {
            allowAnonymous: true,
        },
    },
    {
        name: "forbidden",
        path: "/403",
        component: ForbiddenView,
        props: (to) => ({ url: to.query.url }),
    },
    // default routes
    {
        path: "/404",
        name: "notFound",
        component: NotFoundView,
        props: (to) => ({ url: to.query.url }),
        meta: {
            allowAnonymous: true,
        },
    },
    {
        name: "catchAll",
        path: "/:pathMatch(.*)*",
        redirect: (from) => ({ name: "notFound", query: { url: from.fullPath } }),
        meta: {
            allowAnonymous: true,
        },
    },
]

export default routes
