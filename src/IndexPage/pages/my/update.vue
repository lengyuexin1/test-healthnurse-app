<template>
    <PageContainer :loading="data.pageLoading">
        <view class="z-index center">
            <view class="update-box column">
                <image :src="getAssetsUrl('/leyou/static/appUpdate/app_upate_bg.png')" style="width: 586rpx;" />
                <view class="box-font-box column">
                    <view class="box-title">发现新版本</view>
                    <view class="box-version">V{{ data.newVersionInfo.version }}</view>
                    <scroll-view class="box-des-scroll" scroll-y="true">
                        <view class="box-desc">{{ data.newVersionInfo.upgradeContent }}</view>
                    </scroll-view>

                    <view class="progress-box column" v-if="data.updateLoading">
                        <progress class="progress" border-radius="35px" :percent="data.progress" activeColor="#1c89d6" show-info stroke-width="10" />
                        <view class="progress-des">资源下载中，请稍后({{ data.downloadSize }}/{{ data.totalSize }}M)</view>
                    </view>
                    <view class="btn-box column center" v-if="!data.updateLoading">
                        <view class="update-btn" @tap.stop="clickUpdate">立即升级</view>
                    </view>
                </view>
                <image v-if="!isForceUpdate" class="close-img" :src="getAssetsUrl('/leyou/static/appUpdate/app_update_close.png')" @tap.stop="clickClose" />
            </view>
        </view>
    </PageContainer>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { onBackPress } from "@dcloudio/uni-app"
import PageContainer from '@/components/container/page-container.vue'
import { pageController } from '@bc/uni-tools'
import { appUpdater } from '@/libs/update/check-updater'
import { getAssetsPic } from '@/common/setPicture'

interface Data {
    pageLoading: boolean
    newVersionInfo: any,
    updateLoading: boolean,
    progress: number | string,
    downloadSize: number | string,
    totalSize: number | string
}

const data = reactive<Data>({
    pageLoading: true,
    newVersionInfo: {},
    updateLoading: false,
    progress: 0,
    downloadSize: 0,
    totalSize: 0
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const isForceUpdate = computed(() => {
    if (!data.newVersionInfo) {
        return true
    }
    return data.newVersionInfo.isClose === 0
})


const clickUpdate = () => {
    data.updateLoading = true
    //下载更新文件
    appUpdater.installApp(data.newVersionInfo.androidLink, (res: any) => {
        data.progress = res.progress
        data.downloadSize = (res.totalBytesWritten / Math.pow(1024.00, 2)).toFixed(2)
        data.totalSize = (res.totalBytesExpectedToWrite / Math.pow(1024.00, 2)).toFixed(2)
    }).then(() => {
        uni.showModal({
            title: '更新完成',
            content: '系统即将重新启动App',
            showCancel: false,
            success: function(res) {
                if (res.confirm) {
                    plus.runtime.restart()
                }
            }
        })
    }).catch((err) => {
        uni.showModal({
            title: '更新失败',
            content: err.message,
            showCancel: false,
            success: (res) => {
                if (res.confirm) {
                    plus.runtime.restart()
                }
            }
        })
    }).finally(() => {
        data.updateLoading = false
    })
}

const clickClose = () => {
    if (parseFloat(data.downloadSize) > 0) {
        // eslint-disable-next-line no-undef
        uni.showToast({
            title: '升级中，请勿关闭~'
        })
        return
    }
    pageController.back()
}

const getData = () => {
    appUpdater.getNewVersion().then((res: any) => {
        data.newVersionInfo = res
    }).finally(() => {
        data.pageLoading = false
    })
}

onBackPress((event) => {
    if (parseFloat(data.downloadSize) > 0) {
        // eslint-disable-next-line no-undef
        uni.showToast({
            title: '升级中，请勿关闭~'
        })
        return true
    }
    else if (isForceUpdate.value && event.from === 'backbutton') {
        uni.showToast({
            title: '版本不是最新, 无法使用',
            icon: 'none',
            mask: true
        })
        return true
    }
})

onMounted(() => {
    getData()
})

</script>

<style lang="scss" scoped>
page {
    background: transparent;
}

.z-index {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
}

/* 盒子内容居中 */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 内容纵向水平且居中 */
.column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.update-box {
    position: relative;
    z-index: 1000;
    width: 586rpx;
    height: 750rpx;
    margin-bottom: 240rpx;
}

.update-btn {
    color: #ffffff;
    text-align: center;
    line-height: 90rpx;
    font-size: 36rpx;
    width: 400rpx;
    height: 90rpx;
    border-radius: 35px;
    background: #0CC196;
}

.progress-box {
    width: 420rpx;
    height: 130rpx;
}

.progress {
    width: 420rpx;
    border-radius: 35px;
}

.btn-box {
    height: 130rpx;
}

.close-img {
    width: 70rpx;
    height: 140rpx;
    z-index: 1000;
    position: absolute;
    bottom: -140rpx;
    left: 258rpx;
}

.box-font-box {
    text-align: center;
    width: 100%;
    background-color: white;
    padding-bottom: 30rpx;
    border-bottom-left-radius: 24rpx;
    border-bottom-right-radius: 24rpx;
}

.box-title {
    width: 100%;
    font-size: 40rpx;
    font-weight: bold;
    text-align: left;
    color: white;
    margin-top: 50rpx;
    position: absolute;
    left: 30rpx;
    top: 30rpx;
}

.box-version {
    width: 100%;
    font-size: 32rpx;
    text-align: left;
    color: white;
    margin-top: 50rpx;
    position: absolute;
    left: 30rpx;
    top: 90rpx;
}

.box-des-scroll {
    width: 526rpx;
    height: 250rpx;
    text-align: left;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
}

.box-desc {
    white-space: pre-wrap;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    color: #666666;
}

.progress-des {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #6c6c6c;
}
</style>
