<template>
    <view class="container" v-if="!data.showposter">
		<view class="itatbg">
			<image
                class="mainImage"
                :src="data.invDeploy.mainImage"
                mode="scaleToFill"
            />
		</view>
		<view class="itatbox column">
			<view class="invicon row">
				<view class="invili row" @click="gotake">
					<image class="invipic" :src="getAssetsUrl('/share/partake/iniv-fash1.png')" mode="aspectFit"></image>
					<text class="invitex">微信好友</text>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="invibtn"></button>
					<!-- #endif -->
				</view>
				<view class="invili row" @click="linkPlaybill">
					<image class="invipic" :src="getAssetsUrl('/share/partake/iniv-fash2.png')" mode="aspectFit"></image>
					<text class="invitex">生成海报</text>
				</view>
			</view>
			<view class="itatcon">
				<view class="itatit row">
					<view class="itatline left"></view>
					<text class="text">参与步骤</text>
					<view class="itatline right"></view>
				</view>
				<view class="stepbox row">
					<view class="stepli column">
						<image class="stepimg" :src="getAssetsUrl('/share/partake/init-sep1.png')" mode="aspectFit"></image>
						<text class="steptex">分享链接给好友</text>
					</view>
					<view class="stepion">
                        <TnIcon size="32rpx" name="right-triangle" color="#BBBBBB"></TnIcon>
					</view>
					<view class="stepli column">
						<image class="stepimg" :src="getAssetsUrl('/share/partake/init-sep2.png')" mode="aspectFit"></image>
						<text class="steptex">好友注册并获得首单抵用金</text>
					</view>
					<view class="stepion">
                        <TnIcon size="32rpx" name="right-triangle" color="#BBBBBB"></TnIcon>

					</view>
					<view class="stepli column">
						<image class="stepimg" :src="getAssetsUrl('/share/partake/init-sep3.png')" mode="aspectFit"></image>
						<text class="steptex">好友完成首单</text>
					</view>
					<view class="stepion">
                        <TnIcon size="32rpx" name="right-triangle" color="#BBBBBB"></TnIcon>
					</view>
					<view class="stepli column">
						<image class="stepimg" :src="getAssetsUrl('/share/partake/init-sep4.png')" mode="aspectFit"></image>
						<text class="steptex">邀请达成获得奖励</text>
					</view>
				</view>
			</view>
			<view class="itatcon">
				<view class="itatit row">
					<view class="itatline left"></view>
					<text class="text">我的成就</text>
					<view class="itatline right"></view>
				</view>
				<view class="achiebox row" v-if="data.showinvTotal">
					<view class="achieli">
						<text class="achietit">已成功邀请</text>
						<view class="achiesome row">
							<text class="achienum">{{ data.invTotal.cnt || 0 }}</text>
							<text class="achienum unit">人</text>
						</view>
					</view>
					<view class="achieli">
						<text class="achietit">已获得奖励</text>
						<view class="achiesome row">
							<text class="achienum">{{ data.invTotal.reward / 100 }}</text>
							<text class="achienum unit">元</text>
						</view>
					</view>
				</view>
			</view>
			<view class="itatcon">
				<view class="itatit row">
					<view class="itatline left"></view>
					<text class="text">邀请记录</text>
					<view class="itatline right"></view>
				</view>
				<view class="recordbox">
					<view class="recordli row" v-for="(item,index) in data.invlist" :key="index">
						<view class="recordlef row">
                            <image
                                class="recordlef_avatar"
                                :src="item.inviteeThumb"
                                mode="scaleToFill"
                            />
							<view class="recordsome">
								<text class="recordname u-line-1">{{item.inviteeName || '微信用户'}}</text>
								<text class="recordtme">{{timeformat(item.utcCreated)}}</text>
							</view>
						</view>
						<view class="recordrig">
							<text class="recordmon">+{{item.rewardMoney / 100 }}元</text>
						</view>
					</view>
					<view class="empty_icon_box" v-if="data.datashow">
						<image
							class="empty_img"
							:src="getAssetsUrl('/empty/empty_icon_list.png')"
							mode="scaleToFill"
						/>
						<view class="empty_text">还没有邀请哦~</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="poster_page" v-else>
		<view class="bg_box"></view>
		<view class="img_box">
			<image
				class="poster_img"
				:src="data.posterImg"
				mode="scaleToFill"
			/>
		</view>
		
		<view class="preservation_box">
			<view class="preservation_btn" @click="save">
				<image
					class="preservation_img"
					:src="getAssetsUrl('/share/partake/iniv-fash4.png')"
					mode="scaleToFill"
				/>
				<view>保存图片</view>
			</view>
		</view>
		<view class="del_btn" @click="delFun">取消</view>

	</view>

	<canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" style="width:254px; height:344px"></canvas>

</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { formattime, agoTime } from '@/common/formatTime'
import { inviteconfigDetail, inviteList, getqrcodeImg, getshareId } from '@/api/user-api'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { drawBGIMG, getPublicOssUrl, saveImage } from '@/libs/canvas-tools'


interface Data{
    invDeploy: any
    invTotal: any
    invlist: any
	datashow: boolean
	showposter: boolean
	posterImg: string
	invId: string | number
	showinvTotal: boolean
}
const data = reactive<Data>({
    invDeploy: {},
    invTotal: {},
    invlist: [],
	datashow: false,
	showposter: false,
	posterImg: '',
	invId: '',	
	showinvTotal: false,
})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD HH:mm')
})

onMounted(() => {
    getInviteConfig()
})


// #ifdef MP-WEIXIN
// 转发到私信
onShareAppMessage(async () => {
	const sharid = await getInviteMation()
    console.log('sharid',sharid)
    return {
        title: data.invDeploy.shareTitle,
        path: `/pages/index/index?scene=share_${sharid}`,
        imageUrl: data.invDeploy.shareImg,
        content: `邀请你加入乐悠`,
        // desc: `快加入保椿享受服务吧`,
        success: (res:any) => {
            console.info(res)
        }
    }
})
// #endif

const getInviteMation = async () => {
	if (data.invId) {
		return data.invId
	}
	const res = await getshareId({})
	data.invId = res
	return res
}

const getInviteConfig = () => {
    inviteconfigDetail({}).then((res:any) => {
		data.invDeploy = res
		data.invTotal = {
			cnt: res.cnt,
			reward: res.reward
		}

		data.showinvTotal = true

		console.log('Configres',data.invDeploy);

		getinviteList(data.invDeploy.activityId)


	})
}

const getinviteList = (activityId:string) => {
	console.log('activityId',activityId);
	
	inviteList({
		activityId
	}).then((res:any) => {
		data.invlist = res
		if (data.invlist.length == 0) {
			data.datashow = true
		}
	})
} 



// app分享到微信好友
const gotake = async () => {
	const sharid = await getInviteMation()
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

	// #ifdef APP-PLUS || MP-WEIXIN
	uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 5,
        imageUrl: data.invDeploy.shareImg,
        title: '邀请你加入保椿',
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/pages/login/login?scene=share_${sharid}`,
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        },
        fail: err => {
            console.log(err)
        }
    })
    // #endif
}

const instance = getCurrentInstance(); // 获取组件实例

// 生成海报
const linkPlaybill = async () => {
	data.showposter = true;
	uni.setNavigationBarTitle({
		title: '生成海报'
	});

	const coverUrl = await drawBGIMG(data.invDeploy.backgroundImage)

    // 二维码链接图片
    let qrimg =  await getqrcodeImg({}).then((img)=>{
        return img
    })

    let qrimgUrl = await getPublicOssUrl(qrimg)

	qrimgUrl = await drawBGIMG(qrimgUrl)
	
    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }
 
    let title = '邀请好友' //标题
    let accountName = data.invDeploy.posterTitle //作者，店铺名

    const context = uni.createCanvasContext('mycanvas',instance)

    context.clearRect(0, 0, 254, 344);
    // 背景白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, 254, 344)
            
    // 底部白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 258, 258, 94)

    // 底部文字
    context.setFillStyle('#333333')
    context.setFontSize(16)
    context.fillText(title, 20, 288)
    context.setFillStyle('#808080')
    context.setFontSize(14)


    // 二维码
    context.drawImage(qrimgUrl, 164, 262, 76, 76)

    context.fillText(accountName, 20, 314)
    context.setFillStyle('#999999')
    context.setFontSize(12)
	
    // 背景图片
    context.drawImage(coverUrl, 0, 0, 275, 255)

    context.draw(
        false,
        setTimeout( async () => {
            uni.canvasToTempFilePath({
                canvasId:'mycanvas',
                success: (res:any) => {
                    data.posterImg = res.tempFilePath
                    title = ''
					
                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
                        icon: 'none',
                        title: '生成失败,请稍后重试'
                    })
                },
                complete: (ret) => {
                    console.log('生成中....');
                    uni.hideLoading()
                }
            },instance)
        }, 3000)
    )

}

const save = () => {
	saveImage(data.posterImg)
}

const delFun = () => {
	data.showposter = false;
	uni.setNavigationBarTitle({
		title: '邀请好友'
	});
}




</script>
  
<style lang="scss" scoped>
	.itatbg{
		position: relative;
		width: 750rpx;
		height: 580rpx;
        .mainImage{
            width: 750rpx;
            height: 580rpx;
        }
		.itatbag{
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}
		/*background-color: #29C86F; */
	}
	.itatbox{
		align-items: center;
		justify-content: center;
		margin-top: -50rpx;
		position:relative;
		z-index:10;

		.invicon{
			width: 702rpx;
			padding: 40rpx 70rpx;
			background-color: #FFFFFF;
			border-radius: 24rpx;
			align-items: center;
			justify-content: space-between;
			.invili{
				align-items: center;
				position: relative;
				.invipic{
					width: 88rpx;
					height: 88rpx;
					border-radius: 44rpx;
					margin-right: 20rpx;
				}
				.invitex{
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
				}
				/* #ifdef MP-WEIXIN */
				.invibtn{
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					opacity: 0;
				}
				/* #endif */
			}
		}
		.itatcon{
			width: 702rpx;
			background-color: #FFFFFF;
			border-radius: 24rpx;
			margin-top: 20rpx;

			.itatit{
				align-items: center;
				justify-content: center;
				padding: 50rpx 0 45rpx;
				.itatline{
					width: 120rpx;
					border-bottom: 2rpx solid #C5C5C5;
				}
				.text{
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					margin: 0 20rpx;
				}
			}
			.stepbox{
				align-items: flex-start;
				justify-content: space-around;
				padding:0 30rpx 50rpx;
				.stepli{
					width: 120rpx;
					align-items: center;
					justify-content: center;
					.stepimg{
						width: 72rpx;
						height: 72rpx;
						margin-bottom: 10rpx;
					}
					.steptex{
						width: 102rpx;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 32rpx;
						color: #333333;
						text-align: center;
					}
				}
				.stepion{
					margin-top: 28rpx;
				}
			}
			.achiebox{
				padding: 0 105rpx 44rpx;
				align-items: center;
				justify-content: space-between;
				.achieli{
					.achietit{
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
					}
					.achiesome{
						align-items: flex-end;
						justify-content: center;
						.achienum{
							font-size: 48rpx;
							font-weight: bold;
							color: #FF4A4A;
							&.unit{
								font-size: 26rpx;
								margin-bottom: 8rpx;
							}
						}
					}
				}
			}
			.recordbox{
				padding-bottom:50rpx;
				.recordli{
					padding: 0 40rpx;
					margin-bottom: 30rpx;
					align-items: center;
					justify-content: space-between;
					.recordlef{
						align-items: center;
                        .recordlef_avatar{
                            width: 64rpx;
                            height: 64rpx;
                        }
						.recordsome{
							margin-left: 20rpx;

							.recordname{
								font-size: 28rpx;
								font-weight: bold;
								color: #333333;
								width: 360rpx;
							}
							.recordtme{
								font-size: 26rpx;
								font-weight: 400;
								color: #333333;
							}
						}
					}
					/* .recordrig{
						width: 136rpx;
					} */
					.recordmon{
						font-size: 28rpx;
						font-weight: bold;
						color: #666666;
					}
				}
				.empty_icon_box{
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					.empty_img{
						width: 200rpx;
						height: 200rpx;
					}
					.empty_text{
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}
	}
	.poster_page{
		position: relative;
		.bg_box{
			position: absolute;
			top: 0;
			left: 0;
			background: #29C86F;
			width: 100%;
			height: 625rpx;
		}
		.img_box{
			padding-top: 140rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			.poster_img{
				width: 280px;
				height: 375px;
				background-color: #FFFFFF;
				box-shadow: 0rpx 0rpx 24rpx rgba(0, 0, 0, 0.12);
				border-radius: 16rpx;
			}
		}
		.preservation_box{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 52rpx;
			box-sizing: border-box;
			.preservation_btn{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				font-size: 28rpx;
				font-weight: 400;
				color: #6D6D6D;
				.preservation_img{
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 12rpx;
				}
			}
		}
		
		.del_btn{
			margin: auto;
			width: 580rpx;
			height: 92rpx;
			background-color: #29C86F;
			border-radius: 46rpx;
			text-align: center;
			line-height: 92rpx;
			font-size: 34rpx;
			color: #FFFFFF;
		}
	}
	.bilvas{
		border-radius: 20rpx;
		position: relative;
		left: -750px;
	}
</style>
 
