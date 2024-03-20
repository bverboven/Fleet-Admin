import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/users"

const config: IConfig = {
    id: Entity.name,
    key: "ClientUser",

    routePrefix: "users",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: "users",
    detailsTitle: "user",
    description: "usersDescription",
    icon: "bi bi-building-fill-gear",

    defaultPageSize: 10,

    api,
    detailsUrl: api,
    listUrl: api,
    searchUrl: api + "/search",
    saveUrl: api,
    deleteUrl: api,
}

export default config
