// IM 能力，包括单聊、群聊、通讯录等
import { type TSessionScene, TEAM_SCENES, P2P_SCENE } from '../bean'
import type { IMMessage, TMsgScene } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import type { IBaseSendFileOptions, IBaseSendMsgOptions, ISendCustomMsgOptions, ISendTextMsgOptions } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/types'
import { SessionSDK } from '../sdk/session-sdk'

//====================================================
// 常量
//====================================================
const debug = true

//====================================================
// 核心类
//====================================================

/** 消息服务 */
export class MessageService {

    private imScene: TMsgScene

    constructor(scene: TSessionScene) {
        if (TEAM_SCENES.includes(scene)) {
            this.imScene = 'team'
        }
        else if (P2P_SCENE.includes(scene)) {
            this.imScene = 'p2p'
        }
        else {
            this.imScene = 'superTeam'
        }
    }

    private generalDefOptions(to: string, callback: TSendMessageCallback) {
        const options = {
            scene: this.imScene,
            to,
            setting: {
                envConfig: import.meta.env.VITE_WEB_ENV
            },
            onSendBefore: (msg) => {
                callback.onSend(msg)
            }
        } as IBaseSendMsgOptions

        if (this.imScene === 'team' && import.meta.env.VITE_WEB_ENV === 'prod') {
            options.teamSpecializationInfo = { needACK: true }
        }

        return options
    }

    /** 统一处理消息发送结果 */
    private async handleSendResult(promise: Promise<IMMessage>, callback: TSendMessageCallback) {
        return promise.then((msg) => {
            callback.onSuccess(msg)
            return Promise.resolve(msg)
        }).catch((err) => {
            callback.onError(err)
            return Promise.reject(err)
        })
    }

    async sendText(to: string, body: string, callback: TSendMessageCallback) {
        return SessionSDK.msgInsurance().then((msg) => {
            const options = this.generalDefOptions(to, callback) as ISendTextMsgOptions
            options.body = body
            return this.handleSendResult(msg.sendTextMsg(options), callback)
        })
    }

    async sendImage(to: string, filepath: string, callback: TSendMessageCallback) {
        return SessionSDK.msgInsurance().then((msg) => {
            const options = this.generalDefOptions(to, callback) as IBaseSendFileOptions
            options.filePath = filepath
            return this.handleSendResult(msg.sendImageMsg(options), callback)
        })
    }

    async sendAudio(to: string, filepath: string, callback: TSendMessageCallback) {
        return SessionSDK.msgInsurance().then((msg) => {
            const options = this.generalDefOptions(to, callback) as IBaseSendFileOptions
            options.filePath = filepath
            return this.handleSendResult(msg.sendAudioMsg(options), callback)
        })
    }

    async sendCustom(to: string, attach: string, callback: TSendMessageCallback) {
        return SessionSDK.msgInsurance().then((msg) => {
            const options = this.generalDefOptions(to, callback) as ISendCustomMsgOptions
            options.attach = attach
            return this.handleSendResult(msg.sendCustomMsg(options), callback)
        })
    }

    /** 重发消息 */
    async resendMsg(msg: IMMessage) {
        return SessionSDK.msgInsurance().then((msgInsurance) => {
            return msgInsurance.resendMsg({ msg })
        })
    }

}

