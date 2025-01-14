<template>
	<view>
		<button type="primary" @click="startVoiceTalk()">开始对讲</button>
		<button type="primary" @click="stopVoiceTalk()">停止对讲</button>
	</view>
</template>

<script>
	//对接插件对象
	var EzvizTalk = uni.requireNativePlugin('Ezviz-Talk');
	export default {
		data() {
			return {
				deviceSerial:"",
				verifyCode: "", //设备验证码
			}
		},
		onLoad(options) {
            console.log(options)
		    this.deviceSerial = options.deviceSerial
		    this.verifyCode = options.verifyCode
			//创建对讲播放器
			EzvizTalk.createPlayer(this.deviceSerial, 1);
			//设置回调事件处理
			EzvizTalk.setHandler(function(res){
				console.log(res);
				if (res.type == "onPlaySuccess") {
					//设备端听，手机端说
					EzvizTalk.setVoiceTalkStatus(true);
				}
			});
			/**
			  * 设备加密的需要传入密码
			  * 传入视频加密密码，用于加密视频的解码，该接口可以在收到ERROR_INNER_VERIFYCODE_NEED或ERROR_INNER_VERIFYCODE_ERROR错误回调时调用
			  * @param verifyCode 视频加密密码，默认为设备的6验证码
			  */
			EzvizTalk.setPlayVerifyCode(this.verifyCode)
			//设备端听，手机端说
			//EzvizTalk.setVoiceTalkStatus(true);
			 
			//手机端听，设备端说
			//EzvizTalk.setVoiceTalkStatus(false);   
		},
		methods: {
			startVoiceTalk() {
				//开始对讲
				EzvizTalk.startVoiceTalk(true);
			},
			stopVoiceTalk() {
				//停止对讲
				EzvizTalk.stopVoiceTalk();
			}
		}
	}
</script>

<style>

</style>
