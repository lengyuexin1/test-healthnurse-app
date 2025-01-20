<template>
    <z-paging
        ref="paging"
		:auto="false"
		:refresher-enabled="false"
    >
        <template #top>
            <PageTopbg :zIndex="-1" ></PageTopbg>
            <bc-page-navbar :title="'分享二维码名片'"></bc-page-navbar>
        </template>

        <view class="content">
            <image :src="data.imgUrl" class="posimg" mode="aspectFit"></image>
            <view class="bottom_btn_box">
                <view class="btn_item" @click="scanCode">
                    <image
                        class="btn_img"
                        :src="getAssetsUrl('/leyou/my/scanning-icon.svg')"
                        mode="scaleToFill"
                    />
                    <view class="btn_text">扫一扫</view>
                </view>
                <view class="btn_item" @click="save">
                    <image
                        class="btn_img"
                        :src="getAssetsUrl('/leyou/my/download-icon.svg')"
                        mode="scaleToFill"
                    />
                    <view class="btn_text">下载到相册</view>
                </view>
            </view>

        </view>
        <!-- <view class="test_box">
            <canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
        </view> -->




        <BCNotify ref="bcNotify"></BCNotify>
        <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="345" height="410" style="width:345px; height:410px"></canvas>

    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { onReady } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { saveImage, drawBGIMG } from '@/libs/canvas-tools'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import { getQrcode } from "@/api/user-api"
import { homePage } from '@/api/create-api'
import { getQRPage } from '@/api/open-api'
// import UQRCode from 'uqrcodejs'

interface Data{
    dataList:any,
    imgUrl: string,
    accountObj: any,
}

const data = reactive<Data>({
    dataList:[],
    imgUrl: '',
    accountObj: {}
})






const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})



onMounted(()=>{
    homePage(({})=>{}).then((res:any)=>{
        data.accountObj = res
        sharePoster()
    })

})





const bcNotify = ref()
const instance = getCurrentInstance(); // 获取组件实例


// onReady(()=>{
//     // 获取uQRCode实例
//     var qr = new UQRCode();
//     // 设置二维码内容
//     qr.data = "https://uqrcode.cn/doc";
//     // 设置二维码大小，必须与canvas设置的宽高一致
//     qr.size = 200;
//     // 调用制作二维码方法
//     qr.make();
//     // 获取canvas上下文
//     var canvasContext = uni.createCanvasContext('qrcode', instance); // 如果是组件，this必须传入
//     // 设置uQRCode实例的canvas上下文
//     qr.canvasContext = canvasContext;
//     // 调用绘制方法将二维码图案绘制到canvas上
//     qr.drawCanvas();
// })

const sharePoster = async () => {

    uni.showLoading({
        title: '卡片生成中...'
    })

    // 二维码链接图片
    let qrimg =  await getQrcode(`/pagesCnt/pages/author/author?accountId=${data.accountObj.accountId}`).then((img:any)=>{
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    const accountThumb = await drawBGIMG(data.accountObj.avatar)

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    const context = uni.createCanvasContext('mycanvas',instance)

    context.clearRect(0, 0, 450, 550);
    // 背景白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 24, 450, 550)

    context.save()
    context.arc(180, 37, 38, 0, Math.PI * 2);
    context.fill()//保证图片无bug填充
    context.clip();//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

    context.drawImage(accountThumb, 147, 3, 66, 66)
    context.restore()

    // 名称
    context.setFillStyle('#333333')
    context.setFontSize(16)
    context.textAlign = 'center';
    context.fillText(data.accountObj.name, (345 / 2), 96)

    // 保椿号
    context.setFillStyle('#333333')
    context.setFontSize(12)
    context.textAlign = 'center';
    context.fillText('保椿号：ABCDEF', (345 / 2), 120)

    // 简介
    // context.setFillStyle('#A5A5A5')
    // context.setFontSize(12)
    // context.textAlign = 'center';
    // context.fillText(data.accountObj.accountDescription ? data.accountObj.accountDescription : '快写点什么，让我看看你的独一无二', (345 / 2), 144)


    // 二维码
    context.drawImage(qrimgUrl, 83, 160, 180, 180)

    // 底部文字
    context.setFillStyle('#BFBFBF')
    context.setFontSize(12)
    context.textAlign = 'center';
    context.fillText('扫描二维码，找到我', (345 / 2), 380)


    context.draw(
        false,
        setTimeout( async () => {
            uni.canvasToTempFilePath({
                canvasId:'mycanvas',
                success: (res:any) => {
                    data.imgUrl = res.tempFilePath
                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
                        icon: 'none',
                        title: '生成失败,请稍后重试'
                    })
                },
                complete: (ret) => {
                    console.log('生成中....');
                    uni.hideLoading()
                }
            },instance)
        }, 3000)
    )


}

const scanCode = () => {
    uni.scanCode({
        success: function(res) {

            let [path, str] = res.path.split('?');
            let [type, scene] = str.split('=');

            getQRPage({scene}).then((page) => {
                console.log('page', page)
                uni.navigateTo({
                    url: decodeURIComponent(page)
                })
            }).catch(() => {
                bcNotify.value.error('二维码失效')
                return
            })

        }
    })
}

const save = () => {
    saveImage(data.imgUrl)
}

</script>

<style lang="scss" scoped>
.content{
    padding: 80rpx 30rpx;
    padding-top: 100rpx;
    box-sizing: border-box;
    .posimg{
        width: 690rpx;
        height: 824rpx;
        border-radius: 20rpx;
        margin: auto;
        display: block;
        margin-bottom: 54rpx;
        box-sizing: border-box;
    }
    .bottom_btn_box{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .btn_item{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .btn_img{
                width: 88rpx;
                height: 88rpx;
                margin-bottom: 16rpx;
            }
            .btn_text{
                font-weight: 400;
                font-size: 28rpx;
                color: #333333;
            }
        }
    }

}
.bilvas{
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}

.test_box{
    border: 2rpx solid red;
    width: 500rpx;
    height: 500rpx;
}

</style>
