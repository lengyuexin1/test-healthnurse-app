import { PlatformManage } from '@bc/sys'
import { API_ENV } from "@/sys/constant"


let access_token = null as any
let task_id = null as any
let voiceSrc = null as any



// 创建播报实例
const innerAudioContext = uni.createInnerAudioContext();



// 获取播报token以及id
export const getVoiceFile = (cleanString:string,fun:any) => {
    
    return PlatformManage.getToken().then((pac: any) => {
        // 获取播报token
        return uni.request({
            url: 'https://aip.baidubce.com/oauth/2.0/token',
            method: 'GET',
            data: {
                grant_type: "client_credentials",
                // 百度语音app相关配置
                client_id: 'ZvbHMclBKezum0nC511hAGsw',
                client_secret: '009LHhbxbL278m3LG6cOAV9E3wOwG4Ir',
            }
        }).then((res: any) => {
            if (res.statusCode !== 200) {
                throw new Error(res.data?.message)
            }

            console.log('cleanString',cleanString);
            console.log('res.data',res.data.access_token);
            
            access_token = res.data.access_token
            // 创建播报id
            uni.request({
                url: 'https://aip.baidubce.com/rpc/2.0/tts/v1/create?access_token=' + access_token,
                method: 'POST',
                data: {
                    text: cleanString,
                    lang: 'zh',
                    enable_subtitle: 1
                }
            }).then((TextRes:any) => {
                console.log('TextRes',TextRes);
                task_id = TextRes.data.task_id

                

                setTimeout(() => {
                    queryVoice(fun)
                }, 1000);

            })

            
            return res.data
        }).catch((err: any) => {
            throw err
        })
    })
}

// 查询播报内容(返回src)
export const queryVoice = (fun:any) => {
    uni.request({
        url: 'https://aip.baidubce.com/rpc/2.0/tts/v1/query?access_token=' + access_token,
        method: 'POST',
        data: {
            task_ids: [
                task_id
            ],
        },
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    }).then((playRes:any) => {

        console.log('playRes',playRes.data);
        console.log('playRes',playRes.data.tasks_info[0].task_status);

        if (playRes.data.tasks_info[0].task_status == 'Running') {
            setTimeout(() => {
                queryVoice(fun)
            }, 1000);
            return
        }

        // uni.hideLoading();


        console.log('playRes',playRes.data.tasks_info[0].task_result.speech_url);
        

        voiceSrc = playRes.data.tasks_info[0].task_result.speech_url
        // fun(voiceSrc)
        fun(playRes.data.tasks_info[0])


    }).finally(()=>{
        // uni.showLoading({
        //     title: '加载中...'
        // });
    })
}

