<template>
	<view class="container">
        <customNavbar pageTitle="开具发票"></customNavbar>
		<u--form :model="form" ref="uForm" labelWidth="140rpx" :labelStyle="{ fontSize: '30rpx',fontWeight: 'bold',color: '#333333',padding: '20rpx 0' }">
            <u-gap height="24rpx" bgColor="rgba(0,0,0,0)"></u-gap>
			<view class="vocebox">
				<view class="voceli row">
					<text class="litit">订单号：{{orderSerialNo}}</text>
				</view>
            </view>
            <u-gap height="24rpx" bgColor="rgba(0,0,0,0)"></u-gap>
			<view class="vocebox">
				<view class="voceli row">
					<text class="litit">发票类型</text>
					<text class="litip">电子发票</text>
				</view>
					<u-form-item label="抬头类型" prop="type" borderBottom>
						<u-radio-group v-model="form.type" placement="row">
							<view class="row" style="justify-content: flex-end;flex: 1;">
								<u-radio :customStyle="{ marginLeft: '16px' }" v-for="(item, index) in radiolist1" :key="index"
									:label="item.name" :name="item.id" activeColor="#29C86F">
								</u-radio>
							</view>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="发票抬头" prop="rise" borderBottom>
						<u-input border="none" v-model="form.rise" placeholder="请输入发票抬头" inputAlign="right" />
					</u-form-item>
					<u-form-item label="税号" prop="duty" borderBottom>
						<u-input border="none" v-model="form.duty" placeholder="请输入税号" inputAlign="right" />
					</u-form-item>
					<!-- <view class="voceli row">
						<text class="litit">发票内容</text>
						<text class="litip">购买服务</text>
					</view>
					<view class="voceli row">
						<text class="litit">发票金额</text>
						<text class="litip">21.78元</text>
					</view> -->
					<u-form-item label="更多说明" prop="detail" :border-bottom="false" borderBottom>
						<u-input v-model="form.detail" border="none" placeholder="备注信息(非必填)" inputAlign="right" />
					</u-form-item>
			</view>
			<view class="vocetit">
				<text class="tittex">接收方式</text>
			</view>
			<view class="vocebox">
				<!-- <u-form-item label="收件人" prop="name" borderBottom>
					<u-input border="none" v-model="form.name" placeholder="请输入收件人姓名" inputAlign="right" />
				</u-form-item>
				<u-form-item label="手机号码" prop="phone" borderBottom>
					<u-input border="none" v-model="form.phone" placeholder="请输入收件人手机号" inputAlign="right" />
				</u-form-item> -->
				<u-form-item label="邮箱地址" prop="email" :border-bottom="false" borderBottom>
					<u-input v-model="form.email" border="none" placeholder="用于向您发送电子发票" inputAlign="right" />
				</u-form-item>
			</view>
            <view style="opacity:0">
                <view class="vocebtn">
                    <u-button :customStyle="{ fontSize: '32rpx',height: '90rpx' }" throttleTime="800" color="#29C86F" shape="circle" text="提交"></u-button>
                </view>
                <u-safe-bottom></u-safe-bottom>
            </view>
			<view class="btnbox">
                <view class="vocebtn">
                    <u-button :customStyle="{ fontSize: '32rpx',height: '90rpx' }" throttleTime="800" color="#29C86F" shape="circle" text="提交" @click="subInvic"></u-button>
                </view>
                <u-safe-bottom></u-safe-bottom>
            </view>
		</u--form>
		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
import { addInvoice, invoiceDetail } from '@/api/care-api'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
export default {
    components:{
        customNavbar
    },
    data() {
        return {
            form: {
                type: '', //发票类型
                rise: '', //发票抬头
                duty: '',
                /* name: '',
                phone: '', */
                email: '',
                detail: ''//备注
            },
            rules: {
                type: [{
                    required: true,
                    message: '请选择发票类型',
                    trigger: ['blur', 'change']
                }],
                rise: [{
                    required: true,
                    message: '请输入发票抬头',
                    trigger: ['blur', 'change']
                }],
                /* name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: ['blur', 'change']
                }],
                phone: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: ['blur', 'change']
                }, {
                    // 自定义验证函数
                    validator: (rule, value, callback) => {
                        // 返回true表示校验通过，返回false表示不通过
                        return uni.$u.test.mobile(value)
                    },
                    message: '手机号码不正确',
                    // 触发器可以同时用blur和change
                    trigger: ['blur']
                }], */
                email: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: ['blur', 'change']
                }, {
                    // 自定义验证函数
                    validator: (rule, value, callback) => {
                        // 返回true表示校验通过，返回false表示不通过
                        return uni.$u.test.email(value)
                    },
                    message: '邮箱格式不正确',
                    // 触发器可以同时用blur和change
                    trigger: ['blur']
                }]
            },

            radiolist1: [{
                name: '企业单位',
                disabled: true,
                id: '1'
            },
            {
                name: '个人/非企业',
                disabled: false,
                id: '2'
            }
            ],
            orderId: '',
            orderSerialNo: '',
            itemName: '',
            itemTime: 0,
            shopId: ''
        }
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules)
    },
    onLoad(options) {
        this.orderId = options.orderId
        this.orderSerialNo = options.orderSerialNo
        this.itemName = options.itemName
        this.itemTime = options.itemTime
        this.shopId = options.shopId
        this.getDetail()
    },
    methods: {
        // 获取最新发票信息
        getDetail() {
            if (!this.last_id || this.last_id == 0) { return }
            invoiceDetail({
                id: this.last_id,
            }).then(res => {
                this.form = {
                    type: String(res.invoiceTitleType), //发票类型
                    rise: res.invoiceTitle, //发票抬头
                    duty: res.taxNo,
                    name: res.userName,
                    phone: res.userMobil,
                    email: res.email,
                    detail: res.note//备注
                }
            })
        },
        // 验证表单
        subInvic() {
            this.$refs.uForm.validate().then(res => {
                this.submit()
            }).catch(errors => {
                console.log(errors)
            })
        },
        submit() {
            addInvoice({
                orderId: this.orderId,
                orderSerialNo: this.orderSerialNo, // 订单编号
                itemName: this.itemName, // 服务名称
                itemTime: this.itemTime, // 服务时间
                email: this.form.email,
                type: 1, //发票类型 1电子，2纸质
                invoiceTitleType: this.form.type, //1企业2非企业个人
                invoiceTitle: this.form.rise,
                taxNo: this.form.duty,
                note: this.form.detail,
                shopId: this.shopId
            }).then(res => {
                this.$refs.uToast.success('提交成功')
                const page = getCurrentPages()
                const prevPage = page[page.length - 2]
                prevPage.$vm.ordinfo.invoiceId = res.data
                setTimeout(() => {
                    uni.navigateBack()
                }, 800);
            }).catch(err => {
                this.$refs.uToast.error(err.message)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.vocetit {
    margin: 0 20rpx;
    height: 44rpx;
    padding: 40rpx 12rpx 24rpx;

    .tittex {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
    }
}

.vocebox {
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 0 40rpx;
    margin: 0 20rpx;

    .voceli {
        height: 100rpx;
        border-bottom: 2rpx solid #F2F2F2;
        align-items: center;
        justify-content: space-between;

        .litit {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
        }

        .litip {
            font-size: 30rpx;
            font-weight: 400;
            color: #666666;
        }
    }
}
.vocebtn{
    margin:20rpx;
}
.btnbox{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFFFFF;
}
</style>
