import { pluginVersion } from "../index";
const NERtcEvent = uni.requireNativePlugin('globalEvent');
const NERtcMoudle = uni.requireNativePlugin('NERTCUniPluginSDK-NERTCEngineImpl');

const Prefix = NERtcMoudle?.prefix();
let engine;
let listeners = new Map();

export class NERtcEngineImpl {
	getPrefix() {
		return Prefix;
	}
	
    static _callMethod(method, args) {
        return new Promise((resolve, _) => {
			console.log('[NERTC-APP] _callMethod method: ', method, JSON.stringify(args))
            NERtcMoudle.callMethod({ method: method, args: args }, (res) => {
                resolve(res);
            });
        });
    }
	
    static getInstance() {
        if (engine) {
            return engine;
        }
        throw new Error('[NERTC-APP] Get instance failed, Please create engine first');
    }
	
    static setupEngineWithContext(options) {
        if (engine) {
            return engine;
        }
		let imessage = '[NERTC-APP] setupEngineWithContext() 创建nertc引擎: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
        NERtcMoudle.setupEngineWithContext(options);
		imessage = '[NERTC-APP] setupEngineWithContext() nertc引擎创建完成'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		engine = new NERtcEngineImpl();
        return engine;
    }
	
    destroyEngine() {
        engine = undefined;
		const imessage = '[NERTC-APP] destroyEngine() 销毁nertc引擎'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
        NERtcMoudle.destroyEngine();
        listeners.forEach((_, key) => {
            NERtcEvent.removeEventListener(Prefix + key);
        });
        listeners.clear();
    }
	
	destroyTCPServer() {
		NERtcMoudle.destroyTCPServer()
	}
	
	sendMessage(options) {
		NERtcMoudle.sendMessage(options)
	}
	
	nertcPrint(message) {
		NERtcMoudle.nertcPrint(message)
	}
	
    addEventListener(event, callback) {
        const native_listener = (res) => {
            const { data } = res;
            callback(...data);
        };
        let map = listeners.get(event);
        if (map === undefined) {
            map = new Map();
            listeners.set(event, map);
        }
        map.set(callback, native_listener);
        NERtcEvent.addEventListener(Prefix + event, native_listener);
    }
	
    removeEventListener(event, callback) {
        if (callback === undefined) {
            NERtcEvent.removeEventListener(Prefix + event);
            listeners.delete(event);
        }
        else {
            const map = listeners.get(event);
            if (map === undefined)
                return;
            NERtcEvent.removeEventListener(Prefix + event, map.get(callback));
            map.delete(callback);
        }
    }
	
	removeAllEventListener() {
		listeners.forEach((_, key) => {
		    NERtcEvent.removeEventListener(Prefix + key);
		});
		listeners.clear();
	}
	
	uploadSdkInfo() {
		const imessage = '[NERTC-APP] uploadSdkInfo() sdk上传信息'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.uploadSdkInfo();
	}
	getConnectionState() {
	    return NERtcMoudle.getConnectionState();
	}
	
	setStatsObserver(enable) {
	    return NERtcMoudle.setStatsObserver(enable);
	}
	
	setChannelProfile(channelProfile) {
		const imessage = '[NERTC-APP] setChannelProfile() channelProfile: ' + channelProfile
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setChannelProfile(channelProfile);
	}
	
	setClientRole(role) {
		const imessage = '[NERTC-APP] setClientRole() role: ' + role
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setClientRole(role);
	}
	
	setParameters(param) {
		const imessage = '[NERTC-APP] setParameters() param: ' + JSON.stringify(param)
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setParameters(param);
	}
	isServiceEnable(serverType) {
		const imessage = '[NERTC-APP] isServiceEnable() serverType: ' + serverType
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.isServiceEnable(serverType);
	}
	
	joinChannel(channelParam) {
		const imessage = '[NERTC-APP] joinChannel() 房间信息: ' + JSON.stringify(channelParam, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.joinChannel(channelParam);
	}
	
	leaveChannel() {
		const imessage = '[NERTC-APP] leaveChannel() 离开房间'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.leaveChannel();
	}
	
	setupLocalVideoCanvas(videoCanvasParam) {
		const imessage = '[NERTC-APP] setupLocalVideoCanvas() 本地视频画布设置: ' + JSON.stringify(videoCanvasParam, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setupLocalVideoCanvas(videoCanvasParam);
	}
	destroyLocalVideoCanvas() {
		const imessage = '[NERTC-APP] destroyLocalVideoCanvas() 销毁本地视频画布'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.destroyLocalVideoCanvas();
	}
	
	async setupRemoteVideoCanvas(videoCanvasParam) {
		const imessage = '[NERTC-APP] setupRemoteVideoCanvas() 远端视频画布设置: ' + JSON.stringify(videoCanvasParam, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.setupRemoteVideoCanvas(videoCanvasParam);
	}
	destroyRemoteVideoCanvas(options) {
		const imessage = '[NERTC-APP] destroyRemoteVideoCanvas() 销毁远端视频画布: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.destroyRemoteVideoCanvas(options);
	}
	async setupLocalSubStreamVideoCanvas(videoCanvasParam) {
		const imessage = '[NERTC-APP] setupLocalSubStreamVideoCanvas() 设置本地视频辅流画布: ' + JSON.stringify(videoCanvasParam, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setupLocalSubStreamVideoCanvas(videoCanvasParam);
	}
	destroyLocalSubStreamVideoCanvas() {
		const imessage = '[NERTC-APP] destroyLocalSubStreamVideoCanvas() 销毁本地视频辅流画布'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.destroyLocalSubStreamVideoCanvas();
	}
	
	async setupRemoteSubStreamVideoCanvas(videoCanvasParam) {
		const imessage = '[NERTC-APP] setupRemoteSubStreamVideoCanvas() 远端视频辅流画布设置: ' + JSON.stringify(videoCanvasParam, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setupRemoteSubStreamVideoCanvas(videoCanvasParam);
	}
	destroyRemoteSubStreamVideoCanvas(options) {
		const imessage = '[NERTC-APP] destroyRemoteSubStreamVideoCanvas() 销毁远端视频辅流画布: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.destroyRemoteSubStreamVideoCanvas(options);
	}
	
	changeVideoCanvas(videoCanvasParam) {
		const imessage = '[NERTC-APP] changeVideoCanvas() 视频画布设置: ' + JSON.stringify(videoCanvasParam, null, ' ')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.changeVideoCanvas(videoCanvasParam);
	}
	
    startPreview(videoStreamType) {
		const imessage = '[NERTC-APP] startPreview() 视频预览, videoStreamType: ' + videoStreamType
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
        return NERtcMoudle.startPreview(videoStreamType);
    }
    stopPreview(videoStreamType) {
		const imessage = '[NERTC-APP] stopPreview() 停止视频预览, videoStreamType: ' + videoStreamType
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
        return NERtcMoudle.stopPreview(videoStreamType);
    }

    setSpeakerphoneOn(enable) {
		const imessage = '[NERTC-APP] setSpeakerphoneOn() enable: ' + enable
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
        return NERtcMoudle.setSpeakerphoneOn(enable);
    }
	
	enableMediaPub(enable){
		const imessage = '[NERTC-APP] enableMediaPub() enable: ' + enable
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.enableMediaPub(enable);
	}
	
	setRecordDeviceMute(enable){
		const imessage = '[NERTC-APP] setRecordDeviceMute() enable: ' + enable
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.setRecordDeviceMute(enable);
	}
	
	adjustRecordingSignalVolume(volume){
		const imessage = '[NERTC-APP] adjustRecordingSignalVolume() volume: ' + volume
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.adjustRecordingSignalVolume(volume);
	}
	
	adjustUserPlaybackSignalVolume(options){
		const imessage = '[NERTC-APP] adjustUserPlaybackSignalVolume() options: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.adjustUserPlaybackSignalVolume(options);
	}
	
	adjustChannelPlaybackSignalVolume(volume){
		const imessage = '[NERTC-APP] adjustChannelPlaybackSignalVolume(), volume: ' + volume
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.adjustChannelPlaybackSignalVolume(volume);
	}
	
	enableEarback(options){
		const imessage = '[NERTC-APP] enableEarback() options: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.enableEarback(options);
	}
	
	setEarbackVolume(volume){
		const imessage = '[NERTC-APP] setEarbackVolume() volume: ' + volume
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.setEarbackVolume(volume);
	}
	
	enableAudioVolumeIndication(options){
		const imessage = '[NERTC-APP] enableAudioVolumeIndication() options: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.enableAudioVolumeIndication(options);
	}
	
	enableLocalVideo(options) {
		const imessage = '[NERTC-APP] enableLocalVideo() options: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.enableLocalVideo(options);
	}
	
	setAudioProfile(options) {
		const imessage = '[NERTC-APP] setAudioProfile(): ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.setAudioProfile(options);
	}
	
	startScreenCapture(options) {
		const imessage = '[NERTC-APP] startScreenCapture() options: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.startScreenCapture(options);
	}
	
	stopScreenCapture() {
		const imessage = '[NERTC-APP] stopScreenCapture()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.stopScreenCapture();
	}
	
	enableLoopbackRecording(enable) {
		const imessage = '[NERTC-APP] enableLoopbackRecording() enable: ' + enable
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.enableLoopbackRecording(enable);
	}
	
	adjustLoopBackRecordingSignalVolume(volume) {
		const imessage = '[NERTC-APP] adjustLoopBackRecordingSignalVolume() volume: ' + volume
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.adjustLoopBackRecordingSignalVolume(volume);
	}
	
	adjustPlaybackSignalVolume(volume) {
		const imessage = '[NERTC-APP] adjustPlaybackSignalVolume() volume: ' + volume
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.adjustPlaybackSignalVolume(volume);
	}
	
	
	setLocalVideoConfig(options) {
		const imessage = '[NERTC-APP] setLocalVideoConfig() options: ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.setLocalVideoConfig(options);
	}
	
	enableLocalAudio(enable) {
		const imessage = '[NERTC-APP] enableLocalAudio(), enable: ' + enable
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.enableLocalAudio(enable);
	}
	
	muteLocalVideo(mute) {
		const imessage = '[NERTC-APP] muteLocalVideo(), mute: ' + mute
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.muteLocalVideo(mute);
	}
	
	muteLocalAudio(mute) {
		const imessage = '[NERTC-APP] muteLocalAudio(), mute: ' + mute
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.muteLocalAudio(mute);
	}
	
	startAudioMixing(audioMixingParam){
		const imessage = '[NERTC-APP] startAudioMixing(), audioMixingParam: ' + JSON.stringify(audioMixingParam, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return NERtcMoudle.startAudioMixing(audioMixingParam)
	}
	
	stopAudioMixing() {
		const imessage = '[NERTC-APP] stopAudioMixing()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.stopAudioMixing();
	}
	
	pauseAudioMixing() {
		const imessage = '[NERTC-APP] pauseAudioMixing()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.pauseAudioMixing();
	}
	
	resumeAudioMixing() {
		const imessage = '[NERTC-APP] resumeAudioMixing()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.resumeAudioMixing();
	}
	
	setAudioMixingPlaybackVolume(volume) {
		const imessage = '[NERTC-APP] setAudioMixingPlaybackVolume() volume: ' + volume
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setAudioMixingPlaybackVolume(volume);
	}
	
	setAudioMixingSendVolume(volume) {
		const imessage = '[NERTC-APP] setAudioMixingSendVolume() volume: ' + volume
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setAudioMixingSendVolume(volume);
	}
	
	getAudioMixingPlaybackVolume() {
		const imessage = '[NERTC-APP] getAudioMixingPlaybackVolume()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.getAudioMixingPlaybackVolume();
	}
	
	getAudioMixingSendVolume() {
		const imessage = '[NERTC-APP] getAudioMixingSendVolume()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.getAudioMixingSendVolume();
	}
	
	getAudioMixingDuration() {
		const imessage = '[NERTC-APP] getAudioMixingDuration()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.getAudioMixingDuration();
	}
	
	setAudioMixingPosition(position) {
		const imessage = '[NERTC-APP] setAudioMixingPosition() position: ' + position
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setAudioMixingPosition(position);
	}
	
	getAudioMixingCurrentPosition() {
		const imessage = '[NERTC-APP] getAudioMixingCurrentPosition()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.getAudioMixingCurrentPosition();
	}
	
	getAudioMixingPitch() {
		const imessage = '[NERTC-APP] getAudioMixingPitch()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.getAudioMixingPitch();
	}
	
	setAudioMixingPitch(pitch) {
		const imessage = '[NERTC-APP] setAudioMixingPitch() pitch: ' + pitch
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setAudioMixingPitch(pitch);
	}
	
	switchCamera() {
		const imessage = '[NERTC-APP] switchCamera()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.switchCamera();
	}
	
	subscribeRemoteVideo(options) {
		const imessage = '[NERTC-APP] subscribeRemoteVideo(): ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.subscribeRemoteVideo(options);
	}

    subscribeRemoteSubStreamVideo(options) {
		const imessage = '[NERTC-APP] subscribeRemoteSubStreamVideo(): ' + JSON.stringify(options, null, '')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
        return NERtcMoudle.subscribeRemoteSubStreamVideo(options);
    }
	
	startBeauty() {
		const imessage = '[NERTC-APP] startBeauty()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.startBeauty();
	}
	stopBeauty() {
		const imessage = '[NERTC-APP] stopBeauty()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.stopBeauty();
	}
	enableBeauty(enable) {
		const imessage = '[NERTC-APP] enableBeauty() enable：' + enable
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.enableBeauty(enable);
	}
	setBeautyEffect(type, level) {
		const imessage = '[NERTC-APP] setBeautyEffect() type：' + type + ', level: ' + level
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setBeautyEffect(type, level);
	}
	addBeautyFilter(path) {
		const imessage = '[NERTC-APP] addBeautyFilter() path: ' + path
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.addBeautyFilter(path);
	}
	removeBeautyFilter() {
		const imessage = '[NERTC-APP] removeBeautyFilter()'
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.removeBeautyFilter();
	}
	setBeautyFilterLevel(level) {
		const imessage = '[NERTC-APP] setBeautyFilterLevel() level: ' + level
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
	    return NERtcMoudle.setBeautyFilterLevel(level);
	}
	takeLocalSnapshot(videoStreamType) {
		let imessage = '[NERTC-APP] takeLocalSnapshot() videoStreamType: ' + videoStreamType
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return new Promise((resolve, reject) => {
			NERtcMoudle.takeLocalSnapshot(videoStreamType, (data) => {
				let imessage = '[NERTC-APP] takeLocalSnapshot() 收到base64图片数据,长度: ' + (data.img || '').length
				console.log(imessage)
				NERtcMoudle.nertcPrint(imessage)
				resolve(data)
			});
		})
	}
	takeRemoteSnapshot(options) {
		const imessage = '[NERTC-Web] takeRemoteSnapshot() param: ' + JSON.stringify(options, null, ' ')
		console.log(imessage)
		NERtcMoudle.nertcPrint(imessage)
		return new Promise( (resolve, reject) => {
			NERtcMoudle.takeRemoteSnapshot(options, (data) => {
				let imessage = '[NERTC-APP] takeRemoteSnapshot() 收到base64图片数据,长度: ' + (data.img || '').length
				console.log(imessage)
				NERtcMoudle.nertcPrint(imessage)
				resolve(data)
			});
		})
	}
}
