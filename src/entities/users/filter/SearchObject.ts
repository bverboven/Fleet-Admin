import { SearchObjectBase } from "@/regira_modules/vue/entities"

export class EntitySearchObject extends SearchObjectBase {
    clientId?: number | Array<number>
    username?: string
    title?: string
    culture?: string

    minCreated?: Date
    maxCreated?: Date
    minLastModified?: Date
    maxLastModified?: Date

    isArchived?: boolean
}

export default EntitySearchObject
