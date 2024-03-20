import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/clients"

const config: IConfig = {
    id: Entity.name,
    key: "Client",

    routePrefix: "clients",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: "clients",
    detailsTitle: "client",
    description: "clientsDescription",
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
