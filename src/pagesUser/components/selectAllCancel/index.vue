<template>
    <view class="list-box tn-flex-column">
        <view class="list tn-flex-row" v-for="(item, index) in props.list" :key="index">
            <view class="checkbox tn-flex-center-center animate__animated animate__faster animate__slideInLeft" v-if="props.isEdit">
                <TnCheckbox size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="item.checked"></TnCheckbox>
            </view>
            <view class="item tn-flex-row" @tap="clickItem(item, index)">
                <!-- 通用列表 -->
                <template v-if="props.type == 'normal'">
                    <NormalList :item="item"></NormalList>
                </template>

                <!-- 足迹列表、康养服务、康养适品 -->
                <template v-else-if="['browerHistory', 'healthList'].includes(props.type)"> 
                    <TrackList :item="item"></TrackList>
                </template>

                <!-- 成员列表 -->
                <template v-else-if="props.type == 'memberList'">
                    <MemberList :item="item"></MemberList>
                </template>

                <!-- 店铺列表, 康养囤-店铺浏览记录 -->
                <template v-else-if="props.type == 'shopList'">
                    <shopList :item="item"></shopList>
                </template>

                <!-- 草稿列表 -->
                <template v-else-if="props.type == 'draftList'">
                    <DraftList :item="item"></DraftList>
                </template>

                <!-- 聊天草稿 -->
                <template v-else-if="props.type == 'ChatdraftList'">
                    <ChatdraftList :item="item"></ChatdraftList>
                </template>

                <!-- 爱聊-我聊过的 -->
                <template v-else-if="props.type == 'hasChatList'">
                    <HasChatList :item="item"></HasChatList>
                </template>

                <!-- 直播列表 -->
                <template v-else-if="props.type == 'liveList'">
                    <LiveList class="flex1" :item="item"></LiveList>
                </template>

                <template v-else-if="props.type == 'reportList'">
                    <ReportList :item="item"></ReportList>
                </template>
            </view>
        </view>
    </view>

    <view class="btn tn-flex-center-between animate__animated animate__faster animate__slideInUp" v-if="props.isEdit">
        <TnCheckbox size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="data.allSelect" @change="change">全选</TnCheckbox>
        <TnButton width="220rpx" height="76rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickBtn">
            {{ props.btnName }}
        </TnButton>
    </view>

    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script lang="ts" setup>
import { ref, defineEmits, reactive, watch } from "vue"
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import BCNotify from '@/components/notify/index.vue'
import NormalList from './compontent/normalList.vue'
import TrackList from './compontent/trackList.vue'
import MemberList from './compontent/memberList.vue'
import ShopList from './compontent/shopList.vue'
import DraftList from './compontent/draftList.vue'
import ChatdraftList from './compontent/chatdraftList.vue'
import HasChatList from './compontent/hasChatList.vue'
import ReportList from './compontent/ReportList.vue'
import LiveList from './compontent/liveList.vue'

const props = defineProps({
    /** 
     * @param {list}
     * 确保list数组中的对象有checked:false 属性值
     */
    list: {
        type: Array,
        default: []
    } as any,
    /**
     * @param {type}
     * nomal 为正常的组件
     * browerHistory 为足迹组件
     * memberList 为成员列表组件
     */
    type: {
        type: String,
        default: 'normal'
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    /** 按钮的名称 */
    btnName: {
        type: String,
        default: '取消收藏'
    },
    listType: {
        type: String,
        default: 'watchList'
    }
})

interface Data {
    /** 全选 */
    allSelect: boolean
}

const data = reactive<Data>({
    allSelect: false
})

const bcNotify = ref()

/** 监听列表复选框的变化 */
watch(() => props.list.map((item: any) => item.checked), (newVal, oldVal) => {
    if (newVal.length == 0) {
        data.allSelect = false
        return
    }
    if (newVal.every((value: boolean) => value === true)) {  
        data.allSelect = true
    }
    else {
        data.allSelect = false
    }
})

/** 监听管理按钮的变化 */
watch(() => props.isEdit, (newVal, oldVal) => {
    newVal == false && (props.list.map((item: any) => item.checked = false))
})

// 点击列表
const clickItem = (item: any, index: number) => {
    if (props.isEdit) {
        props.list[index].checked = !props.list[index].checked
        return
    }
    
    emit('clickItem', item)
}

// 全选按钮
const change = () => {
    data.allSelect && (props.list.map((item: any) => item.checked = true))
    !data.allSelect && (props.list.map((item: any) => item.checked = false))
}

// 操作按钮
const clickBtn = () => {
    let ids = [] as any
    props.list.map((item: any) => {
        if (item.checked) {
            /** 康养服务、康养适品需要返回id */
            if (props.type == 'healthList') {
                if (props.listType == 'watchList') {
                    ids.push(item.id)
                }
                else if (props.listType == 'collectList'){
                    ids.push(item.itemId)
                }
                return
            }
            else if (props.type == 'shopList') {
                if (props.listType == 'watchList') {
                    ids.push(item.id)
                }
                else if (props.listType == 'collectList'){
                    ids.push(item.shopId)
                }
                return
            }
            else if (props.type == 'draftList') {
                ids.push(item.id)
                return
            }

            ids.push(item.id)
        }
    })
    if (ids.length == 0) {
        bcNotify.value.show('未选择操作项!')
        return
    }
    // 发送选中的id
    emit("clickBtn", ids, data.allSelect)
}

const emit = defineEmits(["clickBtn", "clickItem", "clickSection"])

</script>

<style lang="scss" scoped>
.list-box {
    .list {
        padding: 20rpx;

        .checkbox {
            margin-right: 30rpx;
        }

        &:first-child {
            padding-top: 0;
        }
    }
    .item {
        width: 100%;
        background-color: #FFFFFF;
        padding: 20rpx;
        border-radius: 12rpx;
    }
}

.btn {
    z-index: 100;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 146rpx;
    padding: 20rpx;
    background-color: #FFFFFF;
}

.flex1 {
    flex: 1;
}
</style>
