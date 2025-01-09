import { WEB_ENV } from "@/sys/constant"

const URI = {
    frontend :'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/webapplet',
}
const timestamp = Number(new Date())


// 获取前端静态图片
export const getAssetsPic = function(path: string) {
    return `${URI.frontend}${path}?v=${timestamp}`
}

// 给图片添加版本号，解决图片缓存问题
export const setPriceVer = function(path: string) {
    if (/\?/.test(path)) {
        return (path += `&v=${timestamp}`)
    }
    return (path += `?v=${timestamp}`)
}

// 获取服务头像
export const getServePic = function(serveid: string | number) {
    const env = 'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_' + WEB_ENV
    return `${env}/item/thumb/${serveid}?v=${timestamp}&x-oss-process=image/resize,h_340,m_lfit`
}