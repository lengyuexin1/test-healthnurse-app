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
				</view>
				<view class="header_box">
					<view class="discuss_title">成员管理</view>
					<view class="member">
						<template v-if="data.memberLists.length">
							<view class="info tn-flex-column" v-for="(item, index) in data.memberLists" :key="index">
								<image :src="item.thumb" mode="scaleToFill" />
								<view class="name tn-text-ellipsis-1">{{ item.name }}</view>
							</view>
						</template>
						<view class="icon-wrap tn-flex-center-center">
							<image :src="getAssetsUrl('/leyou/static/icon/add.svg')" mode="scaleToFill" @tap="clickAdd" />
						</view>
						<view class="icon-wrap tn-flex-center-center">
							<image :src="getAssetsUrl('/leyou/static/icon/min.svg')" mode="scaleToFill" @tap="clickMin" v-if="data.memberLists.length !== 0" />
						</view>
					</view>
				</view>
				<view class="seeMore tn-flex-center-center" v-if="data.memberNumber > 10" @tap="clickSeeMoreMember">
					<view>查看更多成员</view>
					<TnIcon name="right" size="32" color="#666666"/>
				</view>
				<view class="discuss tn-flex-center-between">
					<view class="discuss_title">帖子管理</view>
					<view class="edit" @click="clickEdit">
						编辑<TnIcon name="right" size="26" color="#333333" />
					</view>
				</view>
			</template>

			<view class="discussList">
				<view class="discuss_item" v-for="(item,index) in data.dataList" :key="index" @click="tosalonPostsDetailPage(item)"> 
					<view class="discuss_item_left">
						<view class="discuss_item_left_icon">
							<image :src="getAssetsUrl('/leyou/icon/ly_msg.png')" mode=""></image>
						</view>
						<view class="discuss_item_left_num">
							{{ item.cntComment }}
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
								{{ timeformat(item.utcCreated) }} 发布
							</view>
						</view>
					</view>
					<view class="discuss_item_right">
						<image :src="item.cover" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<BCNotify ref="bcNotify"></BCNotify>
		</z-paging>
	</view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoUpPosts, gotosalonPostsDetailPage, gotoInviteFriends } from '@/routes/create-routes'
import { gotoDeleteMember, gotoMemberList, gotosalonManage } from '@/routes/user-routes'
import { getsalonDetail, getSalonList, getsalonContentList } from '@/api/create-api'
import { gotoPostsManage } from '@/routes/user-routes'
import { salonMemberList } from '@/api/user-api'
import { formattime } from '@/common/formatTime'
import { addWEventsListener } from '@/events/event-registry'
import { CreateEvents } from '@/events/create-events'

interface Props {
	id:string
}

const props = defineProps<Props>()

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
	memberNumber: number
	memberLists: any
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
	memberNumber: 0,
	memberLists: []

})


const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const paging = ref()
const queryList = (pageNumber : number, pageSize : number) => {
	if (pageNumber == 1) {
		getsalonDetail({
			id:props.id
		}).then((res : any)=>{
			data.salonDetail = res
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
		})
	}
	getsalonContentList({
		pageNumber,
		pageSize,
		query:{
			salonId:props.id,
			title:"",
		}
	}).then((res:any)=>{
        (paging.value as any).complete(res.data)
	})



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

const clickEdit = () => {
	gotoPostsManage({ salonId: props.id })
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

const clickAdd = () => {
	gotoInviteFriends({ id: props.id })
}

const clickMin = () => {
	gotoDeleteMember({ id: props.id })
}

const clickSeeMoreMember = () => {
	gotoMemberList({ id: props.id })
}

const listen = () => {
    addWEventsListener(CreateEvents.Del__Member, () => {
        getMemberList()
    })
	addWEventsListener(CreateEvents.Del__Post, () => {
		(paging.value as any).reload()
    })
}

const getMemberList = () => {
	salonMemberList({
		pageSize: 15,
        pageNumber: 1,
        query: {
            salonId: props.id,
            role: 0 //0-普通成员;1-组长
        }
	}).then((res: any) => {
		console.log(res.data.length);
		
		data.memberNumber = res.data.length
		data.memberLists = res.data.slice(0, 10)
	})
} 

onMounted(() => {
	/** 注册监听事件 */
    listen()
	getMemberList()
})

</script>

<style lang="scss" scoped>
	.top_inp_box {
		display: flex;
		align-items: center;
		padding: 8rpx 28rpx;
		box-sizing: border-box;

		.back_icon {
			margin-right: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.inp_box {
			width: 458rpx;
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
	}

	.header_box {
		margin: 30rpx 30rpx 0 30rpx;
		min-height: 200rpx;
		max-height: 500rpx;

		.discuss_title {
			font-weight: bold;
			font-size: 30rpx;
			color: #333333;
		}

		.member {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}

		.info {
			width: 20%;
			height: 110rpx;
			margin-top: 30rpx;
			align-items: center;

			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}

			.name {
				width: 100rpx;
				margin-top: 10rpx;
				color: #666666;
				font-size: 22rpx;
				text-align: center;
			}
		}

		.icon-wrap {
			width: 20%;
			height: 110rpx;
			margin-top: 30rpx;

			image {
				width: 64rpx;
				height: 64rpx;
			}
		}
	}

	.discuss {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 30rpx 30rpx 40rpx 30rpx;

		.discuss_title {
			font-weight: bold;
			font-size: 30rpx;
			color: #333333;
		}
	}

	.seeMore {
		color: #666666;
		margin: 30rpx 0 10rpx 0;
		font-size: 26rpx;

		view {
			padding-right: 5rpx;
		}
	}

	.edit {
		color: #666666;
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
</style>