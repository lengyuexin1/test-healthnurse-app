<template>
    <view class="title">全部内容谁可评论</view>
    <view class="collapse">
        <view class="list" @tap="clickList(0)">
            <view class="tn-flex-center-between">
                <view class="name">所有人</view>
                <TnIcon name="check" size="36rpx" color="#EA3E1A" v-if="data.activeIndex == 0" />
            </view>
        </view>

        <view class="list" @tap="clickList(1)">
            <view class="tn-flex-center-between">
                <view class="name">我的粉丝</view>
                <TnIcon name="check" size="36rpx" color="#EA3E1A" v-if="data.activeIndex == 1" />
            </view>
        </view>
        <view class="sonList" :class="[data.activeIndex == 1 ? 'active' : 'no-active']">
            <UserList ref="userList" :type="data.type" v-if="data.activeIndex == 1"></UserList>
        </view>
        
        <view class="list" @tap="clickList(2)">
            <view class="tn-flex-center-between">
                <view class="name">我关注的人</view>
                <TnIcon name="check" size="36rpx" color="#EA3E1A" v-if="data.activeIndex == 2" />
            </view>
        </view>
        <view class="sonList" :class="[data.activeIndex == 2 ? 'active' : 'no-active']">
            <UserList ref="userList" :type="data.type" v-if="data.activeIndex == 2"></UserList>
        </view>
    </view>
    <BottomSingleBtn btnName="确定选择" @clickBtn="clickBtn"></BottomSingleBtn>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import UserList from './components/userList.vue'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import BCNotify from '@/components/notify/index.vue'
import { commentSet } from '@/api/create-api'
import { pageController } from '@bc/uni-tools'

interface Data {
    type: string
    activeIndex: any
    fanLists: any
    selectValue: any
}

const data = reactive<Data>({
    type: 'fanList',
    activeIndex: null,
    fanLists: [],
    selectValue: []
})

const bcNotify = ref()

const userList = ref()

const clickList = (index: number) => {
   data.activeIndex = index

   index == 1 && (data.type = 'fanList')
   index == 2 && (data.type = 'followList')
   userList.value?.reload()
}

const clickBtn = () => {
    const dataList = userList.value?.data?.dataList
    if (data.activeIndex == 1) {
        if (dataList.length == 0) {
            bcNotify.value.show('您暂时还没有粉丝')
            return
        }
    }
    else if (data.activeIndex == 2) {
        if (dataList.length == 0) {
            bcNotify.value.show('您暂时还没有关注的人')
            return
        }
    }

    let commentators: string[] = []
    
    if (data.activeIndex == 1) {
        dataList.map((item: any) => {
            if (item.isCommentPermission) {
                commentators.push(item.fansId)
            }
        })
    }
    else if (data.activeIndex == 2) {
        dataList.map((item: any) => {
            if (item.isCommentPermission) {
                commentators.push(item.accountId)
            }
        })
    }

    commentSet({
        commentSet: data.activeIndex,
        commentators: commentators
    }).then(() => {
        bcNotify.value.show('设置成功')
        setTimeout(() => {
            pageController.back()
        }, 1200)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

onLoad((options) =>{
    data.activeIndex = options?.type
    data.activeIndex == 1 && (data.type = 'fanList')
    data.activeIndex == 2 && (data.type = 'followList')
})

</script>

<style lang="scss" scoped>
.title {
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    padding: 30rpx;
}

.collapse {
    background-color: #FFFFFF;

    .list {
        padding: 30rpx;
        border-bottom: solid 1rpx #F2F2F2;
        

        &:last-child {
            border-bottom: none;
        }

        .name {
            font-weight: bold;
            font-size: 28rpx;
            color: #333333;
        }
    }

    .sonList {
        padding: 20rpx 0;
        background-color: #F2F4F5;
        transition: all .35s;
    }
    .active {
        height: 700rpx;
    }
    .no-active {
        padding: 0;
        height: 0rpx;
    }
}
</style>
