<template>
    <view class="wf-page">
        <!--    left    -->
         <view>
             <view id="left" v-if="data.leftList.length">
                <template v-for="(item,index) in data.leftList" :key="item.id">
                    <view  class="wf-item">
                        <!-- :is_statistics="is_statistics"  -->
                        <waterfallItem :isSmall="false" :direction="1" :item="item" @clickwaterItem="clickwaterItem"/>
                    </view>
                </template>
             </view>
         </view>

         <!--    right    -->
         <view>
             <view id="right" v-if="data.rightList.length">
                <template v-for="(item,index) in data.rightList" :key="item.id">
                    <view   class="wf-item">
                        <!-- :is_statistics="is_statistics" -->
                        <waterfallItem :isSmall="index == 0" :direction="2" :item="item" @clickwaterItem="clickwaterItem"/>
                    </view>
                </template>
             </view>
         </view>
	</view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, nextTick, getCurrentInstance } from 'vue'
import waterfallItem from './waterfallItem.vue'

const props = withDefaults(defineProps<{
    is_statistics?: boolean,
    wfList:any
}>(), {
    is_statistics: false,
    wfList:[]
})


interface Data {
    allList:any,
    leftList:any,
    rightList:any,
    mark:number,
    boxHeight:any,
    handleRecovery:boolean,
}
const data = reactive<Data>({
    allList: [],       // 全部列表
    leftList: [],      // 左边列表
    rightList: [],      // 右边列表
    mark: 0,           // 列表标记
    boxHeight: [],     // 下标0和1分别为左列和右列高度
    handleRecovery: false
})

interface Events {
    (e: 'waterItem', item: any): void
}
const emit = defineEmits<Events>()

watch(() => props.wfList, (newVal, oldVal) => {
    data.allList = data.handleRecovery ? 
    newVal.filter((n:any) =>  {
        return n.templateCode != 65798
    }) : newVal;

    nextTick(()=>{
        waterFall();
    })


}, { immediate: true, deep: true })

onMounted(() => {
})

// #ifdef APP-PLUS
const systemInfo = uni.getSystemInfoSync();
data.handleRecovery = systemInfo.deviceBrand === "xiaomi";
// #endif


// 瀑布流排序
const waterFall = () => {
    data.leftList = []
    data.rightList = []
    for (let i = 0, len = data.allList.length; i < len; i++) {
        if (i % 2 == 0) {
            data.leftList.push(data.allList[i])
        }
        else {
            data.rightList.push(data.allList[i])
        }
    }
}

const clickwaterItem = (item:any) =>{
    emit('waterItem',item)
}

</script>
  
<style lang="scss" scoped>
.wf-page {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	flex: 1;
}

.wf-item {
	width: 360rpx;
}
</style>
 
