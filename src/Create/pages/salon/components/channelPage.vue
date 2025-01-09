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
				<pageTopbg :zIndex="-1"></pageTopbg>
				<view :style="'width: 100%; height:' + data.statusBar + 'px'"></view>
				<view class="top_inp_box">
					<view class="back_icon" @click="goback">
						<TnIcon name="left" size="44" color="#333333" bold />
					</view>
					<view class="inp_box">
						<view class="search_icon">
							<TnIcon name="search" size="30" color="#A8A8A8" bold />
						</view>
						<view class="inp" @click="tosearch">
							糖尿病知识
						</view>
					</view>

					<view class="top_right_box" @click="data.showTouch = true">
						<TnIcon name="more-horizontal" color="#000" size="42" :bold="true"/>
					</view>

				</view>
				
				
			</template>
			<view class="header_box">
				<view class="header_box_left">
					<view class="header_box_img">
						<image
							:src="data.salonDetail.cover"
							mode="aspectFill"></image>
					</view>
					<view class="header_box_info">
						<view class="header_box_title">
							{{ data.salonDetail.name }}
						</view>
						<view class="header_box_num">
							{{ data.salonDetail.cntMember ? data.salonDetail.cntMember : '--' }} 成员
						</view>
					</view>
				</view>


				<view class="btn_box">
					<template v-if="data.salonDetail.liveInfo && data.salonDetail.liveInfo.id">
						<view class="join_live" @click="joinLive">
							加入直播间
						</view>
					</template>
					<template v-if="!data.salonDetail.role">
						<template v-if="data.salonDetail.isMember == 0">
							<view class="join" @click="clickJoin">
								<TnIcon name="add" size="24" color="#EA3E1A"></TnIcon>
								<text class="join_text">加入</text>
							</view>
						</template>
						<template v-else>
							<view class="follow_box" @click="exitSalon">
								已加入
							</view>
						</template>
					</template>
					<template v-else>
						<view class="follow_box" @tap="clickManage(data.salonDetail.id)">
							管理
						</view>
					</template>
				</view>

				
			</view>
			<view class="header_remarks">
				<text>
					沙龙简介:{{ data.salonDesc }}
				</text>
				<text v-if="data.showOpenBtn" class="openBtn" @click="changeDesc">{{ data.isOpen ? '收起' : '展开' }}</text>
			</view>
			<template v-if="data.showInterested && data.interestList.length != 0">
				<view class="interest">
					<view class="interest_text">
						您可能感兴趣的沙龙：
					</view>
					<view class="interest_icon" @click="closeInterested">
						<TnIcon name="close" size="32" color="#666666"></TnIcon>
					</view>
				</view>
				<view class="interestbox">
					<view class="interest_item" v-for="(item,index) in data.interestList" :key="index" @click="clickwaterItem(item)">
						<view class="interest_item_img">
							<image :src="item.cover" mode="aspectFill"></image>
						</view>
						<view class="interest_item_title">
							{{item.name}}
						</view>
						<view class="interest_item_num">
							{{ item.cntMember ? item.cntMember : '--' }} 成员
						</view>
					</view>
				</view>
			</template>
			<view class="discuss">
				<view class="discuss_title">
					讨论列表
				</view>
				<view class="discuss_tab" @click="changediscuss">
					<view class="discuss_tab_item" :style="data.discussIndex==1?'background: #F4F4F4;':''">
						最新
					</view>
					<view class="discuss_tab_item" :style="data.discussIndex==2?'background: #F4F4F4;':''">
						热门
					</view>
				</view>
			</view>

			<view class="discussList">
				<view class="discuss_item" v-for="(item,index) in data.dataList" :key="index" @click="tosalonPostsDetailPage(item)"> 
					<view class="discuss_item_left">
						<view class="discuss_item_left_icon">
							<image :src="getAssetsUrl('/leyou/icon/ly_msg.png')" mode=""></image>
						</view>
						<view class="discuss_item_left_num">
							<!-- {{ item.cntComment }} -->
							{{ Math.floor(Math.random() * 900) + 100 }}
						</view>
					</view>
					<view class="discuss_item_content">
						<view class="discuss_item_content_title">
							#{{item.title}}
						</view>
						<view class="discuss_item_content_box">
							<view class="discuss_item_content_img">
								<image :src="item.accountThumb" mode=""></image>
							</view>
							<view class="discuss_item_content_name">
								{{ item.accountName }}
							</view>
							<view class="discuss_item_content_time">
								{{ timeformat(item.utcExamined) }} 发布
							</view>
						</view>
					</view>
					<view class="discuss_item_right">
						<image :src="item.cover" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<BCNotify ref="bcNotify"></BCNotify>

			<TnPopup v-model="showPopup" :overlay-closeable="false">
				<view class="box tn-flex-column">
					<view class="tn-flex-row">
						<image :src="data.inviteSalonInfo?.accountThumb" mode="scaleToFill" />
						<view class="info">
							<view class="name">{{ data.inviteSalonInfo?.accountName }}</view>
							<view class="note">邀请你加入沙龙：{{ data.inviteSalonInfo?.salonName }}</view>
						</view>
					</view>
					<view class="btnBox">
						<TnButton class="btn" width="120rpx" height="70rpx" font-size="24rpx" bg-color="#FFFFFF" plain border-color="#EA3E1A" text-color="#EA3E1A" @tap="clickRejuse">
							拒绝
						</TnButton>
						<TnButton class="btn" width="120rpx" height="70rpx" font-size="24rpx" bg-color="#EA3E1A" border-color="#FFFFFF" text-color="#FFFFFF" @tap="clickJoin">
							同意
						</TnButton>
					</view>
				</view>
        	</TnPopup>
			

			<TnPopup v-model="data.showTouch" open-direction="bottom" :zIndex="40080" radius="32">
				<view class="touch_box">
					<view class="touch_top_box">
						<view class="touch_item" @click="sharePage">
							分享
							<!-- #ifdef MP-WEIXIN -->
                            <button open-type="share"></button>
                            <!-- #endif -->
						</view>
						<view class="touch_item" @click="toReportPage" v-if="!data.salonDetail.role">
							举报
						</view>
					</view>
					<view class="touch_bottom_box">
						<view class="bottom_spage"></view>
						<view class="out_touch_btn" @click="cancelPopup">取消</view>
					</view>
				</view>
				<BCNotify ref="TouchbcNotify"></BCNotify>

			</TnPopup>

		</z-paging>
		<image
			v-if="data.salonDetail.isMember"
			@click="toUpPosts"
			class="upsalon_img"
			:src="getAssetsUrl('/leyou/icon/upsalon.svg')"
			mode="scaleToFill"
		/>
		
	</view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoUpsalonPostsPage, gotoUpPosts, gotosalonPostsDetailPage, gotoSalonManage } from '@/routes/create-routes'
import { getsalonDetail, getSalonList, getsalonContentList } from '@/api/create-api'
import { joinSalon, pushExitSalon } from '@/api/user-api'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { formattime } from '@/common/formatTime'
import { gotoSalonDetail, gotoLiveShow, gotowxLive, gotoReportPage } from '@/routes/create-routes'
import { addWEventsListener } from '@/events/event-registry'
import { CreateEvents } from '@/events/create-events'
import { gotosearch } from "@/routes/service-routes"
import { pageController } from '@bc/uni-tools'


interface Props {
	id:string
	type?: string
	inviteInfo?: any
}
interface Events {
    (e: 'saveShareObj', obj: any): void
}
const props = defineProps<Props>()
const emit = defineEmits<Events>()

interface Data {
	dataList : any,
	inputValue : string,
	navid : number,
	statusBar : number,
	interestList : any,
	discussIndex : number,
	discussList : any,
	showInterested : boolean,
	salonDetail:any,
	inviteSalonInfo: any,
	key:string,
	showOpenBtn:boolean,
	isOpen:boolean,
	salonDesc:string,
	showTouch: boolean
}

const data = reactive<Data>({
	dataList: [],
	inputValue: '',
	navid: 999,
	statusBar: 45,
	interestList: [],
	discussIndex: 1,
	discussList: [],
	showInterested:true,
	salonDetail:{},
	inviteSalonInfo: {},
	key:'utcModified',
	showOpenBtn:false,
	isOpen:false,
	salonDesc:'',
	showTouch: false

})

const channelItemref = ref(null)
const channelSheetref = ref<any>(null)
const showPopup = ref(false)

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'MM-DD')
})

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const salonDesc = computed(()=>(text:string)=>{
	if (!text) {
		return 
	}
	if (text.length > 30) {
		data.showOpenBtn = true
		return text.slice(0,30) + '...'
	}else{
		data.showOpenBtn = false
		return text
	}
})

const paging = ref()
const queryList = (pageNumber : number, pageSize : number) => {

	if (pageNumber == 1) {
		getdetail()

	}
	getsalonContentList({
		pageNumber,
		pageSize,
		query:{
			salonId:props.id,
			title:"",
		},
		sorts:[{
			isAsc:false,
			key:data.key,
		}]
	}).then((res:any)=>{
		(paging.value as any).complete([
			...res.data
		])
	})



}

const getdetail = () => {
	getsalonDetail({
		id:props.id
	}).then((res : any)=>{
		data.salonDetail = res
		if (res.desc.length > 30) {
			data.showOpenBtn = true
			data.salonDesc = res.desc.slice(0,30) + '...'
		}else{
			data.showOpenBtn = false
			data.salonDesc = res.desc
		}

		emit('saveShareObj',{
            imageUrl: data.salonDetail.cover,
			title: data.salonDetail.name,
        })

		getSalonList({
			pageNumber:1,
			pageSize:3,
			query:{
				categoryId: res.categoryId,
				salonId: props.id
			}
		}).then((res:any)=>{
			data.interestList = res.data
		})
	}).catch(() => {
		bcNotify.value.show('该沙龙已经解散了')
		setTimeout(() => {
			pageController.back()
		}, 1500)
	})
}

const changeDesc = () => {
	if(data.isOpen){
		data.salonDesc = data.salonDetail.desc.slice(0,30) + '...'
		data.isOpen = false
	}else{
		data.salonDesc = data.salonDetail.desc		
		data.isOpen = true
	}
}

const goback = () => {
	uni.navigateBack()
}

const bcNotify = ref()
const shownotify = (text : string) => {
	bcNotify.value.show(text)
}

const closeInterested = () => {
	data.showInterested = false
}

const changediscuss = () => {
	if (data.discussIndex == 1) {
		data.discussIndex = 2
		data.key = 'cntComment'
	}else{
		data.discussIndex = 1
		data.key = 'utcModified'
	}
	(paging.value as any).reload()
}

// 沙龙帖子创建
const toUpPosts = () => {
	gotoUpPosts({
		salonId:props.id
	})
}

const tosalonPostsDetailPage = (item:any) => {
	gotosalonPostsDetailPage({
		id:item.id
	})
}

const clickManage = (id: any) => {
	gotoSalonManage({ id })
}

const clickRejuse = () => {
	showPopup.value = false
}

const clickJoin = () => {
	joinSalon({ salonId: props.id }).then(() => {
		showPopup.value = false
		shownotify('成功加入沙龙')
		getdetail()

	}).catch((err) => {
		shownotify(err.message)
	})
}
const exitSalon = () => {
	pushExitSalon({
		salonId: props.id
	}).then(()=>{
		shownotify('你已退出沙龙');
		getdetail()
	})
}

const clickwaterItem = (item:any) =>{
    gotoSalonDetail({id:item.id})
}

const listen = () => {
	addWEventsListener(CreateEvents.Del__Member, () => {
        getdetail()
    })
	addWEventsListener(CreateEvents.Del__Post, () => {
		(paging.value as any).reload()
    })
}

onMounted(() => {
		/** 注册监听事件 */
		listen()

	if (props?.type == 'news') {
		setTimeout(() => {
			if (data.salonDetail.isMember == 0) {
				showPopup.value = true
				data.inviteSalonInfo = JSON.parse(props.inviteInfo)
			}
			else if (data.salonDetail.isMember == 1) {
				shownotify('你已是该沙龙成员')
			}
		}, 1000)
	}
})

const tosearch = () => {
    gotosearch()
}

const joinLive = () => {
	if (!data.salonDetail.isMember) {
		shownotify('还未加入沙龙')
		return
	}
	// #ifdef APP-PLUS
	gotoLiveShow({
        id: data.salonDetail.liveInfo.id,
        frontCamera: {},
        beatySetting:JSON.stringify({}),
    },2)
    // #endif
    
    // #ifdef MP-WEIXIN
    console.log('小程序');
	gotowxLive({
        id: data.salonDetail.liveInfo.id,
    })
    // #endif
}

const cancelPopup = () => {
	data.showTouch = false
}	

const toReportPage = () => {
	gotoReportPage({
		applicableTypes: 16,
		objectName: data.salonDetail.name,
		objectId: data.salonDetail.id
	})
}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN
    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.salonDetail.cover,
        title: data.salonDetail.name,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/Create/pages/salon/detail?accountId=${props.id}`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        }, fail: err => {
            console.log(err)
        }
    })
}
// #endif


</script>

<style lang="scss" scoped>
	.top_inp_box {
		display: flex;
		align-items: center;

		// #ifdef MP-WEIXIN
		// #endif

    	// #ifdef APP-PLUS || H5
		justify-content: space-between;
		// #endif

		padding: 8rpx 28rpx;
		box-sizing: border-box;

		.back_icon {
			margin-right: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.inp_box {
    		// #ifdef MP-WEIXIN
			width: 390rpx;
			// #endif

    		// #ifdef APP-PLUS || H5
			flex: 1;
			// #endif

			height: 64rpx;
			background: #fff;
			border-radius: 32rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;

			.search_icon {
				position: absolute;
				top: 50%;
				left: 20rpx;
				transform: translate(0%, -50%);
			}

			.inp {
				margin-left: 30rpx;
				width: 80%;
				height: 100%;
				line-height: 64rpx;
				font-size: 24rpx;
				color: #A8A8A8;

			}
		}
		.top_right_box{

			margin-left: 12rpx;
    		// #ifdef APP-PLUS || H5
			margin-left: 28rpx;
			// #endif
			width: 54rpx;
        	height: 54rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.header_box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 30rpx;

		.header_box_left {
			display: flex;
			flex-direction: row;
		}
		.btn_box{
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.join{
            display: flex;
            align-items: center;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			color: #EA3E1A;
			font-weight: 500;
			font-size: 24rpx;
			border-radius: 24rpx;
			border: 1px solid #EA3E1A;
			height: 54rpx;
			width: fit-content;
            .join_text{
                margin-left: 6rpx;
            }
		}
		.join_live{
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 28rpx;
			font-weight: 500;
			font-size: 24rpx;
			color: #EA3E1A;
			height: 54rpx;
			margin-bottom: 16rpx;
			white-space: nowrap;
		}
		.follow_box{
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 28rpx;
			font-weight: 500;
			font-size: 24rpx;
			color: #EA3E1A;
			height: 54rpx;
			width: fit-content;

		}

		.header_box_title {
			font-weight: 600;
			font-size: 34rpx;
			color: #1A1A1A;
			margin-bottom: 12rpx;
			width: 390rpx;

		}

		.header_box_num {
			font-weight: 400;
			font-size: 26rpx;
			color: #666666;
		}

		.header_box_join {
			width: 118rpx;
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
			border-radius: 28rpx;
			font-weight: 500;
			font-size: 24rpx;
			color: #EA3E1A;
			border: 1px solid #EA3E1A;
		}

		.header_box_img {
			width: 140rpx;
			height: 140rpx;
			margin-right: 20rpx;

			image {
				width: 140rpx;
				height: 140rpx;
				border-radius: 8rpx;
			}
		}
	}

	.header_remarks {
		margin: 30rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
		.openBtn{
			color: #3E92FF;
			font-size: 28rpx;
		}
	}

	.interest {
		display: flex;
		flex-direction: row;
		margin: 0 30rpx;
		justify-content: space-between;

		.interest_text {
			font-weight: 400;
			font-size: 14px;
			color: #666666;
		}
		.interest_icon {
		}
	}

	.interestbox {
		margin: 20rpx 30rpx 40rpx 30rpx;
		margin-right: 0rpx;

		display: flex;
		flex-direction: row;
		// justify-content: space-between;


		.interest_item {
			display: flex;
			flex-direction: column;
			width: 214rpx;
			padding: 24rpx 0;
			align-items: center;
			background-color: #fff;
			border-radius: 16rpx;
			margin-right: 24rpx;


			.interest_item_img {
				width: 96rpx;
				height: 96rpx;
				margin-bottom: 12rpx;
				border-radius: 8rpx;

				image {
					width: 96rpx;
					height: 96rpx;
					margin-bottom: 12rpx;
				}
			}

			.interest_item_title {
				font-weight: 500;
				font-size: 12px;
				color: #333333;
			}

			.interest_item_num {
				font-weight: 400;
				font-size: 20rpx;
				color: #666666;
			}
		}
	}

	.discuss {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0 30rpx 40rpx 30rpx;

		.discuss_title {
			font-weight: 500;
			font-size: 16px;
			color: #333333;
		}

		.discuss_tab {

			width: 184rpx;
			height: 64rpx;
			background: #fff;
			border-radius: 32rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.discuss_tab_item {
				width: 88rpx;
				height: 54rpx;
				border-radius: 27rpx;
				text-align: center;
				line-height: 54rpx;
				font-weight: 500;
				font-size: 12px;
				color: #666666;
				background-color: #fff;
				margin: 4rpx;

			}
		}
	}

	.discussList {
		display: flex;
		flex-direction: column;
		margin: 0 30rpx;

		.discuss_item {
			background: #fff;
			border-radius: 16rpx;
			opacity: 0.75;
			padding: 24rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: row;

			.discuss_item_left {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 6rpx;
				margin-right: 30rpx;

				.discuss_item_left_icon {
					width: 32rpx;
					height: 32rpx;
					margin-bottom: 4px;

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.discuss_item_left_num {
					font-weight: 400;
					font-size: 10px;
					color: #666666;
				}
			}

			.discuss_item_content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.discuss_item_content_title {
					font-size: 28rpx;
					color: #333333;
					margin-bottom: 10rpx;
					font-weight: 600;
					width: 420rpx;
					line-height: 20px !important;
					display: -webkit-box;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.discuss_item_content_box {
					display: flex;
					flex-direction: row;
					align-items: center;

					.discuss_item_content_img {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
						
						image{
							width: 30rpx;
							height: 30rpx;
							border-radius: 50%;
						}
					}

					.discuss_item_content_name {
						font-weight: 400;
						font-size: 12px;
						color: #666666;
						margin-right: 24rpx;
						width: 200rpx;
						white-space: nowrap; 
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.discuss_item_content_time {
						font-weight: 400;
						font-size: 12px;
						color: #999999;
					}
				}
			}

			.discuss_item_right {
				width: 132rpx;
				height: 132rpx;
				border-radius: 8rpx;
				margin-left: 20rpx;

				image {
					width: 132rpx;
					height: 132rpx;
					border-radius: 8rpx;
				}
			}
		}
	}
	.upsalon_img{
		position: fixed;
		bottom: 250rpx;
		right: 30rpx;
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
}

.box {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
	width: 480rpx;
	min-height: 100rpx;
	background: #FFFFFF;
	border-radius: 16rpx;

	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-bottom: 40rpx;
	}

	.info {
		margin-left: 20rpx;
		align-items: center;

		.name {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
		}

		.note {
			font-size: 24rpx;
			color: #333333;
		}
	}

	.btnBox {
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between; /* 默认平均分布 */
		align-items: center;

		.btn {
			flex: 1; /* 当有多个按钮时，使它们平均分布 */
			margin: 0 15rpx
		}
	}
}

.touch_box{
    width: 100%;
    background: #fff;
    .touch_top_box{
        .touch_item{
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            border-top: 2rpx solid #F2F2F2;
            border-bottom: 2rpx solid #F2F2F2;
            color: #333333;
            font-size: 32rpx;
            font-weight: 400;
			position: relative;
            button{
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: 0;
                z-index: 30;
            }
            &.del_btn{
                color: #EA3E1A;
            }
        }
        
    }
    .touch_bottom_box{
        .bottom_spage{
            width: 100%;
            height: 20rpx;
            background: #F8F8F8;
        }
        .out_touch_btn{
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            border-top: 2rpx solid #F2F2F2;
            color: #333333;
            font-size: 32rpx;
            font-weight: 400;
        }
    }
}

</style>