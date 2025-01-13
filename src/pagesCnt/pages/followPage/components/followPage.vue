<template>
    <view class="container">
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
                <PageTopbg bgstyle="background: #F2F3F5;"></PageTopbg>
                <bc-page-navbar :title="props.type == 1 || props.type == 3 ? '关注' : '粉丝'"></bc-page-navbar>

                <view class="search_btn_box" v-if="props.type == 3">
                    <view class="search_bg">
                        <TnInput v-model="data.inputValue" @blur="inpblur" placeholder="搜全部关注" size="sm" :border="false" height="70">
                            <template #prefix> 
                                <TnIcon name="search" size="34" color="#A8A8A8"/>
                            </template>
                        </TnInput>
                    </view>
                </view>


            </template>

            <view class="fans_list">
                <view class="fans_item" v-for="(item) in data.dataList" :key="item.accountId" @click="tobloggerPage(item)">
                    <view class="fans_left">
                        <image
                            class="fans_img"
                            :src="item.fansImage ? item.fansImage : item.followImage"
                            mode="scaleToFill"
                        />
                        <view class="fans_txt">
                            <view class="fans_namr">{{item.fansName ? item.fansName : item.followName}}</view>
                            <view class="fans_number">拥有粉丝 {{item.fansFansNumber || item.fansFansNumber == 0 ? item.fansFansNumber : item.followFansNumber}}</view>
                        </view>
                    </view>
                    <view class="fans_right" v-if="showchatBtn(item)">
                        <view class="chat_btn" v-if="type == 2 && isuser == 1" @click.stop="toLetter(item)">私信</view>
                        <view class="fans_btn" v-if="item.isAccount == 1" :class="{'is_Fans' : item.isFans == 0}" @click.stop="toFans(item)">
                            {{ item.isFans == 0 ? '关注' : '已关注' }}
                        </view>
                    </view>
                    <view v-else></view>
                    
                </view>
            </view>

		    <BCNotify ref="bcNotify"></BCNotify>


        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import { 
    followList,
    fansList,
    getcoursefollowList,
    unfollow,
    follow,
    createorLetterUser,
    coursefollow,
    courseunfollow,
} from '@/api/create-api'
import { gotoauthor } from '@/routes/create-routes'
import { gotoChatPage } from '@/routes/nim-routes'
import { Throttle } from '@/libs/antivibthrot'

interface Props {
    type:number,
    isuser:number,
    accountId?:string
}
const props = defineProps<Props>()

interface Data {
    dataList:any,
    inputValue:string,
    userinfo:any,
}
const data = reactive<Data>({
    dataList:[],
    inputValue:'',
    userinfo:{}
})

onMounted(() => {
    PlatformManage.getToken().then((res:any)=>{
        data.userinfo = res
    })
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const showchatBtn = computed(()=>(item:any)=>{
    let itemId = (props.type == 1 || props.type == 3) ? item.followId : item.fansId
    if (itemId != data.userinfo.id) {
        return true
    }else{
        return false
    }
})


const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {

    console.log(props.isuser,props.accountId,'65');

    props.type == 1 && getcoursefollowList({
        pageNumber,
        pageSize,
        query: props.isuser == 1 ? {}:{
            accountId:props.accountId,
            // name: data.inputValue,
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })

    props.type == 2 && fansList({
        pageNumber,
        pageSize,
        query: props.isuser == 1 ? {}:{
            accountId:props.accountId,
            // name: data.inputValue,
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })

    props.type == 3 && getcoursefollowList({
        pageNumber,
        pageSize,
        query: {
            isFans: 0,
            happyType: 2,
            accountName: data.inputValue,
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })
    

}

const inpblur = () => {
    (paging.value as any).reload()
}

const tobloggerPage = (item:any) => {
    if (!item.isAccount) {
        return
    }
    let itemId = props.type == 1 ? item.followId : item.fansId
    if (itemId != data.userinfo.id) {
        gotoauthor({
            isuser: 0,
            accountId: item.accountId,
            isFans: item.isFans,
            ismyFans: 1,
        })
        return
    }else{
        console.log('是本人');
    }
}

const toLetter = (item: any) => {
    Throttle(() => {
        createorLetterUser({ accountId: item.userAccountId, userId: item.fansId }).then((res: any) => {
            gotoChatPage({
                to: res.tid,
                scene: 'privateMsg'
            })
        }).catch((err) => {   
            bcNotify.value.error(err.message)
        })
    }, 2000)
}

const bcNotify = ref()
const toFans = (item:any) => {
    if (item.isFans == 0) {
        tofollow(item)
    }else{
        tounfollow(item)
    }
}
const tounfollow = (item:any) => {
    courseunfollow({
        accountId:item.accountId
    }).then(()=>{
        item.isFans = 0
	    bcNotify.value.show('取消成功')
    })
}
const tofollow = (item:any) => {
    coursefollow({
        accountId:item.accountId
    }).then(()=>{
        item.isFans = 1
	    bcNotify.value.show('关注成功')

    }).catch((res)=>{   
        console.log(res);
	    bcNotify.value.error('不可以给本人点关注哦')

    })
}


</script>
  
<style lang="scss" scoped>
.search_btn_box{
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 40rpx;
    position: relative;
    .search_bg{
        width: 100%;
        background: #fff;
        border-radius: 40rpx;
    }
}
.fans_list{
    box-sizing: border-box;
    .fans_item{ 
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: #FFFFFF;
        .fans_left{
            display: flex;
            align-items: center;
            flex: 1;
            .fans_img{
                width: 96rpx;
                height: 96rpx;
                border-radius: 50%;
                margin-right: 20rpx;
            }
            .fans_txt{
                flex: 1;
                .fans_namr{
                    font-size: 32rpx;
                    color: #333333;
                    margin-bottom: 10rpx;
                    width: 90%;
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .fans_number{
                    font-size: 24rpx;
                    color: #999999;
                }

            }
        }
        .fans_right{
            display: flex;
            align-items: center;
            .chat_btn{
                width: 120rpx;
                height: 52rpx;
                border-radius: 8rpx;
                text-align: center;
                line-height: 52rpx;
                font-size: 24rpx;
                // box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.15);
                border: 2rpx solid #E2E2E2;
                background: #FFFFFF;
                color: #666666;
                margin-right: 16rpx;
            }
            .fans_btn{
                width: 120rpx;
                height: 52rpx;
                border-radius: 8rpx;
                text-align: center;
                line-height: 52rpx;
                background: #FFE5E5;
                color: #EA3E1A;
                font-size: 24rpx;
                &.is_Fans{
                    background: #EA3E1A;
                    color: #fff;
                }
            }
        }
        
        
    }
}
</style>
<style scoped>
:deep(.tn-input) {
    background: #fff !important;
    border-radius: 38rpx !important;
}
:global(.tn-input) {
    background: #fff !important;
    border-radius: 38rpx !important;
}
</style>
  