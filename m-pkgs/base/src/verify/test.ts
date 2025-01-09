import { VerifyTools } from "./verify-tools"

//===================================================
/**
 * demo
 */



const userList = [
    {
        phone: '13544588991',
        name: '张小三',
        devices: [
            {
                deviceName: '血糖仪1',
                logs: [
                    {
                        value: 11.1,
                        comment: [
                            {
                                commentMan: '王一',
                                cnt: '血糖太高'
                            },
                            {
                                commentMan: '王一1',
                                cnt: '血糖太高'
                            }
                        ]
                    },
                    {
                        value: '12.1',
                        comment: [
                            {
                                commentMan: '王一',
                                cnt: ''
                            }
                        ]
                    }
                ]
            },
            {
                deviceName: '血压计1',
                logs: [
                    {
                        value: '12.1',
                        comment: [
                            {
                                commentMan: '王二',
                                cnt: '做得好2'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        phone: '13800138000',
        name: '张小四',
        devices: [
            {
                deviceName: '血糖仪2',
                logs: [
                    {
                        value: '16.1',
                        comment: [
                            {
                                commentMan: '李二',
                                cnt: ''
                            }
                        ]
                    }
                ]
            },
            {
                deviceName: '血压计2',
                logs: [
                    {
                        value: '',
                        comment: [
                            {
                                commentMan: '李三',
                                cnt: '做得好4'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const user = {
    phone: '1380000000',
    name: '李三',
    height: '161.12',
    birthday: '2022-12-09',
    //childs: [],
    childs: userList
}


const data = {
    time: '2022-12-09',
    value: '161.12',
    birthday: '2022-12-09',
    //childs: [],
    childs: userList
}

const dataRule = [
    { key: 'time', check: 'required', tips: '测量时间' },
    { key: 'type', check: 'required', tips: '测量时段' },
    { key: 'value', check: 'integer', tips: '尿酸值' },
    { key: 'value', check: 'numberRange', tips: '尿酸值', min: 89, max: 1190 }
]


const userRule:IRuleOption[] = [
    { key: 'name', check: 'required', tips: '姓名' },
    { key: 'height', check: 'decimal', tips: '身高', digit: 2 },
    { key: 'birthday', check: 'dateRange', tips: '出生日期', min: '2022-01-01', max: '2022-12-08' },
    // {
    //     key: 'childs.devices.logs.value1', check: (matchData: IMatchData, key: string) => {
    //         console.error(`${key}匹配结果: `, matchData)
    //         return Promise.reject()
    //     }, tips: 'value不能为空'
    // },
    { key: 'childs', check: 'required', tips: '孩子' },
    { key: 'childs.phone', check: 'integer', tips: '孩子手机' },
    { key: 'childs.devices', check: 'required', tips: '孩子设备' },
    { key: 'childs.devices.deviceName', check: 'required', tips: '孩子设备名称' },
    { key: 'childs.devices.logs.value', check: 'numberRange', tips: '孩子测量结果', min: 0, max: 10 },
    { key: 'childs.devices.logs.comment.cnt', check: 'required', tips: '孩子测量结果评论内容' }
]


VerifyTools.check(user, userRule).then(() => {
    console.info('user success')
}).catch((err) => {
    console.error('userList err: ', Object.assign({}, err), err.message)
})


