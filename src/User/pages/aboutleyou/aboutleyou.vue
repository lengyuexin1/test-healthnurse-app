<template>
	<view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'关于乐悠'" ></bc-page-navbar>
            </template>

            <view class="page_content">
                <view class="Version_box">
                    <view class="leyou_box">
                        <image
                            class="leyou_img"
                            :src="getAssetsUrl('/leyou/logo/leyou_logo.png')"
                            mode="scaleToFill"
                        />
                        <view class="leyou_name">保椿生活</view>
                        <view class="leyou_version">{{ data.appVersion.appVersion }}</view>
                    </view>

                    <view class="version_item">
                        <view class="version_title">版本时间</view>
                        <view class="version_time">2024.11.20</view>
                    </view>

                    <view class="version_item" @click="clickAgreement('userAgreement')">
                        <view class="version_title">用户协议</view>
                        <TnIcon name="right" color="#999999" size="26"></TnIcon>
                    </view>

                    <view class="version_item" @click="tocommunityIndex">
                        <view class="version_title">社区规范</view>
                        <TnIcon name="right" color="#999999" size="26"></TnIcon>
                    </view>

                    <view class="version_item" @click="clickAgreement('privacyPolicy')">
                        <view class="version_title">隐私政策</view>
                        <TnIcon name="right" color="#999999" size="26"></TnIcon>
                    </view>

                    <view class="version_item" @click="tolicensePage">
                        <view class="version_title">证照信息</view>
                        <TnIcon name="right" color="#999999" size="26"></TnIcon>
                    </view>

                    <view class="version_item" @click="toruleCore">
                        <view class="version_title">平台规则</view>
                        <TnIcon name="right" color="#999999" size="26"></TnIcon>
                    </view>
                </view>
            </view>

            <template #bottom>
                <view class="bottom_copyright">
                    <view class="copyright_titile">保椿公司  版权所有</view>
                    <view>ICP备案号：琼ICP备2024037044号</view>
                </view>


            </template>

		</z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import { getVersion } from '@/libs/update/check-updater'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'

import { gotoAgreement } from "@/routes/public-routes"
import { gotolicensePage, gotocommunityIndex, gotoruleCore } from "@/routes/user-routes"
interface Data {
    appVersion: any
}

const data = reactive<Data>({
    appVersion: {}
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onMounted(() => {
    const res = uni.getSystemInfoSync()
    console.log('res', res)

    data.appVersion = res


    const src = getAssetsPic('/leyou/my/leyou_user_avatar.png')
    console.log(src)

    // return
    // getVersion().then((res) => {
    //     console.log('data.appVersion',data.appVersion);

    // })

})

const clickAgreement = (type: string) => {
    gotoAgreement(type)
}

const tolicensePage = () => {
    gotolicensePage()
}

const tocommunityIndex = () => {
    gotocommunityIndex()
}

const toruleCore = () => {
    gotoruleCore()
}

</script>

<style lang="scss" scoped>
.page_content{
    padding: 20rpx 24rpx;
    box-sizing: border-box;
    .Version_box{
        padding: 30rpx;
        padding-bottom: 6rpx;
        box-sizing: border-box;
        background: #fff;
        width: 100%;
        border-radius: 24rpx;
        .leyou_box{
            padding: 50rpx 0rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .leyou_img{
                width: 130rpx;
                height: 130rpx;
                margin-bottom: 50rpx;
                border-radius: 24rpx;
            }
            .leyou_name{
                font-size: 36rpx;
                color: #333333;
                font-weight: 500;
                margin-bottom: 12rpx;
            }
            .leyou_version{
                color: #666666;
                font-size: 28rpx;
                font-weight: 400;
            }
        }
        .version_item{
            padding: 24rpx 0rpx;
            box-sizing: border-box;
            border-top: 2rpx solid #F2F2F2;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .version_title{
                font-size: 28rpx;
                font-weight: 400;
                color: #333333;
            }
            .version_time{
                color: #999999;
                font-weight: 400;
                font-size: 28rpx;
            }
        }
    }

}
.bottom_copyright{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 22rpx;
    color: #B7B7B7;
    padding-bottom: 68rpx;
    box-sizing: border-box;
    .copyright_titile{
        margin-bottom: 8rpx;
    }
}
</style>
