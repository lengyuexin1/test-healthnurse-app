import { checkFacebody } from "@/api/user-api"
import { uploadFace } from "@/api/file-api"

// 开始调用（本地文件）
export function callApiLocal() {
    return new Promise((resolve, reject) => {
        uni.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success(req) {
                uni.showLoading({ title: '检测中...' })
                
                // 上传图片到oss
                uploadFace(req.tempFilePaths[0]).then(({ url }) => {
                    // 人脸检测
                    return checkFacebody({url})
                }).then((res) => {
                    res && resolve("检测成功，开始下一步操作")
                    !res && reject({ message: "人脸检测失败" })
                }).catch(result => {
                    reject(result)
                }).finally(() => {
                    uni.hideLoading()
                })
            }
        })
    })
}
