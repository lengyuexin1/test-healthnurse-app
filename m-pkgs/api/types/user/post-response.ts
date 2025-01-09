import type { operations } from './schema'

export interface IUserPostResponse {
    /** 活动操作状态 */
    "/v1/bc/admin/activity/action": Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 审核活动报名 */
    "/v1/bc/admin/activity/enroll/audit": Required<operations["admin_auditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消活动报名 */
    "/v1/bc/admin/activity/enroll/cancel": Required<operations["cancelUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 报名列表 */
    "/v1/bc/admin/activity/enroll/list": Required<operations["enroll_admin_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 活动列表 */
    "/v1/bc/admin/activity/list": Required<operations["admin_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 活动新增修改 */
    "/v1/bc/admin/activity/save": Required<operations["doSaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 活动报名 */
    "/v1/bc/company/activity/enroll": Required<operations["enrollUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消活动报名 */
    "/v1/bc/company/activity/enroll/cancel": Required<operations["cancelUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 活动列表 */
    "/v1/bc/company/activity/list": Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 删除位置 */
    "/v1/bc/admin/ad/delete/config": Required<operations["deleteConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/ad/list": Required<operations["admin_listUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 保存位置 */
    "/v1/bc/admin/ad/save/config": Required<operations["saveConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录 */
    "/v1/bc/company/admin/accountLogin": Required<operations["accountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 二维码登录提交 */
    "/v1/bc/company/admin/auditLoginCode": Required<operations["auditLoginCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 免密登录 */
    "/v1/bc/company/admin/autoLogin": Required<operations["autoLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 检查二维码状态 */
    "/v1/bc/company/admin/checkLoginCode": Required<operations["checkLoginCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 客服app登录 */
    "/v1/bc/company/admin/customerServiceLogin": Required<operations["customerServiceLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录 */
    "/v1/bc/company/admin/fillApplyCode": Required<operations["fillApplyCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录 */
    "/v1/bc/company/admin/login": Required<operations["mobileLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录 */
    "/v1/bc/company/admin/loginOrRegister": Required<operations["loginOrRegisterUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录 */
    "/v1/bc/company/admin/simpleAccountLogin": Required<operations["simpleAccountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录(无应用编码) */
    "/v1/bc/company/admin/simpleLogin": Required<operations["simpleLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录 */
    "/v1/bc/company/admin/simpleLoginOrRegister": Required<operations["loginOrRegisterUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 管理员登录 */
    "/v1/bc/company/admin/updateUserInfo": Required<operations["updateUserInfoUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** excel数据导入 */
    "/v1/bc/admin/agencyInit/importByExcel": Required<operations["importByExcelUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/appVersion/list": Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 最新版本列表 */
    "/v1/bc/admin/appVersion/newVersionList": Required<operations["newVersionListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 新建/编辑版本 */
    "/v1/bc/admin/appVersion/updateOrCreate": Required<operations["updateOrCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 应用列表 */
    "/v1/bc/admin/apply/list": Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** updateOrCreate */
    "/v1/bc/admin/apply/updateOrCreate": Required<operations["updateOrCreateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** create */
    "/v1/bc/admin/article/create": Required<operations["createUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** delete */
    "/v1/bc/admin/article/delete": Required<operations["deleteUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/article/list": Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

    /** modify */
    "/v1/bc/admin/article/modify": Required<operations["modifyUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 获取类目资质证书 */
    "/v1/bc/company/category/certificate/getByCategoryIds": Required<operations["getByCategoryIdsUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 类目资质列表 */
    "/v1/bc/admin/certificate/categoryCertificateList": Required<operations["categoryCertificateListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 类目资质列表 */
    "/v1/bc/admin/certificate/editCategory": Required<operations["editCategoryUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 新增/修改工种证书 */
    "/v1/bc/admin/certificate/editWorkerType": Required<operations["editWorkerTypeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 工种证书列表 */
    "/v1/bc/admin/certificate/workerTypeCertificateList": Required<operations["workerTypeCertificateListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 证书模板删除 */
    "/v1/bc/company/certificate/remove": Required<operations["removeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 证书模板新增或修改 */
    "/v1/bc/company/certificate/saveOrUpdate": Required<operations["saveOrUpdateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 经营范围查询 */
    "/v1/bc/company/certificate/scope/get": Required<operations["getUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申诉审核 */
    "/v1/bc/admin/comment/appeal/audit": Required<operations["auditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申诉查询 */
    "/v1/bc/admin/comment/appeal/list": Required<operations["appealListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单评价列表 */
    "/v1/bc/admin/comment/commodity/list": Required<operations["commodityListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单评价列表 */
    "/v1/bc/api/comment/commodity/list": Required<operations["commodityListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 订单评价提交 */
    "/v1/bc/api/comment/commodity/save": Required<operations["commoditySaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 店铺商品评价 */
    "/v1/bc/api/comment/commodity/view": Required<operations["commodityViewUsingPOST"]>['responses'][200]['content']['*/*']

    /** delete */
    "/v1/bc/api/comment/delete": Required<operations["deleteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** Look */
    "/v1/bc/api/comment/look": Required<operations["LookUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申诉查询 */
    "/v1/bc/company/comment/appeal/list": Required<operations["appealListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 申诉提交 */
    "/v1/bc/company/comment/appeal/mark": Required<operations["markUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申诉举证 */
    "/v1/bc/company/comment/appeal/proof": Required<operations["proofUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 订单评价列表 */
    "/v1/bc/company/comment/commodity/list": Required<operations["commodityListUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 订单评价回复 */
    "/v1/bc/company/comment/commodity/reply": Required<operations["commodityReplyUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员的评价 */
    "/v1/bc/company/comment/workComment": Required<operations["workCommentUsingPOST"]>['responses'][200]['content']['*/*']

    /** 处理 */
    "/v1/bc/admin/complaint/handle": Required<operations["do_handleUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/complaint/list": Required<operations["listByPageUsingPOST"]>['responses'][200]['content']['*/*']

    /** 纠纷列表 */
    "/v1/bc/api/complaint/list": Required<operations["listUsingPOST_4"]>['responses'][200]['content']['*/*']

    /** save */
    "/v1/bc/api/complaint/save": Required<operations["saveUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 修改客户状态 */
    "/v1/bc/admin/consumer/changeStatus": Required<operations["changeStatusUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 发放优惠券 */
    "/v1/bc/admin/consumer/distributeCoupon": Required<operations["distributeCouponUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 导入客户 */
    "/v1/bc/admin/consumer/importData": Required<operations["importThirdConsumerUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 导入客户 */
    "/v1/bc/admin/consumer/importThirdConsumer": Required<operations["importThirdConsumerUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 活动邀请 */
    "/v1/bc/admin/consumer/inviteActivity": Required<operations["inviteActivityUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 邀请注册 */
    "/v1/bc/admin/consumer/inviteRegister": Required<operations["inviteRegisterUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 客户信息管理 */
    "/v1/bc/admin/consumer/list": Required<operations["listUsingPOST_5"]>['responses'][200]['content']['*/*']

    /** 客户关系管理 */
    "/v1/bc/admin/consumer/thirdList": Required<operations["thirdListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 收住标签删除 */
    "/v1/bc/admin/containTag/delete": Required<operations["deleteUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 收住标签列表 */
    "/v1/bc/admin/containTag/list": Required<operations["listUsingPOST_6"]>['responses'][200]['content']['*/*']

    /** 收住标签新增 */
    "/v1/bc/admin/containTag/save": Required<operations["saveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 收住标签修改 */
    "/v1/bc/admin/containTag/update": Required<operations["updateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 合同列表 */
    "/v1/bc/admin/contract/list": Required<operations["getListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 新增、修改合同模板 */
    "/v1/bc/admin/contract/template/edit": Required<operations["editTemplateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** callback */
    "/v1/bc/api/contract/sign/callback": Required<operations["callbackUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** compareFaceVerify */
    "/ali/face/compareFaceVerify": Required<operations["compareFaceVerifyUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** initFaceVerifyIdPlus */
    "/ali/face/initFaceVerifyIdPlus": Required<operations["initFaceVerifyIdPlusUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 收藏服务 */
    "/v1/bc/app/favorite/itemAdd": Required<operations["itemAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消收藏服务 */
    "/v1/bc/app/favorite/itemCancel": Required<operations["itemCancelUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 服务列表 */
    "/v1/bc/app/favorite/itemList": Required<operations["itemListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 收藏店鋪 */
    "/v1/bc/app/favorite/shopAdd": Required<operations["shopAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消收藏店鋪 */
    "/v1/bc/app/favorite/shopCancel": Required<operations["shopCancelUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 店鋪列表 */
    "/v1/bc/app/favorite/shopList": Required<operations["shopListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 确认 */
    "/v1/bc/admin/feedback/doAction": Required<operations["doActionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/feedback/list": Required<operations["listByPageUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 添加 */
    "/v1/bc/company/feedback/add": Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 记录 */
    "/v1/bc/company/feedback/list": Required<operations["listUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

    /** 添加 */
    "/v1/bc/server/feedback/add": Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 记录 */
    "/v1/bc/server/feedback/list": Required<operations["listUsingPOST_8"]>['responses'][200]['content']['*/*']['data']

    /** save_config */
    "/v1/bc/admin/invite/config/save": Required<operations["save_configUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/invite/list": Required<operations["listUsingPOST_9"]>['responses'][200]['content']['*/*']

    /** share */
    "/v1/bc/api/invite/share": Required<operations["shareUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 加入足迹 */
    "/v1/bc/app/item_browse_history/add": Required<operations["addUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 删除足迹 */
    "/v1/bc/app/item_browse_history/del": Required<operations["personalDoActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 足迹列表-按天分组 */
    "/v1/bc/app/item_browse_history/getListGroupByDate": Required<operations["getListGroupByDateUsingPOST"]>['responses'][200]['content']['*/*']

    /** 足迹列表 */
    "/v1/bc/app/item_browse_history/list": Required<operations["listUsingPOST_10"]>['responses'][200]['content']['*/*']

    /** 修改平台资质 */
    "/v1/bc/admin/licence/edit": Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 关闭 */
    "/v1/bc/admin/marketing/close": Required<operations["closeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 推广列表 */
    "/v1/bc/admin/marketing/list": Required<operations["admin_listUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 新增修改 */
    "/v1/bc/admin/marketing/save": Required<operations["doSaveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** delete */
    "/v1/bc/admin/menu/delete": Required<operations["deleteUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** updateOrCreate */
    "/v1/bc/admin/menu/updateOrCreate": Required<operations["updateOrCreateUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** recognizeBankCard */
    "/ali/ocr/recognizeBankCard": Required<operations["recognizeBankCardUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** recognizeBasic */
    "/ali/ocr/recognizeBasic": Required<operations["recognizeBasicUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** recognizeIdCard */
    "/ali/ocr/recognizeIdCard": Required<operations["recognizeIdCardUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/operation/log/list": Required<operations["listUsingPOST_11"]>['responses'][200]['content']['*/*']

    /** 新增经营服务类目 */
    "/v1/bc/company/organization/category/save": Required<operations["saveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 平台/商家店铺入驻审核 */
    "/v1/bc/admin/organization/auditEntering": Required<operations["auditEnteringUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 获取佣金比例列表 */
    "/v1/bc/admin/organization/getWorkerCommissionList": Required<operations["getWorkerCommissionListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 平台/商家列表 */
    "/v1/bc/admin/organization/list": Required<operations["listUsingPOST_12"]>['responses'][200]['content']['*/*']

    /** 商家店铺入驻登录或注册 */
    "/v1/bc/admin/organization/loginOrRegister": Required<operations["loginOrRegisterUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 平台/商家店铺入驻审核 */
    "/v1/bc/admin/organization/set/auditEntering": Required<operations["auditEnteringSetUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 平台/商家列表 */
    "/v1/bc/admin/organization/set/list": Required<operations["listSetUsingPOST"]>['responses'][200]['content']['*/*']

    /** 设置佣金比例 */
    "/v1/bc/admin/organization/setWorkerCommission": Required<operations["setWorkerCommissionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 平台/商家修改 */
    "/v1/bc/company/organization/modify": Required<operations["modifyUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 平台/商家新增 */
    "/v1/bc/company/organization/save": Required<operations["saveUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 商家主体修改 */
    "/v1/bc/company/organization/setting": Required<operations["settingUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 获取服务人员关联的门店列表 */
    "/v1/bc/server/organization/simpleList": Required<operations["simpleListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 冻结服务人员 */
    "/v1/bc/admin/organization/worker/auditFreeze": Required<operations["auditFreezeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 查询服务人员详情 */
    "/v1/bc/admin/organization/worker/detail": Required<operations["getWorkersUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 查询已入驻店铺的服务人员列表 */
    "/v1/bc/admin/organization/worker/getWorkers": Required<operations["getWorkersUsingPOST"]>['responses'][200]['content']['*/*']

    /** 服务人员入驻审核 */
    "/v1/bc/company/organization/worker/auditJoining": Required<operations["auditJoiningUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员查询 */
    "/v1/bc/company/organization/worker/auditList": Required<operations["auditListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 服务人员信息更新审核 */
    "/v1/bc/company/organization/worker/auditUpdating": Required<operations["auditUpdatingUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 店铺服务人员批量解绑 */
    "/v1/bc/company/organization/worker/disemploy": Required<operations["disemployUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员查询 */
    "/v1/bc/company/organization/worker/simpleList": Required<operations["simpleListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 新增或更新服务人员关联门店 */
    "/v1/bc/server/organization/worker/edit": Required<operations["editUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 新增、修改被照护人 */
    "/v1/bc/app/patient/edit": Required<operations["editUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/public/article/list": Required<operations["listUsingPOST_13"]>['responses'][200]['content']['*/*']

    /** convertToBase64 */
    "/v1/bc/public/convertToBase64": Required<operations["convertToBase64UsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 客服app账号密码登录 */
    "/v1/bc/public/customerServiceAccountLogin": Required<operations["customerServiceAccountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/app/public/article/list": Required<operations["listUsingPOST_14"]>['responses'][200]['content']['*/*']

    /** list */
    "/v1/bc/merchant/public/article/list": Required<operations["listUsingPOST_15"]>['responses'][200]['content']['*/*']

    /** list */
    "/v1/bc/server/public/article/list": Required<operations["listUsingPOST_16"]>['responses'][200]['content']['*/*']

    /** 更新简历 */
    "/v1/bc/company/resume/update": Required<operations["UpdateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 更新简历 */
    "/v1/bc/server/resume/update": Required<operations["UpdateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** bindUser */
    "/v1/bc/admin/role/bindUser": Required<operations["bindUserUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** remove */
    "/v1/bc/admin/role/delete": Required<operations["removeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 角色列表 */
    "/v1/bc/admin/role/list": Required<operations["listUsingPOST_17"]>['responses'][200]['content']['*/*']

    /** bindMenu */
    "/v1/bc/admin/role/menu/bind": Required<operations["bindMenuUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** updateOrCreate */
    "/v1/bc/admin/role/updateOrCreate": Required<operations["updateOrCreateUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 店铺名片审核信息 */
    "/v1/bc/admin/shop/card/auditInfo": Required<operations["auditInfoUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 店铺名片审核列表 */
    "/v1/bc/admin/shop/card/getAuditList": Required<operations["getAuditListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 店铺名片更改记录 */
    "/v1/bc/company/shop/card/getRecords": Required<operations["getRecordsUsingPOST"]>['responses'][200]['content']['*/*']

    /** 店铺名片修改 */
    "/v1/bc/company/shop/card/saveOrUpdate": Required<operations["saveOrUpdateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 店铺信息修改审核 */
    "/v1/bc/admin/shop/audit": Required<operations["auditUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 店铺列表 */
    "/v1/bc/admin/shop/getList": Required<operations["getListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 店铺信息修改列表查询 */
    "/v1/bc/admin/shop/list": Required<operations["listUsingPOST_18"]>['responses'][200]['content']['*/*']

    /** 搜索机构 */
    "/v1/bc/admin/shop/organizationList": Required<operations["organizationListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 店铺信息修改 */
    "/v1/bc/app/shop/modify": Required<operations["modifyUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 搜索机构 */
    "/v1/bc/app/shop/organizationList": Required<operations["organizationListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 店铺注销 */
    "/v1/bc/company/shop/cancellation": Required<operations["cancellationUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 店铺紧急联系设置 */
    "/v1/bc/company/shop/contact": Required<operations["emergencyContactUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 店铺设置 */
    "/v1/bc/company/shop/edit": Required<operations["editUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 店铺商品配送地址设置 */
    "/v1/bc/company/shop/editShippingAddress": Required<operations["editShippingAddressUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 获取符合条件的服务人员 */
    "/v1/bc/company/shop/getShopWorker": Required<operations["getShopWorkerUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 店铺信息修改 */
    "/v1/bc/company/shop/modify": Required<operations["modifyUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 获取服务人员的店铺列表 */
    "/v1/bc/server/shop/getByWorkerAndAddress": Required<operations["getByWorkerAndAddressUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 搜索店铺 */
    "/v1/bc/server/shop/getListByKeywords": Required<operations["getListByKeywordsUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 机构设施删除 */
    "/v1/bc/company/shop/facility/delete": Required<operations["deleteUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** 机构设施列表 */
    "/v1/bc/company/shop/facility/list": Required<operations["listUsingPOST_19"]>['responses'][200]['content']['*/*']

    /** 机构设施新增 */
    "/v1/bc/company/shop/facility/save": Required<operations["saveUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** 机构设施修改 */
    "/v1/bc/company/shop/facility/update": Required<operations["updateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 店铺资质列表 */
    "/v1/bc/company/shop/license/list": Required<operations["listUsingPOST_20"]>['responses'][200]['content']['*/*']

    /** 添加地址 */
    "/v1/bc/app/address/add": Required<operations["addUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 地址修改 */
    "/v1/bc/app/address/edit": Required<operations["addUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** addSubAccount */
    "/v1/bc/admin/account/add/subaccount": Required<operations["addSubAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** del */
    "/v1/bc/admin/account/del": Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/account/doAction": Required<operations["doActionUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** editSubAccount */
    "/v1/bc/admin/account/edit/subaccount": Required<operations["editSubAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/account/list": Required<operations["listUsingPOST_21"]>['responses'][200]['content']['*/*']

    /** wxkLogin */
    "/v1/bc/admin/account/wxkLogin": Required<operations["wxkLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 用户注销 */
    "/v1/bc/app/user/destroy": Required<operations["destroyUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 修改用户信息 */
    "/v1/bc/app/user/edit": Required<operations["editUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** 手机号快速验证 */
    "/v1/bc/app/user/getPhoneNumber": Required<operations["getPhoneNumberUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 登录 */
    "/v1/bc/app/user/login": Required<operations["loginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 短信验证码登录 */
    "/v1/bc/app/user/mobileCodeLogin": Required<operations["mobileCodeLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 手机号一键登录 */
    "/v1/bc/app/user/mobileQuicklyLogin": Required<operations["mobileQuicklyLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 无感登录 */
    "/v1/bc/app/user/refreshLogin": Required<operations["refreshLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 微信授权登录 */
    "/v1/bc/app/user/wechatLogin": Required<operations["wechatLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 绑定银行卡 */
    "/v1/bc/server/workerBankCard/edit": Required<operations["editUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

    /** 申请入驻店铺 */
    "/v1/bc/server/worker/applyEnterShop": Required<operations["applyEnterShopUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 自动登录 */
    "/v1/bc/server/worker/autoLogin": Required<operations["autoLoginUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员注销 */
    "/v1/bc/server/worker/cancellation": Required<operations["cancellationUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 修改行业 */
    "/v1/bc/server/worker/editIndustry": Required<operations["editIndustryUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 登录 */
    "/v1/bc/server/worker/login": Required<operations["loginUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 手机号一键登录 */
    "/v1/bc/server/worker/mobileQuicklyLogin": Required<operations["mobileQuicklyLoginUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 手机号注册 */
    "/v1/bc/server/worker/register": Required<operations["registerUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 人脸识别照片保存 */
    "/v1/bc/server/worker/saveFaceImage": Required<operations["saveFaceImageUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** delete */
    "/v1/bc/admin/workerType/delete": Required<operations["deleteUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

    /** 工种列表 */
    "/v1/bc/admin/workerType/list": Required<operations["listUsingPOST_22"]>['responses'][200]['content']['*/*']

    /** 新增或修改 */
    "/v1/bc/admin/workerType/save": Required<operations["saveUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

}
