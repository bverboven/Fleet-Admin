import { EntityBase } from "@/regira_modules/vue/entities"

export class Client extends EntityBase {
    id: number = 0
    guid!: string
    code?: string
    title!: string
    description?: string
    created?: Date
    lastModified?: Date

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.title
    }
}

export const Entity = Client

export default Client
