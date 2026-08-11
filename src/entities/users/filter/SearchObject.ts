import { SearchObjectBase, ArchivedFilter } from "regira_modules/vue/entities"

export class EntitySearchObject extends SearchObjectBase {
    tenantId?: number | Array<number>
    username?: string
    title?: string
    culture?: string

    minCreated?: Date
    maxCreated?: Date
    minLastModified?: Date
    maxLastModified?: Date

    archived?: ArchivedFilter
}

export default EntitySearchObject
