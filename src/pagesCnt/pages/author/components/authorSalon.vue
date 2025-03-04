<template>
    <view class="container">
        <view class="container_box" v-if="salonList.length != 0">
            <view class="container_title">他创建/加入的圈子</view>
            <view class="salon_list">
                <view class="salon_item" v-for="item in salonList" :key="item.id" @click="clickwaterItem(item)">
                    <view class="salon_left">
                        <image
                            class="salon_left_img"
                            :src="item.thumb"
                            mode="aspectFill"
                        />
                        <view class="salon_left_text">
                            <view class="salon_title">{{ item.name }}</view>
                            <view class="salon_bace">{{ item.desc }}</view>
                            <view class="salon_number">活跃度: {{ item.activation ? item.activation : '--' }}</view>
                        </view>
                    </view>
                    <template v-if="item.role">
                        <view class="right">
                            <view class="btn to_join">管理</view>
                        </view>
                    </template>
                    <template v-else>
                        <view class="right">
                            <view class="btn is_join" v-if="item.isMember" @click.stop="toExit(item)">已加入</view>
                            <view class="btn to_join" v-else @click.stop="tojoinSalon(item)">加入</view>
                        </view>
                    </template>

                </view>
            </view>
        </view>
        <view class="container_box" v-if="dataList.length != 0">
            <view class="container_title">他发布的帖子</view>
            <view class="posts_list">
                <view class="posts_item" v-for="item in dataList" :key="item.id" @click="tosalonPostsDetailPage(item)">
                    <image
                        class="posts_img"
                        :src="item.cover"
                        mode="aspectFill"
                    />
                    <view class="posts_text">
                        <view class="posts_title">{{ item.title }}</view>
                        <view class="posts_time">{{ formatTime(item.utcExamined) }}</view>
                    </view>
                </view>
            </view>
        </view>

        <BCNotify ref="bcNotify"></BCNotify>
        <TnPopup v-model="data.showPopup">
            <view class="popup_box">
                <view class="popup_box_top">退出沙龙</view>
                <view class="popup_box_content">确定退出该沙龙?</view>
                <view class="popup_box_bottom">
                    <view class="left_btn" @click="cancelPopup">取消</view>
                    <view class="right_btn" @click="isExit">确定</view>
                </view>
            </view>
        </TnPopup>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { agoTime } from '@/common/formatTime'
import BCNotify from '@/components/notify/index.vue'

import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { joinSalon, pushExitSalon } from '@/api/user-api'
import { gotosalonPostsDetailPage, gotoSalonDetail } from '@/routes/create-routes'


interface Props {
    dataList:any,
    salonList:any
}

const props = defineProps<Props>()

interface Data {
    showPopup:boolean,
    salonItem:any,

}
const data = reactive<Data>({
    showPopup:false,
    salonItem:{},

})

const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})

onMounted(() => {

})

const bcNotify = ref()

const tosalonPostsDetailPage = (item:any) =>{
    gotosalonPostsDetailPage({id:item.id})
}

const clickwaterItem = (item:any) =>{
    gotoSalonDetail({id:item.id})
}

const exitSalon = (item:any) => {
    pushExitSalon({
		salonId: item.id
	}).then(()=>{
        bcNotify.value.show('退出成功');
        item.isMember = 0
	})
    cancelPopup()
}

const tojoinSalon = (item:any) => {
    joinSalon({ salonId: item.id }).then(() => {
        bcNotify.value.show('加入成功');
        item.isMember = 1
    }).catch((err:any) => {
        bcNotify.value.show(err.message);
    })
}

const cancelPopup = () => {
    data.showPopup = false
    data.salonItem = {}
}

const isExit = () => {
    exitSalon(data.salonItem)
}

const toExit = (item:any) => {
    data.salonItem = item
    data.showPopup = true
}


</script>

<style lang="scss" scoped>
.container{
    padding: 30rpx 20rpx;
    box-sizing: border-box;
}
.container_box{
    margin-bottom: 10rpx;
    .container_title{
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
        margin-bottom: 20rpx;
    }
    .salon_list{
        .salon_item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 20rpx;
            background: #fff;
            padding: 24rpx;
            box-sizing: border-box;
            .salon_left{
                display: flex;
                align-items: center;
                .salon_left_img{
                    width: 132rpx;
                    height: 132rpx;
                    border-radius: 8rpx;
                    margin-right: 20rpx;
                }
                .salon_left_text{
                    width: 370rpx;
                    margin-right: 20rpx;
                    .salon_title{
                        font-size: 30rpx;
                        color: #333333;
                        font-weight: 500;
                        margin-bottom: 8rpx;
                    }
                    .salon_bace{
                        width: 100%;
                        font-size: 26rpx;
                        color: #666666;
                        font-weight: 400;
                        margin-bottom: 12rpx;
                        display: -webkit-box;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .salon_number{
                        color: #666666;
                        font-size: 24rpx;
                        font-weight: 400;
                    }
                }
            }
            .right{
                .btn{
                    width: 120rpx;
                    height: 52rpx;
                    border-radius: 26rpx;
                    font-size: 24rpx;
                    text-align: center;
                    line-height: 52rpx;
                    &.is_join{
                        border: 2rpx solid #CCCCCC;
                        color: #333333;
                    }
                    &.to_join{
                        border: 2rpx solid #EA3E1A;
                        color: #EA3E1A;
                    }
                }
            }
        }
    }
    .posts_list{
        .posts_item{
            display: flex;
            align-items: center;
            padding: 24rpx;
            box-sizing: border-box;
            background: #fff;
            border-radius: 12rpx;
            .posts_img{
                width: 132rpx;
                height: 132rpx;
                margin-right: 20rpx;
            }
            .posts_text{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 510rpx;
                height: 132rpx;
                .posts_title{
                    font-size: 28rpx;
                    font-weight: 400;
                    color: #333333;
                    width: 100%;
                    display: -webkit-box;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
                }
                .posts_time{
                    font-size: 24rpx;
                    color: #666666;
                    font-weight: 400;
                }
            }
        }
    }
}
.popup_box{
    width: 500rpx;
    height: 290rpx;
    padding: 40rpx 0rpx;
    box-sizing: border-box;
    background: #fff;
    .popup_box_top{
        width: 100%;
        text-align: center;
        margin-bottom: 24rpx;
        font-size: 32rpx;
        color: #333333;
    }
    .popup_box_content{
        font-size: 30rpx;
        font-weight: 400;
        color: #666666;
        text-align: center;
        margin-bottom: 56rpx;
    }
    .popup_box_bottom{
        display: flex;
        align-items: center;
        .left_btn{
            width: 50%;
            height: 84rpx;
            text-align: center;
            line-height: 84rpx;
            border-right: 2rpx solid #F0F0F0;
            color: #666666;
            font-size: 28rpx;
        }
        .right_btn{
            width: 50%;
            height: 84rpx;
            text-align: center;
            line-height: 84rpx;
            font-size: 28rpx;
            color: #EA3E1A;
        }
    }
}
</style>

