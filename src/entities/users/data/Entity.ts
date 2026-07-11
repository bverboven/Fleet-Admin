import { EntityBase } from "regira_modules/vue/entities"
import type Tenant from "@/entities/tenants/data/Entity"

export type IUserClaim = {
    id?: number
    claimType: string
    claimValue?: string
    _deleted?: boolean
}
export type ITenantClaim = {
    id?: number
    tenantId: string
    claimType: string
    claimValue: string
    _deleted?: boolean
}

export class TenantUser extends EntityBase {
    id!: string
    userName!: string
    email!: string
    givenName?: string
    lastName?: string
    culture?: string
    created?: Date
    lastModified?: Date

    currentPassword?: string
    newPassword?: string

    tenants?: Array<Tenant> = []
    userClaims?: Array<IUserClaim> = []
    tenantClaims?: Array<ITenantClaim> = []

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return `${this.givenName || ""} ${this.lastName || ""}`.trim() || this.userName
    }
}

export const Entity = TenantUser

export default TenantUser
