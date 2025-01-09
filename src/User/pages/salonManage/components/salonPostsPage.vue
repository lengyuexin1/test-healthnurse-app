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
            <pageTopbg :zIndex="-1" :bgstyle="'background:#fff'"></pageTopbg>
            <bc-page-navbar :title="'我的帖子'"></bc-page-navbar>
            <view class="inp_box">
                <view class="inp">
                    <TnInput v-model="data.inputValue" placeholder="搜小组" :border="false" @blur="inpblur">
                        <template #prefix> 
                            <TnIcon name="search"></TnIcon>
                        </template>
                    </TnInput>
                </view>
            </view>
            <view class="type_list">
                <TnTabs 
                v-model="data.currentTabIndex" 
                :scroll="false" 
                :bottom-shadow="false" 
                bar-color="#EA3E1A" 
                active-color="#EA3E1A"
                color="#666666">  
                    <TnTabsItem
                    v-for="(item, index) in data.typeList"
                    :key="index"
                    :title="item.name"
                    @click="changeTab(item)"
                    />
                </TnTabs>
            </view>
        </template>


        <view class="salon_list">
            <view class="salon_item" v-for="item in data.dataList" :key="item.id" @click="clickItem(item)">
                <view class="card_box">
                    <salonPostsCard :postsInfo="item"></salonPostsCard>
                </view>      
                
                <view class="salon_item_bottom" >
                    <view class="salon_state" v-if="item?.audit">{{ item.audit?.auditName ? item.audit?.auditName : '' }}</view>
                    <view v-else></view>
                    <view class="manage_btn_box">
                        <view class="manage_btn" v-if="[3].includes(item.audit?.audit ? item.audit.audit : 999)" @click="showresult(item)">
                            审核原因
                        </view>
                        <view class="manage_btn" @click="toedit(item)">
                            编辑
                        </view>
                        <view class="manage_btn" @click="todel(item)">
                            删除
                        </view>
                    </view>
                </view>          
                
            </view>
        </view>

        <BCNotify ref="bcNotify"></BCNotify>

    </z-paging>

    <TnPopup v-model="data.showPopup">
        <view class="popup_box">
            <view class="popup_box_top">审核未通过</view>
            <view class="popup_box_content">{{ data.result }}</view>
            <view class="popup_box_bottom" @click="exitResult">我知道了</view>
        </view>
    </TnPopup> 

</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import salonPostsCard from './salonPostsCard.vue'
import BCNotify from '@/components/notify/index.vue'


import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'


import { getsubmitList, delsalonPosts } from '@/api/create-api'
import { gotoUpPosts} from '@/routes/create-routes'



// interface Props {
// }
// const props = defineProps<Props>()

interface Data {
    dataList:any,
    inputValue:string,
    typeList:any,
    currentTabIndex:number,
    audit:number|string,
    result:string,
    showPopup:boolean,


}
const data = reactive<Data>({
    dataList:[],
    inputValue:'',
    typeList:[
        {id:999,name:'全部'},
        {id:5,name:'已通过'},
        {id:2,name:'审核中'},
        {id:3,name:'未通过'},
    ],
    currentTabIndex:0,
    audit:999,
    result:"",
    showPopup:false,



})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onMounted(() => {

})


const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{
    getsubmitList({
        query:{
            title:data.inputValue,
            audit:data.audit == 999 ? null : data.audit
        },
        pageNumber,
        pageSize,
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
}

const changeTab = (item:any) => {
    data.audit = item.id;
    (paging.value as any).reload()
}

const inpblur = () => {
    (paging.value as any).reload()
}

const bcNotify = ref()
const todel = (item:any) => {
    delsalonPosts({
        ids:[item.audit.id]
        // ids:[item.id]
    }).then(()=>{   
        bcNotify.value.show('删除成功');
        (paging.value as any).reload()
    })
}

const toedit = (item:any) => {
    gotoUpPosts({
        id:item.audit.id,
        ischange:1
    })
}

const showresult = (item:any) => {
    data.result = item.audit.result
    data.showPopup = true
}
const exitResult = () => {
    data.result = ''
    data.showPopup = false
}

const clickItem = (item:any) => {
    console.log('item',item);
    console.log('item.audit',item);
    
}
</script>
  
<style lang="scss" scoped>
.inp_box{
    .inp{
        background: #F6F6F6;
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
            padding-bottom: 24rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
            margin-bottom: 20rpx;   
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
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 40rpx;
    box-sizing: border-box;
    .popup_box_top{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        margin-bottom: 24rpx;
    }  
    .popup_box_content{
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;
        line-height: 44rpx;
        margin-bottom: 60rpx;
        text-align: center;
    }
    .popup_box_bottom{
        padding: 16rpx 0rpx;
        box-sizing: border-box;
        text-align: center;
        background: #F0F0F0;
        border-radius: 36rpx;
        font-size: 28rpx;
        color: #666666;
    }
}
</style>
 
