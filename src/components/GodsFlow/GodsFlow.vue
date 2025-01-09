<template>
    <view class="wf-page">
        <!--    left    -->
        <view>
            <view id="left" v-if="data.leftList.length">
                <block v-for="(item) in data.leftList" :key="item.id">
                    <view class="wf-item" :style="{ 'width': itemwidth + 'rpx' }" @tap="itemTap(item)">
                        <WaterfallsFlowItem :item="item" :itemwidth="itemwidth" :isHtml="props.isHtml"></WaterfallsFlowItem>
                    </view>
                </block>
            </view>
        </view>

        <!--    right    -->
        <view>
            <view id="right" v-if="data.rightList.length">
                <block v-for="(item) in data.rightList" :key="item.id">
                    <view class="wf-item" :style="{ 'width': itemwidth + 'rpx' }" @tap="itemTap(item)">
                        <WaterfallsFlowItem :item="item" :itemwidth="itemwidth" :isHtml="props.isHtml"></WaterfallsFlowItem>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, watch, defineEmits } from 'vue'
import WaterfallsFlowItem from './GodsFlowItem.vue'

const props = defineProps({
    ismore: {
        type: Boolean,
        default: true
    },
    // 瀑布流列表
    wfList: {
        type: Array,
        require: true
    },
    updateNum: {
        type: Number,
        default: 15
    },
    tabIndex: {
        type: Number,
        default: 0
    },
    index: {
        type: Number,
        default: -1
    },
    ischange: {
        type: Boolean,
        default: false
    },
    isHtml: {
        type: Boolean,
        default: false
    }
})

interface Data {
    allList: any
    leftList: any
    rightList: any
    mark: number
    boxHeight: any
}

const data = reactive<Data>({
    allList: [],       // 全部列表
    leftList: [],      // 左边列表
    rightList: [],     // 右边列表
    mark: 0,           // 列表标记
    boxHeight: []     // 下标0和1分别为左列和右列高度
})

interface Events {
    (e: 'waterItem', item: any): void
}

const emit = defineEmits<Events>()

const itemwidth = computed(() => {
    if (props.ischange) {
        return 256
    }
    return 346
})

watch(() => props.wfList, (newVal, oldVal) => {
    data.allList = data.handleRecovery ? 
    newVal.filter((n:any) =>  {
        return n.templateCode != 65798
    }) : newVal;

    data.leftList = [];
    data.rightList = [];
    data.boxHeight = [];
    data.mark = 0;

    nextTick(()=>{
        waterFall();
    })


}, { immediate: true, deep: true })

// 监听标记，当标记发生变化，则执行下一个item排序
watch(() => data.mark, ()=> {
    const len = data.allList.length;
    if (data.mark < len && data.mark !== 0) {
        nextTick(()=>{
            waterFall();
        })
    }
})

const waterFall = () => {
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


// export default {
//     name: 'GodsFlow', //商品瀑布流
//     components: {
//         WaterfallsFlowItem
//     },
//     props: {
//         ismore: {
//             type: Boolean,
//             default: true
//         },
//         // 瀑布流列表
//         wfList: {
//             type: Array,
//             require: true
//         },
//         updateNum: {
//             type: Number,
//             default: 15
//         },
//         tabIndex: {
//             type: Number,
//             default: 0
//         },
//         index: {
//             type: Number,
//             default: -1
//         },
//         ischange: {
//             type: Boolean,
//             default: false
//         },
//         isHtml: {
//             type: Boolean,
//             default: false
//         }
//     },
//     data() {
//         return {
//             allList: [],       // 全部列表
//             leftList: [],      // 左边列表
//             rightList: [],     // 右边列表
//             mark: 0,           // 列表标记
//             boxHeight: []     // 下标0和1分别为左列和右列高度
//         }
//     },
//     watch: {

//         // 监听列表数据变化
//         wfList: {
//             immediate: true,
//             handler(newval) {
//                 this.allList = newval
//                 this.leftList = []
//                 this.rightList = []
//                 this.boxHeight = []
//                 this.mark = 0
//                 this.waterFall()
//             }
//         },

//         // 监听标记，当标记发生变化，则执行下一个item排序
//         mark() {
//             const len = this.allList.length
//             if (this.mark < len && this.mark !== 0) {
//                 this.waterFall()
//             }
//         }

//     },
//     methods: {
//         // 瀑布流排序
//         waterFall() {
//             for (let i = 0, len = this.allList.length; i < len; i++) {
//                 if (i % 2 == 0) {
//                     this.leftList.push(this.allList[i])
//                 }
//                 else {
//                     this.rightList.push(this.allList[i])
//                 }
//             }
//             if (this.tabIndex == this.index) {
//                 uni.$u.debounce(() => {
//                     this.$emit('mincalcul')
//                 }, 500)
//             }
//         },
//         // item点击
//         itemTap(item) {
//             this.$emit('itemTap', item)
//         }
//     },
//     computed: {
//         itemwidth() {
//             if (this.ischange) {
//                 return 256
//             }
//             return 346
//         }
//     }
// }
</script>

<style lang="scss" scoped>
$page-padding: 10px;
$grid-gap: 10px;

.wf-page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex: 1;
}

.wf-item {
    padding-bottom: 16rpx;
    // width: 338rpx;
}
</style>
