<template>
    <div class="content" v-if="showInfo">
        <div class="contit">服务人员信息</div>
        <div class="mation" v-if="serviceInfo.workerInfo && serviceInfo.workerInfo.workerId">
            <div class="mattit">{{serviceInfo.workerInfo.workerName || '--'}}</div>
            <div class="mattip">
                <text>查看详情</text>
                <TnIcon name="right" />
            </div>
        </div>
        <div class="convitae" v-else>
            <div></div>服务人员分配中，请稍后....
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'


interface Props {
    serviceInfo:any,
    showInfo:boolean,
}

const props = defineProps<Props>()

onMounted(() => {

})




</script>
  
<style lang="scss" scoped>
.content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    .contit{
        font-size: 32rpx;
        color: #333333;
        font-weight: 500;
        margin-bottom: 30rpx;
    }
    .mation{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .mattit{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
            flex-shrink: 0;
        }
        .mattip{
            display: flex;
            align-items: center;
        }
    }
    .convitae{
        display: flex;
        align-items: center;
        padding: 20rpx 24rpx;
        background: #f6f6f6;
        border-radius: 8rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
        div {
            background: #ff7331;
            width: 8rpx;
            height: 8rpx;
            border-radius: 8rpx;
            margin-right: 12rpx;
        }
    }
}
</style>
  