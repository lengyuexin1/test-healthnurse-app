import { WEB_ENV } from "@/sys/constant"

/** @returns {string} 处理返回云信账号增加的环境变量前缀 */
export const handleEnvAccount = (str: string) => {
    const regex = /test|dev|pre|prod/gi
    let modifiedString = str.toString().replace(regex, '')
    modifiedString = modifiedString.trim().replace(/\s+/g, ' ').trim()

    return modifiedString
}

/** @returns {string} 返回非prod环境变量 */
export const IMWEB_ENV = () => {
    if (['dev', 'demo', 'test', 'pre'].includes(WEB_ENV)) {
        return WEB_ENV
    }
    return ''
}
