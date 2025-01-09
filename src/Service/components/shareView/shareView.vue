<template>
    <view class="container">
        <TnPopup v-model="data.show" @close="close" open-direction="bottom">
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

    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue'

import { saveImage, drawBGIMG } from '@/libs/canvas-tools'
import { getAssetsPic } from '@/common/setPicture'
import { retransmission } from '@/api/create-api'
import { getQrcode } from "@/api/user-api"
import { TempStorage } from "@bc/base"


import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'



interface Props {
    status:number,
    imgUrl:string
}
const props = defineProps<Props>()

interface Data {
    status:number,
    show:boolean,
}
const data = reactive<Data>({
    status:1,
    show:false,
})

const emit = defineEmits(["sharePage","sharePoster","shareFun"])


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {

})


const open = () => {
    data.status = 1
    data.show = true
}
const close = () => {
    data.show = false
    emit('shareFun')
}

const sharePage = () => {
    // #ifndef MP-WEIXIN
    emit('sharePage')
    // #endif
    close()
}

// 获取实例this
const instance = getCurrentInstance();

// 生成海报
const createImg = async () => {
    emit('sharePoster')
}

const save = () => {
    saveImage(props.imgUrl)
}


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
 
