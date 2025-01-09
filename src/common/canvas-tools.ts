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
            // callFunction()
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
    /* const res = await uni.downloadFile({
        url: url
    }) */
    console.log(url)

    const res: any = await uni.downloadFile({
        url: url
    })
    console.log("drawBGIMG", res[1], res)
    if (res.statusCode === 200) {
        return res.tempFilePath
    }
    uni.showToast({
        icon: "none",
        title: "生成失败，请稍后重试"
    })
}

// 绘制海报
export const getCodeUrl = async function(
    this: any,
    canvasId: string,
    codeUrl: string,
    bgImg: string
) {
    uni.showLoading({
        title: "海报生成中..."
    })
    const context = uni.createCanvasContext(canvasId, this)

    // 背景白块
    context.setFillStyle("#ffffff")
    context.fillRect(0, 0, 280, 375)

    // 底部白块
    context.setFillStyle("#ffffff")
    context.fillRect(0, 280, 280, 95)

    // 底部文字
    context.setFillStyle("#333333")
    context.setFontSize(18)
    context.fillText("邀请好友", 20, 318)
    context.setFillStyle("#999999")
    context.setFontSize(14)
    context.fillText(this.invDeploy.posterTitle, 20, 346)

    // 二维码本地地址
    const codeLocal: string = await drawBGIMG(codeUrl)

    context.drawImage(codeLocal, 192, 288, 75, 75)
    // 背景图片

    context.drawImage(bgImg, 0, 0, 280, 280)

    context.draw(true, (res) =>
        uni.canvasToTempFilePath({
            canvasId,
            success: (res) => {
                console.log("imgUrl", res.tempFilePath)
                return res.tempFilePath
            },
            fail: () => {
                uni.showToast({
                    icon: "none",
                    title: "生成失败，请稍后重试"
                })
            },
            complete: (ret) => {
                uni.hideLoading()
            }
        })
    )
}
