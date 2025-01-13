<template>
    <view class="container" >
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'申请售后'"></bc-page-navbar>
            </template>
            
            <view class="corbg">
            <template v-if="status == 2">
                <view class="stabox column">
                    <TnIcon name="time-fill" color="#29C86F" size="110"></TnIcon>
                    <text class="stasuc">等待处理</text>
                    <view class="stasom row" @click="linkSales">
                        <text class="somtex">售后申请已提交，</text>
                        <text class="somtex somcol">查看售后进度</text>
                    </view>
                    <text class="stasay">保椿工作人员正在快马加鞭帮您处理，待处理完成后我们将会致电或短信通知到您，请稍等！</text>
                    <view class="stabut row">
                        <view class="btnli" style="width: 400rpx;">
                            <view @click="linkHome" class="btnli_btn">完成返回</view>
                        </view>
                    </view>
                </view>
            </template>
            <template v-if="status == 3">
                <view class="stabox column">
                    <TnIcon name="time-fill" color="#29C86F" size="110"></TnIcon>
                    <text class="stasuc">等待处理</text>
                    <view class="stasom row" @click="linkSales">
                        <text class="somtex">您的仲裁申请已提交，</text>
                        <text class="somtex somcol">查看售后进度</text>
                    </view>
                    <text class="stasay">保椿工作人员正在快马加鞭帮您处理，待处理完成后我们将会致电或短信通知到您，请稍等！</text>
                    <view><text class="stasay" style="color:#30A5FF">仲裁最多可提交两次，请注意提交质量哟!</text></view>
                    <view class="stabut row">
                        <view class="btnli" style="width: 400rpx;">
                            <view @click="linkHome" class="btnli_btn">完成返回</view>
                        </view>
                    </view>
                </view>
            </template>
        </view>


    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick,  } from 'vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { formattime } from '@/common/formatTime'

import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotosalesDetail } from '@/routes/user-routes'

interface Props {
    id:string,
    status:number
}
const props = defineProps<Props>()

interface Data {

}
const data = reactive<Data>({
})


const bcNotify = ref()

const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm')
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onMounted(()=>{
    
})

const linkSales = () => {
    gotosalesDetail({id:props.id},true)
}

const linkHome = () => {
    setTimeout(() => {
        uni.navigateBack()
    }, 800)
}





</script>
  
<style lang="scss" scoped>
.corbg{
    padding: 20rpx;
}
.stabox{
    justify-content: center;
    align-items: center;
    padding: 60rpx 0;
    background: #FFFFFF;
    border-radius: 24rpx;

    .stasuc{
        font-size: 36rpx;
        font-weight: 400;
        color: #666666;
        margin-top: 16rpx;
    }
    .stapic_box{
        margin-top: 4rpx;
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */

        .stapic{
            font-size: 56rpx;
            font-weight: bold;
            color: #333333;

            &.unit{
                font-size: 36rpx;
                line-height: 46rpx;
            }
        }
        /* #ifdef APP-NVUE */
        flex-direction: row;
        align-items: flex-end;

        .unit{
            margin-bottom: 4rpx;
        }
        /* #endif */
    }

    .stasom{
        margin-top: 50rpx;
        align-items: center;
        .somtex{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
            &.somcol{
                color: #30A5FF;
                margin-left: 8rpx;
                text-decoration: underline;
            }
        }
    }
    .stasay{
        margin-top: 20rpx;
        font-size: 30rpx;
        font-weight: 400;
        color: #666666;
        text-align: center;
        padding: 0 60rpx;
        line-height: 46rpx;
    }
    .sta-event-box{
        margin-top: 30rpx;

        .sta-event-img{
            width: 400rpx;
            height: 400rpx;
        }
    }

    .stabut{
        margin-top: 90rpx;
        align-items: center;
        justify-content: center;
        .btnli{
            width: 240rpx;
            margin: 0 16rpx;
            .btnli_btn{
                width: 100%;
                height: 84rpx;
                line-height: 84rpx;
                border: 2rpx solid #EA3E1A;
                border-radius: 42rpx;
                font-size: 32rpx;
                font-weight: 500;
                color: #EA3E1A;
                text-align: center;
            }
        }
    }
}
.mationbox{
    padding: 0 40rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    .matli{
        height: 100rpx;
        border-bottom: 2rpx solid #F2F2F2;
        align-items: center;
        justify-content: space-between;
        .mattex{
            font-size: 30rpx;
            font-weight: 400;
            color: #666666;
            &.matxi{
                margin-left: 40rpx;
            }
        }
        &.matcol{
            .mattex{
                color: #FF3A3A;
            }
            .mattex{
                color: #FF3A3A;
            }
        }
    }
}
</style>
  