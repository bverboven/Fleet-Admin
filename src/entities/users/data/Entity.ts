import { EntityBase } from "@/regira_modules/vue/entities"
import type Client from "@/entities/clients/data/Entity"

export type IUserClaim = {
    id?: number
    claimType: string
    claimValue?: string
    _deleted?: boolean
}
export type IClientClaim = {
    id?: number
    clientId: string
    claimType: string
    claimValue: string
    _deleted?: boolean
}

export class ClientUser extends EntityBase {
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

    clients?: Array<Client>
    userClaims?: Array<IUserClaim>
    clientClaims?: Array<IClientClaim>

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return `${this.givenName || ""} ${this.lastName || ""}`.trim() || this.userName
    }
}

export const Entity = ClientUser

export default ClientUser
