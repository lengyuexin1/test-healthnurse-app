<template>
    <view class="container">
        <view class="item tn-flex-column" @tap="clickChatCard">
            <view>
                <view class="top tn-flex-center-between">
                    <view class="tag tn-flex-row">
                        <image :src="getAssetsUrl('/leyou/assets/stat.svg')" mode="scaleToFill" />
                        {{ item.categoryName || '--' }}
                    </view>
                    <view @tap.stop="dismiss"><TnIcon name="power" size="32rpx" /></view>
                </view>
                <view class="title">{{ item.tname }}</view>
            </view>
            <view>
                <view class="member tn-flex-center-between">
                    <view>
                        <image :src="ele.thumb" mode="scaleToFill" v-for="(ele, idx) in sliceMemberList" :key="idx" />
                    </view>
                    <view class="online">
                        <TnIcon name="my" size="32rpx" color="black" />
                        <text>{{ item.cntMember }}人</text>
                    </view>
                </view>
            </view>
            <image class="stat" :src="getAssetsUrl('/leyou/assets/stat.png')" mode="scaleToFill" />
        </view>
        <BCPopup
            ref="bcPopup"
            :title="data.title"
            :content="data.content"
            :subBtn="data.subBtn"
            cancelBtn="再聊一聊"
            subBtnColor="#EA3E1A"
            @clickLeftBtn="confirm"
            @clickRightBtn="cancel">
        </BCPopup>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive, defineEmits } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import BCPopup from '@/components/popup/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import { gotoChatPage } from '@/routes/nim-routes';

interface Props {
    item: any
}

interface Data {
    userInfo: any
    type: number
    title: string
    content: string
    subBtn: string
}

const data = reactive<Data>({
    userInfo: null,
    type: 0,
    title: '',
    content: '',
    subBtn: ''
})

const props = defineProps<Props>()

const bcPopup = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const sliceMemberList = computed(() => {
    return props.item?.memberList?.slice(0, 5)
})

const dismiss = () => {
    if (props.item.owner == data.userInfo.id) {
        data.type = 1
        data.title = '是否解散群聊'
        data.content = '解散群聊后，其他成员也会被清出，是否解散群聊？'
        data.subBtn = '解散群聊'
    }
    else {
        data.type = 2
        data.title = '是否退出群聊？'
        data.content = ''
        data.subBtn = '确定退出'
    }
    bcPopup.value.open()
}

const confirm = () => {
    if (data.type == 1) {
        emit("clickRemoveGroupChat", props.item.tid)
    }
    else if (data.type == 2) {
        emit("clickLeaveGroupChat", props.item.tid)
    }
    bcPopup.value.close()
}

const cancel = () => {
    bcPopup.value.close()
}

const clickChatCard = () => {
    gotoChatPage({
        to: props.item.tid,
        scene: 'friendsGroup'
    })
}

onMounted(() => {
    PlatformManage.getToken().then((res) => {
        data.userInfo = res
    })
})

const emit = defineEmits(["clickRemoveGroupChat", "clickLeaveGroupChat"])

</script>
  
<style lang="scss" scoped>
.container {
    .item {
        position: relative;
        width: 100%;
        height: 360rpx;
        padding: 24rpx;
        border-radius: 16rpx;
        justify-content: space-between;
        box-shadow: 0rpx 0rpx 16rpx rgba(234,62,26,0.08);
        background: linear-gradient(180deg, #FFE5DF 0%, #FFFFFF 50%);

        .stat {
            position: absolute;
            right: 24rpx;
            bottom: 24rpx;
            z-index: 0;
            width: 128rpx;
            height: 120rpx;
        }
        
        .tag {
            align-items: center;
            font-weight: 400;
            font-size: 26rpx;
            color: #333333;
            padding: 5rpx 16rpx;
            border-radius: 24rpx;
            background-color: rgba(255, 255, 255, .6);

            image {
                width: 28rpx;
                height: 28rpx;
                margin-right: 10rpx;
            }
        }

        .title {
            margin-top: 15rpx;
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
        }

        .member {
            z-index: 10;
            position: relative;
            align-items: center;

            image {
                width: 46rpx;
                height: 46rpx;
                margin-right: -10rpx;
                border-radius: 50%;
                border: solid 1rpx #FFFFFF;
            }

            .online {
                font-weight: 500;
                font-size: 28rpx;
                color: #333333;

                text {
                    margin-left: 5rpx;
                }
            }
        }
    }
}
</style>
