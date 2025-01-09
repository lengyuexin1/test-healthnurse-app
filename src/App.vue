<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app"
import { PlatformManage, onSysEvent } from "@bc/sys"
import { gotoLogin, gotoUpdate } from "@/routes/public-routes"

import { WEB_ENV } from "./sys/constant"
import { SessionSDK } from '@bc/msg'
import { appUpdater } from '@/libs/update/check-updater'

onLaunch(() => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            // gotoLogin({})
            // #ifdef APP-PLUS
            plus.navigator.closeSplashscreen()
            // #endif
            return
        }
        
        // #ifdef APP-PLUS
        plus.navigator.closeSplashscreen()
        // #endif
    })

    appUpdater.getNewVersion().then((versionInfo) => {
        if (versionInfo.method === 'forcess') {
            //静默升级
            appUpdater.slientUpdate()
        }
        else if (versionInfo.method === 'forces') {
            const platform = uni.getSystemInfoSync().platform
            if (platform == 'android' && versionInfo.androidLink !== '') {
                if (versionInfo.isClose === 0) {
                    gotoUpdate()
                    return
                }
                //整包升级
                uni.showModal({
                    title: '发现新的版本',
                    confirmText: '去升级',
                    cancelText: '下次再说',
                    content: versionInfo.upgradeContent,
                    showCancel: !!versionInfo.isClose,
                    success: (res) => {
                        if (res.confirm) {
                            gotoUpdate()
                        }
                    }
                })
            }
            else if (platform == 'ios' && versionInfo.iosLink !== '') {
                //整包升级
                uni.showModal({
                    title: '发现新的版本',
                    confirmText: '去升级',
                    cancelText: '下次再说',
                    content: versionInfo.upgradeContent,
                    showCancel: !!versionInfo.isClose,
                    success: (res) => {
                        if (res.confirm) {
                            // TODO 更换appleID
                            // apple id  在 app conection 上传的位置可以看到  https://appstoreconnect.apple.com/
                            const appleId = 6480112875
                            plus.runtime.launchApplication({
                                action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
                            }, function(e) {
                                console.log('Open system default browser failed: ' + e.message)
                            })
                        }
                    }
                })
            }
        }
    })
})

onShow(() => {
    WEB_ENV
    console.log("App Show")
})

onHide(() => {
    console.log("App Hide")
})

onSysEvent('SYS_LOGIN_SUCCESS', () => {
    console.log('初始化连接im');
    
    /** 连接云信IM */
    SessionSDK.connect()
})

onSysEvent('REFLESH_TOKEN_FAIL', () => {
    uni.showToast({
        title: '登录已失效, 请重新登陆',
        icon: 'none'
    })
    setTimeout(() => {
        gotoLogin({})
    }, 1200)
})

</script>

<style lang="scss">
@import '@tuniao/tn-style/dist/uniapp/index.css';

page {
    background-color: #F2F4F5;
}
.row {
    display: flex;
    flex-direction: row;
}
.column {
    display: flex;
    flex-direction: column;
}

.i-center {
    align-items: center;
}

.j-center {
    justify-content: center;
}

.j-between {
    justify-content: space-between;
}

.j-around {
    justify-content: space-around;
}
</style>
