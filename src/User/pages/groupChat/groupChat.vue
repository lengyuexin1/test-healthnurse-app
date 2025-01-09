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
            <bc-page-navbar :title="'我的群聊'"></bc-page-navbar>
            <view class="inp_box">
                <view class="inp">
                    <TnInput v-model="data.tname" placeholder="搜群聊" :border="false" @blur="onBlur">
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

        <view class="card_list">
            <chatCard class="itemChat" v-for="item in data.dataList" :item="item"
                @clickRemoveGroupChat="clickRemoveGroupChat"
                @clickLeaveGroupChat="clickLeaveGroupChat">
            </chatCard>
        </view>
        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import chatCard from './components/chatCard.vue'
import BCNotify from '@/components/notify/index.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { myGroupChatList, leaveGroupChat, removeGroupChat } from '@/api/user-api'

interface Data {
    dataList: any
    tname: string
    typeList: any
    currentTabIndex: number
    type: string | number
}
const data = reactive<Data>({
    dataList: [],
    tname: '',
    typeList: [
        {id:'',name:'全部'},
        {id:1,name:'我创建的'},
        {id:2,name:'我加入的'}
    ],
    currentTabIndex: 0,
    type: '',
})

const paging = ref() as any

const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const clickRemoveGroupChat = (tid: string) => {
    removeGroupChat({ tid }).then((res) => {
        bcNotify.value.show('解散群成功')
        paging.value.reload()
    })
}

const clickLeaveGroupChat = (tid: string) => {
    leaveGroupChat({ tid }).then((res) => {
        bcNotify.value.show('退出群聊成功')
        paging.value.reload()
    })
}

const queryList = (pageNumber:number, pageSize:number) => {
    myGroupChatList({
        query:{
            tname: data.tname,
            type: data.type // 1-我创建的；2-我加入的
        },
        pageNumber,
        pageSize
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
}

const changeTab = (item:any) => {
    data.type = item.id;
    paging.value.reload()
}

const onBlur = () => {
    (paging.value as any).reload()
}

onShow(() => {
    paging.value?.reload()
})

onMounted(() => {

})

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
.card_list{
    width: 100%;
    padding: 10rpx;
    display: flex;
    flex-wrap: wrap;

    .itemChat {
        width: calc(50% - 20rpx);
        margin: 10rpx;
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
 
