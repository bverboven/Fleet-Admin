import { EntityBase } from "@/regira_modules/vue/entities"

export class ClientUser extends EntityBase {
    id!: string
    username!: string
    email!: string
    givenName?: string
    surname?: string
    culture?: string
    created?: Date
    lastModified?: Date

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return `${this.givenName} ${this.surname}`.trim()
    }
}

export const Entity = ClientUser

export default ClientUser
