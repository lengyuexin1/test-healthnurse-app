/////////////////////////////////////////////////////////////////////////////////
//
//                     NERTCEngine 的异常（严重）
//
/////////////////////////////////////////////////////////////////////////////////

/** SDK错误码定义(https://doc.yunxin.163.com/nertc/docs/jUxMjc0OTY?platform=android) */
export const NERTCEngineErrorCode;
(function (NERTCEngineErrorCode) {
    /** 执行成功。 */
    NERTCErrorCode[NERTCErrorCode["OK"] = 0] = "OK";
	/** 通用参数错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_PARAMS"] = 1] = "OK";
    /** 权限不足。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_PERMISSION_DENIED"] = 403] = "ENGINE_ERROR_ROOM_SERVER_PERMISSION_DENIED";
    /** 请求超时。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_REQUEST_TIMEOUT"] = 408] = "ENGINE_ERROR_ROOM_SERVER_REQUEST_TIMEOUT";
    /**服务器请求参数错误。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_INVALID_PARAMETERS"] = 414] = "ENGINE_ERROR_ROOM_SERVER_INVALID_PARAMETERS	";
    /** 非法的AppKey。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_INVALID_APPKEY"] = 417] = "ENGINE_ERROR_ROOM_SERVER_INVALID_APPKEY";
    /** 分配房间时出现服务器未知错误。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_UNKNOWN_ERROR"] = 500] = "ENGINE_ERROR_ROOM_SERVER_UNKNOWN_ERROR";
    /** 登录房间的用户数超过限制的两人。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_ONLY_SUPPORT_TWO_USERS"] = 600] = "ENGINE_ERROR_ROOM_SERVER_ONLY_SUPPORT_TWO_USERS";
	/** 登录房间时权限密钥错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_PERMISSION_KEY_ERROR"] = 901] = "ENGINE_ERROR_ROOM_SERVER_PERMISSION_KEY_ERROR";
	/** 登录房间时权限密钥过期。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_PERMISSION_KEY_TIMEOU"] = 902] = "ENGINE_ERROR_ROOM_SERVER_PERMISSION_KEY_TIMEOU";
	/** ask请求无效，因为该请求被后续操作覆盖了。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_INVAILD_REQUEST"] = 1301] = "ENGINE_ERROR_LIVESTREAM_INVAILD_REQUEST";
	/** 推流的参数格式错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_INVAILD_PARAMETERS"] = 1400] = "ENGINE_ERROR_LIVESTREAM_INVAILD_PARAMETERS";
	/** 房间已经退出。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_ROOM_HAS_EXITED"] = 1401] = "ENGINE_ERROR_LIVESTREAM_ROOM_HAS_EXITED";
	/** 推流任务超出上限。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_EXCEED_LIMIT"] = 1402] = "ENGINE_ERROR_LIVESTREAM_EXCEED_LIMIT";
	/** 推流 ID 重复。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_DUPLICATE_ID"] = 1403] = "ENGINE_ERROR_LIVESTREAM_DUPLICATE_ID";
	/** taskId任务不存在，或房间不存在。。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_NOT_FOUND"] = 1404] = "ENGINE_ERROR_LIVESTREAM_NOT_FOUND";
	/** 请求失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_REQUEST_FAILED"] = 1417] = "ENGINE_ERROR_LIVESTREAM_REQUEST_FAILED";
	/** 服务器内部错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_INTERNAL_SERVER_ERROR"] = 1500] = "ENGINE_ERROR_LIVESTREAM_INTERNAL_SERVER_ERROR";
	/** 布局参数错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_INVALID_LAYOUT"] = 1501] = "ENGINE_ERROR_LIVESTREAM_INVALID_LAYOUT";
	/**布局的图片错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LIVESTREAM_USER_PICTURE_ERROR"] = 1512] = "ENGINE_ERROR_LIVESTREAM_USER_PICTURE_ERROR";
	/** 用户无发流权限。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_PERMISSION_KEY_NO_PUBLISH_PERMISSION"] = 1620] = "ENGINE_ERROR_PERMISSION_KEY_NO_PUBLISH_PERMISSION";
	/** 用户无订阅权限。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_PERMISSION_KEY_ENGINE_ERROR_PERMISSION_KEY_NO_SUBSCRIBE_PERMISSION"] = 2803] = "ENGINE_ERROR_PERMISSION_KEY_ENGINE_ERROR_PERMISSION_KEY_NO_SUBSCRIBE_PERMISSION";
	/** 加入房间的人数达到限制。 */
	NERTCErrorCode[NERTCErrorCode["kLiteSDKServerPersonsInRoomReachedTheLimit"] = 4003] = "kLiteSDKServerPersonsInRoomReachedTheLimit";
	/** 内部错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_FATAL"] = 30001] = "ENGINE_ERROR_FATAL";
	/** 内存溢出。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_OUT_OF_MEMORY"] = 30002] = "ENGINE_ERROR_OUT_OF_MEMORY";
	/** 参数错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_INVALID_PARAM"] = 30003] = "ENGINE_ERROR_INVALID_PARAM";
	/** 不支持的操作。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_NOT_SUPPORTED"] = 30004] = "ENGINE_ERROR_NOT_SUPPORTED";
	/** 状态错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_INVALID_STATE"] = 30005] = "ENGINE_ERROR_INVALID_STATE";
	/** 缺乏资源。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_LACK_OF_RESOURCE"] = 30006] = "ENGINE_ERROR_LACK_OF_RESOURCE";
	/** index序号非法。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_INVALID_INDEX"] = 30007] = "ENGINE_ERROR_INVALID_INDEX";
	/**设备未找到。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_DEVICE_NOT_FOUND"] = 30008] = "ENGINE_ERROR_DEVICE_NOT_FOUND";
	/** 设备 ID 不存在。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_INVALID_DEVICE_SOURCEID"] = 30009] = "ENGINE_ERROR_INVALID_DEVICE_SOURCEID";
	/** 视频能力profile type不符合要求。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_INVALID_VIDEO_PROFILE"] = 30010] = "ENGINE_ERROR_INVALID_VIDEO_PROFILE";
	/** 创建设备失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_CREATE_DEVICE_SOURCE_FAIL"] = 30011] = "ENGINE_ERROR_CREATE_DEVICE_SOURCE_FAIL";
	/** 画布非法。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_INVALID_RENDER"] = 30012] = "ENGINE_ERROR_INVALID_RENDER";
	/** 本地视频预览已打开。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_DEVICE_PREVIEW_ALREADY_STARTED"] = 30013] = "ENGINE_ERROR_DEVICE_PREVIEW_ALREADY_STARTED";
	/** 高级 Token 鉴权失败，用户权限验证错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_USER_PERMISSION_KEY_AUTH_FAILED"] = 30121] = "ENGINE_ERROR_USER_PERMISSION_KEY_AUTH_FAILED";
	/** SEI 超过最大数据限制。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_SEI_EXCEED_MAX_DATA_LIMIT"] = 30122] = "ENGINE_ERROR_SEI_EXCEED_MAX_DATA_LIMIT";
	/** 数据通道发送大小超过限制。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_DATA_CHANNEL_EXCEED_MAX_DATA_LIMIT"] = 30123] = "ENGINE_ERROR_DATA_CHANNEL_EXCEED_MAX_DATA_LIMIT";
	/** 连接未找到。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_CONNECTION_NOT_FOUND"] = 30200] = "ENGINE_ERROR_CONNECTION_NOT_FOUND";
	/** 媒体流不存在。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_STREAM_NOT_FOUND"] = 30201] = "ENGINE_ERROR_STREAM_NOT_FOUND";
	/** 添加媒体播放器音轨失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADD_TRACK_FAIL"] = 30202] = "ENGINE_ERROR_ADD_TRACK_FAIL";
	/** 媒体播放器音轨未找到。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_TRACK_NOT_FOUND"] = 30203] = "ENGINE_ERROR_TRACK_NOT_FOUND";
	/** 媒体连接已断开。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_MEDIA_CONNECTION_DISCONNECTED"] = 30204] = "ENGINE_ERROR_MEDIA_CONNECTION_DISCONNECTED";
	/** 信令断开。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_SIGNAL_DISCONNECTED"] = 30205] = "ENGINE_ERROR_SIGNAL_DISCONNECTED";
	/** 用户被管理员移出房间。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_SERVER_KICKED"] = 30206] = "ENGINE_ERROR_SERVER_KICKED";
	/** 房间已关闭。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_CLOSED"] = 30207] = "ENGINE_ERROR_ROOM_CLOSED";
	/** 因为切换房间而离开房间。 */
	NERTCErrorCode[NERTCErrorCode["LEAVE_CHANNEL_FOR_SWITCH"] = 30208] = "LEAVE_CHANNEL_FOR_SWITCH";
	/** 因为重复 UID 登录而离开房间。 */
	NERTCErrorCode[NERTCErrorCode["LEAVE_CHANNEL_FOR_DUPLICATE_UID"] = 30209] = "LEAVE_CHANNEL_FOR_DUPLICATE_UID";
	/** 没有音频设备的权限。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_No_Authorize"] = 40000] = "ENGINE_ERROR_ADM_No_Authorize";
	/** 初始化音频采集设备（麦克风）失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_INIT_RECORDING_FAILED"] = 40001] = "ENGINE_ERROR_ADM_INIT_RECORDING_FAILED";
	/** 启动音频采集设备（麦克风）失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_START_RECORDING_FAILED"] = 40002] = "ENGINE_ERROR_ADM_START_RECORDING_FAILED";
	/** 停止音频采集设备（麦克风）失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_STOP_RECORDING_FAILED"] = 40003] = "ENGINE_ERROR_ADM_STOP_RECORDING_FAILED";
	/** 初始化音频播放设备失败。。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_INIT_PLAYOUT_FAILED"] = 40004] = "ENGINE_ERROR_ADM_INIT_PLAYOUT_FAILED";
	/** 音频播放设备启动失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_START_PLAYOUT_FAILED"] = 40005] = "ENGINE_ERROR_ADM_START_PLAYOUT_FAILED";
	/** 音频播放设备停止失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_STOP_PLAYOUT_FAILED"] = 40006] = "ENGINE_ERROR_ADM_STOP_PLAYOUT_FAILED";
	/** 音频采集设备运行异常。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_RECORDING_FAILED"] = 40007] = "ENGINE_ERROR_ADM_RECORDING_FAILED";
	/** 音频播放设备运行异常。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_PLAYOUT_FAILED"] = 40008] = "ENGINE_ERROR_ADM_PLAYOUT_FAILED";
	/** 音频播放遇到自动播放受限的问题（H5专用）。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ADM_AUTO_PLAYOUT_FAILED"] = 41030] = "ENGINE_ERROR_ADM_AUTO_PLAYOUT_FAILED";
	/** 没有视频设备权限。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_NO_AUTHORIZE"] = 50000] = "ENGINE_ERROR_VDM_NO_AUTHORIZE";
	/** 非屏幕共享使用辅流。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_NOT_SCREEN_USE_SUB_STREAM"] = 50001] = "ENGINE_ERROR_VDM_NOT_SCREEN_USE_SUB_STREAM";
	/** 摄像头断开。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_CAMERA_DISCONNECT"] = 50303] = "ENGINE_ERROR_VDM_CAMERA_DISCONNECT";
	/** 摄像头死机。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_CAMERA_FREEZED"] = 50304] = "ENGINE_ERROR_VDM_CAMERA_FREEZED";
	/** 未知摄像头错误。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_CAMERA_UNKNOWN_ERROR"] = 50305] = "ENGINE_ERROR_VDM_CAMERA_UNKNOWN_ERROR";
	/** 摄像头无数据帧。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_CAMERA_NO_FRAME"] = 50306] = "ENGINE_ERROR_VDM_CAMERA_NO_FRAME";
	/** 摄像头启动失败。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_CAMERA_CREATE_FAIL"] = 50307] = "ENGINE_ERROR_VDM_CAMERA_CREATE_FAIL";
	/** 没有录制视频权限。 */
	NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_VDM_SCREEN_CAPTURE_NO_AUTHORIZE"] = 50400] = "ENGINE_ERROR_VDM_SCREEN_CAPTURE_NO_AUTHORIZE";
})(NERTCErrorCode || (NERTCErrorCode = {}));


/////////////////////////////////////////////////////////////////////////////////
//
//                     JS 封装层抛出的异常（严重）
//
/////////////////////////////////////////////////////////////////////////////////
/**
 * @namespace ErrorCode
 * @description 错误码
 */
export const NERTCJSError = {
    /**
     * 未知错误
     * @default 0xFFFF
     * @memberof module:ErrorCode
     */
    UNKNOWN: 0xffff,
    /**
     * 无效参数
     *
     * @default 0x1000
     * @memberof module:ErrorCode
     */
    INVALID_PARAMETER: 0x1000,
    /**
     * 非法操作
     *
     * @default 0x1001
     * @memberof module:ErrorCode
     */
    INVALID_OPERATION: 0x1001,
};
const getErrorName = function (code) {
    for (let key in TXLiteJSError) {
        if (TXLiteJSError[key] === code) {
            return key;
        }
    }
    return 'UNKNOWN';
};
/**
 * NERTCJSError 错误对象<br>
 * @extends Error
 * @namespace ErrorCode
 */
class NERTCJSError extends Error {
    constructor({ code = NERTCJSError.UNKNOWN, message, extraInfo }) {
        if (extraInfo) {
            const tempError = {
                errCode: code,
                errMsg: message,
                extraInfo: Object.assign(Object.assign({}, extraInfo), { errCodeUrl: errorCodeUrl }),
            };
            super(JSON.stringify(tempError));
        } else {
            super(message +
                ` <${getErrorName(code)} 0x${code.toString(16)}>. Refer to: ${errorCodeUrl}`);
        }
        this.errCode = code;
        this.errMsg = message;
        this.extraInfo = Object.assign(Object.assign({}, extraInfo), { errCodeUrl: errorCodeUrl });
    }
    /**
     * 获取错误码<br>
     * 详细错误码列表参见 {@link module:ErrorCode ErrorCode}
     * @memberof NERTCJSError
     */
    getCode() {
        return this.errCode;
    }
	getMessage() {
	    return this.errMsg;
	}
}
export default NERTCJSError;