

/** 语音播报 */
export const speek = (message: string) => {

    if (typeof plus !== undefined) {
        // #ifdef APP-PLUS
        // plus.device.vibrate(500)
        // #endif
    }
    else {
        // WEB 环境可以实现
        const synth = speechSynthesis
        // 创建 SpeechSynthesisUtterance 实例
        const utterance = new SpeechSynthesisUtterance(message)
        // 设置语音合成配置
        utterance.voice = synth.getVoices()[ 0 ]
        utterance.pitch = 1
        utterance.rate = 1
        // 开始语音合成
        synth.speak(utterance)
    }
}

