<template>
    <z-paging
        ref="paging" 
		:auto="false"
		:refresher-enabled="false"
    >
        <template #top>
            <PageTopbg :zIndex="-1" bgstyle="background: #fff;"></PageTopbg>
            <bc-page-navbar :title="'如何获得积分'"></bc-page-navbar>
        </template>

        <view class="rule_content">
            <view class="ranking_rule">用户积分获取及使用规则</view>

            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">什么是积分？</view>
            </view>
            <view class="rule_text">
                积分是保椿生活为促使用户在“聊天号”中进行活跃，生产，互动等行为的激励方式。在积分商城中，你可以凭借自己在站内收获的积分直接兑换礼品。
            </view>

            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">积分如何获得？</view>
            </view>
            <view class="rule_text" style="margin-bottom: 20rpx;">
                积分获取行为仅面向普通用户和个体创作者用户；以下是积分奖励的数值，代表单次行为。
            </view>

            <view class="form_box">
                <view class="form_item" :style="'width:' + (100 / data.form1.length) + '%' " v-for="(item,index) in data.form1" :key="item.id">
                    <view class="form_title">{{ item.title }}</view>
                    <view class="form_line" :class="{ 'one' : sonindex % 2 == 0 , 'tow' : sonindex % 2 != 0 }" v-for="(lineItem, sonindex) in item.contentList" :key="lineItem.id">
                        {{ lineItem.text }}
                    </view>
                </view>
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">积分获取上限设置</view>
            </view>
            <view class="form_box">
                <view class="form_item" :style="'width:' + (100 / data.form2.length) + '%' " v-for="(item,index) in data.form2" :key="item.id">
                    <view class="form_title">{{ item.title }}</view>
                    <view class="form_line" :class="{ 'one' : sonindex % 2 == 0 , 'tow' : sonindex % 2 != 0 }" v-for="(lineItem, sonindex) in item.contentList" :key="lineItem.id">
                        {{ lineItem.text }}
                    </view>
                </view>
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">积分使用方式</view>
            </view>
            <view class="rule_text">
                在【积分商城】进行礼品兑换，可以兑换各种精美好物。
            </view>

            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">积分有效期</view>
            </view>
            <view class="rule_text">
                <view>积分有效期为一年，按月清空。</view>
                <view>例如：您在1月份获得的积分将会在次年1月31日59分59秒到期清空。</view>
            </view>
            

            <view class="ranking_rule">积分商城兑换规则</view>

            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">如何兑换？</view>
            </view>
            <view class="rule_text">
                在积分商城里选择心仪的礼品，使用积分抵扣贷款结算。
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">积分兑换要注意什么？</view>
            </view>
            <view class="rule_text">
                因规则限制，积分商城里的产品同一账号同一天仅限兑换一次。
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">为什么积分兑换失败？</view>
            </view>
            <view class="rule_text">
                <view>1. 积分余额不足</view>
                <view>2. 兑换时输入的信息有误</view>
                <view>3. 当天超次数兑换</view>
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">获取实体礼品方式及发货时间？</view>
            </view>
            <view class="rule_text">
                收到实体订单后，我们会按订单顺序30日内以快递的形式寄送给您。
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">发货运费如何计算？</view>
            </view>
            <view class="rule_text">
                包邮。
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">是否可以退换货</view>
            </view>
            <view class="rule_text">
                <view>积分商城中所有产品非质量问题不退不换。</view>
                <view>若有质量问题，可联系保椿生活平台客服。</view>
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">兑换订单查看途径</view>
            </view>
            <view class="rule_text">
                进入积分商城-积分明细-兑换记录查看；或在积分商城右下角，点击兑换记录浮窗查看，可查询订单兑换进度及物流信息。
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">兑换订单是否可以取消</view>
            </view>
            <view class="rule_text">
                积分商城下单后无法取消订单。请下单前确认好兑换礼品。    
            </view>


            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">其他说明</view>
            </view>
            <view class="rule_text">
                用户如出现违规行为（如虚假交易，作弊等），保椿生活有权取消用户参与资格，并取消用户已经领取或者使用的积分，获得的实物礼品将不安排寄送。在法律允许范围内，活动解释权归保椿生活所有。
            </view>

        </view>

        <BCNotify ref="bcNotify"></BCNotify>
        
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'

import { getAssetsPic } from '@/common/setPicture'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'



interface Data{
    form1: any,
    form2: any
}

const data = reactive<Data>({
    form1:[
        {
            id:1, 
            title:'类型', 
            contentList:[
                {id:1,text:'发布内容'},
                {id:2,text:''},
                {id:3,text:''},
                {id:4,text:''},
                {id:5,text:'内容被交互'},
                {id:6,text:''},
                {id:7,text:''},
                {id:8,text:'主动交互'},
                {id:9,text:''},
                {id:10,text:''},
                {id:11,text:''},
            ]
        },
        {
            id:2, 
            title:'行为', 
            contentList:[
                {id:1,text:' 在聊天号中发布内容'},
                {id:2,text:'创建沙龙圌子'},
                {id:3,text:'在沙龙圈子中发布内容'},
                {id:4,text:'在康养百科中发布内容'},
                {id:5,text:'发布的内容被点赞'},
                {id:6,text:'发布的内容被评论'},
                {id:7,text:'发布的内容被收藏'},
                {id:8,text:'点赞内容'},
                {id:9,text:'收藏内容'},
                {id:10,text:'评论内容'},
                {id:11,text:'关注用户'},
            ]
        },
        {
            id:3, 
            title:'积分奖励', 
            contentList:[
                {id:1,text:' 10'},
                {id:2,text:'20'},
                {id:3,text:'10'},
                {id:4,text:'10'},
                {id:5,text:'1'},
                {id:6,text:'1'},
                {id:7,text:'1'},
                {id:8,text:'1'},
                {id:9,text:'1'},
                {id:10,text:'3'},
                {id:11,text:'3'},
            ]
        },
    ],
    form2:[
        {
            id:1, 
            title:'行为类型', 
            contentList:[
                {id:1,text:'发布内容'},
                {id:2,text:'内容被交互'},
                {id:3,text:'主动交互'},
            ]
        },
        {
            id:2, 
            title:'积分上限/天', 
            contentList:[
                {id:1,text:'150'},
                {id:2,text:'100'},
                {id:3,text:'100'},
            ]
        },
    ]
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(()=>{
})

const paging = ref()
const queryList = async (pageNumber:number, pageSize:number)=>{
    
}

const bcNotify = ref()

</script>

<style lang="scss" scoped>
.rule_content{
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    .ranking_rule{
        font-weight: 600;
        font-size: 36rpx;
        color: #333333;
        margin-bottom: 30rpx;
        text-align: center;
    }
    .rule_title_item{
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        .title_spage{
            width: 6rpx;
            height: 32rpx;
            background: linear-gradient(180deg, #EA3E1A 0%, rgba(234,62,26,0) 100%);
            margin-right: 16rpx;
        }
        .rule_title{
            font-weight: 500;
            font-size: 32rpx;
            color: #333333;
        }
    }
    .rule_text{
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 44rpx;
        margin-bottom: 30rpx;
        .span_text{
            color: #333333;
            font-size: 28rpx;
        }
    }
    .form_box{
        width: 100%;
        margin-bottom: 30rpx;
        display: flex;
        align-items: center;
        .form_item{
            text-align: center;
            .form_title{
                height: 80rpx;
                line-height: 80rpx;
                font-size: 24rpx;
                color: #333333;
                font-weight: 500;
                background: #FFEEEB;
            }
            .form_line{
                height: 80rpx;
                line-height: 80rpx;
                color: #333333;
                font-size: 24rpx;
                font-weight: 400;
                &.one{
                    background: #F9F9F9;
                }
                &.tow{
                    background: #FFFFFF;
                }
            }
        }

    }
}

</style>

<style>
page{
    background: #fff;
}
</style>
