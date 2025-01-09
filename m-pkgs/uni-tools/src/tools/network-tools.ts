
import { DataProvider } from "@bc/base"
import { uniEmitter } from "../event"

/** 在线状态提供者 */
export const onlineProvider = new DataProvider<string>()

export const networkProvider = new DataProvider<INetworkState>()


uni.getNetworkType({
    success: function(res) {
        const data = { isConnected: res.networkType !== 'none' } as INetworkState
        data.networkType = res.networkType
        networkProvider.setData(data)
        data.isConnected && onlineProvider.setData('') //在线
    }
})
uni.onNetworkStatusChange(function(res) {
    console.error('onNetworkStatusChange: ', res)
    if (res.isConnected) {
        onlineProvider.setData('') //在线
        uniEmitter.emit('UNI__NETWORK_OK')
    }
    else {
        onlineProvider.setData(undefined as any) //离线置空
    }
    networkProvider.setData(res)
})


