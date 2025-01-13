<template>
    <view class="container">
        <view class="title">系统权限管理</view>
        <view class="list">
            <view class="item tn-flex-center-between" v-for="(item, index) in data.privacyList" :key="index" @tap="clickPrivacy(index, item.code)">
                <view class="left">
                    <view class="name">{{ item.name }}</view>
                    <view class="desc">{{ item.desc }}</view>
                </view>
                <view class="right">
                    {{ item.status }}
                    <TnIcon name="right" />
                </view>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import BCNotify from '@/components/notify/index.vue'

interface Data {
    privacyList: any
}

const data = reactive<Data>({
    privacyList: [
        { id: 1, name: '位置信息权限', desc: '根据位置信息为您推荐周边内容', status: '', code: '' },
        { id: 2, name: '相机权限', desc: '进行拍照，录视频及扫码，用于发布内容，添加好友等', status: '', code: '' },
        { id: 3, name: '相册权限', desc: '用于图片或视频上传', status: '', code: '' },
        // #ifdef APP-PLUS
        { id: 4, name: '通讯录权限', desc: '获取手机中的联系人信息，用于分享，交流和互动', status: '', code: '' },
        // #endif
    ]
})

const bcNotify = ref()

const getResultString = (code: any) => {
    const statusCode = {
        'authorized': '已允许访问',
        'denied': '授权被拒绝',
        'not determined': '尚未请求授权',
        'config error': '配置错误'
    }
    return statusCode[code]
}

const clickPrivacy = (index: number, code: string) => {
    // #ifdef APP-PLUS || MP-WEIXIN
    uni.openAppAuthorizeSetting({
        success (res: any) {
            console.log(res)
        }
    })
    // #endif
    
    // #ifdef H5
    bcNotify.value.show('网页版不支持')
    // #endif
}

onShow(() => {
    // #ifdef MP-WEIXIN
        const appAuthorizeSetting = uni.getAppAuthorizeSetting()
    
        data.privacyList[0].code = appAuthorizeSetting.locationAuthorized
        data.privacyList[0].status = getResultString(appAuthorizeSetting.locationAuthorized)

        data.privacyList[1].code = appAuthorizeSetting.cameraAuthorized
        data.privacyList[1].status = getResultString(appAuthorizeSetting.cameraAuthorized)

        data.privacyList[2].code = appAuthorizeSetting.albumAuthorized
        data.privacyList[2].status = getResultString(appAuthorizeSetting.albumAuthorized)

        data.privacyList[3].code = appAuthorizeSetting.albumAuthorized
        data.privacyList[3].status = getResultString(appAuthorizeSetting.albumAuthorized)

    // #endif

    // #ifdef APP-PLUS
        plus.android.checkPermission('android.permission.READ_CONTACTS', (granted: any) => {
            if (granted.checkResult == -1) {
                //还未授权或拒绝
                data.privacyList[3].status = getResultString('not determined')
            }
            else if (granted.checkResult == 0) {
                data.privacyList[3].status = getResultString('authorized')
            }
        })
    // #endif
})

</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background-color: #FFFFFF;
}

.title {
    font-weight: bold;
    font-size: 30rpx;
    color: #333333;
}

.list {
    margin-top: 20rpx;

    .item {
        flex: 1;
        height: 160rpx;
        border-bottom: solid 1rpx #F2F2F2;

        .name {
            font-weight: bold;
            font-size: 28rpx;
            color: #333333;
        }

        .desc {
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            margin-top: 10rpx;
        }

        .right {
            width: 280rpx;
            text-align: right;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
        }
    }
}
</style>
