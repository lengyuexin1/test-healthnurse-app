type callFunType = () => void

// 保存图片
export const saveImage = function(imgUrl: string, callFunction?: callFunType) {
    uni.saveImageToPhotosAlbum({
        filePath: imgUrl,
        success: () => {
            uni.showToast({
                icon: "none",
                title: "已经保存到您的相册"
            })
        },
        fail: (err) => {
            console.log(err)
            if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                uni.showToast({
                    icon: "none",
                    title: "请开启储存权限"
                })
                return false
            }
            uni.showToast({
                icon: "none",
                title: "保存失败"
            })
        }
    })
}

// 下载生成本地临时图片
export const drawBGIMG = async function(url: string) {
    console.log('下载生成本地临时图片',url)

    const res: any = await uni.downloadFile({
        url: url
    })

    console.log("drawBGIMG", res[1], res)
    if (!res) {
        uni.showToast({
            icon: "none",
            title: "生成失败，请稍后重试"
        })
        return
    }
    if (res.statusCode === 200) {
        return res.tempFilePath
    }
    uni.hideLoading()
    uni.showToast({
        icon: "none",
        title: "生成失败，请稍后重试"
    })
}

// 公共图片URL拼接
export const getPublicOssUrl = function(path:string) {
    if (!path) { return '' }
    if (/http:|https:/.test(path)) {
        return path
    }
    const endpoint = ".oss-cn-shenzhen.aliyuncs.com"
    const i = path.indexOf('/')
    const bucketName = path.slice(0, i)
    const objectName = path.slice(i)
    const realUrl = "https://" + bucketName + endpoint + objectName
    return realUrl
}
