<template>
	<view v-if="data.showPopup" class="uni-popup" :style="{ top: props.isNativeHead ? '' : data.StatusBar }">
		<view :class="[props.type, data.ani, props.animation ? 'ani' : '']" class="uni-custom uni-popup__wrapper" @click="close">
			<view class="uni-popup__wrapper-box">
				<view class="title">{{ data.authList[props.permissionID].title }}</view>
				<view class="content">{{ data.authList[props.permissionID].content }}</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, reactive, nextTick, defineEmits } from 'vue'

//============================
/** 接口定义 */
//============================
interface Props {
    // 开启动画
    animation: boolean
    type: string
    // show: boolean
    //是否是原生头部
    isNativeHead: boolean
    permissionID: string | number
}

interface Data {
    ani: string
    showPopup: boolean
    StatusBar: string
    refuseNum: string
    authList: any
}

const data = reactive<Data>({
    ani: '',
    showPopup: false,
    StatusBar: '',
    refuseNum: '', //拒绝次数，
    authList: {
        'WRITE_EXTERNAL_STORAGE': {
            title: "保椿生活对存储空间/照片权限申请说明",
            content: "便于您使用该功能上传您的照片/图片/视频及用于更换头像、意见反馈、保存相册、发布商品/分享、下载与客服沟通等场景中读取和写入相册和文件内容。"
        },
        'ACCESS_FINE_LOCATION': {
            title: "保椿生活对地理位置权限申请说明",
            content: "便于应用程序可以提供基于位置向服务器请求离您最近的可以抢的单、定位导航、附近搜索等功能。"
        },
        'CAMERA': {
            title: "保椿生活对相机/摄像头权限申请说明",
            content: "便于您使用该功能拍照上传您的照片/视频及用于注册、更换头像、意见反馈、保存相册、完成工单、与客服沟通等场景中使用"
        },
        'RECORD_AUDIO': {
            title: "保椿生活对麦克风权限申请说明",
            content: "便于您使用该功能进行录音、语音通话、发布语音、与客服语音沟通等场景中使用"
        },
        'CALL_PHONE': {
            title: "保椿生活对拨打电话权限申请说明",
            content: "便于您使用该功能联系买家或者客服等场景下使用"
        }
    }
})

const props = defineProps<Props>()

//获取状态栏高度
const getSystemInfo = () => {
    uni.getSystemInfo({
        success: (e: any) => {
            console.log(e)
            data.StatusBar = e.statusBarHeight + 44 + 'px' //用于自定义头部时，给手机状态栏留出位置,可通过isNativeHead这个参数控制
        }
    })
}

const open = () => {
    requestPermissions(props.permissionID)
}

const close = () => {
    data.ani = ''
    nextTick(() => {
        setTimeout(() => {
            data.showPopup = false
        }, 300)
    })
}

const emit = defineEmits(["changeAuth"])

//权限检测
const requestPermissions = (permissionID: any) => {
    // #ifdef APP-PLUS
    //判断安卓与ios设备
    if (plus.os.name == 'Android') {
        const _permissionID = 'android.permission.' + permissionID
        plus.android.checkPermission(_permissionID,
            granted => {
                if (granted.checkResult == -1) {
                    //还未授权当前查询的权限，打开权限申请目的自定义弹框
                    data.showPopup = true
                    nextTick(() => {
                        setTimeout(() => {
                            data.ani = 'uni-' + props.type
                        }, 30)
                    })
                }
            },
            error => {
                console.log(error.message)
            }
        )
        plus.android.requestPermissions([_permissionID],
            (e) => {
                //关闭权限申请目的自定义弹框
                data.ani = ''
                nextTick(() => {
                    setTimeout(() => {
                        data.showPopup = false
                    }, 0)
                })
                if (e.granted.length > 0) {
                    //当前查询权限已授权，此时可以通知页面执行接下来的操作
                    emit('changeAuth')
                }
                if (e.deniedAlways.length > 0) {
                    //当前查询权限已被永久禁用，此时需要引导用户跳转手机系统设置去开启
                    uni.showModal({
                        title: '温馨提示',
                        content: '还没有该权限，立即去设置开启？',
                        cancelText: "取消",
                        confirmText: "去设置",
                        showCancel: true,
                        confirmColor: '#000',
                        cancelColor: '#666',
                        success: (res) => {
                            if (res.confirm) {
                                goSetting()
                            }
                        }
                    })
                }
            })
    }
    else {
        emit('changeAuth')
    }
    // #endif
}

//跳转手机系统设置
const goSetting = () => {
    if (plus.os.name == "iOS") {
        const UIApplication = plus.ios.import("UIApplication")
        const application2 = UIApplication.sharedApplication()
        const NSURL2 = plus.ios.import("NSURL")
        const setting2 = NSURL2.URLWithString("app-settings:")
        application2.openURL(setting2)
        plus.ios.deleteObject(setting2)
        plus.ios.deleteObject(NSURL2)
        plus.ios.deleteObject(application2)
    }
    else {
        const Intent = plus.android.importClass("android.content.Intent")
        const Settings = plus.android.importClass("android.provider.Settings")
        const Uri = plus.android.importClass("android.net.Uri")
        const mainActivity = plus.android.runtimeMainActivity()
        const intent = new Intent()
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
        const uri = Uri.fromParts("package", mainActivity.getPackageName(), null)
        intent.setData(uri)
        mainActivity.startActivity(intent)
    }
}

onMounted(() => {
    getSystemInfo()
})

defineExpose({ open })

</script>

<style lang="scss">
	.uni-popup {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999999;
		overflow: hidden;
		&__wrapper {
			position: absolute;
			z-index: 999;
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			/* #endif */
			&.ani {
				/* #ifndef APP-NVUE */
				transition: all 0.3s;
				/* #endif */
			}
			&.top {
				top: 0;
				width:705rpx;
				/* #ifdef APP-NVUE */
				left:22.5rpx;
				/* #endif */
				/* #ifndef APP-NVUE */
				left:0;
				transform: translateY(-705rpx);
				/* #endif */
			}
			&-box {
				position: relative;
				/* #ifndef APP-NVUE */
				box-sizing: border-box;
				/* #endif */
			}
			&.uni-custom {
				& .uni-popup__wrapper-box {
					width: 705rpx;
					/* #ifndef APP-NVUE */
					margin: 0 22.5rpx;
					/* #endif */
					padding: 30upx;
					background: #fff;
					border: solid 2rpx #ddd;
					/* #ifndef APP-NVUE */
					box-sizing: border-box;
					/* #endif */
					border-radius: 16rpx;
					.title{
						font-size: 32rpx;
						font-weight: bold;
					}
					.content{
						margin-top: 16rpx;
						line-height: 1.6;
					}
				}
				&.top{
					& .uni-popup__wrapper-box {
						width: 705rpx;
					}
				}
			}
			&.uni-top{
				transform: translateY(0);
			}
		}
	}
</style>
