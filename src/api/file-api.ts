import { PlatformManage } from "@bc/sys"
import { http } from "@bc/api"
import { API_ENV } from "@/sys/constant"
import { FileRequest } from "@/libs/upload/file-request"


// const uploadRequest = new FileRequest()

//================================================================================
/** oss的虚拟目录 */
//================================================================================


const generalUploadPath = (uploadPath: string) => {
    return `backend/env_${API_ENV}/${uploadPath}`
}

/* 时间戳+uuid生成唯一文件名 */
export const generateImagePath = function() {
    const dateStr = Date.now()

    return `${dateStr}_${generateUUID()}`
}

/* js生成uuid */
const generateUUID = function() {
    let d = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
}


//================================================================================
/** 上传 */
//================================================================================

// 前端sts上传获取token
export const getStsToken = () => {
    return http.user.get('/v1/bc/oss/sts/upload/credential')
}

/**
 * 上传文件
 * @param file 本地文件地址
 * @param uploadPath 上传到oss的目录
 * @param fileName 文件名
 * @returns
 */
export const uploadFileApi = (file: string, fileName: string, uploadPath: string) => {
    console.log('调用');
    
    const uploadRequest = new FileRequest()
    const fileUrl = `${generalUploadPath(uploadPath)}/${fileName}`
    return uploadRequest.upload(fileUrl, file)
    
}

/** 上传头像 */
export const uploadUserAvatar = async (file: string) => {
    return PlatformManage.getToken().then((user) => {
        return uploadFileApi(file, user.id + '', 'user/avatar')
    })
}

/** 音频文件 */
export const uploadAudio = async (file: string) => {
    return PlatformManage.getToken().then((user) => {
        return uploadFileApi(file, user.id + '', `AIchat/audio${Date.now()}`)
    })
}

/** 上传视频，并添加Date.now()就解决视频封面缓存的问题 */
export const uploadVideo = async (file: string) => {
    return PlatformManage.getToken().then((user) => {
        return uploadFileApi(file, user.id + '', `create/video${Date.now()}`)
    })
}

/** 添加商户，上传证件 */
export const uploadCertificate = async (file: string) => {
    return PlatformManage.getToken().then((user) => {
        return uploadFileApi(file, user.id + '', `create/certificate${Date.now()}` + '.png')
    })
}

/** 享老记上传背景 */
export const uploadUserBg = async (file: string) => {
    return PlatformManage.getToken().then((user) => {
        return uploadFileApi(file, user.id + '', 'user/bg')
    })
}

/**
 * 活体检测-上传人脸识别图片
 * @param tempFilePath 图片本地临时路径
 * @returns object { url:"oss图片路径" }
**/
export const uploadFace = async (tempFilePath: string) => {
    const uploadRequest = new FileRequest()
    const host = "https://cn-shanghai-aliyun-cloudauth-1046793276494707.oss-cn-shanghai.aliyuncs.com"
    const uploadPath = `/face/`
    const fileName = generateImagePath()
    const fileUrl = `${generalUploadPath(uploadPath)}/${fileName}`
    return uploadRequest.upload(fileUrl, tempFilePath, host)
}