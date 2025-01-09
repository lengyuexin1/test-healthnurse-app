import type { operations } from './schema'

export interface IUserGetRequest {
    /** 活动详情 */
    "/v1/bc/admin/activity/detail": Required<operations["admin_detailUsingGET"]>['parameters']['query']

    /** 报名数据详情 */
    "/v1/bc/admin/activity/enroll/detail": Required<operations["admin_enroll_dataUsingGET"]>['parameters']['query']

    /** 活动详情 */
    "/v1/bc/company/activity/detail": Required<operations["detailUsingGET"]>['parameters']['query']

    /** 活动报名数据 */
    "/v1/bc/company/activity/enroll/data": Required<operations["enroll_dataUsingGET"]>['parameters']['query']

    /** 活动报名列表 */
    "/v1/bc/company/activity/enroll/list": Required<operations["enroll_listUsingGET"]>['parameters']['query']

    /** 位置列表 */
    "/v1/bc/admin/ad/config/list": Required<operations["configListUsingGET"]>['parameters']['query']

    /** 时间段 */
    "/v1/bc/admin/ad/times": Required<operations["getAdTimesUsingGET"]>['parameters']['query']

    /** 获取登录二维码 */
    "/v1/bc/company/admin/createLoginCode": Required<operations["createLoginCodeUsingGET"]>['parameters']['query']

    /** 获取用户信息 */
    "/v1/bc/company/admin/getUserInfo": Required<operations["getUserInfoUsingGET"]>['parameters']['query']

    /** 退出登录 */
    "/v1/bc/company/admin/loginOut": Required<operations["loginOutUsingGET"]>['parameters']['query']

    /** demo 数据测试 */
    "/v1/bc/admin/agencyInit/test": Required<operations["testUsingGET"]>['parameters']['query']

    /** city */
    "/v1/bc/amap/city": Required<operations["cityUsingGET"]>['parameters']['query']

    /** district */
    "/v1/bc/amap/district": Required<operations["districtUsingGET"]>['parameters']['query']

    /** province */
    "/v1/bc/amap/province": Required<operations["provinceUsingGET"]>['parameters']['query']

    /** street */
    "/v1/bc/amap/street": Required<operations["streetUsingGET"]>['parameters']['query']

    /** getNewVersion */
    "/app/getNewVersion": Required<operations["getNewVersionUsingGET"]>['parameters']['query']

    /** 详情 */
    "/v1/bc/admin/appVersion/detail": Required<operations["detailUsingGET_1"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/apply/detail": Required<operations["detailUsingGET_2"]>['parameters']['query']

    /** test */
    "/v1/bc/admin/apply/test": Required<operations["testUsingGET_1"]>['parameters']['query']

    /** categoryTree */
    "/v1/bc/admin/article/category/tree": Required<operations["categoryTreeUsingGET"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/article/detail": Required<operations["detailUsingGET_3"]>['parameters']['query']

    /** 关于我们 */
    "/v1/bc/app/config/aboutUs": Required<operations["aboutUsUsingGET"]>['parameters']['query']

    /** 类目资质详情 */
    "/v1/bc/admin/certificate/categoryCertificateDetail": Required<operations["categoryCertificateDetailUsingGET"]>['parameters']['query']

    /** 证书详情 */
    "/v1/bc/admin/certificate/workerTypeCertificateDetail": Required<operations["workerTypeCertificateDetailUsingGET"]>['parameters']['query']

    /** 申诉详情 */
    "/v1/bc/admin/comment/appeal/details": Required<operations["appealDetailsUsingGET"]>['parameters']['query']

    /** score */
    "/v1/bc/api/comment/score": Required<operations["scoreUsingGET"]>['parameters']['query']

    /** scorekey */
    "/v1/bc/api/comment/scorekey": Required<operations["scorekeyUsingGET"]>['parameters']['query']

    /** tags */
    "/v1/bc/api/comment/tags": Required<operations["tagsUsingGET"]>['parameters']['query']

    /** 默认好评 */
    "/v1/bc/company/comment/defaultPraise": Required<operations["defaultPraiseUsingGET_1"]>['parameters']['query']

    /** 工单所需展示 */
    "/v1/bc/company/comment/jobCommentLook": Required<operations["jobCommentLookUsingGET"]>['parameters']['query']

    /** 店铺的好评率 */
    "/v1/bc/company/comment/shopCommentRate": Required<operations["shopCommentRateUsingGET"]>['parameters']['query']

    /** 店铺评分 */
    "/v1/bc/company/comment/shopScore": Required<operations["shopScoreUsingGET"]>['parameters']['query']

    /** 获取分享路径 */
    "/v1/bc/app/common/getPage": Required<operations["getPageUsingGET"]>['parameters']['query']

    /** 获取分享二维码 */
    "/v1/bc/app/common/getQrcode": Required<operations["getQrcodeUsingGET"]>['parameters']['query']

    /** 获取店铺基础信息 */
    "/v1/bc/app/common/getShopInfo": Required<operations["getBaseInfoUsingGET"]>['parameters']['query']

    /** 根据分类id获取店铺列表 */
    "/v1/bc/app/common/getShopListBycategoryId": Required<operations["getShopListBycategoryIdUsingGET"]>['parameters']['query']

    /** 获取所有一级服务类目 */
    "/v1/bc/app/common/getStairCategory": Required<operations["getStairCategoryUsingGET_1"]>['parameters']['query']

    /** 获取二维码 */
    "/v1/bc/app/common/getWXQrcode": Required<operations["getWxCodeUsingGET"]>['parameters']['query']

    /** 登录凭证校验 */
    "/v1/bc/app/common/getWxMiniProgramSessionKey": Required<operations["getWxMiniProgramSessionKeyUsingGET"]>['parameters']['query']

    /** 新店列表 */
    "/v1/bc/app/common/newList": Required<operations["newListUsingGET"]>['parameters']['query']

    /** 优选店铺 */
    "/v1/bc/app/common/preferredList": Required<operations["preferredListUsingGET"]>['parameters']['query']

    /** 隐私政策 */
    "/v1/bc/app/common/privacyPolicy": Required<operations["privacyPolicyUsingGET"]>['parameters']['query']

    /** 用户协议 */
    "/v1/bc/app/common/userAgreement": Required<operations["userAgreementUsingGET"]>['parameters']['query']

    /** 授权协议 */
    "/v1/bc/company/common/authorizationList": Required<operations["authorizationListUsingGET"]>['parameters']['query']

    /** 获取所有区域地址 */
    "/v1/bc/company/common/getAllDistrict": Required<operations["getAllDistrictUsingGET"]>['parameters']['query']

    /** 纠纷详情 */
    "/v1/bc/api/complaint/details": Required<operations["detailsUsingGET"]>['parameters']['query']

    /** typeReasonList */
    "/v1/bc/api/complaint/typeReason": Required<operations["typeReasonListUsingGET"]>['parameters']['query']

    /** 客户信息详情 */
    "/v1/bc/admin/consumer/detail": Required<operations["listUsingGET"]>['parameters']['query']

    /** 获取配置 */
    "/v1/bc/admin/consumer/getConfig": Required<operations["getConfigUsingGET"]>['parameters']['query']

    /** 获取导入结果 */
    "/v1/bc/admin/consumer/getImportResult": Required<operations["getImportResultUsingGET"]>['parameters']['query']

    /** 获取统计数据 */
    "/v1/bc/admin/consumer/getStatistics": Required<operations["getStatisticsUsingGET_1"]>['parameters']['query']

    /** 手动处理导入数据-测试 */
    "/v1/bc/admin/consumer/handleData": Required<operations["handleDataUsingGET"]>['parameters']['query']

    /** 客户关系详情 */
    "/v1/bc/admin/consumer/thirdDetail": Required<operations["thirdDetailUsingGET"]>['parameters']['query']

    /** 收住标签详情 */
    "/v1/bc/admin/containTag/detail": Required<operations["detailUsingGET_4"]>['parameters']['query']

    /** 合同详情 */
    "/v1/bc/admin/contract/detail": Required<operations["getListUsingGET"]>['parameters']['query']

    /** 合同模板详情 */
    "/v1/bc/admin/contract/template/detail": Required<operations["getTemplateDetailUsingGET"]>['parameters']['query']

    /** 合同模板列表 */
    "/v1/bc/admin/contract/template/list": Required<operations["getTemplateListUsingGET"]>['parameters']['query']

    /** 类目数据迁移 */
    "/v1/bc/company/dataMigration/categories": Required<operations["categoriesUsingGET"]>['parameters']['query']

    /** 证书数据迁移 */
    "/v1/bc/company/dataMigration/certificates": Required<operations["certificatesUsingGET"]>['parameters']['query']

    /** 店铺关联关系更新 */
    "/v1/bc/company/dataMigration/relevanceUpdate": Required<operations["relevanceUpdateUsingGET"]>['parameters']['query']

    /** 获取子区域列表 */
    "/v1/bc/app/district/getSonList": Required<operations["getSonListUsingGET"]>['parameters']['query']

    /** 获取子区域列表 */
    "/v1/bc/company/district/getSonList": Required<operations["getSonListUsingGET_1"]>['parameters']['query']

    /** describeFaceVerify */
    "/ali/face/describeFaceVerify": Required<operations["describeFaceVerifyUsingGET"]>['parameters']['query']

    /** 是否收藏服务 */
    "/v1/bc/app/favorite/isFavoriteItem": Required<operations["isFavoriteItemUsingGET"]>['parameters']['query']

    /** 类型 */
    "/v1/bc/company/feedback/type": Required<operations["getTypeUsingGET"]>['parameters']['query']

    /** 类型 */
    "/v1/bc/server/feedback/type": Required<operations["getTypeUsingGET_1"]>['parameters']['query']

    /** config */
    "/v1/bc/admin/invite/config": Required<operations["configUsingGET"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/invite/detail": Required<operations["detailUsingGET_5"]>['parameters']['query']

    /** userList */
    "/v1/bc/admin/invite/user/list": Required<operations["userListUsingGET"]>['parameters']['query']

    /** config */
    "/v1/bc/api/invite/config": Required<operations["configUsingGET_1"]>['parameters']['query']

    /** info */
    "/v1/bc/api/invite/info": Required<operations["infoUsingGET"]>['parameters']['query']

    /** list */
    "/v1/bc/api/invite/list": Required<operations["listUsingGET_1"]>['parameters']['query']

    /** qrcode */
    "/v1/bc/api/invite/qrcode": Required<operations["qrcodeUsingGET"]>['parameters']['query']

    /** 平台合规管理 */
    "/v1/bc/admin/licence/getAll": Required<operations["getAllUsingGET"]>['parameters']['query']

    /** 推广详情 */
    "/v1/bc/admin/marketing/detail": Required<operations["admin__detailUsingGET"]>['parameters']['query']

    /** apply_list */
    "/v1/bc/admin/menu/apply/list": Required<operations["apply_listUsingGET"]>['parameters']['query']

    /** all */
    "/v1/bc/admin/menu/list/all": Required<operations["allUsingGET"]>['parameters']['query']

    /** tree */
    "/v1/bc/admin/menu/tree": Required<operations["treeUsingGET"]>['parameters']['query']

    /** adminTree */
    "/v1/bc/admin/menu/tree/admin": Required<operations["adminTreeUsingGET"]>['parameters']['query']

    /** adminTree1 */
    "/v1/bc/admin/menu/tree/admin1": Required<operations["adminTree1UsingGET"]>['parameters']['query']

    /** treeAll */
    "/v1/bc/admin/menu/tree/all": Required<operations["treeAllUsingGET"]>['parameters']['query']

    /** history */
    "/history": Required<operations["historyUsingGET"]>['parameters']['query']

    /** 经营服务类目列表 */
    "/v1/bc/company/organization/category/get": Required<operations["getUsingGET"]>['parameters']['query']

    /** 经营服务类目列表 */
    "/v1/bc/company/organization/category/list": Required<operations["listUsingGET_2"]>['parameters']['query']

    /** 经营服务类目列表 */
    "/v1/bc/admin/organization/category/getById": Required<operations["getByIdUsingGET"]>['parameters']['query']

    /** 商家店铺入驻登录或注册 */
    "/v1/bc/admin/organization/agencyOrHealthDataClean": Required<operations["agencyOrHealthDataCleanUsingGET"]>['parameters']['query']

    /** 平台/商家详情 */
    "/v1/bc/admin/organization/detail": Required<operations["detailUsingGET_6"]>['parameters']['query']

    /** getUpdateLog */
    "/v1/bc/admin/organization/getUpdateLog": Required<operations["getUpdateLogUsingGET"]>['parameters']['query']

    /** 平台/商家详情 */
    "/v1/bc/admin/organization/set/detail": Required<operations["detailSetUsingGET"]>['parameters']['query']

    /** 获取所有一级服务类目 */
    "/v1/bc/app/organization/getAllCategory": Required<operations["getAllCategoryUsingGET"]>['parameters']['query']

    /** 获取所有一级服务类目 */
    "/v1/bc/app/organization/getStairCategory": Required<operations["getStairCategoryUsingGET_2"]>['parameters']['query']

    /** 根据注册用户查询平台/商家详情 */
    "/v1/bc/company/organization/detailByUser": Required<operations["detailByUserUsingGET"]>['parameters']['query']

    /** 获取所有一级服务类目 */
    "/v1/bc/company/organization/getAllCategory": Required<operations["getAllCategoryUsingGET_1"]>['parameters']['query']

    /** 查询审核记录 */
    "/v1/bc/company/organization/getAuditDetail": Required<operations["getAuditDetailUsingGET"]>['parameters']['query']

    /** 查询审核记录 */
    "/v1/bc/company/organization/getAuditRecord": Required<operations["getAuditRecordUsingGET"]>['parameters']['query']

    /** 获取所有一级服务类目 */
    "/v1/bc/company/organization/getStairCategory": Required<operations["getStairCategoryUsingGET_3"]>['parameters']['query']

    /** 查询商家店铺状态 */
    "/v1/bc/company/organization/getState": Required<operations["getStateUsingGET"]>['parameters']['query']

    /** 商家主体详情 */
    "/v1/bc/company/organization/info": Required<operations["infoUsingGET_1"]>['parameters']['query']

    /** 获取所有一级服务类目 */
    "/v1/bc/server/organization/getAllCategory": Required<operations["getAllCategoryUsingGET_2"]>['parameters']['query']

    /** 获取所有一级服务类目 */
    "/v1/bc/server/organization/getStairCategory": Required<operations["getStairCategoryUsingGET_4"]>['parameters']['query']

    /** 根据商家编号获取门店工种信息 */
    "/v1/bc/server/organization/getWorkerType": Required<operations["getWorkerTypeUsingGET"]>['parameters']['query']

    /** 服务人员详情 */
    "/v1/bc/company/organization/worker/detail": Required<operations["detailUsingGET_7"]>['parameters']['query']

    /** 根据商家编号获取服务人员选定的工种信息 */
    "/v1/bc/server/organization/worker/getWorkerDetail": Required<operations["getWorkerDetailUsingGET"]>['parameters']['query']

    /** 删除被照护人 */
    "/v1/bc/app/patient/del": Required<operations["delUsingGET"]>['parameters']['query']

    /** 被照护人详情 */
    "/v1/bc/app/patient/detail": Required<operations["getDetailUsingGET"]>['parameters']['query']

    /** 被照护人列表 */
    "/v1/bc/app/patient/list": Required<operations["getListUsingGET_1"]>['parameters']['query']

    /** categoryTree */
    "/v1/bc/public/article/category/tree": Required<operations["categoryTreeUsingGET_1"]>['parameters']['query']

    /** detail */
    "/v1/bc/public/article/detail": Required<operations["detailUsingGET_9"]>['parameters']['query']

    /** categoryTree */
    "/v1/bc/app/public/article/category/tree": Required<operations["categoryTreeUsingGET_2"]>['parameters']['query']

    /** licence */
    "/v1/bc/app/public/licence": Required<operations["licenceUsingGET"]>['parameters']['query']

    /** categoryTree */
    "/v1/bc/merchant/public/article/category/tree": Required<operations["categoryTreeUsingGET_3"]>['parameters']['query']

    /** detail */
    "/v1/bc/merchant/public/article/detail": Required<operations["detailUsingGET_10"]>['parameters']['query']

    /** categoryTree */
    "/v1/bc/server/public/article/category/tree": Required<operations["categoryTreeUsingGET_4"]>['parameters']['query']

    /** detail */
    "/v1/bc/server/public/article/detail": Required<operations["detailUsingGET_11"]>['parameters']['query']

    /** 服务人员其他简历-店铺 */
    "/v1/bc/admin/resume/worker/company": Required<operations["workerDetailUsingGET"]>['parameters']['query']

    /** 服务人员简历详情 */
    "/v1/bc/admin/resume/worker/detail": Required<operations["detailUsingGET_12"]>['parameters']['query']

    /** 服务人员简历列表 */
    "/v1/bc/admin/resume/worker/list": Required<operations["listUsingGET_3"]>['parameters']['query']

    /** 简历详情 */
    "/v1/bc/app/resume/detail": Required<operations["detailUsingGET_13"]>['parameters']['query']

    /** 简历详情 */
    "/v1/bc/company/resume/detail": Required<operations["detailUsingGET_14"]>['parameters']['query']

    /** 简历详情 */
    "/v1/bc/company/resume/detail/worker": Required<operations["workerDetailUsingGET_1"]>['parameters']['query']

    /** 简历详情 */
    "/v1/bc/server/resume/detail": Required<operations["detailUsingGET_15"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/role/detail": Required<operations["detailUsingGET_16"]>['parameters']['query']

    /** getMenuIdsByRoleId */
    "/v1/bc/admin/role/menu/list": Required<operations["getMenuIdsByRoleIdUsingGET"]>['parameters']['query']

    /** 店铺名片审核详情 */
    "/v1/bc/admin/shop/card/auditDetail": Required<operations["auditDetailUsingGET"]>['parameters']['query']

    /** 店铺名片详情 */
    "/v1/bc/company/shop/card/detail": Required<operations["detailUsingGET_17"]>['parameters']['query']

    /** 店铺名片更改记录详情 */
    "/v1/bc/company/shop/card/recordDetail": Required<operations["recordDetailUsingGET"]>['parameters']['query']

    /** 店铺协议 */
    "/v1/bc/admin/shop/agreement": Required<operations["agreementUsingGET"]>['parameters']['query']

    /** 初始化手续费合同-上线删除 */
    "/v1/bc/admin/shop/initCommissionData": Required<operations["initCommissionDataUsingGET"]>['parameters']['query']

    /** 保证金账户初始化 */
    "/v1/bc/admin/shop/initMarginAccount": Required<operations["initMarginAccountUsingGET"]>['parameters']['query']

    /** 店铺手续费合同 */
    "/v1/bc/admin/shop/marginAgreement": Required<operations["marginAgreementUsingGET"]>['parameters']['query']

    /** 获取店铺基础信息 */
    "/v1/bc/app/shop/getBaseInfo": Required<operations["getBaseInfoUsingGET_4"]>['parameters']['query']

    /** 机构详情 */
    "/v1/bc/app/shop/organizationDetail": Required<operations["organizationDetailUsingGET"]>['parameters']['query']

    /** 店铺协议 */
    "/v1/bc/company/shop/agreement": Required<operations["agreementUsingGET_1"]>['parameters']['query']

    /** 商品下架查询 */
    "/v1/bc/company/shop/checkUndercarriage": Required<operations["checkUndercarriageUsingGET"]>['parameters']['query']

    /** 店铺认领 */
    "/v1/bc/company/shop/claim": Required<operations["claimUsingGET"]>['parameters']['query']

    /** 店铺详情 */
    "/v1/bc/company/shop/detail": Required<operations["detailUsingGET_18"]>['parameters']['query']

    /** 店铺商品配送地址查询 */
    "/v1/bc/company/shop/getShippingAddress": Required<operations["getShippingAddressUsingGET_1"]>['parameters']['query']

    /** 获取店铺的类目 */
    "/v1/bc/company/shop/getShopCategory": Required<operations["getShopCategoryUsingGET_1"]>['parameters']['query']

    /** 获取店铺的二级类目 */
    "/v1/bc/company/shop/getShopCategoryById": Required<operations["getShopCategoryByIdUsingGET"]>['parameters']['query']

    /** 获取店铺类目树型 */
    "/v1/bc/company/shop/getShopItreeCategory": Required<operations["getItreeUsingGET"]>['parameters']['query']

    /** 获取店铺的一级类目 */
    "/v1/bc/company/shop/getShopParentCategory": Required<operations["getShopParentCategoryUsingGET"]>['parameters']['query']

    /** 材料提交列表 */
    "/v1/bc/company/shop/platformOrder": Required<operations["platformOrderUsingGET"]>['parameters']['query']

    /** 紧急联系 */
    "/v1/bc/server/shop/contact": Required<operations["workerShopContactListUsingGET"]>['parameters']['query']

    /** 获取店铺的职业列表 */
    "/v1/bc/server/shop/getWorkerType": Required<operations["getWorkerTypeUsingGET_1"]>['parameters']['query']

    /** 机构设施详情 */
    "/v1/bc/company/shop/facility/detail": Required<operations["detailUsingGET_19"]>['parameters']['query']

    /** 店铺资质详情 */
    "/v1/bc/company/shop/license/detail": Required<operations["detailUsingGET_20"]>['parameters']['query']

    /** overview */
    "/v1/bc/company/stat/overview": Required<operations["overviewUsingGET"]>['parameters']['query']

    /** getMobileFromToken */
    "/ali/sms/getMobileFromToken": Required<operations["getMobileFromTokenUsingGET"]>['parameters']['query']

    /** sendBankCardCode */
    "/ali/sms/sendBankCardCode": Required<operations["sendBankCardCodeUsingGET"]>['parameters']['query']

    /** sendBindCode */
    "/ali/sms/sendBindCode": Required<operations["sendBindCodeUsingGET"]>['parameters']['query']

    /** sendLoginCode */
    "/ali/sms/sendLoginCode": Required<operations["sendLoginCodeUsingGET"]>['parameters']['query']

    /** sendRegisterCode */
    "/ali/sms/sendRegisterCode": Required<operations["sendRegisterCodeUsingGET"]>['parameters']['query']

    /** accountStat */
    "/v1/bc/admin/stat/account": Required<operations["accountStatUsingGET"]>['parameters']['query']

    /** settled */
    "/v1/bc/admin/stat/settled": Required<operations["settledUsingGET"]>['parameters']['query']

    /** initBusinessCardPrice */
    "/v1/bc/admin/test/initBusinessCardPrice": Required<operations["initBusinessCardPriceUsingGET"]>['parameters']['query']

    /** accountStat */
    "/v1/bc/admin/test/testz": Required<operations["accountStatUsingGET_1"]>['parameters']['query']

    /** fetchStsUploadCredential */
    "/v1/bc/oss/sts/upload/credential": Required<operations["fetchStsUploadCredentialUsingGET"]>['parameters']['query']

    /** fetchStsViewCredential */
    "/v1/bc/oss/sts/view/credential": Required<operations["fetchStsViewCredentialUsingGET"]>['parameters']['query']

    /** uploadOssFrom */
    "/v1/bc/oss/url/upload": Required<operations["uploadOssFromUsingGET"]>['parameters']['query']

    /** 用户地址列表 */
    "/v1/bc/admin/user/address/list": Required<operations["getUserAddressListUsingGET_1"]>['parameters']['query']

    /** 地址删除 */
    "/v1/bc/app/address/del": Required<operations["delUsingGET_1"]>['parameters']['query']

    /** 地址详情 */
    "/v1/bc/app/address/detail": Required<operations["detailUsingGET_21"]>['parameters']['query']

    /** 地址列表 */
    "/v1/bc/app/address/list": Required<operations["listUsingGET_4"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/account/detail": Required<operations["detailUsingGET_22"]>['parameters']['query']

    /** getMenuIdsByUserId */
    "/v1/bc/admin/account/menu/list": Required<operations["getMenuIdsByUserIdUsingGET"]>['parameters']['query']

    /** organizationList */
    "/v1/bc/admin/account/organization/list": Required<operations["organizationListUsingGET"]>['parameters']['query']

    /** getPermissionsByUserId */
    "/v1/bc/admin/account/permission/list": Required<operations["getPermissionsByUserIdUsingGET"]>['parameters']['query']

    /** setDefaultAvatar */
    "/v1/bc/admin/account/setDefaultAvatar": Required<operations["setDefaultAvatarUsingGET"]>['parameters']['query']

    /** userInfo */
    "/v1/bc/admin/account/user/info": Required<operations["userInfoUsingGET"]>['parameters']['query']

    /** 获取用户详情 */
    "/v1/bc/app/user/detail": Required<operations["detailUsingGET_23"]>['parameters']['query']

    /** 银行卡详情 */
    "/v1/bc/server/workerBankCard/detail": Required<operations["detailUsingGET_24"]>['parameters']['query']

    /** 获取申请详情 */
    "/v1/bc/server/workerCertificate/applyDetail": Required<operations["applyDetailUsingGET"]>['parameters']['query']

    /** 配置字典List */
    "/v1/bc/company/company/configList": Required<operations["configListUsingGET_1"]>['parameters']['query']

    /** 配置字典 */
    "/v1/bc/company/company/configMap": Required<operations["configMapUsingGET"]>['parameters']['query']

    /** getLanguageList */
    "/v1/bc/app/workerConfig/getLanguageList": Required<operations["getLanguageListUsingGET_1"]>['parameters']['query']

    /** getOriginList */
    "/v1/bc/app/workerConfig/getOriginList": Required<operations["getOriginListUsingGET_1"]>['parameters']['query']

    /** 背景审查 */
    "/v1/bc/server/worker/backgroundCheck": Required<operations["backgroundCheckUsingGET"]>['parameters']['query']

    /** 人脸 + 身份证认证 */
    "/v1/bc/server/worker/certificateByCertifyId": Required<operations["certificateByCertifyIdUsingGET"]>['parameters']['query']

    /** 认证主页 */
    "/v1/bc/server/worker/certificationInfo": Required<operations["certificationInfoUsingGET"]>['parameters']['query']

    /** 获取详情 */
    "/v1/bc/server/worker/detail": Required<operations["detailUsingGET_25"]>['parameters']['query']

    /** 获取职业 */
    "/v1/bc/server/worker/getWorkerType": Required<operations["getWorkerTypeUsingGET_2"]>['parameters']['query']

    /** 详情 */
    "/v1/bc/admin/workerType/detail": Required<operations["detailUsingGET_26"]>['parameters']['query']

    /** 详情 */
    "/v1/bc/admin/workerType/role": Required<operations["roleUsingGET"]>['parameters']['query']

    /** 工种角色列表 */
    "/v1/bc/admin/workerType/roleList": Required<operations["roleListUsingGET"]>['parameters']['query']

    /** 工种角色列表 */
    "/v1/bc/admin/workerType/roleListLikeCategory": Required<operations["roleListLikeCategoryUsingGET"]>['parameters']['query']

    /** 根据行业获取工种 */
    "/v1/bc/server/workerType/getCertificateList": Required<operations["getCertificateListUsingGET"]>['parameters']['query']

}
