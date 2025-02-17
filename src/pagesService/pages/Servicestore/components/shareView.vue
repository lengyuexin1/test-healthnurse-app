<template>
  <view class="container">
      <TnPopup v-model="show" @close="close" open-direction="bottom">
          <view class="content" v-if="status === 1">
              <view class="shabox row i-center j-center">
                  <view class="shali column i-center j-center" @click="sharePage">
                      <image
                          class="option_img"
                          :src="getAssetsUrl('/share/sha_weixin.png')"
                          mode="aspectFit"
                      />
                      <text class="">分享给好友</text>

                      <!-- #ifdef MP-WEIXIN -->
                      <button open-type="share"></button>
                      <!-- #endif -->
                  </view>
                   <!-- #ifdef APP-PLUS -->
                   <!-- " @click="shareTimeline" -->
                   <view class="shali column i-center j-center">
                      <u-image :src="getAssetsUrl('/share/sha_friend.png')" width="88rpx" height="88rpx" shape="circle" mode="aspectFit"></u-image>
                      <text class="">分享朋友圈</text>
                  </view>
                  <!-- #endif -->
                  <view class="shali column i-center j-center" @click="createImg">
                      <image
                          class="option_img"
                          :src="getAssetsUrl('/share/sha_haibao.png')"
                          mode="aspectFit"
                      />
                      <text class="">生成海报</text>
                  </view>
              </view>
              <view class="shut" @click="close">取消</view>
          </view>
          <view class="poster" v-if="status === 2">
              <view class="postit row i-center j-center">
                  <text>生成海报</text>
                  <image
                      @click="close"
                      class="posshu"
                      :src="getAssetsUrl('/channel/out.svg')"
                      mode="scaleToFill"
                  />
              </view>

              <image :src="imgUrl" class="posimg" mode="aspectFit"></image>

              <view class="posbot column i-center j-center" @click="save">
                  <image
                      class="download_img"
                      :src="getAssetsUrl('/channel/download.png')"
                      mode="aspectFit"
                  />
                  <text>保存图片</text>
              </view>
          </view>
      </TnPopup>
      <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344" style="width:254px; height:344px"></canvas>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import { saveImage, drawBGIMG } from '@/libs/canvas-tools'
import { getAssetsPic } from '@/common/setPicture'
import { retransmission } from '@/api/create-api'
import { getQrcode } from "@/api/user-api"
// import { TempStorage } from "@bc/base"

import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'



// Define props
const props = defineProps({
    detailObj: {
        type: Object,
        default: () => {}
    },
    path: {
        type: String,
        default: ''
    },
    record: {
        type: Boolean,
        default: false
    }
})

// Define reactive variables
const show = ref(false)
const status = ref(1) // 1分享弹窗 2海报
const imgUrl = ref('')
const bgUrl = ref('')
const codeUrl = ref('')
const QRimg = ref('')

const getAssetsUrl = (src:string) => {
    return getAssetsPic(src)
}
// Methods
const retransmit = (articleId) => {
    retransmission({
        articleId
    })
}

const sharePage = () => {
// #ifndef MP-WEIXIN
    emit('sharePage')
    // #endif

    console.log('this.detailObj.id', props.detailObj.id)
    if (props.record) {
        console.log('文章分享记录分享数量')
        retransmit(props.detailObj.id)
    }
    close()
}

const shareTimeline = () => {
// #ifndef MP-WEIXIN
    emit('shareTimeline')
    // #endif
    if (props.record) {
        retransmit(props.detailObj.id)
    }
    close()
}

const close = () => {
    show.value = false
    emit('changecrown')
}

const open = () => {
    console.log('展示')
    status.value = 1
    show.value = true
}

const save = () => {
    saveImage(imgUrl.value)
}

const fetchQrcode = async () => {
    return await getQrcode(props.path)
}

// 绘制海报
const getCodeUrl = async (canvasId, codeUrl, bgImg, QRimg) => {
    console.log('async getCodeUrl', canvasId, codeUrl, bgImg, QRimg)
    if (!codeUrl || !bgImg) {
        uni.showToast({
            icon: 'none',
            title: '生成失败1'
        })
        return false
    }

    uni.showLoading({
        title: '海报生成中...'
    })

    let title = props.detailObj.title //标题
    let accountName = props.detailObj.accountName || '' //作者，店铺名

    console.log('title', title)
    if (title.length > 8) {
        title = title.slice(0, 8) + "..."
    }
    if (accountName.length > 8) {
        accountName = accountName.slice(0, 8) + "..."
    }

    const context = uni.createCanvasContext(canvasId, this)

    context.clearRect(0, 0, 254, 344)

    // 背景白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, 254, 344)

    if (props.detailObj.Customsubtitle) {
        // 底部白块
        context.setFillStyle('#ffffff')
        context.fillRect(0, 258, 258, 128)

        // 底部文字
        context.setFillStyle('#333333')
        context.setFontSize(16)
        context.fillText(title, 12, 282)

        // 价格自定义副标题
        context.setFillStyle('#808080')
        context.setFontSize(14)
        context.fillText(`低至${props.detailObj.price / 100}元起`, 12, 304)

        context.setFillStyle('#999999')
        context.setFontSize(12)
        context.fillText(accountName, 40, 330)

        // 二维码
        context.drawImage(QRimg, 168, 260, 76, 76)

        // 背景图片
        context.drawImage(bgImg, 0, 0, 275, 255)

        context.save()
        context.arc(24, 326, 10, 0, Math.PI * 2)
        context.fill() // 保证图片无bug填充
        context.clip() // 剪切区域

        context.drawImage(codeUrl, 14, 316, 20, 20)
        context.restore()
    }
    else {
        // 底部白块
        context.setFillStyle('#ffffff')
        context.fillRect(0, 258, 258, 94)

        // 底部文字
        context.setFillStyle('#333333')
        context.setFontSize(16)
        context.fillText(title, 12, 282)

        // 二维码
        context.drawImage(QRimg, 168, 260, 76, 76)

        context.fillText(accountName, 40, 324)
        context.setFillStyle('#999999')
        context.setFontSize(12)

        // 背景图片
        context.drawImage(bgImg, 0, 0, 275, 255)

        context.save()
        context.arc(24, 320, 10, 0, Math.PI * 2)
        context.fill() // 保证图片无bug填充
        context.clip() // 剪切区域

        context.drawImage(codeUrl, 14, 310, 20, 20)
        context.restore()
    }

    setTimeout(() => {
        context.draw(true, () => {
            uni.canvasToTempFilePath({
                canvasId,
                success: (res) => {
                    console.log('imgUrl', res.tempFilePath)
                    imgUrl.value = res.tempFilePath
                    status.value = 2
                    title = ''
                },
                fail: (err) => {
                    console.log(err)
                    uni.showToast({
                        icon: 'none',
                        title: '生成失败2，请稍后重试'
                    })
                },
                complete: () => {
                    uni.hideLoading()
                }
            }, this)
        })
    }, 300)
}

// 切换海报
const createImg = async () => {
    if (props.record) {
        console.log('文章分享记录分享数量')
        retransmit(props.detailObj.id)
    }
    console.log('this.detailObj', props.detailObj)

    // 文章作者头像/机构头像
    const codurl = props.detailObj.accountThumb ? props.detailObj.accountThumb : getAssetsUrl('/default/avatar.png')
    const codeUrl = await drawBGIMG(codurl)
    const bgurl = props.detailObj.cover ? props.detailObj.cover : getAssetsUrl('/channel/articledetails.png')
    const bgUrl = await drawBGIMG(bgurl)
    const qrimg = await fetchQrcode()
    const QRimg = await drawBGIMG(qrimg)

    if (QRimg === '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    getCodeUrl('mycanvas', codeUrl, bgUrl, QRimg)
}
const emit = defineEmits(["shareTimeline", "sharePage", "changecrown"])
defineExpose({
    open,
    close
})

</script>

<style lang="scss" scoped>
.shabox{
    padding: 70rpx 0 30rpx;
    .shali{
        position: relative;
        font-size: 30rpx;
        font-weight: 500;
        color: #333333;
        margin: 0 50rpx;

        text{
            margin-top: 14rpx;
            text-align: center;
        }

        button{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            z-index: 30;
        }
        .option_img{
            width: 88rpx;
            height: 88rpx;
            border-radius: 50%;
        }
    }
}
.shut{
    height: 102rpx;
    background: #F8F9F9;
    font-size: 30rpx;
    font-weight: 500;
    line-height: 102rpx;
    color: #929292;
    text-align: center;
}

.poster{
    background: linear-gradient(183deg, #DFF7EF 0%, #F9F9F9 100%);
    border-radius: 12px 12px 0px 0px;
    width: 100%;
    height: 1140rpx;
    .postit{
        font-size: 36rpx;
        font-weight: 500;
        color: #333333;
        padding: 28rpx;
        padding-bottom: 52rpx;
        position: relative;

        .posshu{
            position: absolute;
            top: 38rpx;
            right: 40rpx;
            width: 32rpx;
            height: 32rpx;
        }
    }
    .posbot{
        padding: 60rpx 0 30rpx;
        text{
            font-size: 28rpx;
            font-weight: 400;
            color: #666666;
            // margin-top: 8rpx;
        }
        .download_img{
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
        }
    }

    .posimg{
        width: 550rpx;
        height: 750rpx;
        box-shadow: 0rpx 0rpx 24rpx rgba(0,0,0,0.04);
        border-radius: 20rpx;
        margin: auto;
        display: block;
    }
}
.bilvas{
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}
</style>

