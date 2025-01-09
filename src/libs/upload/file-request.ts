import { Base64 } from './tools/base64'
import { HMAC } from './tools/crypto'
import { getStsToken } from "@/api/file-api"
import { PromiseProvider } from "@bc/base/src/helpers/provider"
import dayjs from 'dayjs'



//===================================================
//定义
//===================================================

const OSS_BUCKET = 'xcpublic'
const OSS_HOST = `https://${OSS_BUCKET}.oss-cn-shenzhen.aliyuncs.com`
const stsTokenProvider = new PromiseProvider<ISTSUploadReq>()
stsTokenProvider.setCallback(async () => {
    return getStsToken().then((credentials) => {
        console.log(credentials)
        // policy必须为base64的string。
        const policyText = {
            "expiration": credentials.expiration, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            "conditions": [
                ["content-length-range", 0, 1024 * 1024 * 1024] // 设置上传文件的大小限制
            ]
        }
        const policy = Base64.encode(JSON.stringify(policyText))
        const signature = HMAC(policy, credentials.accessKeySecret)
        const res = {
            expiration: credentials.expiration,
            data: {
                OSSAccessKeyId: credentials.accessKeyId,
                signature,
                policy,
                'x-oss-security-token': credentials.securityToken
            }
        } as ISTSUploadReq

        return Promise.resolve(res)
    })
})


/** 失效后自动请求新的授权 */
const getValidToken = async () => {
    return stsTokenProvider.getData().then((sign) => {
        if (dayjs(sign.expiration).diff(new Date(), 'second')) {
            stsTokenProvider.reset()
            return stsTokenProvider.getData()
        }
        return Promise.resolve(sign)
    })
}


//===================================================
//核心类
//===================================================


export class FileRequest {

    /**
     * 文件上传
     * @param fileUrl 上传后的文件路径及命名
     * @param filePath 文件本地路径
     * @param host 阿里云ossURL 默认深圳
     * @returns
     */
    async upload(fileUrl: string, filePath: string, host = OSS_HOST) {
        return getValidToken().then((sign) => {
            const formData = Object.assign({}, sign.data, { key: fileUrl })
            return new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: host, // 阿里 oss URL。
                    filePath, // 上传文件的本地路径
                    name: 'file', // 必须填file。
                    formData,
                    success: (res) => {
                        if (res.statusCode === 204) {
                            // 返回oss文件的路径
                            const data = {} as IUploadRes
                            data.url = `${host}/${fileUrl}`
                            data.path = `${OSS_BUCKET}/${fileUrl}`
                            resolve(data)
                        }
                        else {
                            console.error('success-err: ', res)
                            reject(new Error('上传状态码异常'))
                        }
                    },
                    fail: err => {
                        console.error('fail: ', err)
                        reject(new Error(err.errMsg))
                    }
                })
            })

        })
    }
}



