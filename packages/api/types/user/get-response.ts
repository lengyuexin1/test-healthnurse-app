import type { operations } from './schema'

export interface IUserGetResponse {
    /** 活动详情 */
    "/v1/bc/admin/activity/detail": Required<operations["admin_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 报名数据详情 */
    "/v1/bc/admin/activity/enroll/detail": Required<operations["admin_enroll_dataUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 活动详情 */
    "/v1/bc/company/activity/detail": Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 活动报名数据 */
    "/v1/bc/company/activity/enroll/data": Required<operations["enroll_dataUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 活动报名列表 */
    "/v1/bc/company/activity/enroll/list": Required<operations["enroll_listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 位置列表 */
    "/v1/bc/admin/ad/config/list": Required<operations["configListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 时间段 */
    "/v1/bc/admin/ad/times": Required<operations["getAdTimesUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 头条 */
    "/v1/bc/public/ad_store/tt/listener": Required<operations["ttListenerUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取登录二维码 */
    "/v1/bc/company/admin/createLoginCode": Required<operations["createLoginCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取用户信息 */
    "/v1/bc/company/admin/getUserInfo": Required<operations["getUserInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 退出登录 */
    "/v1/bc/company/admin/loginOut": Required<operations["loginOutUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** demo 数据测试 */
    "/v1/bc/admin/agencyInit/test": Required<operations["testUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** city */
    "/v1/bc/amap/city": Required<operations["cityUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** district */
    "/v1/bc/amap/district": Required<operations["districtUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** province */
    "/v1/bc/amap/province": Required<operations["provinceUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** street */
    "/v1/bc/amap/street": Required<operations["streetUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getNewVersion */
    "/app/getNewVersion": Required<operations["getNewVersionUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/admin/appVersion/detail": Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/apply/detail": Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** test */
    "/v1/bc/admin/apply/test": Required<operations["testUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** categoryTree */
    "/v1/bc/admin/article/category/tree": Required<operations["categoryTreeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/article/detail": Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** 关于我们 */
    "/v1/bc/app/config/aboutUs": Required<operations["aboutUsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类目资质详情 */
    "/v1/bc/admin/certificate/categoryCertificateDetail": Required<operations["categoryCertificateDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 证书详情 */
    "/v1/bc/admin/certificate/workerTypeCertificateDetail": Required<operations["workerTypeCertificateDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 申诉详情 */
    "/v1/bc/admin/comment/appeal/details": Required<operations["appealDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 评论详情 */
    "/v1/bc/api/comment/comment/details": Required<operations["commentDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** score */
    "/v1/bc/api/comment/score": Required<operations["scoreUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** scorekey */
    "/v1/bc/api/comment/scorekey": Required<operations["scorekeyUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** tags */
    "/v1/bc/api/comment/tags": Required<operations["tagsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 默认好评 */
    "/v1/bc/company/comment/defaultPraise": Required<operations["defaultPraiseUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 工单所需展示 */
    "/v1/bc/company/comment/jobCommentLook": Required<operations["jobCommentLookUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺的好评率 */
    "/v1/bc/company/comment/shopCommentRate": Required<operations["shopCommentRateUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺评分 */
    "/v1/bc/company/comment/shopScore": Required<operations["shopScoreUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取分享路径 */
    "/v1/bc/app/common/getPage": Required<operations["getPageUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取分享二维码 */
    "/v1/bc/app/common/getQrcode": Required<operations["getQrcodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取店铺基础信息 */
    "/v1/bc/app/common/getShopInfo": Required<operations["getBaseInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 根据分类id获取店铺列表 */
    "/v1/bc/app/common/getShopListBycategoryId": Required<operations["getShopListBycategoryIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有一级服务类目 */
    "/v1/bc/app/common/getStairCategory": Required<operations["getStairCategoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 获取二维码 */
    "/v1/bc/app/common/getWXQrcode": Required<operations["getWxCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 登录凭证校验 */
    "/v1/bc/app/common/getWxMiniProgramSessionKey": Required<operations["getWxMiniProgramSessionKeyUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 新店列表 */
    "/v1/bc/app/common/newList": Required<operations["newListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 优选店铺 */
    "/v1/bc/app/common/preferredList": Required<operations["preferredListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 隐私政策 */
    "/v1/bc/app/common/privacyPolicy": Required<operations["privacyPolicyUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 用户协议 */
    "/v1/bc/app/common/userAgreement": Required<operations["userAgreementUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 授权协议 */
    "/v1/bc/company/common/authorizationList": Required<operations["authorizationListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有区域地址 */
    "/v1/bc/company/common/getAllDistrict": Required<operations["getAllDistrictUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 纠纷详情 */
    "/v1/bc/api/complaint/details": Required<operations["detailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** typeReasonList */
    "/v1/bc/api/complaint/typeReason": Required<operations["typeReasonListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 客户信息详情 */
    "/v1/bc/admin/consumer/detail": Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取配置 */
    "/v1/bc/admin/consumer/getConfig": Required<operations["getConfigUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取导入结果 */
    "/v1/bc/admin/consumer/getImportResult": Required<operations["getImportResultUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取统计数据 */
    "/v1/bc/admin/consumer/getStatistics": Required<operations["getStatisticsUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 手动处理导入数据-测试 */
    "/v1/bc/admin/consumer/handleData": Required<operations["handleDataUsingGET"]>['responses'][200]['content']

    /** 客户关系详情 */
    "/v1/bc/admin/consumer/thirdDetail": Required<operations["thirdDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 收住标签详情 */
    "/v1/bc/admin/containTag/detail": Required<operations["detailUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** 合同详情 */
    "/v1/bc/admin/contract/detail": Required<operations["getListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 合同模板详情 */
    "/v1/bc/admin/contract/template/detail": Required<operations["getTemplateDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 合同模板列表 */
    "/v1/bc/admin/contract/template/list": Required<operations["getTemplateListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类目数据迁移 */
    "/v1/bc/company/dataMigration/categories": Required<operations["categoriesUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 证书数据迁移 */
    "/v1/bc/company/dataMigration/certificates": Required<operations["certificatesUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺关联关系更新 */
    "/v1/bc/company/dataMigration/relevanceUpdate": Required<operations["relevanceUpdateUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取子区域列表 */
    "/v1/bc/app/district/getSonList": Required<operations["getSonListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取子区域列表 */
    "/v1/bc/company/district/getSonList": Required<operations["getSonListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** describeFaceVerify */
    "/ali/face/describeFaceVerify": Required<operations["describeFaceVerifyUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 是否收藏服务 */
    "/v1/bc/app/favorite/isFavoriteItem": Required<operations["isFavoriteItemUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类型 */
    "/v1/bc/company/feedback/type": Required<operations["getTypeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类型 */
    "/v1/bc/server/feedback/type": Required<operations["getTypeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** config */
    "/v1/bc/admin/invite/config": Required<operations["configUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/invite/detail": Required<operations["detailUsingGET_5"]>['responses'][200]['content']['*/*']['data']

    /** userList */
    "/v1/bc/admin/invite/user/list": Required<operations["userListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** config */
    "/v1/bc/api/invite/config": Required<operations["configUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** info */
    "/v1/bc/api/invite/info": Required<operations["infoUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/api/invite/list": Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** qrcode */
    "/v1/bc/api/invite/qrcode": Required<operations["qrcodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 平台合规管理 */
    "/v1/bc/admin/licence/getAll": Required<operations["getAllUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 推广详情 */
    "/v1/bc/admin/marketing/detail": Required<operations["admin__detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** apply_list */
    "/v1/bc/admin/menu/apply/list": Required<operations["apply_listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** all */
    "/v1/bc/admin/menu/list/all": Required<operations["allUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** tree */
    "/v1/bc/admin/menu/tree": Required<operations["treeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** adminTree */
    "/v1/bc/admin/menu/tree/admin": Required<operations["adminTreeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** adminTree1 */
    "/v1/bc/admin/menu/tree/admin1": Required<operations["adminTree1UsingGET"]>['responses'][200]['content']['*/*']['data']

    /** treeAll */
    "/v1/bc/admin/menu/tree/all": Required<operations["treeAllUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 活动详情 */
    "/v1/bc/company/operation/activity/detail": Required<operations["detailUsingGET_6"]>['responses'][200]['content']['*/*']['data']

    /** history */
    "/history": Required<operations["historyUsingGET"]>['responses'][200]['content']['*/*']

    /** 试运营进度详情 */
    "/v1/bc/admin/operation/schedule/detail": Required<operations["detailUsingGET_7"]>['responses'][200]['content']['*/*']['data']

    /** 试运营进度定时任务测试 */
    "/v1/bc/admin/operation/schedule/timerTaskTest": Required<operations["timerTaskTestUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 更新店铺营业状态测试 */
    "/v1/bc/admin/operation/schedule/updateBusinessStatusTest": Required<operations["updateBusinessStatusTestUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 更新试运营进度测试 */
    "/v1/bc/admin/operation/schedule/updateOperationStatusTest": Required<operations["updateOperationStatusTestUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 试运营进度详情 */
    "/v1/bc/company/operation/schedule/detail": Required<operations["detailUsingGET_8"]>['responses'][200]['content']['*/*']['data']

    /** 经营服务类目列表 */
    "/v1/bc/company/organization/category/get": Required<operations["getUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 经营服务类目列表 */
    "/v1/bc/company/organization/category/list": Required<operations["listUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 经营服务类目列表 */
    "/v1/bc/admin/organization/category/getById": Required<operations["getByIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 商家店铺入驻登录或注册 */
    "/v1/bc/admin/organization/agencyOrHealthDataClean": Required<operations["agencyOrHealthDataCleanUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 平台/商家详情 */
    "/v1/bc/admin/organization/detail": Required<operations["detailUsingGET_9"]>['responses'][200]['content']['*/*']['data']

    /** getUpdateLog */
    "/v1/bc/admin/organization/getUpdateLog": Required<operations["getUpdateLogUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 平台/商家详情 */
    "/v1/bc/admin/organization/set/detail": Required<operations["detailSetUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** timerTaskTest */
    "/v1/bc/admin/organization/timerTaskTest": Required<operations["timerTaskTestUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有一级服务类目 */
    "/v1/bc/app/organization/getAllCategory": Required<operations["getAllCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有一级服务类目 */
    "/v1/bc/app/organization/getStairCategory": Required<operations["getStairCategoryUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 根据注册用户查询平台/商家详情 */
    "/v1/bc/company/organization/detailByUser": Required<operations["detailByUserUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有一级服务类目 */
    "/v1/bc/company/organization/getAllCategory": Required<operations["getAllCategoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 查询审核记录 */
    "/v1/bc/company/organization/getAuditDetail": Required<operations["getAuditDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 查询审核记录 */
    "/v1/bc/company/organization/getAuditRecord": Required<operations["getAuditRecordUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有一级服务类目 */
    "/v1/bc/company/organization/getStairCategory": Required<operations["getStairCategoryUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** 查询商家店铺状态 */
    "/v1/bc/company/organization/getState": Required<operations["getStateUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 商家主体详情 */
    "/v1/bc/company/organization/info": Required<operations["infoUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有一级服务类目 */
    "/v1/bc/server/organization/getAllCategory": Required<operations["getAllCategoryUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 获取所有一级服务类目 */
    "/v1/bc/server/organization/getStairCategory": Required<operations["getStairCategoryUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** 根据商家编号获取门店工种信息 */
    "/v1/bc/server/organization/getWorkerType": Required<operations["getWorkerTypeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员详情 */
    "/v1/bc/company/organization/worker/detail": Required<operations["detailUsingGET_10"]>['responses'][200]['content']['*/*']['data']

    /** 根据商家编号获取服务人员选定的工种信息 */
    "/v1/bc/server/organization/worker/getWorkerDetail": Required<operations["getWorkerDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 删除被照护人 */
    "/v1/bc/app/patient/del": Required<operations["delUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 被照护人详情 */
    "/v1/bc/app/patient/detail": Required<operations["getDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 被照护人列表 */
    "/v1/bc/app/patient/list": Required<operations["getListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 广告-APP启动 */
    "/v1/bc/public/ad/startup": Required<operations["startupUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** categoryTree */
    "/v1/bc/public/article/category/tree": Required<operations["categoryTreeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/public/article/detail": Required<operations["detailUsingGET_12"]>['responses'][200]['content']['*/*']['data']

    /** 个体创作推荐 */
    "/v1/bc/public/guess_articles": Required<operations["getGuessContentArticlesUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** categoryTree */
    "/v1/bc/app/public/article/category/tree": Required<operations["categoryTreeUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** licence */
    "/v1/bc/app/public/licence": Required<operations["licenceUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** categoryTree */
    "/v1/bc/merchant/public/article/category/tree": Required<operations["categoryTreeUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/merchant/public/article/detail": Required<operations["detailUsingGET_13"]>['responses'][200]['content']['*/*']['data']

    /** categoryTree */
    "/v1/bc/server/public/article/category/tree": Required<operations["categoryTreeUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/server/public/article/detail": Required<operations["detailUsingGET_14"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员其他简历-店铺 */
    "/v1/bc/admin/resume/worker/company": Required<operations["workerDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员简历详情 */
    "/v1/bc/admin/resume/worker/detail": Required<operations["detailUsingGET_15"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员简历列表 */
    "/v1/bc/admin/resume/worker/list": Required<operations["listUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** 简历详情 */
    "/v1/bc/app/resume/detail": Required<operations["detailUsingGET_16"]>['responses'][200]['content']['*/*']['data']

    /** 简历详情 */
    "/v1/bc/company/resume/detail": Required<operations["detailUsingGET_17"]>['responses'][200]['content']['*/*']['data']

    /** 简历详情 */
    "/v1/bc/company/resume/detail/worker": Required<operations["workerDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 简历详情 */
    "/v1/bc/server/resume/detail": Required<operations["detailUsingGET_18"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/role/detail": Required<operations["detailUsingGET_19"]>['responses'][200]['content']['*/*']['data']

    /** getMenuIdsByRoleId */
    "/v1/bc/admin/role/menu/list": Required<operations["getMenuIdsByRoleIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 模板列表 */
    "/v1/bc/admin/role/im_template/all": Required<operations["allUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 店铺名片审核详情 */
    "/v1/bc/admin/shop/card/auditDetail": Required<operations["auditDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺名片详情 */
    "/v1/bc/company/shop/card/detail": Required<operations["detailUsingGET_20"]>['responses'][200]['content']['*/*']['data']

    /** 店铺名片更改记录详情 */
    "/v1/bc/company/shop/card/recordDetail": Required<operations["recordDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺协议 */
    "/v1/bc/admin/shop/agreement": Required<operations["agreementUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 保证金账户初始化 */
    "/v1/bc/admin/shop/initMarginAccount": Required<operations["initMarginAccountUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺手续费合同 */
    "/v1/bc/admin/shop/marginAgreement": Required<operations["marginAgreementUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取店铺基础信息 */
    "/v1/bc/app/shop/getBaseInfo": Required<operations["getBaseInfoUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** 机构详情 */
    "/v1/bc/app/shop/organizationDetail": Required<operations["organizationDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺协议 */
    "/v1/bc/company/shop/agreement": Required<operations["agreementUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 商品下架查询 */
    "/v1/bc/company/shop/checkUndercarriage": Required<operations["checkUndercarriageUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺认领 */
    "/v1/bc/company/shop/claim": Required<operations["claimUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺详情 */
    "/v1/bc/company/shop/detail": Required<operations["detailUsingGET_21"]>['responses'][200]['content']['*/*']['data']

    /** 店铺商品配送地址查询 */
    "/v1/bc/company/shop/getShippingAddress": Required<operations["getShippingAddressUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 获取店铺的类目 */
    "/v1/bc/company/shop/getShopCategory": Required<operations["getShopCategoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 获取店铺的二级类目 */
    "/v1/bc/company/shop/getShopCategoryById": Required<operations["getShopCategoryByIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取店铺类目树型 */
    "/v1/bc/company/shop/getShopItreeCategory": Required<operations["getItreeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取店铺的一级类目 */
    "/v1/bc/company/shop/getShopParentCategory": Required<operations["getShopParentCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 材料提交列表 */
    "/v1/bc/company/shop/platformOrder": Required<operations["platformOrderUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 紧急联系 */
    "/v1/bc/server/shop/contact": Required<operations["workerShopContactListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取店铺的职业列表 */
    "/v1/bc/server/shop/getWorkerType": Required<operations["getWorkerTypeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 机构设施详情 */
    "/v1/bc/company/shop/facility/detail": Required<operations["detailUsingGET_22"]>['responses'][200]['content']['*/*']['data']

    /** 店铺资质详情 */
    "/v1/bc/company/shop/license/detail": Required<operations["detailUsingGET_23"]>['responses'][200]['content']['*/*']['data']

    /** overview */
    "/v1/bc/company/stat/overview": Required<operations["overviewUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getMobileFromToken */
    "/ali/sms/getMobileFromToken": Required<operations["getMobileFromTokenUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** sendBankCardCode */
    "/ali/sms/sendBankCardCode": Required<operations["sendBankCardCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** sendBindCode */
    "/ali/sms/sendBindCode": Required<operations["sendBindCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** sendLoginCode */
    "/ali/sms/sendLoginCode": Required<operations["sendLoginCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** sendRegisterCode */
    "/ali/sms/sendRegisterCode": Required<operations["sendRegisterCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** accountStat */
    "/v1/bc/admin/stat/account": Required<operations["accountStatUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** settled */
    "/v1/bc/admin/stat/settled": Required<operations["settledUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** initBusinessCardPrice */
    "/v1/bc/admin/test/initBusinessCardPrice": Required<operations["initBusinessCardPriceUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** accountStat */
    "/v1/bc/admin/test/testz": Required<operations["accountStatUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** worker */
    "/v1/bc/admin/test/worker": Required<operations["workerUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** fetchStsUploadCredential */
    "/v1/bc/oss/sts/upload/credential": Required<operations["fetchStsUploadCredentialUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** fetchStsViewCredential */
    "/v1/bc/oss/sts/view/credential": Required<operations["fetchStsViewCredentialUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** uploadOssFrom */
    "/v1/bc/oss/url/upload": Required<operations["uploadOssFromUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 用户地址列表 */
    "/v1/bc/admin/user/address/list": Required<operations["getUserAddressListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 地址删除 */
    "/v1/bc/app/address/del": Required<operations["delUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 地址详情 */
    "/v1/bc/app/address/detail": Required<operations["detailUsingGET_24"]>['responses'][200]['content']['*/*']['data']

    /** 地址列表 */
    "/v1/bc/app/address/list": Required<operations["listUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/account/detail": Required<operations["detailUsingGET_25"]>['responses'][200]['content']['*/*']['data']

    /** getMenuIdsByUserId */
    "/v1/bc/admin/account/menu/list": Required<operations["getMenuIdsByUserIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** organizationList */
    "/v1/bc/admin/account/organization/list": Required<operations["organizationListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getPermissionsByUserId */
    "/v1/bc/admin/account/permission/list": Required<operations["getPermissionsByUserIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** setDefaultAvatar */
    "/v1/bc/admin/account/setDefaultAvatar": Required<operations["setDefaultAvatarUsingGET"]>['responses'][200]['content']

    /** userInfo */
    "/v1/bc/admin/account/user/info": Required<operations["userInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 用户实名认证 */
    "/v1/bc/app/user/certificateByCertifyId": Required<operations["certificateByCertifyIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取用户详情 */
    "/v1/bc/app/user/detail": Required<operations["detailUsingGET_26"]>['responses'][200]['content']['*/*']['data']

    /** 银行卡详情 */
    "/v1/bc/server/workerBankCard/detail": Required<operations["detailUsingGET_27"]>['responses'][200]['content']['*/*']['data']

    /** 获取申请详情 */
    "/v1/bc/server/workerCertificate/applyDetail": Required<operations["applyDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 配置字典List */
    "/v1/bc/company/company/configList": Required<operations["configListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 配置字典 */
    "/v1/bc/company/company/configMap": Required<operations["configMapUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getLanguageList */
    "/v1/bc/app/workerConfig/getLanguageList": Required<operations["getLanguageListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** getOriginList */
    "/v1/bc/app/workerConfig/getOriginList": Required<operations["getOriginListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 背景审查 */
    "/v1/bc/server/worker/backgroundCheck": Required<operations["backgroundCheckUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 人脸 + 身份证认证 */
    "/v1/bc/server/worker/certificateByCertifyId": Required<operations["certificateByCertifyIdUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 认证主页 */
    "/v1/bc/server/worker/certificationInfo": Required<operations["certificationInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取详情 */
    "/v1/bc/server/worker/detail": Required<operations["detailUsingGET_28"]>['responses'][200]['content']['*/*']['data']

    /** 获取职业 */
    "/v1/bc/server/worker/getWorkerType": Required<operations["getWorkerTypeUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/admin/workerType/detail": Required<operations["detailUsingGET_29"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/admin/workerType/role": Required<operations["roleUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 工种角色列表 */
    "/v1/bc/admin/workerType/roleList": Required<operations["roleListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 工种角色列表 */
    "/v1/bc/admin/workerType/roleListLikeCategory": Required<operations["roleListLikeCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取类目所有工种 */
    "/v1/bc/company/workerType/commuteList": Required<operations["commuteListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 根据行业获取工种 */
    "/v1/bc/server/workerType/getCertificateList": Required<operations["getCertificateListUsingGET"]>['responses'][200]['content']['*/*']['data']

}
