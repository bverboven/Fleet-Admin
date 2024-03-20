import { computed } from "vue"
import { useLang, translate, type IFormatInput } from "@/regira_modules/vue/lang"
import translations from "./translations"

export function useUserLang() {
    const lang = useLang()
    const { langCode, fallbackLangCode } = lang
    const t = computed(() => (key: string, formatArgs?: IFormatInput) => translate(key, translations, langCode.value, formatArgs) ?? translate(key, translations, fallbackLangCode.value, formatArgs))
    const tm = (key: string, formatArgs?: IFormatInput) => translate(key, translations, langCode.value, formatArgs) ?? translate(key, translations, fallbackLangCode.value, formatArgs)

    return {
        ...lang,
        t,
        tm,
    }
}

export default useUserLang
