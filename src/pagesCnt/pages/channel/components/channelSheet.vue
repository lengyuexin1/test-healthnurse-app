<template>
    <TnPopup v-model="data.showPopup" open-direction="bottom">
        <view class="action_box">
            <view class="action_top" @click="closeAction">
                <image
                    class="posshu"
                    :src="getAssetsUrl('/channel/out.svg')"
                    mode="scaleToFill"
                />
            </view>
            <view class="my_channel">
                <view class="my_channel_top">
                    <view class="my_channel_top_left">
                        <view class="my_channel_title">康养百科</view>
                        <view class="my_channel_bace">点击进入康养百科</view>
                    </view>
                </view>
                
                <view class="my_channel_list">
                    <view
                    v-for="(item,index) in navList" :key="item.id"
                    @click="changechannel(item,index)"
                    class="my_channel_item"
                    :class="{ 'highlight_box': current == index,'not_right': (index + 1) % 4 == 0 }">
                        {{ item.name }}
                    </view>
                </view>
            </view>
        </view>
    </TnPopup>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, defineExpose } from 'vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'

interface Props {
    navList:any,
    current:number
}
const props = defineProps<Props>()

interface Events {
    (e: 'changechannel', item:any, index:number): void
}
const emit = defineEmits<Events>()

interface Data {
    showPopup:boolean,
    current:number
}
const data = reactive<Data>({
    showPopup:false,
    current:0
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {

})

const showPopup = () => {
    data.showPopup = !data.showPopup
}
const closeAction = () => {
    data.showPopup = false
}
const changechannel = (item:any, index:number) => {
    emit('changechannel', item, index)
    setTimeout(()=>{
        closeAction()
    },300)
}
defineExpose({
    showPopup
})


</script>
  
<style lang="scss" scoped>
.action_box{
    padding: 40rpx 32rpx;
    box-sizing: border-box;
    min-height: 800rpx;

    .action_top{
        width: 100%;
        position: relative;
        margin-bottom: 24rpx;
        .posshu{
            position: absolute;
            top: 0;
            right: 0;
            width: 32rpx;
            height: 32rpx;

        }
    }
    .my_channel{
        .my_channel_top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32rpx;
            .my_channel_top_left{
                display: flex;
                align-items: center;
                .my_channel_title{
                    color: #333333;
                    font-size: 32rpx;
                    margin-right: 12rpx;
                }
                .my_channel_bace{
                    color: #999999;
                    font-size: 24rpx;
                }
            }
            .my_channel_right{
                color: #29C86F;
                font-size: 28rpx;
            }
        }
        .my_channel_list{
            margin-bottom: 32rpx;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .my_channel_item{
            margin-right: 14rpx;
            margin-bottom: 20rpx;
            padding: 16rpx 52rpx;
            box-sizing: border-box;
            border-radius: 8rpx;
            background: #F7F7F7;
            text-align: center;
            font-size: 26rpx;
            white-space: nowrap; /*强制一行内显示*/
            overflow: hidden;/*溢出隐藏*/
            text-overflow: ellipsis;/*超出部分现实省略号*/
            &.highlight_box{
                color: #29C86F;
                background: #EBFBF1;
            }
        }
    }
    .recommend_channel{
        .recommend_channel_top{
            display: flex;
            align-items: center;
            margin-bottom: 32rpx;
            .recommend_channel_title{
                color: #333333;
                font-size: 32rpx;
                margin-right: 12rpx;
            }
            .recommend_channel_bace{
                color: #999999;
                font-size: 24rpx;
            }
        }
        .recommend_channel_list{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .recommend_channel_item{
                margin-right: 14rpx;
                margin-bottom: 20rpx;
                width: 152rpx;
                height: 68rpx;
                border-radius: 8rpx;
                background: #FFFFFF;
                border: 1px solid #D5D5D5;
                text-align: center;
                line-height: 68rpx;
                font-size: 26rpx;
            }
        }
    }
}
</style>
  