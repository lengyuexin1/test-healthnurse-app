import { v4 as uuidv4 } from 'uuid'

//===============================================================================
/**
 * 常用工具类
 */


/**
 * 获取文件扩展名
 * @param file
 * @returns 文件扩展名，如：pdf、png等,格式不对时可能为：undefined
 */
const getFileExtension = (fileName:string) => {
    const arr = fileName.split('/')
    if (arr.length === 0) {
        return undefined
    }

    const result = arr[arr.length - 1].split('.')
    return result.pop()
}

/**
 * 识别文件扩展名
 * @param base64
 * @returns
 */
const getImageExtensionByBase64 = (base64:string) => {
    if (base64.indexOf('image/bmp')) {
        return 'bmp'
    }
    else if (base64.indexOf('image/gif')) {
        return 'gif'
    }
    else if (base64.indexOf('image/jpeg')) {
        return 'jpg'
    }
    else if (base64.indexOf('image/svg+xml')) {
        return 'svg'
    }
    else if (base64.indexOf('image/tiff')) {
        return 'tif'
    }
    else if (base64.indexOf('image/png')) {
        return 'png'
    }
    else if (base64.indexOf('image/webp')) {
        return 'webp'
    }
    else {
        throw new Error('无法识别图片扩展名')
    }
}

/**
 * uuid生成文件名
 * @returns
 */
const generateName = () => {
    const uuid = uuidv4()
    return uuid
    
    // const date = new Date()
    // return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
}

/**
 * 生成文件全名，格式：“yyyyMMddHHmmssSSS.xxx”
 * @returns
 */
const generateFileName = (fileExtension:string) => {
    return generateName() + `.${fileExtension}`
}

/**
 * 示例：http://www.a.b.com/a/b/c/abcd.pdf
 */
interface IFile {
    uploadPath:string           //      /a/b/c
    fullName:string             //      /a/b/c/abcd.pdf
    fileName:string             //      abcd.pdf
    fileExtension:string        //      pdf
}

/**
 * 生成文件信息，无内容
 * @param uploadPath 同 IFile.uploadPath，示例：“/a/b/c”
 * @param fileExtension 同 IFile.fileExtension，示例：“jpg”
 * @returns
 */
const generateFileInfo = (uploadPath:string, fileExtension:string) => {
    const fileName = generateFileName(fileExtension)
    return {
        uploadPath,
        fullName: `${uploadPath}/${fileName}`,
        fileName,
        fileExtension
    } as IFile
}



/**
 * 数据转blob文件
 * file对象参数说明
 * type  文件类型 例子 'text/json' 或'text/html'
 * @returns
 */
const dataToBlob = function(data: string, options?: BlobPropertyBag) {
    // 字符内容转变成blob地址
    const blob = new Blob([data], options)
    return blob
}

const dataToFile = function(data: string, fileName: string, options?: FilePropertyBag) {
    const file = new File([data], fileName, options)
    return file
}



/**
 * 有2种类型:
 * 1. web端上传, blob:http://localhost:8081/24ef2bea-909a-4860-9f27-5f5794f14be1
 * 2. android上传, file:///storage/emulated/0/Android/data/com.baochun.pz/apps/__UNI__588F3D4/doc/uniapp_temp/compressed/1678083254776_鹿.jpg
 */
const generalFileNameByWeb = (file: TUploadFile) => {
    const fileName = file.name
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1)
    if (extension) {
        return generateFileName(extension)
    }
    console.error('上传文件异常: ', file)
    throw new Error('上传文件异常: ')
}

const generalFileNameByApp = (file: TUploadFile) => {
    const fileName = file.url
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1)
    if (extension) {
        return generateFileName(extension)
    }
    console.error('上传文件异常: ', file)
    throw new Error('上传文件异常: ')
}

const generalFileName = (file: TUploadFile) => {
    // #ifdef APP-PLUS
    return generalFileNameByApp(file)
    // #endif
    return generalFileNameByWeb(file)
}


export const FileTools = {
    generalFileName,
    generateFileName,
    getFileExtension,
    getImageExtensionByBase64,
    generateFileInfo,
    dataToBlob,
    dataToFile
}
