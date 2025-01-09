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
            <bc-page-navbar :title="'我加入的'"></bc-page-navbar>
            <view class="inp_box">
                <view class="inp">
                    <TnInput v-model="data.inputValue" placeholder="搜沙龙小组" :border="false" @blur="inpblur">
                        <template #prefix> 
                            <TnIcon name="search"></TnIcon>
                        </template>
                    </TnInput>
                </view>
            </view>
        </template>


        <view class="salon_list"> 
            <view class="salon_item" v-for="item in data.dataList" :key="item.id" @click="clickwaterItem(item)">
                <view class="card_box">
                    <view class="left">
                        <image
                            class="salon_img"
                            :src="item.cover"
                            mode="aspectFill"
                        />
                        <view class="left_text">
                            <view class="left_title">{{ item.name }}</view>
                            <view class="left_desc">{{ item.desc }}</view>
                            <view class="left_active">{{ timeformat( item.utcCreated ) }}</view>
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

        <BCNotify ref="bcNotify"></BCNotify>

    </z-paging>
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
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'

import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { delsalonPosts, getJoinsalonList} from '@/api/create-api'
import { joinSalon, pushExitSalon } from '@/api/user-api'
import { formattime } from '@/common/formatTime'

import { gotoSalonDetail } from '@/routes/create-routes'


// interface Props {
// }
// const props = defineProps<Props>()

interface Data {
    dataList:any,
    inputValue:string,
    currentTabIndex:number,
    audit:number|string,
    showPopup:boolean,
    salonItem:any,

}
const data = reactive<Data>({
    dataList:[],
    inputValue:'',
    currentTabIndex:0,
    audit:999,
    showPopup:false,
    salonItem:{},

})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onMounted(() => {

})


const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{
    getJoinsalonList({
        query:{
            name:data.inputValue,
            accountID:null
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
const todel = (item:any) => {
    delsalonPosts({
        ids:[item.audit.id]
    }).then(()=>{   
        bcNotify.value.show('删除成功');
        (paging.value as any).reload()
    })
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
.inp_box{
    .inp{
        background: #fff;
        border-radius: 50rpx;
    }
    padding: 30rpx;
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
            display: flex;
            box-sizing: border-box;
            align-items: center;
            .left{
                flex: 1;
                display: flex;
                align-items: center;
                .salon_img{
                    width: 132rpx;
                    height: 132rpx;
                    border-radius: 8rpx;
                    box-sizing: border-box;
                    margin-right: 20rpx;
                }
                .left_text{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 132rpx;
                    .left_title{
                        color: #333333;
                        font-weight: 500;
                        font-size: 30rpx;
                        margin-bottom: 8rpx;
                        width: 370rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .left_desc{
                        width: 370rpx;
                        color: #333333;
                        font-weight: 500;
                        font-size: 28rpx;
                        margin-bottom: 8rpx;
                        white-space: nowrap; 
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .left_bace{
                        font-size: 26rpx;
                        color: #666666;
                        font-weight: 400;
                        margin-bottom: 12rpx;
                        width: 100%;
                        white-space: nowrap; 
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .left_active{
                        font-size: 24rpx;
                        color: #666666;
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
        .salon_item_bottom{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .salon_state{
                font-size: 24rpx;
                color: #666666;
                font-weight: 400;
            }
            .manage_btn_box{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .manage_btn{
                    padding: 8rpx 24rpx;
                    box-sizing: border-box;
                    border: 2rpx solid #D9D9D9;
                    border-radius: 26rpx;
                    margin-left: 30rpx;

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
 
