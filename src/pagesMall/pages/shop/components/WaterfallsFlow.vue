<template>
    <view class="wf-page">
        <!--    left    -->
         <view>
             <view id="left" v-if="data.leftList.length">
                <template v-for="(item,index) in data.leftList" :key="index">
                    <view  class="wf-item">
                        <waterfallItem :isSmall="false" :direction="1" :item="item" @clickwaterItem="clickwaterItem"/>
                    </view>
                </template>
             </view>
         </view>

         <!--    right    -->
         <view>
             <view id="right" v-if="data.rightList.length">
                <template v-for="(item,index) in data.rightList" :key="index">
                    <view   class="wf-item">
                        <waterfallItem :isSmall="index == 0" :direction="2" :item="item" @clickwaterItem="clickwaterItem"/>
                    </view>
                </template>
             </view>
         </view>
	</view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, nextTick, getCurrentInstance } from 'vue'
import waterfallItem from './waterfall-item.vue'

const props = withDefaults(defineProps<{
    is_statistics?: boolean,
    wfList:any,
}>(), {
    is_statistics: false,
    wfList:[],
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

    // data.leftList = [];
    // data.rightList = [];
    // data.boxHeight = [];
    // data.mark = 0;

    nextTick(()=>{
        waterFall();
    })


}, { immediate: true, deep: true })

// 监听标记，当标记发生变化，则执行下一个item排序
// watch(() => data.mark, ()=> {
//     const len = data.allList.length;
//     if (data.mark < len && data.mark !== 0) {
//         nextTick(()=>{
//             waterFall();
//         })
//     }
// })

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

// 获取列表高度
const getViewHeight = (leftOrRight:number) => {
    const instance = getCurrentInstance(); // 获取组件实例
    const query = uni.createSelectorQuery().in(instance);
    const id = leftOrRight ? '#right' : '#left';
    // 使用nextTick，确保页面更新结束后，再请求高度
    nextTick(() => {
        query.select(id).boundingClientRect((res:any) => {
            res ? data.boxHeight[leftOrRight] = res.height : ''
            data.mark = data.mark + 1
        }).exec()
    });
}

const clickwaterItem = (item:any) =>{
    emit('waterItem',item)
}

</script>
  
<style lang="scss" scoped>
.wf-page {
    display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	flex: 1;
}

.wf-item {
	width: 374rpx;
}
</style>
 
