import { uploadFileApi } from "@/api/file-api"
import { FileTools } from "./tools/file-tools"

export const path2url = function(path: string) {
    if (!path) {
        return ''
    }
    if (path.includes('http')) {
        return path
    }
    const endpoint = ".oss-cn-shenzhen.aliyuncs.com"
    const i = path.indexOf('/')
    const bucketName = path.slice(0, i)
    const objectName = path.slice(i)
    const realUrl = `https://${bucketName}${endpoint}${objectName}`
    return realUrl
}

export const url2path = function(url: string) {
    const paths = url.replace('https://', '').split('.oss-cn-shenzhen.aliyuncs.com/')
    if (paths.length !== 2) {
        console.error('url解析失败:', url, paths)
        throw new Error('url解析失败!')
    }
    const bucketName = paths[0]
    const fileUrl = paths[1]
    return `${bucketName}/${fileUrl}`
}



const getDef = () => {
    return {
        fileList: [] as TUploadFile[],
        multiple: true
    } as TUploadOptions
}

export class BCUpload {

    state: TUploadOptions

    private callback: IUploadCallback

    constructor(conf: TUploadConf) {
        this.state = Object.assign({}, getDef(), conf)
        this.state.input = (event) => {
            this.upload(event)
        }
        this.state.delete = (event) => {
            this.delete(event)
        }
    }

    setList(images: string[]) {
        this.state.fileList = images.map((image) => {
            return {
                status: 'success',
                path: url2path(image),
                url: image
            } as TUploadFile
        })
        return this
    }

    public setUploadCallback(callback: IUploadCallback) {
        this.callback = callback
    }


    private upload(event: TUploadEvent) {
        const files = ([] as TUploadFile[]).concat(event.file)
        files.forEach((file) => {
            file.status = 'uploading'
            file.message = '上传中'
            //获取索引
            const index = this.state.fileList.push(file) - 1
            const fileName = this.state.fileName || FileTools.generalFileName(file)
            uploadFileApi(file.url, fileName, this.state.uploadPath).then((res) => {
                file.url = res.url
                file.path = res.path
                file.status = 'success'
                file.message = ''
                this.state.fileList.splice(index, 1, file)

                this.callback && this.callback.input(file.path)
            }).catch((err) => {
                file.status = 'failed'
                file.message = err.message
                this.state.fileList.splice(index, 1, file)
            })
        })
    }

    private delete(event: TUploadEvent) {
        this.state.fileList.splice(event.index, 1)
        this.callback && this.callback.delete()
    }


}


