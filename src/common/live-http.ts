import { PlatformManage } from '@bc/sys'
import { API_ENV } from "@/sys/constant"

export const liveHttp = (url: string, data = null, method = 'GET') => {
    console.log(data)

    return PlatformManage.getToken().then((pac: any) => {
        return uni.request({
            url: import.meta.env.VITE_HTTP_BASE_URL + url,
            method,
            header: {
                'token': pac.token,
                'platformKind': 1
            },
            data
        }).then((res: any) => {
            if (res.statusCode !== 200) {
                throw new Error(res.data?.message)
            }
            return res.data
        }).catch((err: any) => {
            throw err
        })
    })
}
