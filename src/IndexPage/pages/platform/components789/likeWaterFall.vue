<template>
    <view class="wf-page">
        <!--    left    -->
         <view>
             <view id="left" v-if="data.leftList.length">
                <template v-for="(item,index) in data.leftList" :key="index">
                    <view  class="wf-item">
                        <likechatItme :direction="1" :isSmall="false" :item="item" :index="index" @clickwaterItem="clickwaterItem"></likechatItme>
                    </view>
                </template>
             </view>
         </view>

         <!--    right    -->
         <view>
             <view id="right" v-if="data.rightList.length">
                <template v-for="(item,index) in data.rightList" :key="index">
                    <view   class="wf-item">
                        <likechatItme :direction="2" :isSmall="index == 0" :item="item" :index="index" @clickwaterItem="clickwaterItem"></likechatItme>
                    </view>
                </template>
             </view>
         </view>
	</view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, nextTick, getCurrentInstance } from 'vue'
import likechatItme from './likechat-item.vue'


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
    (e: 'waterItem', item: any, index: number, direction:number): void
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

const loadList = () => {
    const likeChatItem = uni.getStorageSync('likeChatItem')
    console.log('不请求刷新列表',likeChatItem);
    if (!likeChatItem.toload) {
        return
    }
    if (likeChatItem.direction == 1) {
        console.log('左',data.leftList[likeChatItem.index]);
        if (likeChatItem.add) {
            data.leftList[likeChatItem.index].isLike ++
        }
        if (likeChatItem.reduce) {
            data.leftList[likeChatItem.index].isLike --
        }
    }else{
        console.log('右',data.rightList[likeChatItem.index]);
        if (likeChatItem.add) {
            data.rightList[likeChatItem.index].isLike ++
        }
        if (likeChatItem.reduce) {
            data.rightList[likeChatItem.index].isLike --
        }
    }
}


const clickwaterItem = (item:any, index:number, direction:number) =>{
    uni.setStorageSync('likeChatItem',{index, direction})
    // return
    emit('waterItem',item,index,direction)
}


defineExpose({
    loadList
})

</script>
  
<style lang="scss" scoped>
.wf-page {
    width: 100%;
    display: flex;
    padding: 10rpx 10rpx;
    box-sizing: border-box;
	justify-content: space-between;
}

.wf-item {
	width: 360rpx;
}
</style>
 
