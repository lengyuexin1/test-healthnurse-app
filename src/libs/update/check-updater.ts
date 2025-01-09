import { getNewVersion } from "@/api/open-api"
import { APP_VERSION } from "@/sys/constant"
import { PromiseProvider } from "../provider"
import { path2url } from "../upload/upload-tools"

const debug = true

const DEF_CALLBACK = (res: UniApp.OnProgressDownloadResult) => {
    debug && console.log('download-onProgressUpdate: ', res)
}

const download = (downloadPath: string, callback = DEF_CALLBACK) => {
    const url = path2url(downloadPath)
    
    return new Promise<string>((reslove, reject) => {
        const downloadTask = uni.downloadFile({
            url,
            success: (res) => {
                if (res.statusCode === 200) {
                    downloadTask.offProgressUpdate(callback)
                    reslove(res.tempFilePath)
                }
                else {
                    reject(new Error(res.errMsg))
                }
            },
            fail: (err) => {
                console.error('download-err: ', err)
                reject(new Error(err.message))
            }
        })

        downloadTask.onProgressUpdate(callback)
    })
}

const install = (path: string) => {
    return new Promise<PlusRuntimeWidgetInfo>((reslove, reject) => {
        plus.runtime.install(path, {}, (res) => {
            debug && console.log('install-success: ', res)
            reslove(res)
        }, (err) => {
            console.error('install-err: ', err)
            reject(new Error(err.message))
        })
    })
}

const getWgtVersion = () => {
    return new Promise<PlusRuntimeWidgetInfo>((reslove) => {
        plus.runtime.getProperty(plus.runtime.appid as any, (info) => {
            debug && console.warn('appVersion: ', plus.runtime.version, plus.runtime.versionCode)
            debug && console.warn('wgtVersion: ', info.version, info.versionCode)
            reslove(info)
        })
    })
}

/** 获取当前版本号, 兼容H5和App */
export const getVersion = async () => {

    // #ifdef APP-PLUS
    return getWgtVersion().then((info) => {
        return Promise.resolve(`${APP_VERSION} / ${info.version}`)
    })
    // #endif

    // #ifndef APP-PLUS
    return Promise.resolve(APP_VERSION)
    // #endif
}

const newVersionProvider = new PromiseProvider<IAppVersion>()
newVersionProvider.setCallback(() => {
    return getNewVersion()
})


class AppUpdater {

    getNewVersion() {
        return newVersionProvider.getResult()
    }

    async installApp(downloadPath: string, callback: (res: UniApp.OnProgressDownloadResult) => void) {
        return download(downloadPath, callback).then((localPath) => {
            debug && console.log('正在install...', localPath)
            return install(localPath).then((result) => {
                debug && console.log('安装成功...', JSON.stringify(result))
            })
        })
    }

    async slientUpdate() {
        return newVersionProvider.getData().then((res) => {
            return getWgtVersion().then((info) => {
                const newVersion = res.version
                const curVersion = info.version ? info.version : '1.0.0'
                debug && console.warn('app version: ', newVersion, curVersion)

                if (curVersion == newVersion) {
                    return Promise.reject(new Error('没有发布新的版本'))
                }
                
                debug &&  console.log('正在下载...', res.androidLink)
                return download(res.androidLink).then((localPath) => {
                    
                    debug && console.log('正在install...', localPath)
                    return install(localPath).then((result) => {
                        debug && console.log('安装成功...', JSON.stringify(result))
                    })
                })
            })
        })
    }
}

export const appUpdater = new AppUpdater()
