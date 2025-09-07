import type { AxiosInstance } from "axios"
import { EntityServiceBase, type IConfig } from "@/regira_modules/vue/entities"
import Entity from "./Entity"

export class EntityService extends EntityServiceBase<Entity> {
    constructor(axios: AxiosInstance, config: IConfig) {
        super(axios, config)
        console.debug("TenantUserService", this, { config })
    }

    protected override prepareItem(item: Entity): Entity {
        item.userClaims = item.userClaims?.filter((x) => !x._deleted)
        item.tenantClaims = item.tenantClaims?.filter((x) => !x._deleted)
        return item
    }

    override toEntity(item: object): Entity {
        return item instanceof Entity ? item : Object.assign(this.createInstance(Entity as new () => Entity), item || {})
    }
}

export default EntityService
