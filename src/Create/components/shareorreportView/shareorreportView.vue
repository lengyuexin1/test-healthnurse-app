<template>
    <view class="container">
        <TnPopup v-model="data.show" @close="close" open-direction="bottom">
            <view class="content" v-if="status === 1">
                <view class="shabox">
                    <view class="shabox_titleBox">
                        <view class="shabox_title">分享至</view>
                        <view class="shabox_icon" @click="close">
                            <TnIcon name="close" size="30rpx" color="#333333"></TnIcon>
                        </view>
                    </view>
                    <view class="shabox_topBox">
                        <view class="shali" @click="sharePage">
                            <image
                                class="option_img"
                                :src="getAssetsUrl('/share/sha_weixin.png')"
                                mode="scaleToFill"
                            />
                            <view>分享好友</view>
                            <!-- #ifdef MP-WEIXIN -->
                            <button open-type="share"></button>
                            <!-- #endif -->
                        </view>
                        <view class="shali" @click="createImg">
                            <image
                                class="option_img"
                                :src="getAssetsUrl('/share/sha_haibao.png')"
                                mode="scaleToFill"
                            />
                            <view>生成海报</view>
                        </view>
                    </view>
                    <view class="shabox_bottomBox" v-if="showReport" @click="reportPage">
                        <view class="shali">
                            <image
                                class="option_img"
                                :src="getAssetsUrl('/share/sha_jubao.svg')"
                                mode="scaleToFill"
                            />
                            <view>举报</view>
                        </view>
                    </view>
                </view>

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
import { ref, computed, reactive, onMounted, getCurrentInstance, watch } from 'vue'

import { saveImage, drawBGIMG } from '@/libs/canvas-tools'
import { getAssetsPic } from '@/common/setPicture'
import { retransmission } from '@/api/create-api'
import { getQrcode } from "@/api/user-api"
import { TempStorage } from "@bc/base"


import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'



interface Props {
    status:number,
    imgUrl:string,
    showReport: boolean,
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

const emit = defineEmits(["sharePage","sharePoster","shareFun","reportFun"])

watch(()=>props.status,(newVal:any,lodVal:any)=>{
    console.log('newVal',newVal);
    console.log('lodVal',lodVal);
    
})

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
    console.log('关闭事件');
    
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

const reportPage = () => {
    emit('reportFun')
}


defineExpose({
    open,
    close
})

</script>
  
<style lang="scss" scoped>
.shabox{
    padding: 30rpx 40rpx;
    box-sizing: border-box;
    .shabox_titleBox{
        width: 100%;
        margin-bottom: 40rpx;
        position: relative;
        .shabox_title{
            width: 100%;
            text-align: center;
            font-weight: 500;
            font-size: 36rpx;
            color: #333333;
        }
        .shabox_icon{
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(50%, -50%);
        }
    }
    .shabox_topBox{
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-bottom: 40rpx;
        
    }
    .shabox_bottomBox{
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .shali{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-right: 52rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        position: relative;

        .option_img{
            width: 88rpx;
            height: 88rpx;
            margin-bottom: 12rpx;
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
 
