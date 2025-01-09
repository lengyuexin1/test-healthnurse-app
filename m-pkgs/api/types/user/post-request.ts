import type { operations } from './schema'

export interface IUserPostRequest {
    /** 活动操作状态 */
    "/v1/bc/admin/activity/action": Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']

    /** 审核活动报名 */
    "/v1/bc/admin/activity/enroll/audit": Required<operations["admin_auditUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消活动报名 */
    "/v1/bc/admin/activity/enroll/cancel": Required<operations["cancelUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 报名列表 */
    "/v1/bc/admin/activity/enroll/list": Required<operations["enroll_admin_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动列表 */
    "/v1/bc/admin/activity/list": Required<operations["admin_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动新增修改 */
    "/v1/bc/admin/activity/save": Required<operations["doSaveUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动报名 */
    "/v1/bc/company/activity/enroll": Required<operations["enrollUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消活动报名 */
    "/v1/bc/company/activity/enroll/cancel": Required<operations["cancelUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 活动列表 */
    "/v1/bc/company/activity/list": Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除位置 */
    "/v1/bc/admin/ad/delete/config": Required<operations["deleteConfigUsingPOST"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/ad/list": Required<operations["admin_listUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 保存位置 */
    "/v1/bc/admin/ad/save/config": Required<operations["saveConfigUsingPOST"]>['requestBody']['content']['application/json']

    /** 管理员登录 */
    "/v1/bc/company/admin/accountLogin": Required<operations["accountLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 二维码登录提交 */
    "/v1/bc/company/admin/auditLoginCode": Required<operations["auditLoginCodeUsingPOST"]>['requestBody']['content']['application/json']

    /** 免密登录 */
    "/v1/bc/company/admin/autoLogin": Required<operations["autoLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 检查二维码状态 */
    "/v1/bc/company/admin/checkLoginCode": Required<operations["checkLoginCodeUsingPOST"]>['requestBody']['content']['application/json']

    /** 客服app登录 */
    "/v1/bc/company/admin/customerServiceLogin": Required<operations["customerServiceLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 管理员登录 */
    "/v1/bc/company/admin/fillApplyCode": Required<operations["fillApplyCodeUsingPOST"]>['requestBody']['content']['application/json']

    /** 管理员登录 */
    "/v1/bc/company/admin/login": Required<operations["mobileLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 管理员登录 */
    "/v1/bc/company/admin/loginOrRegister": Required<operations["loginOrRegisterUsingPOST"]>['requestBody']['content']['application/json']

    /** 管理员登录 */
    "/v1/bc/company/admin/simpleAccountLogin": Required<operations["simpleAccountLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 管理员登录(无应用编码) */
    "/v1/bc/company/admin/simpleLogin": Required<operations["simpleLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 管理员登录 */
    "/v1/bc/company/admin/simpleLoginOrRegister": Required<operations["loginOrRegisterUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 管理员登录 */
    "/v1/bc/company/admin/updateUserInfo": Required<operations["updateUserInfoUsingPOST"]>['requestBody']['content']['application/json']

    /** excel数据导入 */
    "/v1/bc/admin/agencyInit/importByExcel": Required<operations["importByExcelUsingPOST"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/appVersion/list": Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 最新版本列表 */
    "/v1/bc/admin/appVersion/newVersionList": Required<operations["newVersionListUsingPOST"]>['requestBody']['content']['application/json']

    /** 新建/编辑版本 */
    "/v1/bc/admin/appVersion/updateOrCreate": Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** 应用列表 */
    "/v1/bc/admin/apply/list": Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']

    /** updateOrCreate */
    "/v1/bc/admin/apply/updateOrCreate": Required<operations["updateOrCreateUsingPOST_1"]>['requestBody']['content']['application/json']

    /** create */
    "/v1/bc/admin/article/create": Required<operations["createUsingPOST"]>['requestBody']['content']['application/json']

    /** delete */
    "/v1/bc/admin/article/delete": Required<operations["deleteUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/article/list": Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']

    /** modify */
    "/v1/bc/admin/article/modify": Required<operations["modifyUsingPOST"]>['requestBody']['content']['application/json']

    /** 获取类目资质证书 */
    "/v1/bc/company/category/certificate/getByCategoryIds": Required<operations["getByCategoryIdsUsingPOST"]>['requestBody']['content']['application/json']

    /** 类目资质列表 */
    "/v1/bc/admin/certificate/categoryCertificateList": Required<operations["categoryCertificateListUsingPOST"]>['requestBody']['content']['application/json']

    /** 类目资质列表 */
    "/v1/bc/admin/certificate/editCategory": Required<operations["editCategoryUsingPOST"]>['requestBody']['content']['application/json']

    /** 新增/修改工种证书 */
    "/v1/bc/admin/certificate/editWorkerType": Required<operations["editWorkerTypeUsingPOST"]>['requestBody']['content']['application/json']

    /** 工种证书列表 */
    "/v1/bc/admin/certificate/workerTypeCertificateList": Required<operations["workerTypeCertificateListUsingPOST"]>['requestBody']['content']['application/json']

    /** 证书模板删除 */
    "/v1/bc/company/certificate/remove": Required<operations["removeUsingPOST"]>['requestBody']['content']['application/json']

    /** 证书模板新增或修改 */
    "/v1/bc/company/certificate/saveOrUpdate": Required<operations["saveOrUpdateUsingPOST"]>['requestBody']['content']['application/json']

    /** 经营范围查询 */
    "/v1/bc/company/certificate/scope/get": Required<operations["getUsingPOST"]>['requestBody']['content']['application/json']

    /** 申诉审核 */
    "/v1/bc/admin/comment/appeal/audit": Required<operations["auditUsingPOST"]>['requestBody']['content']['application/json']

    /** 申诉查询 */
    "/v1/bc/admin/comment/appeal/list": Required<operations["appealListUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单评价列表 */
    "/v1/bc/admin/comment/commodity/list": Required<operations["commodityListUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单评价列表 */
    "/v1/bc/api/comment/commodity/list": Required<operations["commodityListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 订单评价提交 */
    "/v1/bc/api/comment/commodity/save": Required<operations["commoditySaveUsingPOST"]>['requestBody']['content']['application/json']

    /** 店铺商品评价 */
    "/v1/bc/api/comment/commodity/view": Required<operations["commodityViewUsingPOST"]>['requestBody']['content']['application/json']

    /** delete */
    "/v1/bc/api/comment/delete": Required<operations["deleteUsingPOST_1"]>['requestBody']['content']['application/json']

    /** Look */
    "/v1/bc/api/comment/look": Required<operations["LookUsingPOST"]>['requestBody']['content']['application/json']

    /** 申诉查询 */
    "/v1/bc/company/comment/appeal/list": Required<operations["appealListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 申诉提交 */
    "/v1/bc/company/comment/appeal/mark": Required<operations["markUsingPOST"]>['requestBody']['content']['application/json']

    /** 申诉举证 */
    "/v1/bc/company/comment/appeal/proof": Required<operations["proofUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单评价列表 */
    "/v1/bc/company/comment/commodity/list": Required<operations["commodityListUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 订单评价回复 */
    "/v1/bc/company/comment/commodity/reply": Required<operations["commodityReplyUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务人员的评价 */
    "/v1/bc/company/comment/workComment": Required<operations["workCommentUsingPOST"]>['requestBody']['content']['application/json']

    /** 处理 */
    "/v1/bc/admin/complaint/handle": Required<operations["do_handleUsingPOST"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/complaint/list": Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']

    /** 纠纷列表 */
    "/v1/bc/api/complaint/list": Required<operations["listUsingPOST_4"]>['requestBody']['content']['application/json']

    /** save */
    "/v1/bc/api/complaint/save": Required<operations["saveUsingPOST"]>['requestBody']['content']['application/json']

    /** 修改客户状态 */
    "/v1/bc/admin/consumer/changeStatus": Required<operations["changeStatusUsingPOST"]>['requestBody']['content']['application/json']

    /** 发放优惠券 */
    "/v1/bc/admin/consumer/distributeCoupon": Required<operations["distributeCouponUsingPOST"]>['requestBody']['content']['application/json']

    /** 导入客户 */
    "/v1/bc/admin/consumer/importData": Required<operations["importThirdConsumerUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 导入客户 */
    "/v1/bc/admin/consumer/importThirdConsumer": Required<operations["importThirdConsumerUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动邀请 */
    "/v1/bc/admin/consumer/inviteActivity": Required<operations["inviteActivityUsingPOST"]>['requestBody']['content']['application/json']

    /** 邀请注册 */
    "/v1/bc/admin/consumer/inviteRegister": Required<operations["inviteRegisterUsingPOST"]>['requestBody']['content']['application/json']

    /** 客户信息管理 */
    "/v1/bc/admin/consumer/list": Required<operations["listUsingPOST_5"]>['requestBody']['content']['application/json']

    /** 客户关系管理 */
    "/v1/bc/admin/consumer/thirdList": Required<operations["thirdListUsingPOST"]>['requestBody']['content']['application/json']

    /** 收住标签删除 */
    "/v1/bc/admin/containTag/delete": Required<operations["deleteUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 收住标签列表 */
    "/v1/bc/admin/containTag/list": Required<operations["listUsingPOST_6"]>['requestBody']['content']['application/json']

    /** 收住标签新增 */
    "/v1/bc/admin/containTag/save": Required<operations["saveUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 收住标签修改 */
    "/v1/bc/admin/containTag/update": Required<operations["updateUsingPOST"]>['requestBody']['content']['application/json']

    /** 合同列表 */
    "/v1/bc/admin/contract/list": Required<operations["getListUsingPOST"]>['requestBody']['content']['application/json']

    /** 新增、修改合同模板 */
    "/v1/bc/admin/contract/template/edit": Required<operations["editTemplateUsingPOST"]>['requestBody']['content']['application/json']

    /** callback */
    "/v1/bc/api/contract/sign/callback": Required<operations["callbackUsingPOST"]>['requestBody']['content']['application/json']

    /** compareFaceVerify */
    "/ali/face/compareFaceVerify": Required<operations["compareFaceVerifyUsingPOST"]>['requestBody']['content']['application/json']

    /** initFaceVerifyIdPlus */
    "/ali/face/initFaceVerifyIdPlus": Required<operations["initFaceVerifyIdPlusUsingPOST"]>['requestBody']['content']['application/json']

    /** 收藏服务 */
    "/v1/bc/app/favorite/itemAdd": Required<operations["itemAddUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消收藏服务 */
    "/v1/bc/app/favorite/itemCancel": Required<operations["itemCancelUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务列表 */
    "/v1/bc/app/favorite/itemList": Required<operations["itemListUsingPOST"]>['requestBody']['content']['application/json']

    /** 收藏店鋪 */
    "/v1/bc/app/favorite/shopAdd": Required<operations["shopAddUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消收藏店鋪 */
    "/v1/bc/app/favorite/shopCancel": Required<operations["shopCancelUsingPOST"]>['requestBody']['content']['application/json']

    /** 店鋪列表 */
    "/v1/bc/app/favorite/shopList": Required<operations["shopListUsingPOST"]>['requestBody']['content']['application/json']

    /** 确认 */
    "/v1/bc/admin/feedback/doAction": Required<operations["doActionUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/feedback/list": Required<operations["listByPageUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 添加 */
    "/v1/bc/company/feedback/add": Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']

    /** 记录 */
    "/v1/bc/company/feedback/list": Required<operations["listUsingPOST_7"]>['requestBody']

    /** 添加 */
    "/v1/bc/server/feedback/add": Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 记录 */
    "/v1/bc/server/feedback/list": Required<operations["listUsingPOST_8"]>['requestBody']

    /** save_config */
    "/v1/bc/admin/invite/config/save": Required<operations["save_configUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/invite/list": Required<operations["listUsingPOST_9"]>['requestBody']['content']['application/json']

    /** share */
    "/v1/bc/api/invite/share": Required<operations["shareUsingPOST"]>['requestBody']

    /** 加入足迹 */
    "/v1/bc/app/item_browse_history/add": Required<operations["addUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 删除足迹 */
    "/v1/bc/app/item_browse_history/del": Required<operations["personalDoActionUsingPOST"]>['requestBody']['content']['application/json']

    /** 足迹列表-按天分组 */
    "/v1/bc/app/item_browse_history/getListGroupByDate": Required<operations["getListGroupByDateUsingPOST"]>['requestBody']['content']['application/json']

    /** 足迹列表 */
    "/v1/bc/app/item_browse_history/list": Required<operations["listUsingPOST_10"]>['requestBody']['content']['application/json']

    /** 修改平台资质 */
    "/v1/bc/admin/licence/edit": Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']

    /** 关闭 */
    "/v1/bc/admin/marketing/close": Required<operations["closeUsingPOST"]>['requestBody']['content']['application/json']

    /** 推广列表 */
    "/v1/bc/admin/marketing/list": Required<operations["admin_listUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 新增修改 */
    "/v1/bc/admin/marketing/save": Required<operations["doSaveUsingPOST_2"]>['requestBody']['content']['application/json']

    /** delete */
    "/v1/bc/admin/menu/delete": Required<operations["deleteUsingPOST_3"]>['requestBody']['content']['application/json']

    /** updateOrCreate */
    "/v1/bc/admin/menu/updateOrCreate": Required<operations["updateOrCreateUsingPOST_2"]>['requestBody']['content']['application/json']

    /** recognizeBankCard */
    "/ali/ocr/recognizeBankCard": Required<operations["recognizeBankCardUsingPOST"]>['parameters']['query']

    /** recognizeBasic */
    "/ali/ocr/recognizeBasic": Required<operations["recognizeBasicUsingPOST"]>['parameters']['query']

    /** recognizeIdCard */
    "/ali/ocr/recognizeIdCard": Required<operations["recognizeIdCardUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/operation/log/list": Required<operations["listUsingPOST_11"]>['requestBody']['content']['application/json']

    /** 新增经营服务类目 */
    "/v1/bc/company/organization/category/save": Required<operations["saveUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 平台/商家店铺入驻审核 */
    "/v1/bc/admin/organization/auditEntering": Required<operations["auditEnteringUsingPOST"]>['requestBody']['content']['application/json']

    /** 获取佣金比例列表 */
    "/v1/bc/admin/organization/getWorkerCommissionList": Required<operations["getWorkerCommissionListUsingPOST"]>['requestBody']['content']['application/json']

    /** 平台/商家列表 */
    "/v1/bc/admin/organization/list": Required<operations["listUsingPOST_12"]>['requestBody']['content']['application/json']

    /** 商家店铺入驻登录或注册 */
    "/v1/bc/admin/organization/loginOrRegister": Required<operations["loginOrRegisterUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 平台/商家店铺入驻审核 */
    "/v1/bc/admin/organization/set/auditEntering": Required<operations["auditEnteringSetUsingPOST"]>['requestBody']['content']['application/json']

    /** 平台/商家列表 */
    "/v1/bc/admin/organization/set/list": Required<operations["listSetUsingPOST"]>['requestBody']['content']['application/json']

    /** 设置佣金比例 */
    "/v1/bc/admin/organization/setWorkerCommission": Required<operations["setWorkerCommissionUsingPOST"]>['requestBody']['content']['application/json']

    /** 平台/商家修改 */
    "/v1/bc/company/organization/modify": Required<operations["modifyUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 平台/商家新增 */
    "/v1/bc/company/organization/save": Required<operations["saveUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 商家主体修改 */
    "/v1/bc/company/organization/setting": Required<operations["settingUsingPOST"]>['requestBody']['content']['application/json']

    /** 获取服务人员关联的门店列表 */
    "/v1/bc/server/organization/simpleList": Required<operations["simpleListUsingPOST"]>['requestBody']['content']['application/json']

    /** 冻结服务人员 */
    "/v1/bc/admin/organization/worker/auditFreeze": Required<operations["auditFreezeUsingPOST"]>['requestBody']['content']['application/json']

    /** 查询服务人员详情 */
    "/v1/bc/admin/organization/worker/detail": Required<operations["getWorkersUsingPOST_1"]>['parameters']['query']

    /** 查询已入驻店铺的服务人员列表 */
    "/v1/bc/admin/organization/worker/getWorkers": Required<operations["getWorkersUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务人员入驻审核 */
    "/v1/bc/company/organization/worker/auditJoining": Required<operations["auditJoiningUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务人员查询 */
    "/v1/bc/company/organization/worker/auditList": Required<operations["auditListUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务人员信息更新审核 */
    "/v1/bc/company/organization/worker/auditUpdating": Required<operations["auditUpdatingUsingPOST"]>['requestBody']['content']['application/json']

    /** 店铺服务人员批量解绑 */
    "/v1/bc/company/organization/worker/disemploy": Required<operations["disemployUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务人员查询 */
    "/v1/bc/company/organization/worker/simpleList": Required<operations["simpleListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 新增或更新服务人员关联门店 */
    "/v1/bc/server/organization/worker/edit": Required<operations["editUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 新增、修改被照护人 */
    "/v1/bc/app/patient/edit": Required<operations["editUsingPOST_2"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/public/article/list": Required<operations["listUsingPOST_13"]>['requestBody']['content']['application/json']

    /** convertToBase64 */
    "/v1/bc/public/convertToBase64": Required<operations["convertToBase64UsingPOST"]>['requestBody']['content']['application/json']

    /** 客服app账号密码登录 */
    "/v1/bc/public/customerServiceAccountLogin": Required<operations["customerServiceAccountLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/app/public/article/list": Required<operations["listUsingPOST_14"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/merchant/public/article/list": Required<operations["listUsingPOST_15"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/server/public/article/list": Required<operations["listUsingPOST_16"]>['requestBody']['content']['application/json']

    /** 更新简历 */
    "/v1/bc/company/resume/update": Required<operations["UpdateUsingPOST"]>['requestBody']['content']['application/json']

    /** 更新简历 */
    "/v1/bc/server/resume/update": Required<operations["UpdateUsingPOST_1"]>['requestBody']['content']['application/json']

    /** bindUser */
    "/v1/bc/admin/role/bindUser": Required<operations["bindUserUsingPOST"]>['requestBody']['content']['application/json']

    /** remove */
    "/v1/bc/admin/role/delete": Required<operations["removeUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 角色列表 */
    "/v1/bc/admin/role/list": Required<operations["listUsingPOST_17"]>['requestBody']['content']['application/json']

    /** bindMenu */
    "/v1/bc/admin/role/menu/bind": Required<operations["bindMenuUsingPOST"]>['requestBody']['content']['application/json']

    /** updateOrCreate */
    "/v1/bc/admin/role/updateOrCreate": Required<operations["updateOrCreateUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 店铺名片审核信息 */
    "/v1/bc/admin/shop/card/auditInfo": Required<operations["auditInfoUsingPOST"]>['requestBody']['content']['application/json']

    /** 店铺名片审核列表 */
    "/v1/bc/admin/shop/card/getAuditList": Required<operations["getAuditListUsingPOST"]>['requestBody']['content']['application/json']

    /** 店铺名片更改记录 */
    "/v1/bc/company/shop/card/getRecords": Required<operations["getRecordsUsingPOST"]>['requestBody']['content']['application/json']

    /** 店铺名片修改 */
    "/v1/bc/company/shop/card/saveOrUpdate": Required<operations["saveOrUpdateUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 店铺信息修改审核 */
    "/v1/bc/admin/shop/audit": Required<operations["auditUsingPOST_1"]>['parameters']['query']

    /** 店铺列表 */
    "/v1/bc/admin/shop/getList": Required<operations["getListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 店铺信息修改列表查询 */
    "/v1/bc/admin/shop/list": Required<operations["listUsingPOST_18"]>['parameters']['query']

    /** 搜索机构 */
    "/v1/bc/admin/shop/organizationList": Required<operations["organizationListUsingPOST"]>['requestBody']['content']['application/json']

    /** 店铺信息修改 */
    "/v1/bc/app/shop/modify": Required<operations["modifyUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 搜索机构 */
    "/v1/bc/app/shop/organizationList": Required<operations["organizationListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 店铺注销 */
    "/v1/bc/company/shop/cancellation": Required<operations["cancellationUsingPOST"]>['requestBody']

    /** 店铺紧急联系设置 */
    "/v1/bc/company/shop/contact": Required<operations["emergencyContactUsingPOST"]>['requestBody']['content']['application/json']

    /** 店铺设置 */
    "/v1/bc/company/shop/edit": Required<operations["editUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 店铺商品配送地址设置 */
    "/v1/bc/company/shop/editShippingAddress": Required<operations["editShippingAddressUsingPOST"]>['requestBody']['content']['application/json']

    /** 获取符合条件的服务人员 */
    "/v1/bc/company/shop/getShopWorker": Required<operations["getShopWorkerUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 店铺信息修改 */
    "/v1/bc/company/shop/modify": Required<operations["modifyUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 获取服务人员的店铺列表 */
    "/v1/bc/server/shop/getByWorkerAndAddress": Required<operations["getByWorkerAndAddressUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 搜索店铺 */
    "/v1/bc/server/shop/getListByKeywords": Required<operations["getListByKeywordsUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 机构设施删除 */
    "/v1/bc/company/shop/facility/delete": Required<operations["deleteUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 机构设施列表 */
    "/v1/bc/company/shop/facility/list": Required<operations["listUsingPOST_19"]>['requestBody']['content']['application/json']

    /** 机构设施新增 */
    "/v1/bc/company/shop/facility/save": Required<operations["saveUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 机构设施修改 */
    "/v1/bc/company/shop/facility/update": Required<operations["updateUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 店铺资质列表 */
    "/v1/bc/company/shop/license/list": Required<operations["listUsingPOST_20"]>['requestBody']['content']['application/json']

    /** 添加地址 */
    "/v1/bc/app/address/add": Required<operations["addUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 地址修改 */
    "/v1/bc/app/address/edit": Required<operations["addUsingPOST_4"]>['requestBody']['content']['application/json']

    /** addSubAccount */
    "/v1/bc/admin/account/add/subaccount": Required<operations["addSubAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/account/del": Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/account/doAction": Required<operations["doActionUsingPOST_2"]>['requestBody']['content']['application/json']

    /** editSubAccount */
    "/v1/bc/admin/account/edit/subaccount": Required<operations["editSubAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/account/list": Required<operations["listUsingPOST_21"]>['requestBody']['content']['application/json']

    /** wxkLogin */
    "/v1/bc/admin/account/wxkLogin": Required<operations["wxkLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 用户注销 */
    "/v1/bc/app/user/destroy": Required<operations["destroyUsingPOST"]>['requestBody']['content']['application/json']

    /** 修改用户信息 */
    "/v1/bc/app/user/edit": Required<operations["editUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 手机号快速验证 */
    "/v1/bc/app/user/getPhoneNumber": Required<operations["getPhoneNumberUsingPOST"]>['requestBody']['content']['application/json']

    /** 登录 */
    "/v1/bc/app/user/login": Required<operations["loginUsingPOST"]>['requestBody']['content']['application/json']

    /** 短信验证码登录 */
    "/v1/bc/app/user/mobileCodeLogin": Required<operations["mobileCodeLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 手机号一键登录 */
    "/v1/bc/app/user/mobileQuicklyLogin": Required<operations["mobileQuicklyLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 无感登录 */
    "/v1/bc/app/user/refreshLogin": Required<operations["refreshLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 微信授权登录 */
    "/v1/bc/app/user/wechatLogin": Required<operations["wechatLoginUsingPOST"]>['requestBody']['content']['application/json']

    /** 绑定银行卡 */
    "/v1/bc/server/workerBankCard/edit": Required<operations["editUsingPOST_5"]>['requestBody']['content']['application/json']

    /** 申请入驻店铺 */
    "/v1/bc/server/worker/applyEnterShop": Required<operations["applyEnterShopUsingPOST"]>['requestBody']['content']['application/json']

    /** 自动登录 */
    "/v1/bc/server/worker/autoLogin": Required<operations["autoLoginUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 服务人员注销 */
    "/v1/bc/server/worker/cancellation": Required<operations["cancellationUsingPOST_1"]>['requestBody']

    /** 修改行业 */
    "/v1/bc/server/worker/editIndustry": Required<operations["editIndustryUsingPOST"]>['requestBody']['content']['application/json']

    /** 登录 */
    "/v1/bc/server/worker/login": Required<operations["loginUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 手机号一键登录 */
    "/v1/bc/server/worker/mobileQuicklyLogin": Required<operations["mobileQuicklyLoginUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 手机号注册 */
    "/v1/bc/server/worker/register": Required<operations["registerUsingPOST"]>['requestBody']['content']['application/json']

    /** 人脸识别照片保存 */
    "/v1/bc/server/worker/saveFaceImage": Required<operations["saveFaceImageUsingPOST"]>['requestBody']['content']['application/json']

    /** delete */
    "/v1/bc/admin/workerType/delete": Required<operations["deleteUsingPOST_5"]>['requestBody']['content']['application/json']

    /** 工种列表 */
    "/v1/bc/admin/workerType/list": Required<operations["listUsingPOST_22"]>['requestBody']['content']['application/json']

    /** 新增或修改 */
    "/v1/bc/admin/workerType/save": Required<operations["saveUsingPOST_5"]>['requestBody']['content']['application/json']

}
