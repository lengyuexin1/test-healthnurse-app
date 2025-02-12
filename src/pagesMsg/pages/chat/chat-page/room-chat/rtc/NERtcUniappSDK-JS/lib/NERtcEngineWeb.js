import { 
	NERTCLogLevel,
	NERTCRenderMode,
	NERTCChannelConnectionState,
	NERTCMirrorMode, 
	NERtcVideoStreamType, 
	NERtcVideoFrameRate, 
	NERtcVideoCropMode,
	NERtcDegradationPreference,
	NERtcVideoOutputOrientationMode,
	NERtcVideoProfileType,
	NERtcRemoteVideoStreamType,
	NERTCAudioDevice,
	NERTCAudioDeviceType,
	NERTCAudioDeviceState,
	NERTCVideoDeviceState,
	NERTCConnectionType,
	NERTCErrorCode,
	NERtcAudioVolumeInfo,
	NERTCAudioProfile,
	NERTCAudioScenario,
	NERTCChannelProfile,
	NERTCUserRole,
	NERtcSubStreamContentPrefer
} from './NERtcDefines';
import NERTC from"./webSDK/NIM_Web_NERTC_v5.6.40";
import { isPC } from './util/index';
import VConsole from './util/vconsole.min';
import {NERtcBeautyEffectType} from './NERtcDefines'

const vConsole = new VConsole();
let engine;

export default class NERtcEngineWeb {
	
	constructor(engineParam){
		this.localPublishConfig = {
			audio: true,
			video: true,
			screen: false
		}
		this.client = null; //web音视频SDK实例
		this._restData()
		const {appKey = '', logLevel = NERTC.Logger.INFO} = engineParam
		if (!appKey) {
			throw('ENGINE_ERROR_ROOM_SERVER_INVALID_APPKEY');
		}
		this.client = engine = NERTC.createClient({
			appkey: appKey,
			debug: true
		})
		NERTC.getParameters().userType = 12;
		let webSDKLogLevel = 1;
		if (logLevel === NERTCLogLevel.DEBUG) {
			webSDKLogLevel = 0;
		} else if (logLevel === NERTCLogLevel.INFO) {
			webSDKLogLevel = 1;
		} else if (logLevel === NERTCLogLevel.WARNING) {
			webSDKLogLevel = 2;
		} else if (logLevel === NERTCLogLevel.ERROR) {
			webSDKLogLevel = 3 ;
		} 
		NERTC.Logger.setLogLevel(webSDKLogLevel)
		//有风险，建议用户在初始化SDK实例引擎后，马上调用addEventListener监听sdk所有的事件
		this.transformEvent()
		
	}
	
	_restData(){
		console.warn('_restData')
		this.eventMap = new Map; //sdk事件本地存储
		this.enableStatsObserverFlag = false;
		this.enableAudioVolumeIndicationFlag = false;
		this.localStream = null;
		this.facingMode = 'user'; //移动端浏览器默认开启前置摄像头
		this.remoteStreamInfoMap = new Map;
		this.preConfig = {
			beauty: {
				enableBeauty: false, 
				beautyEffectOptions: {
					brightnessLevel: 0, //明亮度。取值范围 [0,1]
					rednessLevel: 0, //红润度。取值范围 [0,1]
					smoothnessLevel: 0 //平滑度。取值范围 [0,1]
				},
				beautyFilter: {
					beautyFilterType: '', //滤镜类型
					level: 0 //滤镜强度
				}
			}
		}
		this.localVideoViewConfig = {
			// 本地视频容器尺寸
			width: 0, //使用父节点默认宽高
			height: 0,
			cut: false, // 默认不裁剪
			view: null //视频画面待渲染的DOM节点，如div、span等非流媒体节点
		}
		this.localScreenViewConfig = {
			// 本地视频容器尺寸
			width: 0, //使用父节点默认宽高
			height: 0,
			cut: false ,// 默认不裁剪
			view: null //视频画面待渲染的DOM节点，如div、span等非流媒体节点
		}
		this.audioProfile = '';
		this.videoProfile = null;
		this.screenProfile = null;
		this.captureVolume = null;
		this.sdkInfo = {};
	}
	setParameters() {
		return
	}
	/**
	 * 创建 NERtc 实例。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：创建 NERtc 实例。 通过本接口可以实现创建 NERtc 实例并初始化 NERTC SDK 服务。
	 * 业务场景：是使用NERtc服务的前提。
	 * 调用时机：请确保在调用其他 API 前先调用该方法创建并初始化 NERtc 实例。
	 * 使用限制：无。
	 * 注意事项：
	 *   1. 使用同一个 App Key 的 App 才能进入同一个房间进行通话或直播。
	 *   2. 一个 App Key 只能用于创建一个 NERtc 实例；若您需要更换 App Key，必须先调用 NERTC.destroyEngine 方法销毁当前实例，再调用本方法重新创建实例。
	 * 	 3. 创建实例时，如果参数设置错误，可能会出现 Exception、Error 异常回调通知。
	 隐私保护申明：请勿在此接口填写用户敏感信息，包括但不限于手机号、身份证号、护照编号、真实姓名等。
	 * 相关回调：
	 *   1. 当用户参数传递异常时可能会触发 [onWarning] 回调通知开发者异常，可跟进通知的code寻找具体的原因。
	 *   2. 当初始化引擎异常时可能会触发 [onError] 回调通知开发者异常，可跟进通知的code寻找具体的原因。
	 * 相关接口：
	 *   1.若您不再使用 NERtc 实例，需要调用 [destroyEngine] 方法进行销毁。
	 *
	 * @param {Object} engineParam 创建NERTC引擎时的参数
     * @param {String} engineParam.appKey 应用的 App Key。在云信控制台创建应用后，可以查看对应的 App Key
     * @param {String} engineParam.logDir SDK日志log文件的路径，可以传递为''
     * @param {NERTCLogLevel} engineParam.logLevel SDK日志log等级
     * @memberof NERTC
	 * @return NERTCEngine
	 * @example
	 *  import NERTC from "@/NERtcUniappSDK-JS/lib/index";
	    import NERTCLogLevel from "@/NERtcUniappSDK-JS/lib/NERtcDefines"
     *  this.engine = NERTC.setupEngineWithContext({
			appKey: 'xxxxxxxxxx', // your appkey
			logDir: '', // H5环境不支持设置sdklog路径
			logLevel: NERTCLogLevel.INFO,
		});
	*/
	static setupEngineWithContext(engineParam) {
		console.log('[NERTC-Web] setupEngineWithContext 初始化SDK引擎 engineParam: ', JSON.stringify(engineParam, null, ''))
		if (engine) {
		    return engine;
		}
		engine = new NERtcEngineWeb(engineParam);
		return engine;
	}
	/**
	 * 销毁 NERtc 实例，释放资源。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：该方法释放 NERTC SDK 使用的所有资源。有些 App 只在用户需要时才进行实时音视频通信，完成音视频通话后，则将资源释放出来用于其他操作，该方法适用于此类情况。
	 * 调用时机：该接口需要在调用 leaveChannel、并收到 onUserLeave 回调后调用。或收到 onDisconnect 回调、重连失败时调用此接口销毁实例，并释放资源。
	 * 调用 destroyEngine 方法后，您将无法再使用 SDK 的其它方法和回调。如需再次使用实时音视频通话功能，您必须等待 destroyEngine 方法执行结束后，重新创建一个新的 NERtc 实例。
	 * 使用限制：无。
	 * 注意事项：
	 *   1. 请避免 [destroyEngine] 和 [leaveChannel] 同时调用
	 * 相关回调：
	 *   1. 异常时可能会触发 [onError] 回调通知开发者异常，可跟进通知的code寻找具体的原因。
	 * @memberof NERTC
	 * @return void
	 * @example
	 *  
		this.engine.destroyEngine();
	*/
	destroyEngine() {
	    console.log('[NERTC-Web] destroyEngine 销毁SDK引擎')
		engine = null;
		if (!this.client) {
			return;
		}
	    this.leaveChannel()
		this.client.destroy()
		NERTC.destroy()
		this.eventMap.clear()
		this.remoteStreamInfoMap.clear()
		this._restData()
	}
	
	nertcPrint(message) {
		return
	}
	
	/**
	 * 获取当前房间连接状态。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 调用时机：请在初始化后调用该方法。
	 * @memberof NERTC
	 * @@return {NERTCChannelConnectionState}
	 * 
	 * @example
	 * 
	 *  const connectState = this.engine.getConnectionState();
	*/
	getConnectionState(channelProfile) {
		console.log('[NERTC-Web] getConnectionState 获取SDK连接状态')
		if (!this.client) {
			return NERTCChannelConnectionState["CONNECTION_STATE_DISCONNECTED"]
		}
		console.log('[NERTC-Web] connectState 当前SDK的连接状态', JSON.stringify(this.client.adapterRef.connectState, null, ''))
		if (this.client.adapterRef.connectState.curState === 'DISCONNECTED') {
			return NERTCChannelConnectionState["CONNECTION_STATE_DISCONNECTED"]
		} else if (this.client.adapterRef.connectState.curState === 'CONNECTING') {
			return NERTCChannelConnectionState["CONNECTION_STATE_CONNECTING"]
		} else if (this.client.adapterRef.connectState.curState === 'CONNECTED') {
			return NERTCChannelConnectionState["CONNECTION_STATE_CONNECTED"]
		} else if (this.client.adapterRef.connectState.curState === 'CONNECTING' 
			&& this.client.adapterRef.connectState.prevState === 'CONNECTED' ) {
			return NERTCChannelConnectionState["CONNECTION_STATE_RECONNECTING"]
		} else if  (this.client.adapterRef.connectState.curState === 'DISCONNECTED' 
			&& this.client.adapterRef.connectState.prevState === 'CONNECTING' ) {
			return NERTCChannelConnectionState["CONNECTION_STATE_FAILED"]
		}
	}
	
	/**
	 * 	统计信息观测。。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：注册统计信息观测器，设置统计信息回调
	 * 调用时机：请在初始化后调用该方法。
	 * 相关回调:
	     1. 启用该方法后，只要房间内有媒体，SDK 都会在加入房间后根间隔触发 onNetworkQuality()、onRtcStats()、onLocalAudioStats()、onRemoteAudioStats()、onLocalVideoStats()、 onRemoteVideoStats()回调。

	 * @param {Boolean} enable 是否开启统计信息的监听器：
	 * @memberof NERTC
	 * @example
	 *  
		this.engine.setStatsObserver(true);
	*/
	setStatsObserver(enable) {
		console.log('[NERTC-Web] setStatsObserver 启动sdk事件监听: ', enable)
		this.enableStatsObserverFlag = enable
	}
	
	/**
	 * 上传 SDK 信息。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：上传的信息包括log。
	 * @memberof NERTC
	 * @example
	 *  
		this.engine.uploadSdkInfo();
	*/
	uploadSdkInfo() {
		console.log('[NERTC-Web] uploadSdkInfo 上传SDK日志')
		NERTC.Logger.enableLogUpload()
	}
	
	/**
	 * 设置房间场景。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述： 通过此接口可以实现设置房间场景为通话（默认）或直播场景。针对不同场景采取的优化策略不同，如通话场景侧重语音流畅度，直播场景侧重视频清晰度。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间前调用。
	 *
	 * @param {NERTCChannelProfile} channelProfile 加入房间时的参数
	 *  - COMMUNICATION: 通话场景
	 * 	- LIVE_BROADCASTING: 直播场景
	 * @memberof NERTC
	 * 
	 * @example
	 * //设置房间场景为直播场景
	 *  this.engine.setChannelProfile(NERTCChannelProfile.LIVE_BROADCASTING);
	*/
	setChannelProfile(channelProfile) {
		console.log('[NERTC-Web] setChannelProfile 设置房间场景 channelProfile: ', channelProfile)
	    if (!this.client) {
	    	return;
	    }
		if (channelProfile === NERTCChannelProfile.LIVE_BROADCASTING) {
			this.client.setChannelProfile({ mode: 'live' })
		} else {
			this.client.setChannelProfile({ mode: 'rtc' })
		}
	}
	
	/**
	 * 设置直播场景下的用户角色。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现将用户角色在“主播”（CLIENT_ROLE_BROADCASTER）和“观众“（CLIENT_ROLE_AUDIENCE）之间的切换，用户加入房间后默认为“主播”。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间前调用。
	 * 使用限制：该方法仅在通过 setChannelProfile() 方法设置房间场景为直播场景（LIVE_BROADCASTING）时调用有效。
	 * 业务场景：适用于观众上下麦与主播互动的互动直播场景。
	 * 注意事项：用户切换为观众角色时，SDK 会自动关闭音视频设备。
	 * 相关回调：
	 *   1. 加入房间前调用该方法设置用户角色，不会触发任何回调，在加入房间成功后角色自动生效：
	 *   	- 设置用户角色为主播：加入房间后，远端用户触发 onUserJoined() 回调。
	 *   	- 设置用户角色为观众：加入房间后，远端用户不触发任何回调。
	 *   2. 加入房间后调用该方法切换用户角色
	 * 		- 从观众角色切为主播：本端用户触发 onClientRoleChange() 回调，远端用户触发 onUserJoined() 回调。
	 *		- 从主播角色切为观众：本端用户触发 onClientRoleChange() 回调，远端用户触发 onUserLeave() 回调。
	 * @param {NERTCUserRole} role 用户角色
	 *  - CLIENT_ROLE_BROADCASTER: 设置用户角色为主播。主播可以开关摄像头等设备、可以发布流、可以操作互动直播推流相关接口、加入或退出房间状态对其他房间内用户可见。
	 * 	- CLIENT_ROLE_AUDIENCE: 设置用户角色为观众。观众只能收流不能发流加入或退出房间状态对其他房间内用户不可见
	 * @memberof NERTC
	 * 
	 * @example
	 *  //切换用户角色为主播
	 *  this.engine.setClientRole(NERTCUserRole.CLIENT_ROLE_BROADCASTER);
	*/
	setClientRole(role) {
		console.log('[NERTC-Web] setChannelProfile 设置用户角色 role: ', role)
		if (!this.client) {
			return;
		}
		if (role === NERTCUserRole.CLIENT_ROLE_BROADCASTER) {
			this.client.setClientRole('host')
		} else {
			this.client.setClientRole('audience')
		}
	}
	
	/**
	 * 加入音视频房间。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现加入音视频房间，加入房间后可以与房间内的其他用户进行音视频通话。
	 * 调用时机：请在初始化引擎后调用该方法。
	 * 使用限制：无。
	 * 注意事项：
	 *   1. 调用 joinChannel 方法之后，NERTC SDK 会通过按照默认配置调整音频模式（audio mode），此后请勿修改 SDK 调整过的音频模式，否则可能会导致音频路由错误等问题。
	 *   2. 加入音视频房间时，如果指定房间尚未创建，云信服务器内部会自动创建一个同名房间。
	 * 	 3. 传参中 uid 可选，若不指定则默认为 0，SDK 会自动分配一个随机 uid，并在 onJoinChannel() 回调方法中返回；App 层必须记住该返回值并维护，SDK 不对该返回值进行维护。
	 *   4. 同一个房间内的用户可以互相通话，多个用户加入同一个房间，可以群聊。使用不同 App Key 的 App 之间不能互通。
	 *   5. 用户成功加入房间后，默认订阅房间内所有其他用户的音频流，可能会因此产生用量并影响计费；若您想取消自动订阅，可以在通话前通过调用 [setParameters] 方法实现。隐私保护申明：请勿在此接口填写用户敏感信息，包括但不限于手机号、身份证号、护照编号、真实姓名等。
	 *	 6. 若使用了云代理功能，uid 不允许传 0，请用真实的 uid。
	 * 相关接口：
	 *   1. 您可以调用 leaveChannel() 方法离开房间。
	 * 相关回调：
	 *   1.成功调用该方法加入房间后，本地会触发 onJoinChannel 回调通知，远端会触发 onUserJoined 回调通知。
	 *
	 * @param {Object} channelParam 加入房间时的参数
	 * @param {String} channelParam.token 安全认证签名（NERTC Token），可以设置为：
		- null。调试模式下可设置为 null。安全性不高，建议在产品正式上线前在云信控制台中将鉴权方式恢复为默认的安全模式。
		- 已获取的NERTC Token。安全模式下必须设置为获取到的 Token 。若未传入正确的 Token 将无法进入房间。推荐使用安全模式。
	 * @param {String} channelParam.channelName 房间名称，设置相同房间名称的用户会进入同一个通话房间。
	 * 	- 字符串格式，长度为 1 ~ 64 字节。
	 *  - 支持以下 89 个字符：a-z, A-Z, 0-9, space, !#$%&()+-:;≤.,>? @[]^_{|}~”
	 * @param {Number} channelParam.myUid 用户的唯一标识 ID。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.joinChannel({
			token: '',
			channelName: 'xxx',
			myUid: 100
		});
	*/
    joinChannel(options) {
		console.log('[NERTC-Web] joinChannel加入房间: ', JSON.stringify(options, null, ''))
        return this.client.join({
			channelName: options.channelName,
			token: options.token,
			uid: options.myStringUid || options.myUid
		}).then(()=>{
			console.log('[NERTC-Web] joinChannel加入房间成功开始推流: ', JSON.stringify(this.localPublishConfig, null, ''))
			this.publishLocalStream(
				Object.assign({enableMediaPub: true}, this.localPublishConfig))
			const tempCallback = this.eventMap.get('onJoinChannel');
			const channelInfo = this.client.getChannelInfo()
			const param = this.client.adapterRef.instance._params.JoinChannelRequestParam4WebRTC2
			const elapsed = param.joinedSuccessedTime - param.startJoinTime
			if(tempCallback) {
				tempCallback(NERTCErrorCode.OK, channelInfo.cid, elapsed, options.myUid);
			}
		}).catch(error => {
			const tempCallback = this.eventMap.get('onJoinChannel');
			tempCallback(error.code);
		})
    }
	
	/**
	 * 离开音视频房间。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现挂断或退出通话，并释放本房间内的相关资源。
	 * 调用时机：请在初始化并成功加入房间后调用该方法。
	 * 注意事项：
	 *   1. 结束通话时必须调用此方法离开房间，否则无法开始下一次通话。
	 * 相关回调：
	 *   1. 成功调用该方法离开房间后，本地会触发 onLeaveChannel 回调通知，远端会触发 onUserLeave() 回调通知。
	 * @memberof NERTC
	 * @example
	 *  
		this.engine.leaveChannel();
	*/
    leaveChannel() {
        this.client.leave().then(()=>{
        	const tempCallback = this.eventMap.get('onLeaveChannel');
        	if(tempCallback) {
        		tempCallback(NERTCErrorCode.OK);
        	}
        }).catch(error => {
        	const tempCallback = this.eventMap.get('onLeaveChannel');
			tempCallback(error.code);
        })
		this.enableStatsObserverFlag = false;
		this.enableAudioVolumeIndicationFlag = false;
		if (this.localStream) {
			this.localStream.destroy();
		}
		this.localStream = null;
		this.remoteStreamInfoMap.clear();
    }
    
	publishLocalStream(param) {
		console.log('[NERTC-Web] publishLocalStream: ', JSON.stringify(param, null, ''))
		const {
			enableMediaPub = false, 
			audio = false,
			video = false,
			screen = false
		} = param
		
		function preConfig(self) {
			if (self.audioProfile && audio) {
				self.localStream.setAudioProfile(self.audioProfile);
			}
			
			if (self.videoProfile && video) {
				self.localStream.setVideoProfile({
					resolution: self.videoProfile.resolution,
					frameRate: self.videoProfile.frameRate
				});
				self.localStream.setVideoEncoderConfiguration({
					mediaType: 'video',
					streamType: 'high',
					maxBitrate: self.videoProfile.maxBitrate,
					contentHint: self.videoProfile.contentHint
				})
			} 
			
			if (self.screenProfile && screen) {
				self.localStream.setScreenProfile({
					resolution: self.screenProfile.resolution,
					frameRate: self.screenProfile.frameRate
				});
				self.localStream.setVideoEncoderConfiguration({
					mediaType: 'screen',
					streamType: 'high',
					maxBitrate: self.screenProfile.maxBitrate,
					contentHint: self.screenProfile.contentHint
				})
			} 
		}
		if (!this.localStream) {
			try {
				const localStreamOptions = {
					audio,
					video,
					screen,
					client: this.client
				}
				if (!isPC()) {
					localStreamOptions.facingMode = this.facingMode
				}
			    this.localStream = NERTC.createStream(localStreamOptions)
				preConfig(this);
				this.localStream.init().then(() => {
					console.log('[NERTC-Web] publishLocalStream音视频初始化完成，开始播放本地视频')
					
					if	(audio && this.captureVolume !== null) {
						this.localStream.setCaptureVolume(this.captureVolume);
					}
					
					if (video) {
						if (!this.localVideoViewConfig.view) {
							console.warn('[NERTC-Web] publishLocalStream, 当前用户还没有设置视频的view，暂时不渲染播放')
							return
						}
						this.localStream.play(this.localVideoViewConfig.view, {
							video: true
						}).then(() => {
							console.log('[NERTC-Web] publishLocalStream 预览视频成功')
							this.localStream.setLocalRenderMode({
								cut: this.localVideoViewConfig.cut,
								width: this.localVideoViewConfig.view.clientWidth - 0,
								height: this.localVideoViewConfig.view.clientHeight - 0
							}, 'video')
							const tempCallback = this.eventMap.get('onVideoCanvasReady');
							if (tempCallback) {
								tempCallback('local', 'video', this.localStream.streamID, this.localStream.stringStreamID)
							} else {
								console.log('[NERTC-Web] onVideoCanvasReady事件没有监听')
							}
						}).catch(error => {
							console.error('[NERTC-Web] publishLocalStream 预览视频失败: ' + error.message)
							throw (error.message)
						})
					}
					
					if (screen) {
						if (!this.localScreenViewConfig.view) {
							console.warn('[NERTC-Web] publishLocalStream, 当前用户还没有设置屏幕共享的view，暂时不渲染播放')
							return
						}
						this.localStream.play(this.localScreenViewConfig.view, {
							screen: true
						}).then(() => {
							console.log('[NERTC-Web] publishLocalStream 预览屏幕共享成功')
							const tempCallback = this.eventMap.get('onVideoCanvasReady');
							if (tempCallback) {
								tempCallback('local', 'screen', userID, userStringID, this.localStream.streamID, this.localStream.stringStreamID)
							} else {
								console.log('[NERTC-Web] onVideoCanvasReady事件没有监听')
							}
						}).catch(error => {
							console.error('[NERTC-Web] publishLocalStream 预览屏幕共享失败: ' + error.message)
							throw (error.message)
						})
						this.localStream.setLocalRenderMode({
							cut: this.localScreenViewConfig.cut,
							width: this.localScreenViewConfig.view.clientWidth - 0,
							height: this.localScreenViewConfig.view.clientHeight - 0
						}, 'screen')
					}
					
					if (enableMediaPub && this.client.adapterRef.connectState.curState === 'CONNECTED') {
						this.client.publish(this.localStream).catch(error => {
							console.error('[NERTC-Web] publishLocalStream发布本地流失败: ' + error.message)
							throw (error.message)
						})
					}
				}).catch(error => {
					console.error('[NERTC-Web] publishLocalStream采集本地流失败: ' + error.message)
					throw (error.message)
				})
			  } catch (error) {
			    console.error('[NERTC-Web] publishLocalStream初始化本地流失败: ' + error)
				throw (error.message)
			  }
		} else {
			preConfig(this);
			if (audio) {
				return this.localStream.open({
					type: 'audio',
					enableMediaPub
				}).then( () => {
					if	(this.captureVolume !== null) {
						this.localStream.setCaptureVolume(this.captureVolume);
					}
				}).catch(error => {
					console.error('[NERTC-Web] publishLocalStream 采集本地音频流失败: ' + error.message)
					throw (error.message)
				})
			}
			
			if (video) {
				const cameraOptions = {
					type: 'video',
					enableMediaPub
				}
				if (!isPC()) {
					cameraOptions.facingMode = this.facingMode
				}
				this.localStream.open(cameraOptions).then(() => {
					if (!this.localVideoViewConfig.view) {
						console.warn('[NERTC-Web] publishLocalStream, 当前用户还没有设置视频的view，暂时不渲染播放')
						return
					}
					this.localStream.play(this.localVideoViewConfig.view, {
						video: true
					}).then(() => {
						console.log('[NERTC-Web] publishLocalStream 视频播放成功')
						this.localStream.setLocalRenderMode({
							cut: this.localScreenViewConfig.cut,
							width: this.localVideoViewConfig.view.clientWidth - 0,
							height: this.localVideoViewConfig.view.clientHeight - 0
						}, 'video')
						const tempCallback = this.eventMap.get('onVideoCanvasReady');
						if (tempCallback) {
							tempCallback('local', 'video', this.localStream.streamID, this.localStream.stringStreamID)
						} else {
							console.log('[NERTC-Web] onVideoCanvasReady事件没有监听')
						}
					}).catch(error => {
						console.error('[NERTC-Web] publishLocalStream 视频播放失败: ' + error.message)
						throw (error.message)
					})
				}).catch(error => {
					if (error.code_ == 10223) {
						console.warn('当前已经开启过摄像头了，直接publish即可')
						this.client.publish(this.localStream).catch(error => {
							console.error('[NERTC-Web] publishLocalStream发布本地流失败: ' + error.message)
							throw (error.message)
						})
					} else {
						console.error('[NERTC-Web] publishLocalStream采集本地视频流失败: ' + error.message)
						throw (error.message)
					}
				})
			}
			
			if (screen) {
				this.localStream.open({
					type: 'screen',
					enableMediaPub
				}).then(() => {
					if (!this.localScreenViewConfig.view) {
						console.warn('[NERTC-Web] publishLocalStream, 当前用户还没有设置屏幕共享的view，暂时不渲染播放')
						return
					}
					this.localStream.play(this.localScreenViewConfig.view, {
						screen: true
					}).then(() => {
						console.log('[NERTC-Web] publishLocalStream 屏幕共享播放成功')
						this.localStream.setLocalRenderMode({
							cut: this.localScreenViewConfig.cut,
							width: this.localScreenViewConfig.view.clientWidth - 0,
							height: this.localScreenViewConfig.view.clientHeight - 0
						}, 'screen')
						const tempCallback = this.eventMap.get('onVideoCanvasReady');
						if (tempCallback) {
							tempCallback('local', 'screen', this.localStream.streamID, this.localStream.stringStreamID)
						} else {
							console.log('[NERTC-Web] onVideoCanvasReady事件没有监听')
						}
					}).catch(error => {
						console.error('[NERTC-Web] publishLocalStream 屏幕共享播放失败: ' + error.message)
						throw (error.message)
					})
				}).catch(error => {
					console.error('[NERTC-Web] publishLocalStream采集本地屏幕共享流失败: ' + error.message)
					throw (error.message)
				})
			}
			
		}
	}
	
	/**
	 * 设置本地用户视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现绑定本地用户和显示视图，并设置本地用户视图在本地显示时的镜像模式和裁减比例，只影响本地用户看到的视频画面。
	 * 调用时机：请在初始化后调用该方法，且该方法在加入房间前后均可调用。
	 * 使用限制：无。
	 * 注意事项：
	 *   1. 在实际业务中，通常建议在初始化后即调用该方法进行本地视图设置，然后再加入房间或开启预览。
	 *   2. 在无需使用画布时，建议及时释放之前的画布，否则可能会引起系统 EGL 资源耗尽而导致程序崩溃。
	 *
	 * @param {Object} videoCanvasParam 设置本地视频画布的参数
	 * @param {Boolean} videoCanvasParam.isMediaOverlay 设置视频View是否在Z轴上覆盖。
	 * @param {NERTCMirrorMode} videoCanvasParam.mirrorMode 设置视频镜像模式。
	 * @param {NERTCRenderMode} videoCanvasParam.renderMode 设置适应视频，视频尺寸等比缩放。
	 * @param {Element} videoCanvasParam.view 视频画面待渲染的DOM节点，如div、span等非流媒体节点
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.setupLocalVideoCanvas({
			renderMode: NERTCRenderMode.Fit, // Fit表示应区域。视频尺寸等比缩放,保证所有区域被填满,视频超出部分会被裁剪
			mirrorMode: NERTCMirrorMode.AUTO, //AUTO表示使用默认值,由sdk控制
			isMediaOverlay: false, //表示小画布置于大画布上面
			view: document.getElementById('local-container') //视频画面待渲染的DOM节点，如div、span等非流媒体节点
		})
	*/
	setupLocalVideoCanvas(videoCanvasParam) {
	    console.log('[NERTC-Web] setupLocalVideoCanvas设置本地画布: ', videoCanvasParam);
		if (!videoCanvasParam.view) {
			console.error('[NERTC-Web] setupLocalVideoCanvas没有发现view元素，无法设置本地画布')
			return
		}
		this.localVideoViewConfig.cut = videoCanvasParam.renderMode === 1 ? true : false;
		this.localVideoViewConfig.view = videoCanvasParam.view;
		if (this.localStream && this.localStream.getVideoTrack()) {
			this.localStream.play(videoCanvasParam.view, {
				video: true
			}).then( () => {
				console.log('[NERTC-Web] setupLocalSubStreamVideoCanvas播放视频的视频成功: ', this.localStream.stringStreamID)
				this.localStream.setLocalRenderMode({
					cut: this.localVideoViewConfig.cut,
					width: videoCanvasParam.view.clientWidth - 0,
					height: videoCanvasParam.view.clientHeight - 0
				}, 'video')
				const tempCallback = this.eventMap.get('onVideoCanvasReady');
				if (tempCallback) {
					tempCallback('local', 'video', this.localStream.streamID, this.localStream.stringStreamID)
				} else {
					console.log('[NERTC-Web] onVideoCanvasReady事件没有监听')
				}
			}).catch( error => {
				console.error(console.log('[NERTC-Web] setupLocalSubStreamVideoCanvas播放视频失败: ', this.localStream.stringStreamID, ', error: ', error))
				throw(error.message);
			})
		}
	}
	renderLocalVideoCanvas(videoCanvasParam){
		console.log('[NERTC-Web] renderLocalVideoCanvas videoCanvasParam:', videoCanvasParam);
		this.localVideoViewConfig.cut = videoCanvasParam.renderMode === 1 ? true : false;
		this.localVideoViewConfig.view = videoCanvasParam.view;
		console.log('[NERTC-Web] videoCanvasParam.width: ', videoCanvasParam.view.clientWidth)
		console.log('[NERTC-Web] videoCanvasParam.height: ', videoCanvasParam.view.clientHeight)
		if (this.localStream && this.localStream.getVideoTrack()) {
			this.localStream.setLocalRenderMode({
				cut: this.localVideoViewConfig.cut,
				width: videoCanvasParam.view.clientWidth - 0,
				height: videoCanvasParam.view.clientHeight - 0
			}, 'video')
		}
	}
	/**
	 * 销毁本地用户视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现解绑本地用户和显示视图。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.destroyLocalVideoCanvas()
	*/
	destroyLocalVideoCanvas(){
		console.log('[NERTC-Web] destroyLocalVideoCanvas销毁本地用户视图');
		if (this.localStream) {
			this.localStream.stop('video')
		}
	}
	
	/**
	 * 销毁本地用户视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现解绑本地用户和显示视图，并且清除loacl-video-view的内部存储。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.destroyLocalVideoCanvasAndVideoView()
	*/
	destroyLocalVideoCanvasAndVideoView(){
		console.log('[NERTC-Web] destroyLocalVideoCanvasAndVideoView销毁本地用户视图');
		if (this.localStream) {
			this.localStream.stop('video')
		}
	}
	
	/**
	 * 设置远端用户视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现绑定远端用户和显示视图，并设置远端用户视图在本地显示时的镜像模式和裁减比例，只影响本地用户看到的视频画面。
	 * 调用时机：请在初始化后调用该方法，且该方法在加入房间前后均可调用。
	 * 使用限制：无。
	 * 注意事项：
	 *   1. 退出房间后，SDK 也会主动清除远端用户和视图的绑定关系。
	 * @param {Object} videoCanvasParam 设置视频画布的参数
	 * @param {Number} videoCanvasParam.userID 设置要展示的对端具体成员的userID。
	 * @param {Boolean} videoCanvasParam.isMediaOverlay 设置视频View是否在Z轴上覆盖。
	 * @param {NERTCMirrorMode} videoCanvasParam.mirrorMode 设置视频镜像模式。
	 * @param {NERTCRenderMode} videoCanvasParam.renderMode 设置适应视频，视频尺寸等比缩放。
	 * @param {Element} videoCanvasParam.view 视频画面待渲染的DOM节点，如div、span等非流媒体节点
	 * @memberof NERTC
	 * 
	 * @example
	 *  
		this.engine.addEventListener("onUserVideoStart", (userID, maxProfile) => {
			const message = `onUserVideoStart通知：对方开启视频，userID = ${userID}, maxProfile = ${maxProfile}`
			console.log(message)
			//设置对端的视频画布
			this.engine.setupRemoteVideoCanvas({
				renderMode: NERTCRenderMode.Fit, // Fit表示应区域。视频尺寸等比缩放,保证所有区域被填满,视频超出部分会被裁剪
				mirrorMode: NERTCMirrorMode.AUTO, //AUTO表示使用默认值,由sdk控制
				isMediaOverlay: false, //表示小画布置于大画布上面
				userID: userID, //对方userID
				view: document.getElementById('remote-container') //视频画面待渲染的DOM节点，如div、span等非流媒体节点
			})
			//主动去订阅对端视频
			this.engine.subscribeRemoteVideo({
				userID: userID,
				streamType: NERtcRemoteVideoStreamType.HIGH, //HIGH: 大流, LOW: 小流 
				SUBscribe: true //true表示订阅，false表示取消订阅
			})
		});
	*/
	setupRemoteVideoCanvas(videoCanvasParam) {
	    console.log('[NERTC-Web] setupRemoteVideoCanvas设置远端画布: ', videoCanvasParam);
		if (!videoCanvasParam.view) {
			console.error('[NERTC-Web] setupRemoteVideoCanvas没有发现view元素，无法设置视频画布')
			return
		}
		const userID = videoCanvasParam.userStringID || videoCanvasParam.userID
		const remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
		const remoteVideoViewConfig = {
			cut: videoCanvasParam.renderMode === 1 ? true : false,
			view: videoCanvasParam.view
		}
		this.remoteStreamInfoMap.set(userID, Object.assign(remoteStreamInfo, {
			remoteVideoViewConfig
		}))
		const remoteStream = remoteStreamInfo.remoteStream || null
		if (remoteStream.getVideoTrack()) {
			remoteStream.play(videoCanvasParam.view, {
				video: true
			}).then( () => {
				console.log('[NERTC-Web] setupRemoteVideoCanvas播放别人的视频成功: ', remoteStream.streamID)
				this.localStream.setRemoteRenderMode({
					cut: remoteVideoViewConfig.cut,
					width: videoCanvasParam.view.clientWidth - 0,
					height: videoCanvasParam.view.clientHeight - 0
				}, 'video')
			}).catch( error => {
				console.error(console.log('[NERTC-Web] setupRemoteVideoCanvas播放别人的视频失败: ', remoteStream.streamID, ', error: ', error))
				throw(error.message);
			})
		}
	}
	renderRemoteVideoCanvas(videoCanvasParam) {
	    console.log('[NERTC-Web] renderRemoteVideoCanvas刷新远端画布: ', videoCanvasParam);
		if (!videoCanvasParam.view) {
			console.error('[NERTC-Web] setupRemoteVideoCanvas没有发现view元素，无法设置视频画布')
			return
		}
		const userID = videoCanvasParam.userStringID || videoCanvasParam.userID
		const remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
		const remoteVideoViewConfig = {
			cut: videoCanvasParam.renderMode === 1 ? true : false,
			view: videoCanvasParam.view
		}
		this.remoteStreamInfoMap.set(userID, Object.assign(remoteStreamInfo, {
			remoteVideoViewConfig
		}))
		const remoteStream = remoteStreamInfo.remoteStream || null
		if (remoteStream.getVideoTrack()) {
			console.log('[NERTC-Web] setupRemoteVideoCanvas别人的视频: ', remoteStream.streamID)
			remoteStream.setRemoteRenderMode({
				cut: remoteVideoViewConfig.cut,
				width: videoCanvasParam.view.clientWidth - 0,
				height: videoCanvasParam.view.clientHeight - 0
			}, 'video')
		}
	}
	/**
	 * 销毁远端用户视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：销毁远端用户视图
	 *
	 * @param {Object} videoCanvasParam 设置视频画布的参数
	 * @param {String} videoCanvasParam.userID 设置具体成员的userID。
	 * @memberof NERTC
	 * 
	 * @example
	 *  
		this.engine.destroyRemoteVideoCanvas({userID: 111})
	*/
	destroyRemoteVideoCanvas(videoCanvasParam) {
		const userID = videoCanvasParam.userStringID || videoCanvasParam.userID
	    console.log('[NERTC-Web] destroyRemoteVideoCanvas销毁远端用户视图: ', userID);
		const remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
		if (remoteStreamInfo && remoteStreamInfo.remoteStream) {
			remoteStreamInfo.remoteStream.stop('video')
		}
	}
	
	/**
	 * 设置本端用户的视频辅流画布。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口可以实现设置本端用户的辅流显示视图。
	 * 调用时机：请在初始化后调用该方法，且该方法在加入房间前后均可调用。
	 * 使用限制：无。
	 * 注意事项：
	 *   1. 在实际业务中，通常建议在初始化后即调用该方法进行本地视图设置，然后再加入房间或开启预览。
	 *   2. 在无需使用画布时，建议及时释放之前的画布，否则可能会引起系统 EGL 资源耗尽而导致程序崩溃。
	 * @param {Object} videoCanvasParam 设置本地视频辅流画布的参数
	 * @param {Boolean} videoCanvasParam.isMediaOverlay 设置视频辅流View是否在Z轴上覆盖。
	 * @param {NERTCMirrorMode} videoCanvasParam.mirrorMode 设置视频辅流镜像模式。
	 * @param {NERTCRenderMode} videoCanvasParam.renderMode 设置适应视频辅流，视频辅流尺寸等比缩放。
	 * @param {Element} videoCanvasParam.view 视频画面待渲染的DOM节点，如div、span等非流媒体节点
	 * 
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.setupLocalSubStreamVideoCanvas({
			renderMode: NERTCRenderMode.Fit, // Fit表示应区域。视频辅流尺寸等比缩放,保证所有区域被填满,视频辅流超出部分会被裁剪
			mirrorMode: NERTCMirrorMode.AUTO, //AUTO表示使用默认值,由sdk控制
			isMediaOverlay: false, //表示小画布置于大画布上面
			view: document.getElementById('local-container') //视频画面待渲染的DOM节点，如div、span等非流媒体节点
		})
	*/
	setupLocalSubStreamVideoCanvas(videoCanvasParam) {
	    console.log('[NERTC-Web] setupLocalSubStreamVideoCanvas设置本地屏幕共享画布: ', videoCanvasParam);
		if (!videoCanvasParam.view) {
			console.error('[NERTC-Web] setupLocalSubStreamVideoCanvas没有发现view元素，无法设置屏幕共享画布')
			return
		}
		
	    this.localScreenViewConfig.cut = videoCanvasParam.renderMode === 1 ? false : true;
	    this.localScreenViewConfig.view = videoCanvasParam.view;
		
		if (this.localStream && this.localStream.getScreenTrack()) {
			this.localStream.play(videoCanvasParam.view, {
				screen: true
			}).then( () => {
				console.log('[NERTC-Web] setupLocalSubStreamVideoCanvas播放屏幕共享的视频成功')
				this.localStream.setLocalRenderMode({
					cut: remoteVideoViewConfig.cut,
					width: videoCanvasParam.view.clientWidth - 0,
					height: videoCanvasParam.view.clientHeight - 0
				}, 'screen')
				const tempCallback = this.eventMap.get('onVideoCanvasReady');
				if (tempCallback) {
					tempCallback('local', 'screen', this.localStream.streamID, this.localStream.stringStreamID)
				} else {
					console.log('[NERTC-Web] onVideoCanvasReady事件没有监听')
				}
			}).catch( error => {
				console.error(console.log('[NERTC-Web] setupLocalSubStreamVideoCanvas播放屏幕共享失败: ', error))
				throw(error.message);
			})
		}
	}
	
	/**
	 * 销毁本地视频辅流的视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现解绑本地视频辅流用户和显示视图。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.destroyLocalSubStreamVideoCanvas()
	*/
	destroyLocalSubStreamVideoCanvas(){
		console.log('[NERTC-Web] destroyLocalSubStreamVideoCanvas销毁本地屏幕共享视图');
		if (this.localStream) {
			this.localStream.stop('screen')
		}
	}
	
	/**
	 * 设置远端用户的视频辅流视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现绑定远端用户和显示视图，并设置远端用户视图在本地显示时的镜像模式和裁减比例，只影响本地用户看到的视频画面。
	 * 调用时机：请在初始化后调用该方法，且该方法在加入房间前后均可调用。
	 * 使用限制：建议在收到远端用户加入房间的 onUserJoined(long uid, NERtcUserJoinExtraInfo joinExtraInfo) 回调后，再调用此接口通过回调返回的 uid 设置对应视图。。
	 * 注意事项：
	 *   1. 退出房间后，SDK 也会主动清除远端用户和视图的绑定关系。
	 *
	 * @param {Object} videoCanvasParam 设置视频画布的参数
	 * @param {String} videoCanvasParam.userID 设置要展示的对端具体成员的userID。
	 * @param {Boolean} videoCanvasParam.isMediaOverlay 设置视频View是否在Z轴上覆盖。
	 * @param {NERTCMirrorMode} videoCanvasParam.mirrorMode 设置视频镜像模式。
	 * @param {NERTCRenderMode} videoCanvasParam.renderMode 设置适应视频，视频尺寸等比缩放。
	 * @param {Element} videoCanvasParam.view 视频画面待渲染的DOM节点，如div、span等非流媒体节点
	 * @memberof NERTC
	 * 
	 * @example
	 *  
		this.engine.addEventListener("onUserSubStreamVideoStart", (userID, maxProfile) => {
			const message = `onUserSubStreamVideoStart通知：对方开启屏幕共享，userID = ${userID}, maxProfile = ${maxProfile}`
			this.engine.setupRemoteSubStreamVideoCanvas({
				renderMode: NERTCRenderMode.Fit, // Fit表示应区域。视频尺寸等比缩放,保证所有区域被填满,视频超出部分会被裁剪
				mirrorMode: NERTCMirrorMode.AUTO, //AUTO表示使用默认值,由sdk控制
				isMediaOverlay: false, //表示小画布置于大画布上面
				userID: userID, //对方userID
				view: document.getElementById('remote-container') //视频画面待渲染的DOM节点，如div、span等非流媒体节点
			})
			//主动去订阅对端视频辅流
			this.engine.subscribeRemoteSubStreamVideo({
				userID: userID,
				streamType:NERtcRemoteVideoStreamType.HIGH, //HIGH: 大流, LOW: 小流 
				subscribe: true //true表示订阅，false表示取消订阅
			})
		});
	*/
	setupRemoteSubStreamVideoCanvas(videoCanvasParam) {
	    console.log('[NERTC-Web] setupRemoteSubStreamVideoCanvas设置远端屏幕共享画布: ', videoCanvasParam);
		const userID = videoCanvasParam.userStringID || videoCanvasParam.userID
		if (!videoCanvasParam.view) {
			console.error('[NERTC-Web] setupRemoteSubStreamVideoCanvas没有发现view元素，无法设置远端屏幕共享画布, userID: ', userID)
			return
		}
	    const remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
	    const remoteScreenViewConfig = {
	    	cut: videoCanvasParam.renderMode === 1 ? false : true,
	    	view: videoCanvasParam.view
	    }
	    const remoteStream = remoteStreamInfo.remoteStream || null
		this.remoteStreamInfoMap.set(userID, Object.assign(remoteStreamInfo, {
			remoteScreenViewConfig
		}))
	
		if (remoteStream.getVideoTrack()) {
			remoteStream.play(videoCanvasParam.view, {
				screen: true
			}).then( () => {
				console.log('[NERTC-Web] setupRemoteSubStreamVideoCanvas播放别人的屏幕共享成功: ', remoteStream.streamID)
				this.localStream.setRemoteRenderMode({
					cut: remoteVideoViewConfig.cut,
					width: videoCanvasParam.view.clientWidth - 0,
					height: videoCanvasParam.view.clientHeight - 0
				}, 'screen')
			}).catch( error => {
				console.error(console.log('[NERTC-Web] setupRemoteSubStreamVideoCanvas播放别人的屏幕共享失败: ', remoteStream.streamID, ', error: ', error))
				throw(error.message);
			})
		}
	}
	
	/**
	 * 消耗远端用户视频辅流视图。
	 *
	 * 支持版本：5.5.11 及以上。
	 * @param {Object} videoCanvasParam 设置视频画布的参数
	 * @param {String} videoCanvasParam.userID 设置具体成员的userID。
	 * @memberof NERTC
	 * 
	 * @example
	 *  
		this.engine.destroyRemoteSubStreamVideoCanvas({userID: 111})
	*/
	destroyRemoteSubStreamVideoCanvas(videoCanvasParam) {
		const userID = videoCanvasParam.userStringID || videoCanvasParam.userID
	    console.log('[NERTC-Web] destroyRemoteSubStreamVideoCanvas销毁远端用户屏幕共享视图: ', userID);
	    const remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
	    if (remoteStreamInfo && remoteStreamInfo.remoteStream) {
			console.warn('[NERTC-Web] destroyRemoteSubStreamVideoCanvas remoteStream.stop')
	    	remoteStreamInfo.remoteStream.stop('screen')
	    }
	}
	
	/**
	 * 开启视频预览。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现在加入房间前启动本地视频预览，支持预览本地摄像头或外部输入视频。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可当不在房间内时可调用。
	 * 业务场景：适用于加入房间前检查设备状态是否可用、预览视频效果等场景。
	 * 使用限制：
	 * 	 1. 请在通过 [setupLocalVideoCanvas] 接口设置视频画布后调用该方法。
	 * 注意事项：
	 *   1. 在加入房间前预览视频效果时设置的美颜、虚拟背景等视频效果在房间内仍然生效；在房间内设置的视频效果在退出房间后预览视频时也可生效。
	 * 
	 * @param {NERtcVideoStreamType} videoStreamType 设置本地视频画布的参数
	 * @memberof NERTC
	 * 
	 * @example
	 *  // MAIN: 主流, SUB: 辅流  
	 *  this.engine.startPreview(NERtcVideoStreamType.MAIN)
	*/
     startPreview(videoStreamType) {
        console.log('[NERTC-Web] startPreview预览: ', videoStreamType);
		this.publishLocalStream({
			enableMediaPub: false,
			video: videoStreamType === NERtcVideoStreamType.MAIN,
			screen: videoStreamType === NERtcVideoStreamType.SUB
		})
    }
	
	/**
	 * 停止视频预览。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现在预览本地视频后关闭预览。
	 * 调用时机：建议在通过 [startVideoPreview] 接口开启视频预览后调用该方法。
	 * 
	 * @param {NERtcVideoStreamType} videoStreamType 设置本地视频画布的参数
	 * @memberof NERTC
	 * 
	 * @example
	 *  // MAIN: 主流, SUB: 辅流  
	 *  this.engine.stopPreview(NERtcVideoStreamType.MAIN)
	*/
	stopPreview(videoStreamType) {
		console.log('[NERTC-Web] stopPreview停止预览: ', videoStreamType);
		const mediaType = videoStreamType === NERtcVideoStreamType.MAIN ? 'video' : 'screen';
	    if (this.localStream) {
			this.localStream.close(({
				type: mediaType
			}))
	    }
	}
	
	/**
	 * 开启屏幕共享。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口开启屏幕共享后，屏幕共享内容以视频辅流的形式发送。
	 * 调用时机：请在引擎初始化之后调用此接口，且该方法仅可在加入房间后调用。
	 * 相关回调：
	 *   1. 成功开启屏幕共享辅流后，远端会触发 onUserSubStreamVideoStart() 回调。
	 * 
	 * @param {Object} screenConfigParam 设置屏幕共享画布的参数
	 * @param {NERtcVideoProfileType} videoConfigParam.maxProfile 设置的屏幕共享配置项。
	 * @param {NERtcVideoFrameRate} videoConfigParam.frameRate 设置的屏幕共享帧率。
	 * @param {NERtcVideoFrameRate} videoConfigParam.minFramerate  设置的屏幕共享最小帧率。
	 * @param {Number} videoConfigParam.bitrate 设置的屏幕共享码率。
	 * @param {Number} videoConfigParam.minBitrate 设置的屏幕共享最小码率。
	 * @param {NERtcSubStreamContentPrefer} videoConfigParam.contentPrefer 屏幕共享功能的编码策略倾向。
	 * @memberof NERTC
	 * 
	 * @example
	 *  
		let screenConfigParam = {
			maxProfile: NERtcVideoProfileType.Standard, 
			frameRate: NERtcVideoFrameRate.FRAME_RATE_FPS_24, //设置帧率24
			minFrameRate: NERtcVideoFrameRate.FRAME_RATE_FPS_15, //设置最小帧率15
			bitrate: 2500, //设置屏幕共享码率1500kbps
			minBitrate: 1500, //设置屏幕共享码率最小为1000kbps
			contentPrefer: NERtcSubStreamContentPrefer.CONTENT_PREFER_DETAILS, //屏幕共享功能的编码策略倾向
		};
		this.engine.startScreenCapture(screenConfigParam)
	*/
	startScreenCapture(screenConfigParam) {
		console.log('[NERTC-Web] startScreenCapture开启屏幕共享: ', JSON.stringify(screenConfigParam, null, ''));
		let frameRate = 0;
		const maxBitrate = screenConfigParam.bitrate;
		let contentHint = null;
		if (screenConfigParam.contentPrefer === NERtcDegradationPreference.DEGRADATION_MAINTAIN_FRAMERATE) {
			contentHint = 'motion'
		} else if (screenConfigParam.contentPrefer === NERtcDegradationPreference.DEGRADATION_MAINTAIN_QUALITY) {
			contentHint = 'detail'
		} 
		
		switch (screenConfigParam.frameRate || screenConfigParam.minFrameRate) {
			case 7:
				frameRate = 1; //web sdk映射为5桢
				break;
			case 10:
				frameRate = 2;
				break;
			case 15:
				frameRate = 3; 
				break;
			case 24:
				frameRate = 5; //web sdk映射为25桢
				break;
			case 30:
				frameRate = 6; 
				break;
			default:
				break;
		}
		
		this.screenProfile = {
			frameRate,
			maxBitrate,
			contentHint
		}
		
		this.publishLocalStream({
			screen: true,
			enableMediaPub: true
		})
		
	}
	
	/**
	 * 关闭屏幕共享。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口可以实现关闭屏幕共享辅流。
	 * 相关回调：
	 *   1. 成功调用此方法后，远端会触发 onUserSubStreamVideoStop() 回调。
	 * @memberof NERTC
	 * 
	 * @example
	 * 
	 *  this.engine.stopScreenCapture()
	*/
	stopScreenCapture(){
		console.log('[NERTC-Web] stopScreenCapture关闭屏幕共享');
		if (this.localStream) {
			this.localStream.close({
				type: 'screen'
			})
		}
	}
	
	/**
	 * 设置音频编码属性。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口可以实现设置音频编码的采样率、码率、编码模式、声道数等，也可以设置音频属性的应用场景，包括聊天室场景、语音场景、音乐场景等。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 音乐场景下，建议将 profile 设置为 HIGH_QUALITY。 若您通过 setChannelProfile() 接口设置房间场景为直播模式，即 LIVE_BROADCASTING，但未调用此方法设置音频编码属性，或仅设置 profile 为 DEFAULT，则 SDK 会自动设置 profile 为 HIGH_QUALITY，且设置 scenario 为 MUSIC。
	 * @param {Object} audioProfileParam 设置本地音频的编码参数
	 * @param {NERTCAudioProfile} audioProfileParam.profile 设置音频的编码模式。
	 * @param {NERTCAudioScenario} audioProfileParam.scenario 音频场景场景
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.setAudioProfile({
			profile: NERTCAudioProfile.STANDARD, //设置profile为标准模式
			scenario: NERTCAudioScenario.SPEECH //scenario为语音场景
		})
	*/
	setAudioProfile(audioProfileParam){
		console.log('[NERTC-Web] setAudioProfile设置音频编码属性: ', JSON.stringify(audioProfileParam, null, ''));
		let profile = 'speech_low_quality'
		if(audioProfileParam.profile === NERTCAudioProfile["STANDARD"]){
			profile = 'speech_low_quality'
		}
		switch (audioProfileParam.profile) {
			case NERTCAudioProfile["STANDARD"]:
				profile = 'speech_low_quality';
				break;
			case NERTCAudioProfile["STANDARD_EXTEND"]:
				profile = 'speech_standard';
				break;
			case NERTCAudioProfile["MIDDLE_QUALITY"]:
				profile = 'music_standard';
				break;
			case NERTCAudioProfile["MIDDLE_QUALITY_STEREO"]:
				profile = 'standard_stereo';
				break;
			case NERTCAudioProfile["HIGH_QUALITY"]:
				profile = 'high_quality';
				break;
			case NERTCAudioProfile["HIGH_QUALITY_STEREO"]:
				profile = 'high_quality_stereo';
				break;
			default:
				break;
			;
		}
		this.audioProfile = profile
		if (this.localStream) {
			this.localStream.setAudioProfile(profile)
		}
	}
	
	/**
	 * 设置视频编码属性。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口可以设置视频主流或辅流的编码分辨率、裁剪模式、码率、帧率、带宽受限时的视频编码降级偏好、编码的镜像模式、编码的方向模式参数。
	 * 调用时机：请在初始化后调用该方法，且该方法在加入房间前后均可调用
	 * 使用限制：无。
	 * 注意事项：
	 *   1. 每个属性对应一套视频参数，例如分辨率、帧率、码率等。所有设置的参数均为理想情况下的最大值。当视频引擎因网络环境等原因无法达到设置的分辨率、帧率或码率的最大值时，会取最接近最大值的那个值。
	 *   2. 此接口为全量参数配置接口，重复调用此接口时，SDK 会刷新此前的所有参数配置，以最新的传参为准。所以每次修改配置时都需要设置所有参数，未设置的参数将取默认值
	 *
	 * @param {Object} videoConfigParam 设置视频画布的参数
	 * @param {NERtcVideoStreamType} videoConfigParam.videoStreamType 设置的视频类型。
	 * @param {NERtcVideoProfileType} videoConfigParam.maxProfile 设置的视频配置项。
	 * @param {NERtcVideoFrameRate} videoConfigParam.frameRate 设置的视频帧率。
	 * @param {NERtcVideoFrameRate} videoConfigParam.minFramerate  设置的视频最小帧率。
	 * @param {Number} videoConfigParam.bitrate 设置的视频码率。
	 * @param {Number} videoConfigParam.minBitrate 设置的视频最小码率。
	 * @param {Number} videoConfigParam.width 设置视频帧在横轴上的像素，即自定义宽。
	 * @param {Number} videoConfigParam.height 设置视频帧在纵轴上的像素，即自定义高。
	 * @param {NERtcVideoCropMode} videoConfigParam.cropMode 设置视频视频裁剪模式。
	 * @param {NERtcDegradationPreference} videoConfigParam.degradationPreference 设置带宽受限时的视频编码降级偏好。
	 * @param {NERTCMirrorMode} videoConfigParam.mirrorMode 设置视频镜像模式。
	 * @param {NERtcVideoOutputOrientationMode} videoConfigParam.orientationMode 设置适应视频，视频尺寸等比缩放。
	 * @memberof NERTC
	 * 
	 * @example
	 *  
		let localVideoConfig = {
			videoStreamType: NERtcVideoStreamType.MAIN, // 表示是对视频主流的配置
			maxProfile: NERtcVideoProfileType.Standard, //不推荐使用了
			frameRate: NERtcVideoFrameRate.FRAME_RATE_FPS_24, //设置帧率24
			minFrameRate: NERtcVideoFrameRate.FRAME_RATE_FPS_15, //设置最小帧率15
			bitrate: 1500, //设置视频码率1500kbps
			minBitrate: 1000, //设置视频码率最小为1000kbps
			width: 1280, //设置视频宽为1280
			height: 720, //设置视频高为720
			cropMode: NERtcVideoCropMode.CROP_16x9, //视频采集宽高比为16:9
			degradationPreference: NERtcDegradationPreference.DEGRADATION_DEFAULT, //带宽受限时的视频编码降级偏好为默认
			mirrorMode: mirrorMode: NERTCMirrorMode.AUTO, //AUTO表示使用默认值,由sdk控制
			orientationMode: NERtcVideoOutputOrientationMode.VIDEO_OUTPUT_ORIENTATION_MODE_ADAPTATIVE //（默认）该模式下 SDK 输出的视频方向与采集到的视频方向一致。接收端会根据收到的视频旋转信息对视频进行旋转
		};
		this.engine.setLocalVideoConfig(localVideoConfig)
	*/
	setLocalVideoConfig(videoConfigParam){
		console.log('[NERTC-Web] setLocalVideoConfig设置视频编码属性: ', JSON.stringify(videoConfigParam, null, ''));
		let videoProfile = null;
		let frameRate = 0;
		let resolution = 0;
		const maxBitrate = videoConfigParam.bitrate;
		let contentHint = null;
		if (videoConfigParam.degradationPreference === NERtcDegradationPreference.DEGRADATION_MAINTAIN_FRAMERATE) {
			contentHint = 'motion'
		} else if (videoConfigParam.degradationPreference === NERtcDegradationPreference.DEGRADATION_MAINTAIN_QUALITY) {
			contentHint = 'detail'
		} 
		
		switch (videoConfigParam.frameRate || videoConfigParam.minFrameRate) {
			case 7:
				frameRate = 1; //web sdk映射为5桢
				break;
			case 10:
				frameRate = 2;
				break;
			case 15:
				frameRate = 3; 
				break;
			case 24:
				frameRate = 5; //web sdk映射为25桢
				break;
			case 30:
				frameRate = 6; 
				break;
			default:
				break;
		}
		
		switch (videoConfigParam.height) {
			case 180:
			case 240:
				resolution = 2;
				break;
			case 360:
			case 480:
				resolution = 4;
				break;
			case 720:
				resolution = 8;
				break;
			case 1080:
				resolution = 16;
				break;
			default:
				break;
		}
		
		videoProfile = {
			resolution,
			frameRate,
			maxBitrate,
			contentHint
		}
		console.warn('[NERTC-Web] setLocalVideoConfig videoProfile: ', JSON.stringify(videoProfile, null, ''));
		
		if (videoConfigParam.videoStreamType === NERtcVideoStreamType.MAIN) {
			this.videoProfile = videoProfile;
		} else {
			this.screenProfile = videoProfile;
		}
		
		if (this.localStream) {
			if (videoConfigParam.videoStreamType === NERtcVideoStreamType.MAIN) {
				this.localStream.setVideoProfile({
					resolution,
					frameRate
				})
			} else {
				this.localStream.setScreenProfile({
					resolution,
					frameRate
				})
			}

			this.localStream.setVideoEncoderConfiguration({
				mediaType: videoConfigParam.videoStreamType === NERtcVideoStreamType.MAIN ? 'video' : 'screen',
				maxBitrate,
				contentHint
			})
		}
	}
	
	/**
	 * 设置是否由扬声器播放声音 (web端不支持)。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现设置是否将语音路由到扬声器，即设备外放。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 若设备连接了耳机或蓝牙，则无法开启外放
	 * 
	 * @param {Boolean} enable 是否将音频路由到扬声器：
		- true：启用扬声器播放。
		- false：关闭扬声器播放。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.setSpeakerphoneOn(true)
	*/
	setSpeakerphoneOn(enable){
		console.warn('[NERTC-Web] setSpeakerphoneOn H5不支持')
	    return
	}
	
	/**
	 * 开启或关闭本地音频主流的发送。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：该方法用于开始或停止向网络发送本地音频或视频数据。 该方法不影响接收或播放远端媒体流，也不会影响本地音频或视频的采集状态。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法暂时仅支持控制音频流的发送。
	 *   2. 停止发送媒体流的状态会在通话结束后被重置为允许发送。
	 * 相关回调：
	 *   1. 成功调用该方法切换本地用户的发流状态后，房间内其他用户会收到 onUserAudioStart()（开启发送音频）或 onUserAudioStop()（停止发送音频）的回调。
	 * 相关接口：
	 * 	 1. muteLocalAudio()：
	 * 		- 在需要开启本地音频采集（监测本地用户音量）但不发送音频流的情况下，您也可以调用 muteLocalAudio(true) 方法。
			- 两者的差异在于， muteLocalAudio(true) 仍然保持与服务器的音频通道连接，而 enableMediaPub(false) 表示断开此通道，因此若您的实际业务场景为多人并发的大房间，建议您调用 enableMediaPub 方法。
	 * 
	 * @param {Boolean} param 
	 * @param {Boolean} param.enable 是否发布本地音频流
	 * @memberof NERTC
	 * 
	 * @example
	 *  //静音设备
	 *  this.engine.enableMediaPub(true);
	*/
	enableMediaPub(enable){
	    console.log('[NERTC-Web] enableMediaPub是否发送语音: ', enable);
		if (!this.client || !this.localStream) {
			return
		}
		if (enable) {
			this.client.adapterRef._mediasoup?.createProduce(this.localStream, 'audio')
		} else {
			this.client.adapterRef._mediasoup?.destroyProduce('audio');
		}
	}
	
	/**
	 * 设置是否静音音频采集设备(web不支持)。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 业务场景：
	 *   1. 适用于麦克风采集和伴音同时开启时，只发送伴音音频的场景。
	 * 
	 * @param {Boolean} enable 是否静音音频采集设备
	 * @memberof NERTC
	 * 
	 * @example
	 *  //静音设备
	 *  this.engine.setRecordDeviceMute(true);
	*/
	setRecordDeviceMute(enable){
	    return;
	}
	
	/**
	 * 调节采集信号音量。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现设置录制声音的信号幅度，从而达到调节采集音量的目的。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为启用状态，在 leaveChannel() 后设置失效，将恢复至默认。
	 *   2. 建议设置本地采集音量为默认值（100）或小于该值，否则可能会导致音质问题。
	 *   3. 该方法仅设置应用程序中的采集信号音量，不修改设备音量，也不会影响伴音、音效等的音量；若您需要修改设备音量，请调用设备管理相关接口。
	 * 
	 * @param {Number} volume 采集信号音量，取值范围为 0 ~ 400。：
		- 0：静音。
		- 100（默认）：原始音量。
		- 400：最大音量值（自带溢出保护）。
	 * @memberof NERTC
	 * 
	 * @example
	 *  //将采集音量设置为100
	 *  this.engine.adjustRecordingSignalVolume(100);
	*/
	adjustRecordingSignalVolume(volume){
	    console.log('[NERTC-Web] adjustRecordingSignalVolume调节采集音量: ', volume);
		if (volume < 0 || volume > 100) {
			volume = 100
		}
		this.captureVolume = volume
		if (this.localStream) {
			this.localStream.setCaptureVolume(volume);
		}
	}
	
	/**
	 * 调节本地播放的指定远端用户的信号音量。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口可以实现在通话过程中随时调节本地播放的指定远端用户的混音音量。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为启用状态，在 leaveChannel() 后设置失效，将恢复至默认。但在本次通话过程中有效，比如指定远端用户中途退出房间，则再次加入此房间时仍旧维持该设置。
	 *   2. 该方法每次只能调整一位远端用户的播放音量，若需调整多位远端用户在本地播放的音量，则需多次调用该方法。
	 * 
	 * @param {Object} param
	 * @param {Number} param.userID 远端用户 ID
	 * @param {Number} param.volume 播放音量，取值范围为 [0,100]
		- 0：静音。
		- 100（默认）：原始音量。
	 * @memberof NERTC
	 * 
	 * @example
	 *
		//调整uid为12345的用户在本地的播放音量为50
		this.engine.adjustUserPlaybackSignalVolume({
			userID: 12345,
			volume: 50
		});
		//调整uid为12345的用户在本地的播放音量为0，静音该用户。
		this.engine.adjustUserPlaybackSignalVolume({
			userID: 12345,
			volume: 0
		});
	*/
	adjustUserPlaybackSignalVolume(param){
	    console.log('[NERTC-Web] adjustUserPlaybackSignalVolume调节远端用户的信号音量: ', JSON.stringify(param, null, ''));
		const userID = param.userStringID || param.userID
		const remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
		if (remoteStreamInfo && remoteStreamInfo.remoteStream) {
			try {
				remoteStreamInfo.remoteStream.setAudioVolume(param.volume)
			} catch (error) {
				console.log('[NERTC-Web] adjustUserPlaybackSignalVolume调节远端用户的信号音量异常: ', error.message)
			}
			this.remoteStreamInfoMap.set(userID, Object.assign(remoteStreamInfo, {
				userPlaybackVolume: param.volume || 100
			}))
		} 
	}
	
	/**
	 * 调节本地播放的某个房间的所有用户的信号音量。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口可以实现在通话过程中随时调节本地播放的某个房间的所有用户的混音音量。
	 * 调用时机：请在引擎初始化之后调用此接口，该方法在加入房间前后均可调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为启用状态，在 leaveChannel() 后失效，但在本次通话过程中有效。
	 * 
	 * @param {Number} volume 播放音量，取值范围为 [0,400]
		- 0：静音。
		- 100（默认）：原始音量。
		- 400：最大可为原始音量的 4 倍（自带溢出保护）。
	 * @memberof NERTC
	 * 
	 * @example
	 *
		//调整本地播放的某个房间内所有用户的音量为50
		this.engine.adjustChannelPlaybackSignalVolume(50);
	*/
	adjustChannelPlaybackSignalVolume(volume){
	    console.log('[NERTC-Web] adjustChannelPlaybackSignalVolume调节房间的所有用户的信号音量: ', volume);
	    if (this.client) {
			this.client.setPlaybackVolume(volume);
		}
	}
	
	/**
	 * 设置是否开启耳返功能。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 加入房间后，耳返功能可以随时开启，但只有当插入耳机或耳麦时，耳返功能才会生效；当拔出耳机或耳麦时会自动暂停，再次插入耳机或耳麦自动恢复，且耳返功能可以实时关闭。
	 * 
	 * @param {Object} param 
	 * @param {Boolean} param.enabled 是否开启耳返功能
	 * @param {Number} param.volume 设置耳返音量。取值范围为 0 ~ 100，默认值为 100。
	 * @memberof NERTC
	 * 
	 * @example
	 *  //将采集音量设置为100
	 *  this.engine.enableEarback({
			enabled: true,
			volume: 100
		});
	*/
	enableEarback(param){
	    console.log('[NERTC-Web] enableEarback开启耳返功能: ', JSON.stringify(param, null, ''));
	    if (this.localStream) {
	    	this.localStream.play(null, {
				audio: true
			}).then(()=>{
				localStream.setAudioVolume(param.volume)
			}).catch(error=>{
				console.log('[NERTC-Web] enableEarback开启耳返失败: ', error);
				throw error.getCode()
			})
	    }
	}
	
	/**
	 * 设置耳返音量。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：调用 enableEarback 方法开启耳返功能之后，您可以调用 setEarbackVolume 方法设置耳返音量。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为启用状态，在 leaveChannel() 后设置失效，将恢复至默认。
	 * 
	 * @param {Number} volume 设置耳返音量，可设置为 0~100，默认为 100。
	 * @memberof NERTC
	 * 
	 * @example
	 *  //将采集音量设置为100
	 *  this.engine.setEarbackVolume(100);
	*/
	setEarbackVolume(volume){
	    console.log('[NERTC-Web] setEarbackVolume设置耳返音量: ', volume);
	    if (this.localStream) {
	    	localStream.setAudioVolume(volume)
	    }
	}
	
	
	/**
	 * 启用说话者音量提示（web端默认开启，时间间隔1s）。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过此接口可以实现允许 SDK 定期向 App 反馈房间内发音频流的用户和瞬时音量最高的远端用户（最多 3 位，包括本端）的音量相关信息，即当前谁在说话以及说话者的音量。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 业务场景: 适用于通过发言者的人声相关信息做出 UI 上的音量展示的场景，或根据发言者的音量大小进行视图布局的动态调整。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为启用状态，在 leaveChannel() 后设置失效，将恢复至默认。
	 * 相关回调:
	     1. 启用该方法后，只要房间内有发流用户，无论是否有人说话，SDK 都会在加入房间后根据预设的时间间隔触发 onLocalAudioVolumeIndication()、onRemoteAudioVolumeIndication() 回调。
	 * 
	 * @param {Object} param
	 * @param {Boolean} param.enable 是否启用说话者音量提示
	 * @param {Number} param.interval 指定音量提示的时间间隔。单位为毫秒。必须设置为 100 毫秒的整数倍值，建议设置为 200 毫秒以上。
	 * @param {Boolean} param.enableVad 是否启用本地采集人声监测
	 * @memberof NERTC
	 * 
	 * @example
	 *
		//设置间隔为500ms的人声音量提示
		this.engine.enableAudioVolumeIndication({
			enable: true,
			interval: 500,
			enableVad: false
		});
	*/
	enableAudioVolumeIndication(param){
	    this.enableAudioVolumeIndicationFlag = param.enable
	}
	
	/**
	 * 开启或关闭本地视频的采集与发送。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现开启或关闭本地视频，不影响接收远端视频。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为开启或关闭状态, 在 [leaveChannel] 后仍然有效。
	 *   2. 在您的应用切到后台或者其他应用占用摄像头时，可能会导致摄像头打开失败，需要注册 camera 动态权限。
	 * 相关回调:
	 *   1. 开启本地视频采集后，远端会收到 onUserVideoStart() 回调。
     *   2. 关闭本地视频采集后，远端会收到 onUserVideoStop() 回调。
	 * @param {Object} param 启用本地video参数
	 * @param {Boolean} param.enable 是否开启本地视频采集与发送：
	 *	- true：启用本地视频采集。
	 *	- false：关闭本地视频采集。
	 * @param {NERtcVideoStreamType} param.videoStreamType 视频类型：
	 *  - MAIN：视频主流（默认摄像头）
	 *  - SUB：视频辅流（默认屏幕共享）
	 * @memberof NERTC
	 * 
	 * @example
	 *  // MAIN: 主流, SUB: 辅流  
	 *  this.engine.enableLocalVideo({
			videoStreamType: NERtcVideoStreamType.MAIN,
			enable: true
		})
	*/
	async enableLocalVideo(param){
		console.log('[NERTC-Web] enableLocalVideo开启视频: ', param);
		if (param.videoStreamType === NERtcVideoStreamType.MAIN) {
			this.localPublishConfig.video = param.enable
		} else if (param.videoStreamType === NERtcVideoStreamType.SUB) {
			this.localPublishConfig.screen = param.enable
		}
	
		if (this.client.adapterRef.connectState.curState !== 'CONNECTED') {
			return
		}
		
		if (param.enable) {
			return this.publishLocalStream({
				enableMediaPub: true,
				video: param.videoStreamType === NERtcVideoStreamType.MAIN,
				screen: param.videoStreamType === NERtcVideoStreamType.SUB
			})
		} else if (this.localStream) {
			return this.localStream.close({
				type: param.videoStreamType === NERtcVideoStreamType.MAIN ? 'video' : 'screen'
			})
		}
	}
	
	/**
	 * 开启或关闭本地音频的采集和发送。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：通过本接口可以实现开启或关闭本地语音功能，进行本地音频采集及处理。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为开启或关闭状态, 在 [leaveChannel] 后仍然有效。
	 *   2. 开启或关闭本地音频采集的操作不会影响伴音/音效接口的使用, enableLocalAudio(false) 后仍可以调用 [startAudioMixing]方法播放音乐文件。
	 *   3. 该方法会操作音频硬件设备，建议避免频繁开关，否则可能导致设备异常。
	 * 相关回调:
	 *   1. 开启音频采集后，远端会触发 onUserAudioStart() 回调。
	 *   2. 关闭音频采集后，远端会触发 onUserAudioStop() 回调。
	 * @param {Boolean} enable 是否开启本地音频采集与发送：
	 *	- true：启用本地音频采集。
	 *	- false：关闭本地音频采集。
	 * @memberof NERTC
	 * 
	 * @example
	 *  // 打开音频采集
	 *  this.engine.enableLocalAudio(true)
	*/
	enableLocalAudio(enable){
	    console.log('[NERTC-Web] enableLocalAudio开启音频: ', enable);
		this.localPublishConfig.audio = enable
		if (this.client.adapterRef.connectState.curState !== 'CONNECTED') {
			return
		}
	    if (enable) {
	    	this.publishLocalStream({
	    		audio: true,
	    		enableMediaPub: true
	    	})
	    } else if (this.localStream) {
	    	this.localStream.close({
	    		type: 'audio'
	    	})
	    }
	}
	
	/**
	 * 取消或恢复发布本地视频。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：调用该方法取消发布本地视频主流或辅流后，SDK 不再发送本地视频流。
	 * 调用时机：
	 *   1. 请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 *   2. 一般在通过 [enableLocalVideo] 接口开启本地视频采集并发送后调用该方法。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为开启或关闭状态, 在 [leaveChannel] 后仍然有效。
	 *   2. 调用该方法取消发布本地视频流时，设备仍然处于工作状态。
	 *   3. 该方法仅适用于视频主流，若您希望取消或恢复发布视频辅流，请调用 [muteLocalVideo]方法。

	 * 相关回调:
	 *   1. 开启本地视频采集后，远端会收到 onUserVideoStart() 回调。
	 *   2. 关闭本地视频采集后，远端会收到 onUserVideoStop() 回调。
	 * @param {Object} param 启用本地video参数
	 * @param {Boolean} param.mute 是否取消发布本地视频流：
	 *	- true：取消发布本地视频流。
	 *	- false：恢复发布本地视频流。
	 * @param {NERtcVideoStreamType} param.videoStreamType 视频类型：
	 *  - MAIN：视频主流（默认摄像头）
	 *  - SUB：视频辅流（默认屏幕共享）
	 * @memberof NERTC
	 * 
	 * @example
	 *  // MAIN: 主流, SUB: 辅流  
	 *  this.engine.muteLocalVideo(true)
	*/
	muteLocalVideo(mute){
	    console.log('[NERTC-Web] muteLocalVideo发布本地视频: ', mute);
		if (!this.client || !this.localStream) {
			return
		}
		if (mute) {
			this.client.adapterRef._mediasoup?.destroyProduce('video');
		} else {
			this.client.adapterRef._mediasoup?.createProduce(this.localStream, 'video')
		}
	}
	
	/**
	 * 开启或关闭本地音频主流的发送。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：该方法用于向网络发送或取消发送本地音频数据，不影响本地音频的采集状态，也不影响接收或播放远端音频流。
	 * 调用时机：请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为开启或关闭状态, 在 [leaveChannel] 后仍然有效。
	 * 相关接口: 
	 *   1. enableMediaPub()：
	 * 		- 在需要开启本地音频采集（监测本地用户音量）但不发送音频流的情况下，您也可以调用 enableMeidaPub(false) 方法。
	 * 		- 两者的差异在于，muteLocalAudio(true) 仍然保持与服务器的音频通道连接，而 enableMediaPub(false) 表示断开此通道，因此若您的实际业务场景为多人并发的大房间，建议您调用 enableMediaPub 方法。
	 * 相关回调:
	 *   1. 若本地用户在说话，成功调用该方法后，房间内其他用户会收到 onUserAudioMute() 回调。
	 * @param {Boolean} mute 是否关闭本地音频的发送：
	 *	- true：不发送本地音频。
	 *	- false：发送本地音频。
	 * @memberof NERTC
	 * 
	 * @example
	 *  // 打开音频采集
	 *  this.engine.muteLocalAudio(true)
	*/
	muteLocalAudio(mute){
	    console.log('[NERTC-Web] muteLocalAudio是否发送语音: ', mute);
	    if (!this.client || !this.localStream) {
	    	return
	    }
	    if (mute) {
	    	this.localStream.muteAudio();
	    } else {
	    	this.localStream.unmuteAudio();
	    }
	}
	  
	/**
	 * 切换前置或后置摄像头。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：该方法用于向网络发送或取消发送本地音频数据，不影响本地音频的采集状态，也不影响接收或播放远端音频流。
	 * 调用时机：请在调用 [startVideoPreview] 或 [joinChannel] 方法且开启摄像头之后调用此接口。
	 * 注意事项：
	 *   1. 该方法需要在相机启动后才可调用。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.switchCamera()
	*/
	switchCamera() {
		console.log('[NERTC-Web] switchCamera切换前置或后置摄像头');
		if (!this.localStream) {
			return;
		}
		
		if (isPC()) {
			NERTC.getCameras().then(data => {
				if (data.length <= 1) {
					console.warn('[NERTC-Web] switchCamera检测到当前设备没有两个及以上的视频设备，不支持切换');
					return
				}
				
				const videoTrack = this.localStream.getVideoTrack()
				let currentCameraId = this.localStream.cameraId
				console.log('this.localStream.cameraId: ', this.localStream.cameraId)
				if (!currentCameraId && videoTrack && videoTrack.getSettings) {
					console.log('videoTrack.getSettings: ', videoTrack.getSettings)
					currentCameraId = videoTrack.getSettings.deviceId
				}
				console.log('[NERTC-Web] switchCamera切换前置或后置摄像头, currentCameraId: ', currentCameraId);
				let index = -1;
				for (let i = 0; i < data.length; i++ ) {
					if (data[i].deviceId === currentCameraId) {
						index = i;
					}
				}
				console.log('[NERTC-Web] switchCamera切换前置或后置摄像头, index: ', index);
				let nextIndex = 0;
				if (index >= 0) {
					nextIndex = index + 1;
					if (nextIndex === data.length) {
						nextIndex = 0
					}
				} else {
					nextIndex = 1
				}
				const deviceId = data[nextIndex].deviceId;
				console.log('[NERTC-Web] switchCamera PC deviceId: ', deviceId)
				this.localStream.switchDevice('video', deviceId)
				// 移动端浏览器的切换设备ID逻辑，先废弃
				// let firstDeviceID = data[0].deviceId
				// let finalDeviceID = data[data.length - 1].deviceId
				// if (currentCameraId === firstDeviceID) {
				// 	console.log('[NERTC-Web] switchCamera H5 deviceId: ', finalDeviceID)
				// 	this.localStream.switchDevice('video', finalDeviceID)
				// } else if (currentCameraId === finalDeviceID) {
				// 	console.log('[NERTC-Web] switchCamera H5 firstDeviceID: ', firstDeviceID)
				// 	this.localStream.switchDevice('video', firstDeviceID)
				// } else {
				// 	console.log('[NERTC-Web] switchCamera H5 finalDeviceID: ', finalDeviceID)
				// 	this.localStream.switchDevice('video', finalDeviceID)
			})
		} else {
			if (this.localStream) {
				console.log('[NERTC-Web] switchCamera 移动端浏览器的逻辑是先关闭，在开启');
				this.localStream.close(({
					type: 'video'
				})).then(()=>{
					console.log(`[NERTC-Web] switchCamera 关闭 ${this.facingMode === 'user' ? '前置' : '后置'}摄像头成功`);
					if (this.facingMode === 'user') {
						this.facingMode = 'environment'
					} else {
						this.facingMode = 'user'
					}
					this.publishLocalStream({
						enableMediaPub: this.client._roleInfo.userRole === 0, //主播模式才推流
						video: true
					})
				}).catch(error=>{
					console.warn(`[NERTC-Web] switchCamera 关闭 ${this.facingMode === 'user' ? '前置' : '后置'}摄像头失败: ${error.message}`);
				})
			}
		}
	    
	}  
	  
	
	/**
	 * 订阅或取消订阅指定远端用户的视频主流。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：加入房间后，默认不订阅所有远端用户的视频主流；若您希望看到指定远端用户的视频，可以在监听到对方加入房间或发布视频流之后，通过此方法订阅该用户的视频主流。
	 * 调用时机：
	 *   1. 请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 * 注意事项：
	 *   1. 该方法设置内部引擎为开启或关闭状态, 在 [leaveChannel] 后仍然有效。
	 *   2. 调用该方法取消发布本地视频流时，设备仍然处于工作状态。
	 *   3. 该方法仅适用于视频主流，若您希望取消或恢复发布视频辅流，请调用 [muteLocalVideo]方法。
	
	 * 相关回调:
	 *   1. 开启本地视频采集后，远端会收到 onUserVideoStart() 回调。
	 *   2. 关闭本地视频采集后，远端会收到 onUserVideoStop() 回调。
	 * @param {Object} subscribeParam 启用本地video参数
	 * @param {Number} subscribeParam.userID 指定用户的 ID
	 * @param {Boolean} subscribeParam.subscribe 是否订阅远端用户的视频流
	 *	- true：订阅指定视频流。
	 *	- false：不订阅指定视频流。
	 * @param {NERtcRemoteVideoStreamType} subscribeParam.remoteVideoStreamType 视频类型：
	 *  - HIGH：大流
	 *  - LOW：小流
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.addEventListener("onUserVideoStart", (userID, maxProfile) => {
			const message = `onUserVideoStart通知：对方开启视频，userID = ${userID}, maxProfile = ${maxProfile}`
			//设置对端的视频画布
			this.engine.setupRemoteVideoCanvas({
				renderMode: NERTCRenderMode.Fit, // Fit表示应区域。视频尺寸等比缩放,保证所有区域被填满,视频超出部分会被裁剪
				mirrorMode: NERTCMirrorMode.AUTO, //AUTO表示使用默认值,由sdk控制
				isMediaOverlay: false, //表示小画布置于大画布上面
				userID: userID //对方userID
			})
			//主动去订阅对端视频
			this.engine.subscribeRemoteVideo({
				userID: userID,
				streamType: NERtcRemoteVideoStreamType.HIGH, //HIGH: 大流, LOW: 小流 
				subscribe: true //true表示订阅，false表示取消订阅
			})
		});
	*/
	subscribeRemoteVideo(subscribeParam) {
		console.log('[NERTC-Web] subscribeParam订阅视频: ', JSON.stringify(subscribeParam, null, ''));
	    const {userID, userStringID, streamType, subscribe} = subscribeParam;
		const remoteStreamInfo = this.remoteStreamInfoMap.get(userStringID || userID);
	
		if (remoteStreamInfo && remoteStreamInfo.remoteStream ) {
			if (subscribe) {
				this.client.subscribe(remoteStreamInfo.remoteStream, {
					video: streamType === NERtcRemoteVideoStreamType.HIGH ? 'high' : 'low'
				}).catch(error => {
					console.error('[NERTC-Web] subscribeRemoteVideo订阅视频失败: ', error)
					throw(error.message)
				})
			} else {
				this.client.unsubscribe(remoteStreamInfo.remoteStream, {
					video: true
				}).catch(error => {
					console.error('[NERTC-Web] subscribeRemoteVideo取消订阅视频失败: ', error)
					throw(error.message)
				})
			}
		}
	}
	
	/**
	 * 订阅或取消订阅远端用户的视频辅流。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：加入房间后，默认不订阅所有远端用户的视频辅流；若您希望看到指定远端用户的视频辅流，可以在监听到对方加入房间或发布视频辅流之后，通过此方法订阅该用户的视频辅流。
	 * 调用时机：
	 *   1. 请在初始化后调用该方法，且该方法仅可在加入房间后调用。
	 *   2. 请先调用 [setupRemoteSubStreamVideoCanvas] 设置远端用户的视频辅流画布
	 *   3. 建议在收到远端用户发布视频辅流的回调通知 onUserSubStreamVideoStart 事件后调用此接口
	 * 相关回调:
	 *   1. onUserSubStreamVideoStart：远端用户发布视频辅流的回调。
	 *   2. onUserSubStreamVideoStop：远端用户停止发布视频辅流的回调。
	 * @param {Object} subscribeParam 启用本地video参数
	 * @param {Number} subscribeParam.userID 对端userID：
	 * @param {Boolean} subscribeParam.subscribe 是否取消发布本地视频流：
	 *	- true：取消发布本地视频辅流。
	 *	- false：恢复发布本地视频辅流。
	 * @param {NERtcRemoteVideoStreamType} subscribeParam.remoteVideoStreamType 视频类型：
	 *  - HIGH：大流
	 *  - LOW：小流
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.addEventListener("onUserSubStreamVideoStart", (userID, maxProfile) => {
			const message = `onUserVideoStart通知：对方开启视频，userID = ${userID}, maxProfile = ${maxProfile}`
			//设置对端的视频辅流画布
			this.engine.setupRemoteSubStreamVideoCanvas({
				renderMode: NERTCRenderMode.Fit, // Fit表示应区域。视频尺寸等比缩放,保证所有区域被填满,视频超出部分会被裁剪
				mirrorMode: NERTCMirrorMode.AUTO, //AUTO表示使用默认值,由sdk控制
				isMediaOverlay: false, //表示小画布置于大画布上面
				userID: userID //对方userID
			})
			//主动去订阅对端视频辅流
			this.engine.subscribeRemoteSubStreamVideo({
				userID: userID,
				streamType:NERtcRemoteVideoStreamType.HIGH, //HIGH: 大流, LOW: 小流 
				subscribe: true //true表示订阅，false表示取消订阅
			})
		});
	*/
	subscribeRemoteSubStreamVideo(subscribeParam){
	    console.log('[NERTC-Web] subscribeRemoteSubStreamVideo订阅视频辅流: ', JSON.stringify(subscribeParam, null, ''));
	    const {userID, userStringID, streamType, subscribe} = subscribeParam;
	    const remoteStreamInfo = this.remoteStreamInfoMap.get(userStringID || userID);
	    	
	    if (remoteStreamInfo && remoteStreamInfo.remoteStream) {
	    	if (subscribe) {
	    		this.client.subscribe(remoteStreamInfo.remoteStream, {
	    			screen: streamType === NERtcRemoteVideoStreamType.HIGH ? 'high' : 'low'
	    		}).catch(error => {
	    			console.error('[NERTC-Web] subscribeRemoteVideo订阅视频辅流失败: ', error)
	    			throw(error.message)
	    		})
	    	} else {
	    		this.client.unsubscribe(remoteStreamInfo.remoteStream, {
	    			screen: true
	    		}).catch(error => {
	    			console.error('[NERTC-Web] subscribeRemoteVideo取消订阅视频辅流失败: ', error)
	    			throw(error.message)
	    		})
	    	}
	    }
	}
	
	/**
	 * 恢复远端音频播放。
	 *
	 * 支持版本：5.5.11 及以上。
	 * 详情描述：由于浏览器自动播放限制的策略，导致H5上播放房间中其他的声音，可能会失败，需要开发者重新调用该API恢复播放 
	 * 调用时机：
	 *   1. 监听sdk的 [onError] 事件，当 code === 41030 建议在页面上增加一下交互按钮，提示用户需要音频恢复播放。
	 * @param {Number} remoteUserID 对端userID
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.addEventListener("onError", (code, message, extraInfo) => {
			let imessage = `onError通知：code = ${code}, message = ${message}, extraInfo = ${extraInfo}`
			this.engine.nertcPrint(imessage)
			console.log(imessage)
			if (code === 41030) {
				imessage = `${extraInfo.userID} 音频播放收到浏览器限制需要用户手势触发`
				//这里启动一个UI提示框,当用户手动点击时,调用 this.engine.rePlayAudio() 恢复房间中其他人的音频播放
			}
			uni.showToast({
				title:imessage,
				icon: "none",
				duration: 3000
			})
		});
	*/
	async rePlayAudio(remoteUserID) {
		console.log('[NERTC-Web] rePlayAudio, remoteUserID: ', remoteUserID)
		if (remoteUserID) {
			const remoteStreamInfo = this.remoteStreamInfoMap.get(remoteUserID);
			if (remoteStreamInfo && remoteStreamInfo.remoteStream) {
				console.log('[NERTC-Web] 重新播放, remoteUserID: ', remoteUserID)
				await remoteStreamInfo.remoteStream.stop('audio')
				remoteStreamInfo.remoteStream.play(null, {audio: true}).then(() => {
					console.log('[NERTC-Web] 重新播放成功, remoteUserID: ', remoteUserID)
				}).catch (error => {
					console.error('[NERTC-Web] 重新播放失败, remoteUserID: ', remoteUserID, error)
				})
			} else {
				console.error(`[NERTC-Web] rePlayAudio: ${remoteUserID} 输入错误，请检查userID`)
			}
		} else {
			this.remoteStreamInfoMap.forEach(async (remoteStreamInfo) => {
				if (remoteStreamInfo && remoteStreamInfo.remoteStream) {
					console.log('[NERTC-Web] 重新播放 remoteUserID: ', remoteStreamInfo.remoteStream.streamID)
					await remoteStreamInfo.remoteStream.stop('audio')
					remoteStreamInfo.remoteStream.play(null, {audio: true}).then(() => {
						console.log('[NERTC-Web] 重新播放成功 remoteUserID: ', remoteStreamInfo.remoteStream.streamID)
					}).catch (error => {
						console.error('[NERTC-Web] 重新播放失败 remoteUserID: ', remoteStreamInfo.remoteStream.streamID, error)
					})
				}
			})
		}
	}
	
	/*************************************************** 美颜模块 start ************************************************************/
	/**
	 * 开启美颜功能模块。
	 *
	 * 支持版本：5.6.33 及以上。
	 * 使用前提：请先调用 [enableLocalVideo] 方法开启本地视频采集。
	 * 调用时机：
	 *   1. 请在引擎初始化之后调用此接口，且该方法在加入房间前后均可调用。
	 * 注意：
	 *	 1. 开启美颜功能模块后，默认无美颜效果，您需要通过 [setBeautyEffect] 或其他滤镜等相关接口设置美颜或滤镜效果。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.startBeauty() 开启美颜功能
	*/
	startBeauty() {
		console.log('[NERTC-Web] startBeauty()')
		this.preConfig.beauty.enableBeauty = true
		if (this.localStream) {
			this.localStream.setBeautyEffect(true)
		}
	}
	
	/**
	 * 关闭美颜功能模块。
	 * 如果后续不再需要使用美颜功能，可以调用 [stopBeauty] 结束美颜功能模块，SDK 会自动销毁美颜引擎并释放资源。
	 * 支持版本：5.6.33 及以上。
	 * @memberof NERTC
	 * 
	 * @example
	 *  this.engine.stopBeauty() 开启美颜功能
	*/
	stopBeauty() {
		console.log('[NERTC-Web] stopBeauty()')
		//停止美颜，缓存的状态重置
		this.preConfig = {
			beauty: {
				enableBeauty: false, 
				beautyEffectOptions: {
					brightnessLevel: 0, //明亮度。取值范围 [0,1]
					rednessLevel: 0, //红润度。取值范围 [0,1]
					smoothnessLevel: 0 //平滑度。取值范围 [0,1]
				},
				beautyFilter: {
					beautyFilterType: '', //滤镜类型
					level: 0 //滤镜强度
				}
			}
		}
		if (this.localStream) {
			this.localStream.setBeautyEffect(false)
		}
	}
	
	/**
	 * 暂停或恢复美颜效果。
	 * 暂停美颜效果后，包括全局美颜、滤镜、贴纸和美妆在内的所有美颜效果都会暂时关闭，直至重新恢复美颜效果。
	 * 支持版本：H5端不支持。
	 * @memberof NERTC
	 *  
	*/
	enableBeauty() {
		console.log('[NERTC-Web] enableBeauty() NotSupport')
		return
	}
	
	/**
	 * 设置美颜效果。 通过此接口可以实现设置磨皮、美白等多种美颜类型和对应的美颜强度。
	 * 使用前提：请先调用 NERtcEx#startBeauty() 方法开启美颜。
	 * 调用时机：请在引擎初始化之后调用此接口，且该方法在加入房间前后均可调用。
	 * 支持版本：5.6.33 及以上。
	 * @memberof NERTC
	 * @param {NERtcBeautyEffectType} type 美颜类型
	 * @param {Number} level 对应美颜类型的强度。取值范围为 [0, 1]，各种美颜效果的默认值不同。
	 * @example
	 *  this.engine.stopBeauty() 开启美颜功能
	*/
	setBeautyEffect(type, level) {
		console.log('[NERTC-Web] setBeautyEffect() type: ', type, ', level: ', level)
		switch(type) {
			case NERtcBeautyEffectType["kNERtcBeautyWhiten"]:
				this.preConfig.beauty.beautyEffectOptions.brightnessLevel = level
				break;
			case NERtcBeautyEffectType["kNERtcBeautySmooth"]:
				this.preConfig.beauty.beautyEffectOptions.smoothnessLevel = level
				break;
			case NERtcBeautyEffectType["kNERtcBeautyFaceRuddy"]:
				this.preConfig.beauty.beautyEffectOptions.rednessLevel = level
				break;
			default:
				console.log('[NERTC-Web] setBeautyEffect() notSupport')
				return;
		}
		if (this.localStream) {
			this.localStream.setBeautyEffectOptions(this.preConfig.beauty.beautyEffectOptions)
		}
	}
	
	/**
	 * 设置滤镜。
	 * 此接口用于H5端的设置滤镜效果
	 * 使用前提：请先调用 [startBeauty] 方法开启美颜。
	 * 支持版本：5.6.33 及以上。
	 * @memberof NERTC
	 * @param {String} type 美颜类型
	 * @param {Number} level 对应美颜类型的强度。取值范围为 [0, 1]，各种美颜效果的默认值不同。
	 * @example
	 *  //设置滤镜参数并传递
		this.engine.setFilter('baixi', 0.3)
	*/
	setFilter(type, level) {
		console.log('[NERTC-Web] setFilter() type: ', type, ', level: ', level)
		this.preConfig.beauty.beautyFilter.beautyFilterType = type
		this.preConfig.beauty.beautyFilter.level = level
		if (this.localStream) {
			this.localStream.setFilter(type, level)
		}
	}
	
	/*************************************************** 美颜模块 end ************************************************************/
	
	/*************************************************** 截图模块 start ************************************************************/
	/**
	 * 本地视频画面截图。 
	 * 调用 takeLocalSnapshot 截取本地主流或本地辅流的视频画面。
	 * 支持版本：5.6.34 及以上。
	 * 调用时机：
	 *   1. 本地主流截图，需要在 startVideoPreview 或者 enableLocalVideo 并 joinChannel 成功之后调用。
	 *   2. 本地辅流截图，需要在 joinChannel 并 startScreenCapture 之后调用。
	 * @memberof NERTC
	 * @param {NERtcVideoStreamType} videoStreamType 媒体类型，是视频主流，还是视频辅流
	 * @example
	 *  this.engine.takeLocalSnapshot(NERtcVideoStreamType.MAIN).then(result => {
			if(result.image){
				//截图成功,格式为base64
			}
		})
	*/
	async takeLocalSnapshot(videoStreamType) {
		console.log('[NERTC-Web] takeLocalSnapshot() videoStreamType: ', videoStreamType)
		if (this.localStream) {
			try {
				const base64Img = await this.localStream.takeSnapshotBase64({
					mediaType: videoStreamType === NERtcVideoStreamType.MAIN ? 'video' : 'screen'
				})
				return {img: base64Img, errorCode: 0}
			} catch(e){
				console.warn('[NERTC-Web] takeLocalSnapshot() error: ', e.message)
			}
		} else {
			console.warn('[NERTC-Web] takeLocalSnapshot() 当前没有开启摄像头或者加入房间，无法进行截图')
			return {}
		}
	}
	
	/**
	 * 远端视频画面截图。 
	 * 调用 takeRemoteSnapshot 截取本地主流或本地辅流的视频画面。
	 * 支持版本：5.6.34 及以上。
	 * 调用时机：
	 *   1. takeRemoteSnapshot 需要在收到 onUserVideoStart 与 onUserSubStreamVideoStart 回调之后调用。。
	 * @memberof NERTC
	 * @param {Object} options 
	 * @param {Number} options.userID 房间中远端的用户ID
	 * @param {String} options.userStringID 房间中远端的用户字符串ID
	 * @param {NERtcVideoStreamType} options.videoStreamType 媒体类型，是视频主流，还是视频辅流
	*/
	async takeRemoteSnapshot(options) {
		const {userID, userStringID,videoStreamType} = options
		console.log('[NERTC-Web] takeRemoteSnapshot() userID: ', userID, ", videoStreamType: ", videoStreamType)
		const remoteStreamInfo = this.remoteStreamInfoMap.get(userStringID||userID) || {}
		const remoteStream = remoteStreamInfo.remoteStream || null
		if (remoteStream) {
			try {
				const base64Img = await remoteStream.takeSnapshotBase64({
					mediaType: videoStreamType === NERtcVideoStreamType.MAIN ? 'video' : 'screen'
				})
				return {img: base64Img, errorCode: 0}
			} catch(e){
				console.warn('[NERTC-Web] takeRemoteSnapshot() error: ', e.message)
			}
		} else {
			console.warn('[NERTC-Web] takeRemoteSnapshot() 当前没有开启摄像头或者加入房间，无法进行截图')
			return {}
		}
	}
	/*************************************************** 截图模块 end ************************************************************/
	
	
	/**
	 * 内部接口，用于磨平web和app直接的接口差异
	 */
	transformEvent() {
		// case 'onDisconnect':
		// case 'onReconnectingStart':
		// case 'onReJoinChannel':
		// case 'onJoinChannel':
		// case 'onLeaveChannel':
		// case 'onUserAudioStart':
		// case 'onUserAudioStop':
		// case 'onUserVideoStart':
		// case 'onUserVideoStop':
		// case 'onUserSubStreamVideoStart':
		// case 'onUserSubStreamVideoStop':
		// case 'onUserAudioMute':
		// case 'onUserVideoMute':
		let tempCallback = null;
		this.client.on('error',(type) => {
			console.log('[NERTC-Web] error事件, type: ', type)
			if (type === 'SOCKET_ERROR') {
			  //sdk因为网络问题连接断开
			  tempCallback = this.eventMap.get('onDisconnect');
			  if (tempCallback) {
			  	tempCallback(NERTCErrorCode.ENGINE_ERROR_SIGNAL_DISCONNECTED)
			  } else {
			  	console.log('[NERTC-Web] onDisconnect事件没有监听')
			  }
			}
		})
		
		this.client.on('client-banned',() => {
			console.log('[NERTC-Web] client-banned事件, 你被提出房间')
			//你被提出房间
			tempCallback = this.eventMap.get('onDisconnect');
			if (tempCallback) {
				tempCallback(NERTCErrorCode.ENGINE_ERROR_SERVER_KICKED)
			} else {
				console.log('[NERTC-Web] onDisconnect事件没有监听')
			}
		})
		
		this.client.on('channel-closed',() => {
			console.log('[NERTC-Web] client-banned事件, 房间被关闭')
			//房间被关闭
			tempCallback = this.eventMap.get('onDisconnect');
			if (tempCallback) {
				tempCallback(NERTCErrorCode.ENGINE_ERROR_ROOM_CLOSED)
			} else {
				console.log('[NERTC-Web] onDisconnect事件没有监听')
			}
		})
		
		this.client.on('@pairing-websocket-reconnection-start',() => {
			console.log('[NERTC-Web] pairing-websocket-reconnection-start事件, sdk开始重连')
			//sdk开始重连
			tempCallback = this.eventMap.get('onReconnectingStart');
			if (tempCallback) {
				tempCallback()
			} else {
				console.log('[NERTC-Web] onReconnectingStart事件没有监听')
			}
		})
		
		this.client.on('@mediaCapabilityChange',() => {
			if (this.client.adapterRef.connectState.reconnect) {
				//sdk重连成功
				tempCallback = this.eventMap.get('onReJoinChannel');
				if (tempCallback) {
					tempCallback()
				} else {
					console.log('[NERTC-Web] onReJoinChannel事件没有监听')
				}
			}
		})
		
		this.client.on('stream-added',(evt) => {
			const remoteStream = evt.stream
			const userID = this.client.adapterRef.channelInfo.uidType == 'string' ? remoteStream.stringStreamID : remoteStream.streamID	
			let remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
			//该callback会触发多次，有可能会冲刷掉之前存储的viewConfig等属性
			if (!remoteStreamInfo || !remoteStreamInfo.remoteStream) {
				this.remoteStreamInfoMap.set(userID, {
					remoteStream,
					userPlaybackVolume: 100
				})
			}
			console.log('[NERTC-Web] stream-added事件, 收到 ', userID, ' 的发布消息, mediaType: ', evt.mediaType);
			let eventType = '';
			if (evt.mediaType === 'audio') {
				eventType = 'onUserAudioStart'
				//音频自动订阅
				this.client.subscribe(remoteStream, {
					audio: true
				}).catch(error => {
					console.error('[NERTC-Web] stream-added事件，订阅音频流失败: ', error)
					throw(error.message)
				})
			} else if (evt.mediaType === 'video') {
				eventType = 'onUserVideoStart'
			} else if (evt.mediaType === 'screen') {
				eventType = 'onUserSubStreamVideoStart'
			}
			
			tempCallback = this.eventMap.get(eventType);
			if (tempCallback) {
				//视频和screen，还有第二个参数，表示视频的分辨率，web端现忽略这个
				if (evt.mediaType === 'audio') {
					tempCallback(remoteStream.streamID, remoteStream.stringStreamID)
				} else {
					tempCallback(remoteStream.streamID, 0, remoteStream.stringStreamID)
				}
			} else {
				console.log(`[NERTC-Web] ${eventType}事件没有监听`)
			}
		})
		
		this.client.on('stream-removed',(evt) => {
			const remoteStream = evt.stream
			console.log('[NERTC-Web] stream-removed事件, 收到 ', remoteStream.stringStreamID, ' 的取消发布的消息, mediaType: ', evt.mediaType)
			let eventType = '';
			if (evt.mediaType === 'audio') {
				eventType = 'onUserAudioStop'
			} else if (evt.mediaType === 'video') {
				eventType = 'onUserVideoStop'
			} else if (evt.mediaType === 'screen') {
				eventType = 'onUserSubStreamVideoStop'
			}
			
			tempCallback = this.eventMap.get(eventType);
			if (tempCallback) {
				tempCallback(remoteStream.streamID, remoteStream.stringStreamID)
			} else {
				console.log(`[NERTC-Web] ${eventType}事件没有监听`)
			}
		})
		
		this.client.on('stream-subscribed',(evt) => {
			var remoteStream = evt.stream
			console.log('订阅别人的流成功的通知: ', remoteStream.stringStreamID, 'mediaType: ', evt.mediaType)
			const userID = this.client.adapterRef.channelInfo.uidType == 'string' ? remoteStream.stringStreamID : remoteStream.streamID
			const remoteStreamInfo = this.remoteStreamInfoMap.get(userID)
			if (evt.mediaType === 'audio') {
				if (!isPC()) {
					//应对android微信浏览器autoplay不会报错的问题
					NERTC.getParameters().moreNotAllowedError = true
				}
				remoteStream.on('notAllowedError', (error) => {
					console.warn('remoteStream 音频播放 notAllowedError: ', error)
					const errorCode = error.getCode()
					if (errorCode === 41030) {
					  console.warn('remoteStream 自动播放策略阻止: ' + userID)
					  const tempCallback = this.eventMap.get('onError');
					  if (tempCallback) {
						let code = 41030;
						let message = error.message || "";
						let extraInfo = {userID}
					  	tempCallback(code, message, extraInfo)
					  } else {
					  	console.log(`[NERTC-Web] onError事件没有监听`)
					  }
					}
				})
				console.log('订阅别人的流成功的通知: ', userID, '开始播放: ', evt.mediaType)	  
				remoteStream.play(null, {audio: true}).then(() => {
					remoteStream.setAudioVolume(remoteStreamInfo.userPlaybackVolume)
				}).catch (error => {
					console.log('订阅别人的流成功的通知: ', userID, '开始播放: ', evt.mediaType, '失败: ', error.message)
				})
			} else {
				const viewCofing = evt.mediaType === 'video' ? remoteStreamInfo.remoteVideoViewConfig : remoteStreamInfo.remoteScreenViewConfig;
				if (!viewCofing || !viewCofing.view) {
					console.warn('订阅别人的流成功的通知: ', userID, 'mediaType: ', evt.mediaType, '缺失view')
					return
				}
				remoteStream.play(viewCofing.view, {
					video: evt.mediaType === 'video',
					screen: evt.mediaType === 'screen'
				}).then( () => {
					console.log('播放别人的流成功: ', userID, 'mediaType: ', evt.mediaType)
					remoteStream.setRemoteRenderMode({
						cut: viewCofing.cut,
						width: viewCofing.view.clientWidth - 0,
						height: viewCofing.view.clientHeight - 0
					}, evt.mediaType)
				}).catch( error => {
					console.error(console.log('播放别人的流失败: ', userID, 'mediaType: ', evt.mediaType, ', error: ', error))
					throw(error.message);
				})
			}
		})
		
		this.client.on('mute-audio',(evt) => {
			console.log('[NERTC-Web] mute-audio事件, uid: ', evt.uid)
			//sdk重连成功
			tempCallback = this.eventMap.get('onUserAudioMute');
			if (tempCallback) {
				tempCallback(evt.uid - 0, true, evt.uid.toString())
			} else {
				console.log('[NERTC-Web] onUserAudioMute事件没有监听')
			}
		})
		
		this.client.on('unmute-audio',(evt) => {
			console.log('[NERTC-Web] unmute-audio事件, uid: ', evt.uid)
			//sdk重连成功
			tempCallback = this.eventMap.get('onUserAudioMute');
			if (tempCallback) {
				tempCallback(evt.uid - 0, false, evt.uid.toString())
			} else {
				console.log('[NERTC-Web] onUserAudioMute事件没有监听')
			}
		})
		
		this.client.on('mute-video',(evt) => {
			console.log('[NERTC-Web] unmute-video事件, uid: ', evt.uid)
			//sdk重连成功
			tempCallback = this.eventMap.get('onUserVideoMute');
			if (tempCallback) {
				tempCallback(evt.uid - 0, true, NERtcVideoStreamType.MAIN, evt.uid.toString())
			} else {
				console.log('[NERTC-Web] onUserVideoMute事件没有监听')
			}
		})
		
		this.client.on('unmute-video',(evt) => {
			console.log('[NERTC-Web] unmute-video事件, uid: ', evt.uid)
			//sdk重连成功
			tempCallback = this.eventMap.get('onUserVideoMute');
			if (tempCallback) {
				tempCallback(evt.uid - 0, false, NERtcVideoStreamType.MAIN, evt.uid.toString())
			} else {
				console.log('[NERTC-Web] onUserVideoMute事件没有监听')
			}
		})
		
		this.client.on('mute-screen',(evt) => {
			console.log('[NERTC-Web] unmute-screen事件, uid: ', evt.uid)
			//sdk重连成功
			tempCallback = this.eventMap.get('onUserVideoMute');
			if (tempCallback) {
				tempCallback(evt.uid - 0, true, NERtcVideoStreamType.SUB, evt.uid.toString())
			} else {
				console.log('[NERTC-Web] onUserVideoMute事件没有监听')
			}
		})
		
		this.client.on('unmute-screen',(evt) => {
			console.log('[NERTC-Web] unmute-screen事件, uid: ', evt.uid)
			//sdk重连成功
			tempCallback = this.eventMap.get('onUserVideoMute');
			if (tempCallback) {
				tempCallback(evt.uid - 0, false, NERtcVideoStreamType.SUB, evt.uid.toString())
			} else {
				console.log('[NERTC-Web] onUserVideoMute事件没有监听')
			}
		})
	}
	
	/**
	   * 添加事件回调
	   * @param event 事件名
	   * @param callback 回调方法
	   * @memberof NERTC
	   */
	addEventListener(event, callback) {
		let tempCallback = null;
	    switch (event) {
			case 'onError': 
				tempCallback = (type) => {
					let code = 0;
					let message = type || "";
					let extraInfo = {}
					callback(code, message, extraInfo)
				}
				this.client.on('error', tempCallback)
				this.eventMap.set(event, callback)
				break;
			case 'onWarning':
				tempCallback = (evt) => {
					let code = evt.code;
					let message = evt.msg || "";
					let extraInfo = {}
					callback(code, message, extraInfo)
				}
				this.client.on('warning', tempCallback)
				break;
			case 'onClientRoleChange':
				tempCallback = (evt) => {
					console.log('[NERTC-Web] client-role-changed事件 role: ', evt.role)
					let oldRole = -1; 
					let newRole = -1;
					if (evt.role === 'host') {
						oldRole = NERTCUserRole.CLIENT_ROLE_AUDIENCE
						newRole = NERTCUserRole.CLIENT_ROLE_BROADCASTER
					} else if (evt.role === 'audience') {
						newRole = NERTCUserRole.CLIENT_ROLE_AUDIENCE
						oldRole = NERTCUserRole.CLIENT_ROLE_BROADCASTER
					}
					callback(oldRole, newRole)
				}
				this.client.on('client-role-changed', tempCallback)
				break;
			case 'onDisconnect':
			case 'onReconnectingStart':
			case 'onReJoinChannel':
			case 'onJoinChannel':
			case 'onLeaveChannel':
			case 'onUserAudioStart':
			case 'onUserAudioStop':
			case 'onUserVideoStart':
			case 'onUserVideoStop':
			case 'onUserSubStreamVideoStart':
			case 'onUserSubStreamVideoStop':
			case 'onUserAudioMute':
			case 'onUserVideoMute':
			case 'onVideoCanvas':
			case 'onVideoCanvasReady':
			case 'onLocalAudioVolumeIndication':
				//需要特殊转换
				this.eventMap.set(event, callback)
				break;
			case 'onUserJoined':
				tempCallback = (evt) => {
					const userID = evt.uid;
					const extraInfo = {};
					callback(userID - 0, extraInfo, userID.toString())
				}
				this.client.on('peer-online', tempCallback)
				break;
			case 'onUserLeave':
				tempCallback = (evt) => {
					const userID = evt.uid;
					const reason = NERTCErrorCode.OK;
					//成员离开后，即使清除对应的streamMap
					this.remoteStreamInfoMap.delete(userID);
					callback(userID - 0, reason, userID.toString())
				}
				this.client.on('peer-leave', tempCallback)
				break;

			case 'onRemoteAudioVolumeIndication':
				tempCallback = (evt) => {
					if (!this.enableAudioVolumeIndicationFlag) {
						return;
					}
					let volumeArray = []
					let totalVolume = 100 //web端不是混音，这个值没有意义
					evt.forEach(item => {
						volumeArray.push({
							userID: item.uid - 0,
							userStringID: item.uid.toString(),
							volume: item.type === 'audio' ? item.level : 0,
							subStreamVolume: item.type === 'audioSlave' ? item.level : 0
						})
					})
					callback(volumeArray, totalVolume)
					
					const localAudioVolumeEvent = this.eventMap.get('onLocalAudioVolumeIndication') 
					if (localAudioVolumeEvent && this.localStream) {
						const localVolume = this.localStream.getAudioLevel()
						const vadFlag = localVolume >=5 ? true : false
						localAudioVolumeEvent(localVolume, vadFlag)
					}
				}
				this.client.on('volume-indicator', tempCallback)
				break;
			case 'onNetworkQuality':
				tempCallback = (evt) => {
					if (!this.enableStatsObserverFlag) {
						return;
					}
					let statsArray = []
					evt.forEach(item => {
						statsArray.push({
							userID: item.uid - 0,
							userStringID: item.uid.toString(),
							upStatus: item.uplinkNetworkQuality,
							downStatus: item.downlinkNetworkQuality
						})
					})
					callback(statsArray)
				}
				this.client.on('network-quality', tempCallback)
				break;
		}
	}
	
	  /**
	   * 移除事件回调
	   * @param event 事件名
	   * @param callback 回调方法
	   * @memberof NERTC
	   */
	removeEventListener(event, callback) {
	    if (event) {
	      this.eventMap.delete(event);
	    }
	}
	
	/**
	   * 移除所有的注册的回调事件
	   * @param event 事件名
	   * @param callback 回调方法
	   * @memberof NERTC
	   */
	removeAllEventListener() {
	    this.eventMap.clear();
	}
	
	/////////////////////////////////////////////////////////////////////////////////
	//
	//                      （一）事件回调
	//
	/////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * 错误回调，表示 SDK 不可恢复的错误，一定要监听并分情况给用户适当的界面提示<br>
	 * @param {Number} code 错误码
	 * @param {String} message 错误信息
	 * @param {Object} extraInfo 扩展信息字段，个别错误码可能会带额外的信息帮助定位问题
	 */
	onError(code, message, extraInfo) { }
	/**
	 * 警告回调，用于告知您一些非严重性问题，例如出现卡顿或者可恢复的解码失败<br>
	 * @event NERTCCallback#onWarning
	 * @param {Number} code 警告码
	 * @param {String} message 警告信息
	 * @param {Object} extraInfo 扩展信息字段，个别警告码可能会带额外的信息帮助定位问题
	 */
	onWarning(code, message, extraInfo) { }
	/**
	 * 直播场景下用户角色已切换回调。
	 * 用户加入房间后，通过 setClientRole(int role) 切换用户角色后会触发此回调。例如从主播切换为观众、从观众切换为主播。
		注意：直播场景下，如果您在加入房间后调用该方法切换用户角色，调用成功后，会触发以下回调：
			- 主播切观众，本端触发 onClientRoleChange 回调，远端触发 onUserLeave() 回调。
			- 观众切主播，本端触发 onClientRoleChange 回调，远端触发 onUserJoined() 回调。
	 * @param {NERTCUserRole} oldRole 切换前的角色
	 * @param {NERTCUserRole} newRole 切换后的角色
	 */
	onClientRoleChange(oldRole, newRole) { }
	/**
	 * 与服务器连接中断，可能原因包括：网络连接失败、服务器关闭该房间、用户被踢出房间等。
]		注意：SDK 在调用 joinChannel 加入房间成功后，如果和服务器失去连接，就会触发该回调。
	 * @param {NERTCErrorCode} reason 与服务器连接中断，可能原因包括：网络连接失败、服务器关闭该房间、用户被踢出房间等，详细错误码请参考 NERTCErrorCode。
	 */
	onDisconnect(reason) { }
	/**
	 *加入房间回调，表示客户端已经登入服务器。
	 * @param {Number} result	0 表示加入房间成功；其他值表示加入房间失败，详细错误码请参考 NERTCErrorCode
	 * @param {Number} channelId	客户端加入的房间 ID。
	 * @param {Number} elapsed	从 joinChannel 开始到发生此事件过去的时间，单位为毫秒。
	 * @param {Number} userID	用户 ID。 如果在 joinChannel 方法中指定了 userID，此处会返回指定的 ID; 如果未指定 userID（joinChannel 时userID=0），此处将返回云信服务器自动分配的 ID。
	 */
	onJoinChannel(result, channelId, elapsed, userID) { }
	/**
	 * App 调用 leaveChannel 方法后，SDK 提示 App 退出房间是否成功。
	 * @event NERTCCallback#onLeaveChannel
	 * @param {Number} result	0 表示成功；其他值表示退出房间失败，详细错误码请参考 NERTCErrorCode。
	 */
	onLeaveChannel(result) { }
	/**
	 * 远端用户加入房间事件回调。 远端用户加入房间或断网重连后，SDK 会触发该回调，可以通过返回的用户 ID 订阅对应用户发布的音、视频流。
	 * 注意：通信场景下，该回调通知有远端用户加入了房间，并返回新加入用户的 ID；若该用户加入之前，已有其他用户在房间中，该新加入的用户也会收到这些已有用户加入房间的回调。
直播场景下，该回调通知有主播加入了房间，并返回该主播的用户 ID；若该用户加入之前，已经有主播在频道中了，新加入的用户也会收到已有主播加入房间的回调。
	 * @param {Number} userID 	远端用户 ID
	 * @param {Number} extraInfo 	该远端用户加入的额外信息。
	 */
	onUserJoined(userID, extraInfo) { }
	/**
	 * 远端用户离开房间或掉线（在 40 ~ 50 秒内本端用户未收到远端用户的任何数据包）后，SDK 会触发该回调。
	 * @param {Number} userID 	远端用户 ID
	 * @param {Number} reason 	该远端用户离开的原因，详细错误码请参考 NERTCErrorCode
	 * @param {Number} extraInfo 	该远端用户加入的额外信息。
	 */
	onUserLeave(userID, reason, extraInfo) { }
	/**
	 * 远端用户开启音频回调。
	 * 注意：该回调由远端用户调用 enableLocalAudio 方法开启音频采集和发送触发
	 * @param {Number} userID 	远端用户 ID
	 */
	onUserAudioStart(userID) { }
	/**
	 * 远端用户停止音频回调。
	 * 注意：该回调由远端用户调用 enableLocalAudio 方法关闭音频采集和发送触发
	 * @param {Number} userID 	远端用户 ID
	 */
	onUserAudioStop(userID) { }
	/**
	 * 远端用户开启视频回调。。
	 * @param {Number} userID 	远端用户 ID
	 * @param {NERtcVideoProfileType} maxProfile 	视频编码配置，详细信息请参考
	 */
	onUserVideoStart(userID, maxProfile) { }
	/**
	 * 远端用户停止视频回调。
	 * @param {Number} userID 	远端用户 ID
	 */
	onUserVideoStop(userID) { }
	/**
	 * 进房后的回调<br>
	 * 远端用户开启屏幕共享辅流通道后，自己会收到 `onUserSubStreamVideoStart(userID, maxProfile)` 回调<br>
	 * @param {Number} userID 本地或远程用户 ID
	 * @param {NERtcVideoProfileType} maxProfile 视频流类型：摄像头或屏幕分享
	 */
	onUserSubStreamVideoStart(userID, maxProfile) { }
	/**
	 * 进房后的回调<br>
	 * 远端用户停止屏幕共享辅流通道，自己会收到 `onUserSubStreamVideoStop(userID)` 回调<br>
	 * @event NERTCCallback#onUserSubStreamVideoStop
	 * @param {Number} userID 远程用户 ID
	 */
	onUserSubStreamVideoStop(userID, maxProfile) { }
	/**
	 * 进房后的回调<br>
	 * 远端用户暂停或恢复发送音频流，自己会收到 `onUserAudioMute(userID, muted )` 回调<br>
	 * @param {Number} userID 远程用户 ID
	 * @param {Boolean} muted  是否停止发送音频流
	 *   - true：该用户已暂停发送音频流。
	 * 	 - false：该用户已恢复发送音频流。
	 */
	onUserAudioMute(userID, muted) { }
	/**
	 * 进房后的回调<br>
	 * 远端用户暂停或恢复发送视频流回调。 当远端用户调用 muteLocalVideo 取消或者恢复发布视频流时，SDK会触发该回调向本地用户报告远程用户的发流状况。<br>
	 * @param {Number} userID 远程用户 ID
	 * @param {Boolean} muted  是否停止发送视频流
	 *   - true：该用户已暂停发送视频流。
	 * 	 - false：该用户已恢复发送视频流。
	 * @param {NERtcVideoStreamType} videoStreamType 视频类型：
	 *  - MAIN：视频主流（默认摄像头）
	 *  - SUB：视频辅流（默认屏幕共享）
	 */
	onUserVideoMute(userID, muted, videoStreamType) { }
	/**
	 * 进房后的回调<br>
	 * 已接收到远端音频首帧，自己会收到 `onFirstAudioDataReceived(userID)` 回调<br>
	 * @param {Number} userID 远程用户 ID
	 */
	onFirstAudioDataReceived(userID) { }
	/**
	 * 进房后的回调<br>
	 * 已显示远端视频首帧的，自己会收到 `onFirstVideoDataReceived(userID, videoStreamType)` 回调<br>
	 * @param {Number} userID 远程用户 ID
	 * @param {NERtcVideoStreamType} videoStreamType 视频类型：
	 *  - MAIN：视频主流（默认摄像头）
	 *  - SUB：视频辅流（默认屏幕共享）
	 */
	onFirstVideoDataReceived(userID, videoStreamType) { }
	/**
	 * 进房后的回调<br>
	 * 已解码远端音频首帧，自己会收到 `onFirstAudioFrameDecoded()` 回调<br>
	 * @param {Number} userID 远程用户 ID
	 */
	onFirstAudioFrameDecoded(userID) { }
	/**
	 * 进房后的回调<br>
	 * 已接收到远端视频首帧并完成解码的回调。 当 SDK 收到远端视频的第一帧并解码成功时，自己会收到 `onFirstVideoFrameDecoded(userID, videoStreamType)` 回调, 应用层可在该回调中设置此用户的视频画布。<br>
	 * @param {Number} userID 远程用户 ID
	 * @param {NERtcVideoStreamType} videoStreamType 视频类型：
	 *  - MAIN：视频主流（默认摄像头）
	 *  - SUB：视频辅流（默认屏幕共享）
	 */
	onFirstVideoFrameDecoded(userID, videoStreamType) { }
	/**
	 * 进房后的回调<br>
	 * 远端用户视频编码配置已更新，自己会收到 `onUserVideoProfileUpdate(userID, maxProfile)` 回调<br>
	 * @param {Number} userID 本地或远程用户 ID
	 * @param {NERtcVideoProfileType} maxProfile 视频流类型：摄像头或屏幕分享
	 */
	onUserVideoProfileUpdate(userID, maxProfile) { }
	/**
	 * 语音播放设备已改变，自己会收到 `onAudioDeviceChanged(selected)` 回调<br>
	 * @param {NERTCAudioDevice} selected 选择的设备
	 * 	- SPEAKER_PHONE：扬声器
	 * 	- WIRED_HEADSET：有线耳机
	 * 	- EARPIECE：听筒
	 *  - BLUETOOTH_HEADSET：蓝牙耳机 
	 */
	onAudioDeviceChanged(selected) { }
	/**
	 * 语音播放设备已改变，自己会收到 `onAudioDeviceStateChange(deviceType, deviceState)` 回调<br>
	 * @param {NERTCAudioDeviceType} deviceType 设备类型
	 * 	- RECORD：音频采集设备
	 * 	- PLAYOUT：音频播放设备
	 * @param {NERTCAudioDeviceState} deviceState 设备状态
	 * 	- OPENED：打开成功
	 * 	- CLOSED：已关闭
	 *  - INIT_ERROR：初始化失败
	 *  - START_ERROR：开启失败
	 *  - UNKNOWN_ERROR：未知错误
	 */
	onAudioDeviceStateChange(deviceType, deviceState) { }
	/**
	 * 视频设备状态已改变，自己会收到 `onVideoDeviceStageChange(deviceState)` 回调， 该回调提示系统视频设备状态发生改变，比如被拔出或移除。如果设备已使用外接摄像头采集，外接摄像头被拔开后，视频会中断。<br>
	 * @param {NERTCVideoDeviceState} deviceState 设备状态
	 * 	- OPENED：打开成功
	 * 	- CLOSED：已关闭
	 *  - DISCONNECTED：相机断开，可能被其他应用抢占
	 *  - FREEZED：相机冻结
	 *  - UNKNOWN_ERROR：未知错误
	 */
	onVideoDeviceStageChange(deviceState) { }
	/**
	 * 本地网络类型已改变已改变，自己会收到 `onConnectionTypeChanged(newConnectionType)` 回调， 本地网络连接类型发生改变时，SDK 会触发该回调，并在回调中声明当前正在使用的网络连接类型。<br>
	 * @param {NERTCConnectionType} newConnectionType 设备状态
	 * 	- CONNECTION_UNKNOWN：未知类型
	 * 	- CONNECTION_ETHERNET ：以太网数据连接
	 *  - CONNECTION_WIFI ：相机断开，可能被其他应用抢占
	 *  - CONNECTION_2G：2G 移动网络
	 *  - CONNECTION_3G：3G 移动网络
	 *  - .CONNECTION_4G：4G 移动网络
	 * 	- CONNECTION_BLUETOOTH ：蓝牙连接
	 *  - CONNECTION_5G ：5G 移动网络
	 *  - CONNECTION_NONE：无网络
	 */
	onConnectionTypeChanged(newConnectionType) { }
	/**
	 * 客户端和服务器断开连接时，SDK 会进行重连，重连开始时，自己会收到 `onReconnectingStart()` 回调，重连结果请参考 onReJoinChannel、onDisconnect。<br>
	 */
	onReconnectingStart() { }
	/**
	 * 重新加入房间回调。 在弱网环境下，若客户端和服务器失去连接，SDK 会自动重连，自动重连成功后触发自己会收到 `onReJoinChannel(result, channelId)` 回调。<br>
	 * @param {NERTCErrorCode} result 0表示成功，其他值表示重新加入失败，错误码请参考NERTCErrorCode。
	 * @param {Number} channelId 	客户端加入的房间 ID
	*/
	onReJoinChannel(result, channelId) { }
	/**
	 * 暂时不接入
	 */
	onAudioMixingStateChanged() { }
	/**
	 * 暂时不接入
	 */
	onAudioMixingTimestampUpdate() { }
	/**
	 * 暂时不接入
	 */
	onAudioEffectTimestampUpdate() { }
	/**
	 * 暂时不接入
	 */
	onAudioEffectFinished() { }
	/**
	 * 提示房间内本地用户瞬时音量的回调。 该回调默认为关闭状态。可以通过 enableAudioVolumeIndication 方法开启。开启后，本地用户说话，SDK 会按 enableAudioVolumeIndication 方法中设置的时间间隔触发该回调
	 * @param {Number} volume 混音后的音量，范围为 0~100。
	 * @param {Boolean} vadFlag 混是否检测到人声。
	*/
	onLocalAudioVolumeIndication(volume, vadFlag ) { }
	/**
	 * 提示房间内谁正在说话及说话者瞬时音量的回调。 该回调默认为关闭状态。可以通过 enableAudioVolumeIndication 方法开启。开启后，无论房间内是否有人说话，SDK 都会按 enableAudioVolumeIndication 方法中设置的时间间隔触发该回调。 在返回的数组中：
	 * 	- 如果有 uid 出现在上次返回的数组中，但不在本次返回的数组中，则默认该 uid 对应的远端用户没有说话。
	 *  - 如果 volume 为 0，表示该用户没有说话。
	 *  - 如果数组为空，则表示此时远端没有人说话。
	 * @param {NERtcAudioVolumeInfo} volumeArray 混音后的音量，范围为 0~100。
	 * @param {Number} totalVolume 混音后的总音量，取值范围为 0~100。
	*/
	onRemoteAudioVolumeIndication(volumeArray, totalVolume ) { }
	/**
	 * 暂时不接入
	*/
	onLiveStreamState(taskId, pushUrl, liveState) { }
	
	/**
	 * 	- 通话中所有用户的网络状态回调。
	 * @param {Array} statsArray 通话中所有用户的网络状态回调。
	*/
	onNetworkQuality(statsArray) { }
	
	/**
	 * 	- 当前通话统计回调，SDK 定期向 App 报告当前通话的统计信息，每 2 秒触发一次。
	 * @param {Object} statsArray 通话中所有用户的网络状态回调。
	*/
	onRtcStats(statsArray) { }
	
	/**
	 * 	- 本地音频流统计信息回调。
	 * @param {Array} statsArray 通话中音频媒体状态回调。
	*/
	onLocalAudioStats(statsArray) { }
	
	/**
	 * 	- 远端音频流统计信息回调。
	 * @param {Array} statsArray 通话中音频媒体状态回调。
	*/
	onRemoteAudioStats(statsArray) { }
	
	/**
	 * 	- 本地视频流统计信息回调。
	 * @param {Array} statsArray 通话中视频媒体状态回调。
	*/
	onLocalVideoStats(statsArray) { }
	
	/**
	 * 	- 远端视频流统计信息回调。
	 * @param {Array} statsArray 通话中视频媒体状态回调。
	*/
	onRemoteVideoStats(statsArray) { }
	
	onClientRolechange(ordRole,newRole){}
}
