
/** SDK日志等级 */
export var NERTCLogLevel;
(function (NERTCLogLevel) {
    /** Error 级别日志信息。 */
    NERTCLogLevel[NERTCLogLevel["FATAL"] = 0] = "FATAL";
    /** Error 级别日志信息。 */
    NERTCLogLevel[NERTCLogLevel["ERROR"] = 1] = "ERROR";
    /** Warning 级别日志信息。 */
    NERTCLogLevel[NERTCLogLevel["WARNING"] = 2] = "WARNING";
    /** Info 级别日志信息。默认级别。 */
    NERTCLogLevel[NERTCLogLevel["INFO"] = 3] = "INFO";
    /** Detail Info 级别日志信息。 */
    NERTCLogLevel[NERTCLogLevel["DETAIL_INFO"] = 4] = "DETAIL_INFO";
    /** Verbos 级别日志信息。 */
    NERTCLogLevel[NERTCLogLevel["VERBOS"] = 5] = "VERBOS";
    /** Debug 级别日志信息。如果你想获取最完整的日志，可以将日志级别设为该等级。 */
    NERTCLogLevel[NERTCLogLevel["DEBUG"] = 6] = "DEBUG";
})(NERTCLogLevel || (NERTCLogLevel = {}));


/** SDK错误码定义(https://doc.yunxin.163.com/nertc/docs/jUxMjc0OTY?platform=android) */
export var NERTCErrorCode;
(function (NERTCErrorCode) {
    /** 级别日志信息。 */
    NERTCErrorCode[NERTCErrorCode["OK"] = 0] = "OK";
    /** 权限不足。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_PERMISSION_DENIED"] = 403] = "ENGINE_ERROR_ROOM_SERVER_PERMISSION_DENIED";
    /** 请求超时。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_REQUEST_TIMEOUT"] = 408] = "ENGINE_ERROR_ROOM_SERVER_REQUEST_TIMEOUT";
    /**服务器请求参数错误。 */
    NERTCErrorCode[NERTCErrorCode["ENGINE_ERROR_ROOM_SERVER_INVALID_PARAMETERS"] = 414] = "ENGINE_ERROR_ROOM_SERVER_INVALID_PARAMETERS";
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

/** RTC房间场景 */
export var NERTCChannelProfile;
(function (NERTCChannelProfile) {
    /** 通话场景。 */
    NERTCChannelProfile[NERTCChannelProfile["COMMUNICATION"] = 0] = "COMMUNICATION";
    /** 直播场景。 */
    NERTCChannelProfile[NERTCChannelProfile["LIVE_BROADCASTING"] = 1] = "LIVE_BROADCASTING";
})(NERTCChannelProfile || (NERTCChannelProfile = {}));

/** RTC用户角色 */
export var NERTCUserRole;
(function (NERTCUserRole) {
    /** 主播。 */
    NERTCUserRole[NERTCUserRole["CLIENT_ROLE_BROADCASTER"] = 0] = "CLIENT_ROLE_BROADCASTER";
    /** 观众。 */
    NERTCUserRole[NERTCUserRole["CLIENT_ROLE_AUDIENCE"] = 1] = "CLIENT_ROLE_AUDIENCE";
})(NERTCUserRole || (NERTCUserRole = {}));

/** 当前房间的连接状态 */
export var NERTCChannelConnectionState;
(function (NERTCChannelConnectionState) {
    /** 尚未加入房间。 */
    NERTCChannelConnectionState[NERTCChannelConnectionState["CONNECTION_STATE_DISCONNECTED"] = 1] = "CONNECTION_STATE_DISCONNECTED";
    /** 正在加入房间。 */
    NERTCChannelConnectionState[NERTCChannelConnectionState["CONNECTION_STATE_CONNECTING"] = 2] = "CONNECTION_STATE_CONNECTING";
	/** 加入房间成功。 */
	NERTCChannelConnectionState[NERTCChannelConnectionState["CONNECTION_STATE_CONNECTED"] = 3] = "CONNECTION_STATE_CONNECTED";
	/** 正在尝试重新加入房间。 */
	NERTCChannelConnectionState[NERTCChannelConnectionState["CONNECTION_STATE_RECONNECTING"] = 4] = "CONNECTION_STATE_RECONNECTING";
	/** 加入房间失败。 */
	NERTCChannelConnectionState[NERTCChannelConnectionState["CONNECTION_STATE_FAILED"] = 5] = "CONNECTION_STATE_FAILED";
})(NERTCChannelConnectionState || (NERTCChannelConnectionState = {}));

/** SDK网络类型定义 */
export var NERTCConnectionType;
(function (NERTCConnectionType) {
    /** 未知类型。 */
    NERTCConnectionType[NERTCConnectionType["CONNECTION_UNKNOWN"] = 0] = "CONNECTION_UNKNOWN";
    /** 以太网数据连接。 */
    NERTCConnectionType[NERTCConnectionType["CONNECTION_ETHERNET"] = 1] = "CONNECTION_ETHERNET";
    /** WIFI。 */
    NERTCConnectionType[NERTCConnectionType["CONNECTION_WIFI"] = 2] = "CONNECTION_WIFI";
    /** 2G 移动网络。 */
    NERTCConnectionType[NERTCConnectionType["CONNECTION_2G"] = 3] = "CONNECTION_2G";
    /** 3G 移动网络。 */
    NERTCConnectionType[NERTCConnectionType["CONNECTION_3G"] = 4] = "CONNECTION_3G";
    /** 4G 移动网络。 */
    NERTCConnectionType[NERTCConnectionType["CONNECTION_4G"] = 5] = "CONNECTION_4G";
    /** 蓝牙连接。 */
    NERTCConnectionType[NERTCConnectionType["CONNECTION_BLUETOOTH"] = 6] = "CONNECTION_BLUETOOTH";
	/** 5G 移动网络。 */
	NERTCConnectionType[NERTCConnectionType["CONNECTION_5G"] = 7] = "CONNECTION_5G";
	/** 网络连接类型缺失。 */
	NERTCConnectionType[NERTCConnectionType["CONNECTION_NONE"] = 8] = "CONNECTION_NONE";
})(NERTCConnectionType || (NERTCConnectionType = {}));


/** 屏幕共享功能的编码策略倾向。*/
export var NERtcSubStreamContentPrefer;
(function (NERtcSubStreamContentPrefer) {
    /** （默认）内容类型为动画。当共享的内容是视频、电影或游戏时，推荐选择该内容类型。当用户设置内容类型为动画时，按用户设置的帧率处理。 */
    NERtcSubStreamContentPrefer[NERtcSubStreamContentPrefer["CONTENT_PREFER_MOTION"] = 0] = "CONTENT_PREFER_MOTION";
    /** 内容类型为细节。当共享的内容是图片或文字时，推荐选择该内容类型。当用户设置内容类型为细节时，最高允许用户设置到 10 帧，设置超过 10 帧时，按 10 帧处理。 */
    NERtcSubStreamContentPrefer[NERtcSubStreamContentPrefer["CONTENT_PREFER_DETAILS"] = 1] = "CONTENT_PREFER_DETAILS";
})(NERtcSubStreamContentPrefer || (NERtcSubStreamContentPrefer = {}));

/** 远端视频流类型 */
export var NERtcRemoteVideoStreamType;
(function (NERtcRemoteVideoStreamType) {
    /** 视频主流，默认是摄像头camera */
    NERtcRemoteVideoStreamType[NERtcRemoteVideoStreamType["HIGH"] = 0] = "HIGH";
    /** 视频辅流，默认是屏幕共享screen */
    NERtcRemoteVideoStreamType[NERtcRemoteVideoStreamType["LOW"] = 1] = "LOW";
})(NERtcRemoteVideoStreamType || (NERtcRemoteVideoStreamType = {}));

/** 视频流类型 */
export var NERtcVideoStreamType;
(function (NERtcVideoStreamType) {
    /** 视频主流，默认是摄像头camera */
    NERtcVideoStreamType[NERtcVideoStreamType["MAIN"] = 0] = "MAIN";
    /** 视频辅流，默认是屏幕共享screen */
    NERtcVideoStreamType[NERtcVideoStreamType["SUB"] = 1] = "SUB";
})(NERtcVideoStreamType || (NERtcVideoStreamType = {}));

/** 视频渲染缩放模式 */
export var NERTCRenderMode;
(function (NERTCRenderMode) {
    /** 适应区域。视频尺寸等比缩放。保证所有区域被填满，视频超出部分会被裁剪 */
    NERTCRenderMode[NERTCRenderMode["Fit"] = 0] = "Fit";
    /** 填满视窗模式。视频尺寸非等比缩放。保证视频内容全部显示，且填满视窗 */
    NERTCRenderMode[NERTCRenderMode["FullFill"] = 1] = "FullFill";
    /** 适配视窗模式。视频尺寸等比缩放。优先保证视频内容全部显示。若视频尺寸与显示视窗尺寸不一致，视窗未被填满的区域填充背景色。 */
    NERTCRenderMode[NERTCRenderMode["CropFill"] = 2] = "CropFill";
})(NERTCRenderMode || (NERTCRenderMode = {}));

/** 视频镜像模式 */
export var NERTCMirrorMode;
(function (NERTCMirrorMode) {
    /** 默认（由 SDK 决定模式）[如果使用前置摄像头，SDK 默认启用镜像模式；如果使用后置摄像头，SDK 默认关闭镜像模式]。 */
    NERTCMirrorMode[NERTCMirrorMode["AUTO"] = 0] = "AUTO";
    /** 启用镜像模式。 */
    NERTCMirrorMode[NERTCMirrorMode["ENABLE"] = 1] = "ENABLE";
    /** 关闭镜像模式。 */
    NERTCMirrorMode[NERTCMirrorMode["DISABLE"] = 2] = "DISABLE";
})(NERTCMirrorMode || (NERTCMirrorMode = {}));

/** 视频编码帧率 */
export var NERtcVideoFrameRate ;
(function (NERtcVideoFrameRate ) {
    /** 默认设置。SDK默认帧率。 */
    NERtcVideoFrameRate [NERtcVideoFrameRate["FRAME_RATE_FPS_DEFAULT"] = 0] = "FRAME_RATE_FPS_DEFAULT";
    /** 帧率为7。 */
    NERtcVideoFrameRate [NERtcVideoFrameRate["FRAME_RATE_FPS_7"] = 7] = "FRAME_RATE_FPS_7";
    /** 帧率为10。 */
    NERtcVideoFrameRate [NERtcVideoFrameRate["FRAME_RATE_FPS_10"] = 10] = "FRAME_RATE_FPS_10";
    /** 帧率为15。 */
    NERtcVideoFrameRate [NERtcVideoFrameRate["FRAME_RATE_FPS_15 "] = 15] = "FRAME_RATE_FPS_15 ";
    /** 帧率为24。 */
    NERtcVideoFrameRate [NERtcVideoFrameRate["FRAME_RATE_FPS_24"] = 24] = "FRAME_RATE_FPS_24";
	/** 帧率为30。 */
	NERtcVideoFrameRate [NERtcVideoFrameRate["FRAME_RATE_FPS_30"] = 30] = "FRAME_RATE_FPS_30";
})(NERtcVideoFrameRate  || (NERtcVideoFrameRate  = {}));

/** 视频裁剪模式 */
export var NERtcVideoCropMode;
(function (NERtcVideoCropMode) {
    /** 相机原始比例。 */
    NERtcVideoCropMode[NERtcVideoCropMode["DEFAULT"] = 0] = "DEFAULT";
    /** 16:9 裁剪。 */
    NERtcVideoCropMode[NERtcVideoCropMode["CROP_16x9"] = 1] = "CROP_16x9";
    /** 4:3 裁剪。 */
    NERtcVideoCropMode[NERtcVideoCropMode["CROP_4x3"] = 2] = "CROP_4x3";
	/** 1:1 裁剪。 */
	NERtcVideoCropMode[NERtcVideoCropMode["CROP_1x1"] = 3] = "CROP_1x1";
})(NERtcVideoCropMode || (NERtcVideoCropMode = {}));

/** 带宽受限时的视频编码降级偏好。 */
export var NERtcDegradationPreference;
(function (NERtcDegradationPreference) {
    /** （默认）根据场景模式调整适应性偏好。【通信场景中，选择DEGRADATION_BALANCED模式，在编码帧率和视频质量之间保持平衡。直播场景中，选择DEGRADATION_MAINTAIN_QUALITY模式，降低编码帧率以保证视频质量。】 */
    NERtcDegradationPreference[NERtcDegradationPreference["DEGRADATION_DEFAULT"] = 0] = "DEGRADATION_DEFAULT";
    /** 流畅优先，降低视频质量以保证编码帧率。在弱网环境下，降低视频清晰度以保证视频流畅，此时画质降低，画面会变得模糊，但可以保持视频流畅。 */
    NERtcDegradationPreference[NERtcDegradationPreference["DEGRADATION_MAINTAIN_FRAMERATE"] = 1] = "DEGRADATION_MAINTAIN_FRAMERATE";
    /** 清晰优先，降低编码帧率以保证视频质量。在弱网环境下，降低视频帧率以保证视频清晰，此时可能会出现一定卡顿。 */
    NERtcDegradationPreference[NERtcDegradationPreference["DEGRADATION_MAINTAIN_QUALITY"] = 2] = "DEGRADATION_MAINTAIN_QUALITY";
	/** 该模式下 SDK 固定输出竖屏模式的视频，如果采集到的视频是横屏模式，则视频编码器会对其进行裁剪。 该模式适用于当接收端无法调整视频方向时，例如旁路推流场景。 */
	NERtcDegradationPreference[NERtcDegradationPreference["DEGRADATION_BALANCED"] = 3] = "DEGRADATION_BALANCED";
})(NERtcDegradationPreference || (NERtcDegradationPreference = {}));

/** 设置本地视频编码的方向模式，即本地发送视频的方向模式，同时影响本端用户的预览画面和远端用户看到的视频画面。 */
export var NERtcVideoOutputOrientationMode;
(function (NERtcVideoOutputOrientationMode) {
    /** （默认）该模式下 SDK 输出的视频方向与采集到的视频方向一致。接收端会根据收到的视频旋转信息对视频进行旋转。 该模式适用于接收端可以调整视频方向的场景。如果采集的视频是横屏模式，则输出的视频也是横屏模式。如果采集的视频是竖屏模式，则输出的视频也是竖屏模式。 */
    NERtcVideoOutputOrientationMode[NERtcVideoOutputOrientationMode["VIDEO_OUTPUT_ORIENTATION_MODE_ADAPTATIVE"] = 0] = "VIDEO_OUTPUT_ORIENTATION_MODE_ADAPTATIVE";
    /** 该模式下 SDK 固定输出横屏模式的视频。如果采集到的视频是竖屏模式，则视频编码器会对其进行裁剪。 该模式适用于当接收端无法调整视频方向时，例如旁路推流场景。 */
    NERtcVideoOutputOrientationMode[NERtcVideoOutputOrientationMode["VIDEO_OUTPUT_ORIENTATION_MODE_FIXED_LANDSCAPE"] = 1] = "VIDEO_OUTPUT_ORIENTATION_MODE_FIXED_LANDSCAPE";
    /** 清晰优先，降低编码帧率以保证视频质量。在弱网环境下，降低视频帧率以保证视频清晰，此时可能会出现一定卡顿。 */
    NERtcVideoOutputOrientationMode[NERtcVideoOutputOrientationMode["VIDEO_OUTPUT_ORIENTATION_MODE_FIXED_PORTRAIT"] = 2] = "VIDEO_OUTPUT_ORIENTATION_MODE_FIXED_PORTRAIT";
})(NERtcVideoOutputOrientationMode || (NERtcVideoOutputOrientationMode = {}));

/** 视频清晰度Profile（已经废弃） */
export var NERtcVideoProfileType;
(function (NERtcVideoProfileType) {
    /** 普清，（160×120/90 @15fps） */
	NERtcVideoProfileType[NERtcVideoProfileType["Lowest"] = 0] = "Lowest";
    /** 标清,（320x180/240 @15fps） */
    NERtcVideoProfileType[NERtcVideoProfileType["Low"] = 1] = "Low";
    /** 高清, (640x360/480 @30fps) */
    NERtcVideoProfileType[NERtcVideoProfileType["Standard"] = 2] = "Standard";
    /** 超清, (1280x720 @30fps) */
    NERtcVideoProfileType[NERtcVideoProfileType["HD720P"] = 3] = "HD720P";
    /** 1080P, (1920x1080 @30fps) */
    NERtcVideoProfileType[NERtcVideoProfileType["HD1080P"] = 4] = "HD1080P";
})(NERtcVideoProfileType || (NERtcVideoProfileType = {}));


/** 视频设备状态 */
export var NERTCVideoDeviceState;
(function (NERTCVideoDeviceState) {
    /** 打开成功。 */
    NERTCVideoDeviceState[NERTCVideoDeviceState["OPENED"] = 1] = "OPENED";
    /** 已关闭。 */
    NERTCVideoDeviceState[NERTCVideoDeviceState["CLOSED"] = 2] = "CLOSED";
    /** 相机断开，可能被其他应用抢占。*/
    NERTCVideoDeviceState[NERTCVideoDeviceState["DISCONNECTED"] = 3] = "DISCONNECTED";
	/** 相机冻结。 */
	NERTCVideoDeviceState[NERTCVideoDeviceState["FREEZED"] = 4] = "FREEZED";
	/** 未知错误。 */
	NERTCVideoDeviceState[NERTCVideoDeviceState["UNKNOWN_ERROR"] = 5] = "UNKNOWN_ERROR";
})(NERTCVideoDeviceState || (NERTCVideoDeviceState = {}));




/** 音频模式 */
export var NERTCAudioProfile;
(function (NERTCAudioProfile) {
    /** 默认设置。语音场景下为 STANDARD，音乐场景下为 HIGH_QUALITY。 */
    NERTCAudioProfile[NERTCAudioProfile["DEFAULT"] = 0] = "DEFAULT";
    /** 标准音质模式。采样率为 16 kHz、语音编码、单声道、编码码率最大值为 20 Kbps。 */
    NERTCAudioProfile[NERTCAudioProfile["STANDARD"] = 1] = "STANDARD";
    /** 标准扩展模式。采样率为 16 kHz、语音编码、单声道、编码码率最大值为 32 Kbps。 */
    NERTCAudioProfile[NERTCAudioProfile["STANDARD_EXTEND"] = 2] = "STANDARD_EXTEND";
    /** 中等音质模式。采样率为 48 kHz、音乐编码、单声道、编码码率最大值为 64 Kbps。 */
    NERTCAudioProfile[NERTCAudioProfile["MIDDLE_QUALITY"] = 3] = "MIDDLE_QUALITY";
    /** 中等音质模式（立体音）。采样率为 48 kHz、音乐编码、双声道、编码码率最大值为 80 Kbps。 */
    NERTCAudioProfile[NERTCAudioProfile["MIDDLE_QUALITY_STEREO"] = 4] = "MIDDLE_QUALITY_STEREO";
    /** 高音质模式。采样率为 48 kHz、音乐编码、单声道、编码码率最大值为 96 Kbps。 */
    NERTCAudioProfile[NERTCAudioProfile["HIGH_QUALITY"] = 5] = "HIGH_QUALITY";
    /** 高音质模式（立体音）。采样率为 48 kHz、音乐编码、双声道、编码码率最大值为 128 Kbps。 */
    NERTCAudioProfile[NERTCAudioProfile["HIGH_QUALITY_STEREO"] = 6] = "HIGH_QUALITY_STEREO";
})(NERTCAudioProfile || (NERTCAudioProfile = {}));

/** 音频场景 */
export var NERTCAudioScenario;
(function (NERTCAudioScenario) {
    /** 默认的音频应用场景（语音）。 */
    NERTCAudioScenario[NERTCAudioScenario["DEFAULT"] = 0] = "DEFAULT";
    /** 语音场景。推荐用于普通的音视频通话场景。对回声、噪声等环境音过滤效果较好，可以提供更为清晰的人声语音效果。 */
    NERTCAudioScenario[NERTCAudioScenario["SPEECH"] = 1] = "SPEECH";
    /** 音乐场景。音乐级别音质设置，高保真、超流畅，推荐用于在线 KTV、在线演唱会、音乐直播、乐器教学等高音质要求的场景。 */
    NERTCAudioScenario[NERTCAudioScenario["MUSIC"] = 2] = "MUSIC";
    /** 语音聊天室场景。优先保障音频连续性与稳定性，适用于用户需要频繁上下麦的场景。仅移动端支持。*/
    NERTCAudioScenario[NERTCAudioScenario["CHATROOM"] = 3] = "CHATROOM";
})(NERTCAudioScenario || (NERTCAudioScenario = {}));

/** 语音设备类型 */
export var NERTCAudioDevice;
(function (NERTCAudioDevice) {
    /** 扬声器。 */
    NERTCAudioDevice[NERTCAudioDevice["SPEAKER_PHONE"] = 0] = "SPEAKER_PHONE";
    /** 有线耳机。 */
    NERTCAudioDevice[NERTCAudioDevice["WIRED_HEADSET"] = 1] = "WIRED_HEADSET";
    /** 听筒。 */
    NERTCAudioDevice[NERTCAudioDevice["EARPIECE"] = 2] = "EARPIECE";
    /** 蓝牙耳机。*/
    NERTCAudioDevice[NERTCAudioDevice["BLUETOOTH_HEADSET"] = 3] = "BLUETOOTH_HEADSET";
})(NERTCAudioDevice || (NERTCAudioDevice = {}));

/** 音频设备类型 */
export var NERTCAudioDeviceType;
(function (NERTCAudioDeviceType) {
    /** 音频采集设备。 */
    NERTCAudioDevice[NERTCAudioDeviceType["RECORD"] = 1] = "RECORD";
    /** 音频播放设备。 */
    NERTCAudioDeviceType[NERTCAudioDeviceType["PLAYOUT"] = 2] = "PLAYOUT";
})(NERTCAudioDeviceType || (NERTCAudioDeviceType = {}));

/** 音频设备状态 */
export var NERTCAudioDeviceState;
(function (NERTCAudioDeviceState) {
    /** 打开成功。 */
    NERTCAudioDeviceState[NERTCAudioDeviceState["OPENED"] = 1] = "OPENED";
    /** 已关闭。 */
    NERTCAudioDeviceState[NERTCAudioDeviceState["CLOSED"] = 2] = "CLOSED";
    /** 初始化失败。*/
    NERTCAudioDeviceState[NERTCAudioDeviceState["INIT_ERROR"] = 3] = "INIT_ERROR";
	/** 开启失败。 */
	NERTCAudioDeviceState[NERTCAudioDeviceState["START_ERROR"] = 4] = "START_ERROR";
	/** 未知错误。 */
	NERTCAudioDeviceState[NERTCAudioDeviceState["UNKNOWN_ERROR"] = 5] = "UNKNOWN_ERROR";
})(NERTCAudioDeviceState || (NERTCAudioDeviceState = {}));

/** 伴音文件的播放状态 */
export var NERTCAudioMixingState;
(function (NERTCAudioMixingState) {
	/** 伴音正常结束。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorOK"] = 0] = "kNERtcAudioMixingErrorOK";
    /** 音频解码错误。 */
    NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorDecode"] = 1] = "kNERtcAudioMixingErrorDecode";
    /** 操作中断码。 */
    NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorInterrupt"] = 2] = "kNERtcAudioMixingErrorInterrupt";
    /** 404 http/https 对应的文件找不到。*/
    NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorHttpNotFound"] = 3] = "kNERtcAudioMixingErrorHttpNotFound";
	/** 打开流/文件失败。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorOpen"] = 4] = "kNERtcAudioMixingErrorOpen";
	/** 获取解码信息失败/超时。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorNInfo"] = 5] = "kNERtcAudioMixingErrorNInfo";
	/** 无音频流。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorNStream"] = 6] = "kNERtcAudioMixingErrorNStream";
	/** 无解码器。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorNCodec"] = 7] = "kNERtcAudioMixingErrorNCodec";
	/** 无内存。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorNMem"] = 8] = "kNERtcAudioMixingErrorNMem";
	/** 解码器打开失败/超时。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorCodecOpen"] = 9] = "kNERtcAudioMixingErrorCodecOpen";
	/** 无效音频参数（声道、采样率）。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorInvalidInfo"] = 10] = "kNERtcAudioMixingErrorInvalidInfo";
	/** 打开流/文件超时。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorOpenTimeout"] = 11] = "kNERtcAudioMixingErrorOpenTimeout";
	/** 网络IO 超时。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorIoTimeout"] = 12] = "kNERtcAudioMixingErrorIoTimeout";
	/** 网络IO 错误。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorIo"] = 13] = "kNERtcAudioMixingErrorIo";
	/** 伴音不能正常打开，ios特有的错误码。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorCanNotOpen"] = 14] = "kNERtcAudioMixingErrorCanNotOpen";
	/** 伴音出现严重错误，ios特有的错误码。 */
	NERTCAudioMixingState[NERTCAudioMixingState["kNERtcAudioMixingErrorFatal"] = 15] = "kNERtcAudioMixingErrorFatal";
})(NERTCAudioMixingState || (NERTCAudioMixingState = {}));

/** 美颜类型 */
export var NERtcBeautyEffectType;
(function (NERtcBeautyEffectType) {
    /** 未知类型。 */
    NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyUnknownType"] = -1] = "kNERtcBeautyUnknownType";
	/** 美牙。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyWhiteTeeth"] = 0] = "kNERtcBeautyWhiteTeeth";
	/** 亮眼。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyLightEye"] = 1] = "kNERtcBeautyLightEye";
    /** 美白。强度默认值为 0.0。 */
    NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyWhiten"] = 2] = "kNERtcBeautyWhiten";
    /** 磨皮。强度默认值为 0.0。*/
    NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautySmooth"] = 3] = "kNERtcBeautySmooth";
	/** 小鼻。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautySmallNose"] = 4] = "kNERtcBeautySmallNose";
	/** 眼距调整。强度默认值为 0.5。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyEyeDis"] = 5] = "kNERtcBeautyEyeDis";
	/** 眼角调整。强度默认值为 0.5。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyEyeAngle"] = 6] = "kNERtcBeautyEyeAngle";
	/** 嘴型调整。强度默认值为 0.5。*/
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyMouth"] = 7] = "kNERtcBeautyMouth";
	/** 大眼。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyBigEye"] = 8] = "kNERtcBeautyBigEye";
	/** 小脸。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautySmallFace"] = 9] = "kNERtcBeautySmallFace";
	/** 下巴调整。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyJaw"] = 10] = "kNERtcBeautyJaw";
	/** 瘦脸。强度默认值为 0.0。*/
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyThinFace"] = 11] = "kNERtcBeautyThinFace";
	/** 红润。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyFaceRuddy"] = 12] = "kNERtcBeautyFaceRuddy";
	/** 长鼻。强度默认值为 0.5。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyLongNose"] = 13] = "kNERtcBeautyLongNose";
	/** 人中调整。强度默认值为 0.5。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyPhiltrum"] = 14] = "kNERtcBeautyPhiltrum";
	/** 调整嘴巴宽度。强度默认值为 0.5。。*/
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyMouthAngle"] = 15] = "kNERtcBeautyMouthAngle";
	/** 圆眼。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyRoundEye"] = 16] = "kNERtcBeautyRoundEye";
	/** 开眼角。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyEyeCorner"] = 17] = "kNERtcBeautyEyeCorner";
	/** V 脸。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyVFace"] = 18] = "kNERtcBeautyVFace";
	/** 瘦下颌。强度默认值为 0.0。*/
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyUnderJaw"] = 19] = "kNERtcBeautyUnderJaw";
	/** 窄脸。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyNarrowFace"] = 20] = "kNERtcBeautyNarrowFace";
	/** 颧骨调整。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyCheekBone"] = 21] = "kNERtcBeautyCheekBone";
	/** 锐化调整。强度默认值为 0.0。*/
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyFaceSharpen"] = 22] = "kNERtcBeautyFaceSharpen";
	/** 调整嘴巴宽度。强度默认值为 0.5。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyMouthWider"] = 23] = "kNERtcBeautyMouthWider";
	/** 袪抬头纹。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyForeheadWrinkles"] = 24] = "kNERtcBeautyForeheadWrinkles";
	/** 眼角调整。强度默认值为 0.5。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyDarkCircles"] = 25] = "kNERtcBeautyDarkCircles";
	/** 袪法令纹。强度默认值为 0.0。*/
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautySmileLines"] = 26] = "kNERtcBeautySmileLines";
	/** 短脸。强度默认值为 0.0。 */
	NERtcBeautyEffectType[NERtcBeautyEffectType["kNERtcBeautyShortFace"] = 27] = "kNERtcBeautyShortFace";
})(NERtcBeautyEffectType || (NERtcBeautyEffectType = {}));

/**
 * 初始化NERTC引擎的参数
 * @enum {Number}
 */
export class engineParam {
    constructor(appKey, logDir, logLevel) {
        this.appKey = appKey;
        this.logDir = logDir;
        this.logLevel = logLevel;
    }
}

/**
 * 初始化NERTC引擎的参数
 * @enum {Number}
 */
export class NERtcAudioVolumeInfo {
    constructor(uerID, subStreamVolume, volume) {
        this.uerID = uerID;
        this.subStreamVolume = subStreamVolume;
        this.volume = volume;
    }
}
