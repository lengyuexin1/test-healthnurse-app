<template>
	<view class="container">
        <customNavbar pageTitle="发票详细"></customNavbar>
		<u-loading-icon color="#29C86F" text="加载中" :show="!invoinfo" :vertical="true" textSize="25rpx" :customStyle="loadingStyle"></u-loading-icon>
		<template v-if="invoinfo">
			<view class="vocebox">
                <view class="vocetit">
                    <text class="text">发票详情</text>
                </view>
                <view class="invobox">

                    <view class="involi row">
                        <text class="invotit">发票类型</text>
                        <text class="invotex">{{invoinfo.mediumType == 1 ? '电子发票' : '纸质或其它'}}</text>
                    </view>
                    <view class="involi row">
                        <text class="invotit">发票抬头</text>
                        <text class="invotex">{{invoinfo.invoiceTitle}}</text>
                    </view>
                    <view class="involi row">
                        <text class="invotit">税号</text>
                        <text class="invotex">{{invoinfo.taxNo || '无'}}</text>
                    </view>
                    <view class="involi row">
                        <text class="invotit">发票内容</text>
                        <text class="invotex">{{invoinfo.itemName || '--'}}</text>
                    </view>
                    <view class="involi row">
                        <text class="invotit">发票金额</text>
                        <text class="invotex">{{invoinfo.money | moneyFilter}}元</text>
                    </view>
                    <view class="involi row">
                        <text class="invotit">提交时间</text>
                        <text class="invotex">{{invoinfo.utcCreated | date('yyyy-mm-dd hh:MM:ss')}}</text>
                    </view>
                    <view class="involi row" style="align-items:flex-start">
                        <text class="invotit">更多信息</text>
                        <text class="invotex">{{invoinfo.note || '--'}}</text>
                    </view>
                </view>
            </view>
            <view class="vocebox">
                <view class="vocetit">
                    <text class="text">接收方式</text>
                </view>
                <view class="invobox">
                    <!-- <view class="involi row">
                        <text class="invotit">收件人</text>
                        <text class="invotex">{{invoinfo.userName}}</text>
                    </view>
                    <view class="involi row">
                        <text class="invotit">手机号码</text>
                        <text class="invotex">{{invoinfo.userMobil}}</text>
                    </view> -->
                    <view class="involi row">
                        <text class="invotit">邮箱地址</text>
                        <text class="invotex">{{invoinfo.email}}</text>
                    </view>
                </view>
            </view>
            <view class="vocebox">
                <view class="vocetit">
                    <text class="text">发票提供方</text>
                </view>
                <view class="invobox">
                    <view class="involi row">
                        <text class="invotit">提供方</text>
                        <text class="invotex">{{invoinfo.mainUnitName || '--'}}</text>
                    </view>
                </view>
            </view>
            <view class="vocebox" v-if="invoinfo.image">
                <view class="vocetit">
                    <text class="text">发票附件</text>
                </view>
                <view class="invofie row i-center j-between">
                    <view class="fielef row i-center">
                        <u-image :src="getAssetsUrl('/sales/pdf_pic.png')" width="60rpx" height="60rpx" mode="scaleToFilt"></u-image>
                        <text class="fietxt">{{invoinfo.itemName || '--'}}.pdf</text>
                    </view>
                    <view class="fierig">
                        <u-button @click="previewPdf" text="查看" color="#EEEEEE" shape="circle" plain :customStyle="{ color: '#666666',fontSize: '22rpx',fontWeight: 500, height: '48rpx' }"></u-button>
                    </view>
                </view>
            </view>
		</template>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
import { invoiceDetail } from '@/api/care-api'
import { getAssetsPic } from '@/common/setPicture'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            invoinfo: null,
            id: '',
            // 加载样式
            loadingStyle: {
                width: '100rpx',
                position: 'fixed',
                left: '375rpx',
                top: '400rpx',
                marginLeft: '-50rpx'
            }
        }
    },
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    },
    onLoad(options) {
        this.id = options.id || ''
        this.getDetail()
    },
    methods: {
        getDetail() {
            invoiceDetail({
                id: this.id
            }).then(res => {
                this.invoinfo = {
                    ...res,
                    utcInvoice: uni.$u.timeFormat(res.utcInvoice, 'yyyy-mm-dd hh:MM')
                }
            }).catch(err => {
                uni.$u.toast(err.message)
                setTimeout(() => {
                    uni.navigateBack()
                }, 8000)
            })
        },
        // 预览PDF
        previewPdf() {
            if (!this.invoinfo.image) {
                uni.$u.toast('暂无附件')
                return false
            }
            uni.downloadFile({
                url: this.invoinfo.image,
                success: function(res) {
                    const filePath = res.tempFilePath
                    uni.openDocument({
                        filePath: filePath,
                        showMenu: true,
                        success: function() {
                            console.log('打开文档成功')
                        },
                        fail: function(err) {
                            uni.$u.toast(err)
                        }
                    })





                    // #ifndef MP-WEIXIN
                    /* uni.saveFile({
                        tempFilePath: filePath,
                        success: function() {
                            uni.$u.toast('下载成功')
                        },
                        fail: function(err) {
                            uni.$u.toast(err)
                        }
                    }) */
                    // #endif
                    // #ifdef MP-WEIXIN
                    /* wx.getFileSystemManager().saveFile({
                        tempFilePath: filePath,
                        success: function(res) {
                            // uni.$u.toast('下载成功')
                            uni.showModal({
                                title: '下载成功',
                                content: `文件路径在${res.savedFilePath}`,
                                showCancel: false
                            })
                        },
                        fail: function(err) {
                            uni.$u.toast(err)
                        }
                    }) */
                    // #endif
                },
                fail: function(err) {
                    uni.$u.toast(err)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.corbg{
    background: linear-gradient(#DFF7EF 0%, rgba(255,255,255,0) 30%);
}
.vocebox{
    background: #FFFFFF;
    border-radius: 24rpx;
    margin: 20rpx;
    padding: 30rpx;

	.vocetit{
		margin-bottom: 40rpx;

		.text{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
	}
	.invobox{
		.involi{
			margin-bottom: 40rpx;
			align-items: center;
			justify-content: space-between;
			.invotit{
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
                flex-shrink: 0;
                margin-right: 100rpx;
			}
			.invotex{
				font-size: 30rpx;
				font-weight: 400;
				color: #666666;
                text-align: right;
			}

            &:last-child{
                margin-bottom: 0rpx;
            }
		}
	}
    .invofie{
        height: 116rpx;
        background: #FFFFFF;
        border: 2rpx solid #F0F0F0;
        border-radius: 12rpx;
        padding: 0 30rpx;

        .fielef{
            .fietxt{
                font-size: 26rpx;
                font-weight: 500;
                color: #333333;
                margin-left: 8rpx;
            }
        }
        .fierig{
            width: 100rpx;
        }
    }
}
</style>
