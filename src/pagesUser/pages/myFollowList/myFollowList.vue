<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <pageTopbg :zIndex="-1" :bgstyle="'background:#F8F8F8'"></pageTopbg>
            <bc-page-navbar :title="'我关注的'"></bc-page-navbar>
            <view class="inp_box">
                <view class="inp">
                    <TnInput v-model="data.inputValue" placeholder="搜全部关注" :border="false" @blur="inpblur">
                        <template #prefix> 
                            <TnIcon name="search"></TnIcon>
                        </template>
                    </TnInput>
                </view>
            </view>
        </template>


        <view class="salon_list">
            <view class="salon_item" v-for="(item,index) in data.dataList" :key="item.followId" @click="tobloggerPage(item)">
                <view class="card_box">
                    <view class="card_left">
                        <image
                            class="card_left_img"
                            :src="item.followImage"
                            mode="scaleToFill"
                        />
                        <view class="card_left_text">{{ item.followName }}</view>
                    </view>
                    <view class="card_right" @click.stop="followFun(item,index)">
                        <view class="btn un_follow" v-if="item.isFans == 1">已关注</view>
                        <view class="btn to_follow" v-else >关注</view>
                    </view>
                </view>      
            </view>
        </view>

        <BCNotify ref="bcNotify"></BCNotify>
        <TnPopup v-model="data.showPopup">    
            <view class="popup_box">
                <view class="popup_box_top">取消关注</view>
                <view class="popup_box_content">确认不再关注用户?</view>
                <view class="popup_box_bottom">
                    <view class="left_btn" @click="cancelPopup">取消</view>
                    <view class="right_btn" @click="isExit">确定</view>
                </view>
            </view>
        </TnPopup> 
    </z-paging>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad } from "@dcloudio/uni-app"

import { getAssetsPic } from '@/common/setPicture'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'

import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { 
    salonfollowList,
    salonfollow,
    unsalonfollow,
    chatfollowList,
    chatfollow,
    unchatfollow,
    findfollowList,
    findfollow,
    unfindfollow,
    creativefollowList,
    creativefollow,
    uncreativefollow,

} from '@/api/create-api'
import { gotoauthor } from '@/routes/create-routes'



interface Props {
    followType: number,
}
const props = defineProps<Props>()

interface Data {
    dataList:any,
    inputValue:string,
    currentTabIndex:number,
    audit:number|string,
    showPopup:boolean,
    accountId:string,
    itemIndex:number,
    followType: number
}
const data = reactive<Data>({
    dataList:[],
    inputValue:'',
    currentTabIndex:0,
    audit:999,
    showPopup:false,
    accountId:'',
    itemIndex:0,
    followType: 1,

})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onMounted(() => {

})
onLoad((option:any)=>{
    data.followType = option.followType
})

const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{
    data.followType == 1 && salonfollowList({
        query:{
            happyType:3,
            accountName:data.inputValue,
        },
        pageNumber,
        pageSize,
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    }) 
    data.followType == 2 && chatfollowList({
        query:{
            happyType:4,
            accountName:data.inputValue,
        },
        pageNumber,
        pageSize,
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
    data.followType == 3 && findfollowList({
        query:{
            happyType:5,
            accountName:data.inputValue,
        },
        pageNumber,
        pageSize,
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
    data.followType == 4 && creativefollowList({
        query:{
            happyType:6,
            accountName:data.inputValue,
        },
        pageNumber,
        pageSize,
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })

}

const inpblur = () => {
    (paging.value as any).reload()
}

const bcNotify = ref()

// 关注
const followFun = (item:any,index:number) => {
    if (item.isFans) {
        data.accountId = item.accountId
        data.itemIndex = index
        data.showPopup = true
    }else{
        data.followType == 1 && salonfollow({
            accountId:item.accountId
        }).then(()=>{
            item.isFans = 1
            bcNotify.value.show('关注成功')
        }) 
        data.followType == 2 && chatfollow({
            accountId:item.accountId
        }).then(()=>{
            item.isFans = 1
            bcNotify.value.show('关注成功')
        })
        data.followType == 3 && findfollow({
            accountId:item.accountId
        }).then(()=>{
            item.isFans = 1
            bcNotify.value.show('关注成功')
        })
        data.followType == 4 && creativefollow({
            accountId:item.accountId
        }).then(()=>{
            item.isFans = 1
            bcNotify.value.show('关注成功')
        })
    }
}

const tobloggerPage = (item:any) => {
    gotoauthor({
        accountId: item.accountId,
        isFans: item.isFans
    })
}


const cancelPopup = () => {
    data.showPopup = false
}

const isExit = () => {
    data.followType == 1 && unsalonfollow({
        accountId:data.accountId
    }).then(()=>{
        data.dataList[data.itemIndex].isFans = 0
        bcNotify.value.show('取消关注')
        data.showPopup = false
    }) 
    data.followType == 2 && unchatfollow({
        accountId:data.accountId
    }).then(()=>{
        data.dataList[data.itemIndex].isFans = 0
        bcNotify.value.show('取消关注')
        data.showPopup = false
    })
    data.followType == 3 && unfindfollow({
        accountId:data.accountId
    }).then(()=>{
        data.dataList[data.itemIndex].isFans = 0
        bcNotify.value.show('取消关注')
        data.showPopup = false
    })
    data.followType == 4 && uncreativefollow({
        accountId:data.accountId
    }).then(()=>{
        data.dataList[data.itemIndex].isFans = 0
        bcNotify.value.show('取消关注')
        data.showPopup = false
    })
}

</script>
  
<style lang="scss" scoped>
.inp_box{
    padding: 30rpx;
    .inp{
        background: #fff;
        border-radius: 50rpx;
    }
}
.type_list{
    width: 100%;
    .type_item{
        padding: 10rpx 24rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 28rpx;
        color: #333333;
        border: 2rpx solid #E6E6E6;
        border-radius: 32rpx;
        &.is_type{
            color: #EA3E1A;
            border: 2rpx solid #EA3E1A;
        }
    }
}
.salon_list{
    padding: 20rpx;
    box-sizing: border-box;
    .salon_item{
        padding: 24rpx;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 20rpx;
        border-radius: 12rpx;
        .card_box{
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .card_left{
                display: flex;
                align-items: center;
                .card_left_img{
                    width: 72rpx;
                    height: 72rpx;
                    border-radius: 50%;
                    margin-right: 16rpx;
                }
                .card_left_text{
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #333333;
                }

            }
            .card_right{
                .btn{
                    width: 120rpx;
                    height: 52rpx;
                    border-radius: 26rpx;
                    font-size: 24rpx;
                    text-align: center;
                    line-height: 52rpx;
                    &.to_follow{
                        border: 2rpx solid #EA3E1A;
                        color: #EA3E1A;
                    }    
                    &.un_follow{
                        border: 2rpx solid #CCCCCC;
                        color: #333333;
                    }
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
 
<style>
page{
    background: #F8F8F8;
}
</style>