import type { IConfig } from "@/regira_modules/vue/entities"
import Entity from "../data/Entity"

const api = "/tenants"

const config: IConfig = {
    id: Entity.name,
    key: "Tenant",

    routePrefix: "tenants",
    baseQueryParams: {
        includes: [],
    },
    initialQuery: {},

    overviewTitle: "entities.tenants",
    detailsTitle: "entities.tenant",
    description: "entities.tenantsDescription",
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
