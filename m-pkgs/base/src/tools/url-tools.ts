type Params = Record<string, any>
const buildUrlByParams = function(url: string, obj:Params) {
    if (obj && obj.constructor === Object) {
        let params = ''
        for (const i in obj) {
            if (obj[i]) {
                params += `${i}=${obj[i] || ''}&`
            }
        }
        return url + `?${params.slice(0, params.length - 1)}`
    }
    else {
        return url
    }
}

export const UrlTools = {
    buildUrlByParams
}
