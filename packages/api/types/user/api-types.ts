import type { operations } from './schema'

/** 活动操作状态 - post请求参数 */
export type _v1_bc_admin_activity_action_post_req = Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']
/** 活动操作状态 - post响应参数 */
export type _v1_bc_admin_activity_action_post_res = Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 活动详情 - get请求参数 */
export type _v1_bc_admin_activity_detail_get_req = Required<operations["admin_detailUsingGET"]>['parameters']['query']
/** 活动详情 - get响应参数 */
export type _v1_bc_admin_activity_detail_get_res = Required<operations["admin_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 审核活动报名 - post请求参数 */
export type _v1_bc_admin_activity_enroll_audit_post_req = Required<operations["admin_auditUsingPOST"]>['requestBody']['content']['application/json']
/** 审核活动报名 - post响应参数 */
export type _v1_bc_admin_activity_enroll_audit_post_res = Required<operations["admin_auditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消活动报名 - post请求参数 */
export type _v1_bc_admin_activity_enroll_cancel_post_req = Required<operations["cancelUsingPOST_1"]>['requestBody']['content']['application/json']
/** 取消活动报名 - post响应参数 */
export type _v1_bc_admin_activity_enroll_cancel_post_res = Required<operations["cancelUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 报名数据详情 - get请求参数 */
export type _v1_bc_admin_activity_enroll_detail_get_req = Required<operations["admin_enroll_dataUsingGET"]>['parameters']['query']
/** 报名数据详情 - get响应参数 */
export type _v1_bc_admin_activity_enroll_detail_get_res = Required<operations["admin_enroll_dataUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 报名列表 - post请求参数 */
export type _v1_bc_admin_activity_enroll_list_post_req = Required<operations["enroll_admin_listUsingPOST"]>['requestBody']['content']['application/json']
/** 报名列表 - post响应参数 */
export type _v1_bc_admin_activity_enroll_list_post_res = Required<operations["enroll_admin_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 活动列表 - post请求参数 */
export type _v1_bc_admin_activity_list_post_req = Required<operations["admin_listUsingPOST"]>['requestBody']['content']['application/json']
/** 活动列表 - post响应参数 */
export type _v1_bc_admin_activity_list_post_res = Required<operations["admin_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 活动新增修改 - post请求参数 */
export type _v1_bc_admin_activity_save_post_req = Required<operations["doSaveUsingPOST"]>['requestBody']['content']['application/json']
/** 活动新增修改 - post响应参数 */
export type _v1_bc_admin_activity_save_post_res = Required<operations["doSaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 活动详情 - get请求参数 */
export type _v1_bc_company_activity_detail_get_req = Required<operations["detailUsingGET"]>['parameters']['query']
/** 活动详情 - get响应参数 */
export type _v1_bc_company_activity_detail_get_res = Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 活动报名 - post请求参数 */
export type _v1_bc_company_activity_enroll_post_req = Required<operations["enrollUsingPOST"]>['requestBody']['content']['application/json']
/** 活动报名 - post响应参数 */
export type _v1_bc_company_activity_enroll_post_res = Required<operations["enrollUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消活动报名 - post请求参数 */
export type _v1_bc_company_activity_enroll_cancel_post_req = Required<operations["cancelUsingPOST_2"]>['requestBody']['content']['application/json']
/** 取消活动报名 - post响应参数 */
export type _v1_bc_company_activity_enroll_cancel_post_res = Required<operations["cancelUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 活动报名数据 - get请求参数 */
export type _v1_bc_company_activity_enroll_data_get_req = Required<operations["enroll_dataUsingGET"]>['parameters']['query']
/** 活动报名数据 - get响应参数 */
export type _v1_bc_company_activity_enroll_data_get_res = Required<operations["enroll_dataUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 活动报名列表 - get请求参数 */
export type _v1_bc_company_activity_enroll_list_get_req = Required<operations["enroll_listUsingGET"]>['parameters']['query']
/** 活动报名列表 - get响应参数 */
export type _v1_bc_company_activity_enroll_list_get_res = Required<operations["enroll_listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 活动列表 - post请求参数 */
export type _v1_bc_company_activity_list_post_req = Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']
/** 活动列表 - post响应参数 */
export type _v1_bc_company_activity_list_post_res = Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 位置列表 - get请求参数 */
export type _v1_bc_admin_ad_config_list_get_req = Required<operations["configListUsingGET"]>['parameters']['query']
/** 位置列表 - get响应参数 */
export type _v1_bc_admin_ad_config_list_get_res = Required<operations["configListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 删除位置 - post请求参数 */
export type _v1_bc_admin_ad_delete_config_post_req = Required<operations["deleteConfigUsingPOST"]>['requestBody']['content']['application/json']
/** 删除位置 - post响应参数 */
export type _v1_bc_admin_ad_delete_config_post_res = Required<operations["deleteConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_ad_list_post_req = Required<operations["admin_listUsingPOST_1"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_ad_list_post_res = Required<operations["admin_listUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 保存位置 - post请求参数 */
export type _v1_bc_admin_ad_save_config_post_req = Required<operations["saveConfigUsingPOST"]>['requestBody']['content']['application/json']
/** 保存位置 - post响应参数 */
export type _v1_bc_admin_ad_save_config_post_res = Required<operations["saveConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 时间段 - get请求参数 */
export type _v1_bc_admin_ad_times_get_req = Required<operations["getAdTimesUsingGET"]>['parameters']['query']
/** 时间段 - get响应参数 */
export type _v1_bc_admin_ad_times_get_res = Required<operations["getAdTimesUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 头条 - get请求参数 */
export type _v1_bc_public_ad_store_tt_listener_get_req = Required<operations["ttListenerUsingGET"]>['parameters']['query']
/** 头条 - get响应参数 */
export type _v1_bc_public_ad_store_tt_listener_get_res = Required<operations["ttListenerUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录 - post请求参数 */
export type _v1_bc_company_admin_accountLogin_post_req = Required<operations["accountLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 管理员登录 - post响应参数 */
export type _v1_bc_company_admin_accountLogin_post_res = Required<operations["accountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** APP管理员登录 - post请求参数 */
export type _v1_bc_company_admin_appAccountLogin_post_req = Required<operations["appAccountLoginUsingPOST"]>['requestBody']['content']['application/json']
/** APP管理员登录 - post响应参数 */
export type _v1_bc_company_admin_appAccountLogin_post_res = Required<operations["appAccountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** APP管理员登录(无应用编码) - post请求参数 */
export type _v1_bc_company_admin_appLogin_post_req = Required<operations["appLoginUsingPOST"]>['requestBody']['content']['application/json']
/** APP管理员登录(无应用编码) - post响应参数 */
export type _v1_bc_company_admin_appLogin_post_res = Required<operations["appLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 二维码登录提交 - post请求参数 */
export type _v1_bc_company_admin_auditLoginCode_post_req = Required<operations["auditLoginCodeUsingPOST"]>['requestBody']['content']['application/json']
/** 二维码登录提交 - post响应参数 */
export type _v1_bc_company_admin_auditLoginCode_post_res = Required<operations["auditLoginCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 免密登录 - post请求参数 */
export type _v1_bc_company_admin_autoLogin_post_req = Required<operations["autoLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 免密登录 - post响应参数 */
export type _v1_bc_company_admin_autoLogin_post_res = Required<operations["autoLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 检查二维码状态 - post请求参数 */
export type _v1_bc_company_admin_checkLoginCode_post_req = Required<operations["checkLoginCodeUsingPOST"]>['requestBody']['content']['application/json']
/** 检查二维码状态 - post响应参数 */
export type _v1_bc_company_admin_checkLoginCode_post_res = Required<operations["checkLoginCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取登录二维码 - get请求参数 */
export type _v1_bc_company_admin_createLoginCode_get_req = Required<operations["createLoginCodeUsingGET"]>['parameters']['query']
/** 获取登录二维码 - get响应参数 */
export type _v1_bc_company_admin_createLoginCode_get_res = Required<operations["createLoginCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 客服app登录 - post请求参数 */
export type _v1_bc_company_admin_customerServiceLogin_post_req = Required<operations["customerServiceLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 客服app登录 - post响应参数 */
export type _v1_bc_company_admin_customerServiceLogin_post_res = Required<operations["customerServiceLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录 - post请求参数 */
export type _v1_bc_company_admin_fillApplyCode_post_req = Required<operations["fillApplyCodeUsingPOST"]>['requestBody']['content']['application/json']
/** 管理员登录 - post响应参数 */
export type _v1_bc_company_admin_fillApplyCode_post_res = Required<operations["fillApplyCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取用户信息 - get请求参数 */
export type _v1_bc_company_admin_getUserInfo_get_req = Required<operations["getUserInfoUsingGET"]>['parameters']['query']
/** 获取用户信息 - get响应参数 */
export type _v1_bc_company_admin_getUserInfo_get_res = Required<operations["getUserInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录 - post请求参数 */
export type _v1_bc_company_admin_login_post_req = Required<operations["mobileLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 管理员登录 - post响应参数 */
export type _v1_bc_company_admin_login_post_res = Required<operations["mobileLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录 - post请求参数 */
export type _v1_bc_company_admin_loginOrRegister_post_req = Required<operations["loginOrRegisterUsingPOST"]>['requestBody']['content']['application/json']
/** 管理员登录 - post响应参数 */
export type _v1_bc_company_admin_loginOrRegister_post_res = Required<operations["loginOrRegisterUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 退出登录 - get请求参数 */
export type _v1_bc_company_admin_loginOut_get_req = Required<operations["loginOutUsingGET"]>['parameters']['query']
/** 退出登录 - get响应参数 */
export type _v1_bc_company_admin_loginOut_get_res = Required<operations["loginOutUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 平台端管理员登录 - post请求参数 */
export type _v1_bc_company_admin_platformAccountLogin_post_req = Required<operations["platformAccountLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 平台端管理员登录 - post响应参数 */
export type _v1_bc_company_admin_platformAccountLogin_post_res = Required<operations["platformAccountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 平台端管理员登录(无应用编码) - post请求参数 */
export type _v1_bc_company_admin_platformLogin_post_req = Required<operations["platformLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 平台端管理员登录(无应用编码) - post响应参数 */
export type _v1_bc_company_admin_platformLogin_post_res = Required<operations["platformLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录 - post请求参数 */
export type _v1_bc_company_admin_simpleAccountLogin_post_req = Required<operations["simpleAccountLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 管理员登录 - post响应参数 */
export type _v1_bc_company_admin_simpleAccountLogin_post_res = Required<operations["simpleAccountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录(无应用编码) - post请求参数 */
export type _v1_bc_company_admin_simpleLogin_post_req = Required<operations["simpleLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 管理员登录(无应用编码) - post响应参数 */
export type _v1_bc_company_admin_simpleLogin_post_res = Required<operations["simpleLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录 - post请求参数 */
export type _v1_bc_company_admin_simpleLoginOrRegister_post_req = Required<operations["loginOrRegisterUsingPOST_1"]>['requestBody']['content']['application/json']
/** 管理员登录 - post响应参数 */
export type _v1_bc_company_admin_simpleLoginOrRegister_post_res = Required<operations["loginOrRegisterUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 统一免密登录 - post请求参数 */
export type _v1_bc_company_admin_uniAutoLogin_post_req = Required<operations["uniAutoLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 统一免密登录 - post响应参数 */
export type _v1_bc_company_admin_uniAutoLogin_post_res = Required<operations["uniAutoLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 管理员登录 - post请求参数 */
export type _v1_bc_company_admin_updateUserInfo_post_req = Required<operations["updateUserInfoUsingPOST"]>['requestBody']['content']['application/json']
/** 管理员登录 - post响应参数 */
export type _v1_bc_company_admin_updateUserInfo_post_res = Required<operations["updateUserInfoUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** excel数据导入 - post请求参数 */
export type _v1_bc_admin_agencyInit_importByExcel_post_req = Required<operations["importByExcelUsingPOST"]>['requestBody']['content']['application/json']
/** excel数据导入 - post响应参数 */
export type _v1_bc_admin_agencyInit_importByExcel_post_res = Required<operations["importByExcelUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** demo 数据测试 - get请求参数 */
export type _v1_bc_admin_agencyInit_test_get_req = Required<operations["testUsingGET"]>['parameters']['query']
/** demo 数据测试 - get响应参数 */
export type _v1_bc_admin_agencyInit_test_get_res = Required<operations["testUsingGET"]>['responses'][200]['content']['*/*']['data']

/** city - get请求参数 */
export type _v1_bc_amap_city_get_req = Required<operations["cityUsingGET"]>['parameters']['query']
/** city - get响应参数 */
export type _v1_bc_amap_city_get_res = Required<operations["cityUsingGET"]>['responses'][200]['content']['*/*']['data']

/** district - get请求参数 */
export type _v1_bc_amap_district_get_req = Required<operations["districtUsingGET"]>['parameters']['query']
/** district - get响应参数 */
export type _v1_bc_amap_district_get_res = Required<operations["districtUsingGET"]>['responses'][200]['content']['*/*']['data']

/** province - get请求参数 */
export type _v1_bc_amap_province_get_req = Required<operations["provinceUsingGET"]>['parameters']['query']
/** province - get响应参数 */
export type _v1_bc_amap_province_get_res = Required<operations["provinceUsingGET"]>['responses'][200]['content']['*/*']['data']

/** street - get请求参数 */
export type _v1_bc_amap_street_get_req = Required<operations["streetUsingGET"]>['parameters']['query']
/** street - get响应参数 */
export type _v1_bc_amap_street_get_res = Required<operations["streetUsingGET"]>['responses'][200]['content']['*/*']['data']

/** getNewVersion - get请求参数 */
export type _app_getNewVersion_get_req = Required<operations["getNewVersionUsingGET"]>['parameters']['query']
/** getNewVersion - get响应参数 */
export type _app_getNewVersion_get_res = Required<operations["getNewVersionUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 详情 - get请求参数 */
export type _v1_bc_admin_appVersion_detail_get_req = Required<operations["detailUsingGET_1"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_admin_appVersion_detail_get_res = Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_appVersion_list_post_req = Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_appVersion_list_post_res = Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 最新版本列表 - post请求参数 */
export type _v1_bc_admin_appVersion_newVersionList_post_req = Required<operations["newVersionListUsingPOST"]>['requestBody']['content']['application/json']
/** 最新版本列表 - post响应参数 */
export type _v1_bc_admin_appVersion_newVersionList_post_res = Required<operations["newVersionListUsingPOST"]>['responses'][200]['content']['*/*']

/** 新建/编辑版本 - post请求参数 */
export type _v1_bc_admin_appVersion_updateOrCreate_post_req = Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']
/** 新建/编辑版本 - post响应参数 */
export type _v1_bc_admin_appVersion_updateOrCreate_post_res = Required<operations["updateOrCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_apply_detail_get_req = Required<operations["detailUsingGET_2"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_apply_detail_get_res = Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 应用列表 - post请求参数 */
export type _v1_bc_admin_apply_list_post_req = Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']
/** 应用列表 - post响应参数 */
export type _v1_bc_admin_apply_list_post_res = Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

/** test - get请求参数 */
export type _v1_bc_admin_apply_test_get_req = Required<operations["testUsingGET_1"]>['parameters']['query']
/** test - get响应参数 */
export type _v1_bc_admin_apply_test_get_res = Required<operations["testUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** updateOrCreate - post请求参数 */
export type _v1_bc_admin_apply_updateOrCreate_post_req = Required<operations["updateOrCreateUsingPOST_1"]>['requestBody']['content']['application/json']
/** updateOrCreate - post响应参数 */
export type _v1_bc_admin_apply_updateOrCreate_post_res = Required<operations["updateOrCreateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** categoryTree - get请求参数 */
export type _v1_bc_admin_article_category_tree_get_req = Required<operations["categoryTreeUsingGET"]>['parameters']['query']
/** categoryTree - get响应参数 */
export type _v1_bc_admin_article_category_tree_get_res = Required<operations["categoryTreeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** create - post请求参数 */
export type _v1_bc_admin_article_create_post_req = Required<operations["createUsingPOST"]>['requestBody']['content']['application/json']
/** create - post响应参数 */
export type _v1_bc_admin_article_create_post_res = Required<operations["createUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** delete - post请求参数 */
export type _v1_bc_admin_article_delete_post_req = Required<operations["deleteUsingPOST"]>['requestBody']['content']['application/json']
/** delete - post响应参数 */
export type _v1_bc_admin_article_delete_post_res = Required<operations["deleteUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_article_detail_get_req = Required<operations["detailUsingGET_3"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_article_detail_get_res = Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_article_list_post_req = Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_article_list_post_res = Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

/** modify - post请求参数 */
export type _v1_bc_admin_article_modify_post_req = Required<operations["modifyUsingPOST"]>['requestBody']['content']['application/json']
/** modify - post响应参数 */
export type _v1_bc_admin_article_modify_post_res = Required<operations["modifyUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 关于我们 - get请求参数 */
export type _v1_bc_app_config_aboutUs_get_req = Required<operations["aboutUsUsingGET"]>['parameters']['query']
/** 关于我们 - get响应参数 */
export type _v1_bc_app_config_aboutUs_get_res = Required<operations["aboutUsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取类目资质证书 - post请求参数 */
export type _v1_bc_company_category_certificate_getByCategoryIds_post_req = Required<operations["getByCategoryIdsUsingPOST"]>['requestBody']['content']['application/json']
/** 获取类目资质证书 - post响应参数 */
export type _v1_bc_company_category_certificate_getByCategoryIds_post_res = Required<operations["getByCategoryIdsUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 类目资质详情 - get请求参数 */
export type _v1_bc_admin_certificate_categoryCertificateDetail_get_req = Required<operations["categoryCertificateDetailUsingGET"]>['parameters']['query']
/** 类目资质详情 - get响应参数 */
export type _v1_bc_admin_certificate_categoryCertificateDetail_get_res = Required<operations["categoryCertificateDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 类目资质列表 - post请求参数 */
export type _v1_bc_admin_certificate_categoryCertificateList_post_req = Required<operations["categoryCertificateListUsingPOST"]>['requestBody']['content']['application/json']
/** 类目资质列表 - post响应参数 */
export type _v1_bc_admin_certificate_categoryCertificateList_post_res = Required<operations["categoryCertificateListUsingPOST"]>['responses'][200]['content']['*/*']

/** 类目资质列表 - post请求参数 */
export type _v1_bc_admin_certificate_editCategory_post_req = Required<operations["editCategoryUsingPOST"]>['requestBody']['content']['application/json']
/** 类目资质列表 - post响应参数 */
export type _v1_bc_admin_certificate_editCategory_post_res = Required<operations["editCategoryUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 新增/修改工种证书 - post请求参数 */
export type _v1_bc_admin_certificate_editWorkerType_post_req = Required<operations["editWorkerTypeUsingPOST"]>['requestBody']['content']['application/json']
/** 新增/修改工种证书 - post响应参数 */
export type _v1_bc_admin_certificate_editWorkerType_post_res = Required<operations["editWorkerTypeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 证书详情 - get请求参数 */
export type _v1_bc_admin_certificate_workerTypeCertificateDetail_get_req = Required<operations["workerTypeCertificateDetailUsingGET"]>['parameters']['query']
/** 证书详情 - get响应参数 */
export type _v1_bc_admin_certificate_workerTypeCertificateDetail_get_res = Required<operations["workerTypeCertificateDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 工种证书列表 - post请求参数 */
export type _v1_bc_admin_certificate_workerTypeCertificateList_post_req = Required<operations["workerTypeCertificateListUsingPOST"]>['requestBody']['content']['application/json']
/** 工种证书列表 - post响应参数 */
export type _v1_bc_admin_certificate_workerTypeCertificateList_post_res = Required<operations["workerTypeCertificateListUsingPOST"]>['responses'][200]['content']['*/*']

/** 证书模板删除 - post请求参数 */
export type _v1_bc_company_certificate_remove_post_req = Required<operations["removeUsingPOST"]>['requestBody']['content']['application/json']
/** 证书模板删除 - post响应参数 */
export type _v1_bc_company_certificate_remove_post_res = Required<operations["removeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 证书模板新增或修改 - post请求参数 */
export type _v1_bc_company_certificate_saveOrUpdate_post_req = Required<operations["saveOrUpdateUsingPOST"]>['requestBody']['content']['application/json']
/** 证书模板新增或修改 - post响应参数 */
export type _v1_bc_company_certificate_saveOrUpdate_post_res = Required<operations["saveOrUpdateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 经营范围查询 - post请求参数 */
export type _v1_bc_company_certificate_scope_get_post_req = Required<operations["getUsingPOST"]>['requestBody']['content']['application/json']
/** 经营范围查询 - post响应参数 */
export type _v1_bc_company_certificate_scope_get_post_res = Required<operations["getUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 申诉审核 - post请求参数 */
export type _v1_bc_admin_comment_appeal_audit_post_req = Required<operations["auditUsingPOST"]>['requestBody']['content']['application/json']
/** 申诉审核 - post响应参数 */
export type _v1_bc_admin_comment_appeal_audit_post_res = Required<operations["auditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 申诉详情 - get请求参数 */
export type _v1_bc_admin_comment_appeal_details_get_req = Required<operations["appealDetailsUsingGET"]>['parameters']['query']
/** 申诉详情 - get响应参数 */
export type _v1_bc_admin_comment_appeal_details_get_res = Required<operations["appealDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 申诉查询 - post请求参数 */
export type _v1_bc_admin_comment_appeal_list_post_req = Required<operations["appealListUsingPOST"]>['requestBody']['content']['application/json']
/** 申诉查询 - post响应参数 */
export type _v1_bc_admin_comment_appeal_list_post_res = Required<operations["appealListUsingPOST"]>['responses'][200]['content']['*/*']

/** 订单评价列表 - post请求参数 */
export type _v1_bc_admin_comment_commodity_list_post_req = Required<operations["commodityListUsingPOST"]>['requestBody']['content']['application/json']
/** 订单评价列表 - post响应参数 */
export type _v1_bc_admin_comment_commodity_list_post_res = Required<operations["commodityListUsingPOST"]>['responses'][200]['content']['*/*']

/** 评论详情 - get请求参数 */
export type _v1_bc_api_comment_comment_details_get_req = Required<operations["commentDetailsUsingGET"]>['parameters']['query']
/** 评论详情 - get响应参数 */
export type _v1_bc_api_comment_comment_details_get_res = Required<operations["commentDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 订单评价列表 - post请求参数 */
export type _v1_bc_api_comment_commodity_list_post_req = Required<operations["commodityListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 订单评价列表 - post响应参数 */
export type _v1_bc_api_comment_commodity_list_post_res = Required<operations["commodityListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 订单评价提交 - post请求参数 */
export type _v1_bc_api_comment_commodity_save_post_req = Required<operations["commoditySaveUsingPOST"]>['requestBody']['content']['application/json']
/** 订单评价提交 - post响应参数 */
export type _v1_bc_api_comment_commodity_save_post_res = Required<operations["commoditySaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 店铺商品评价 - post请求参数 */
export type _v1_bc_api_comment_commodity_view_post_req = Required<operations["commodityViewUsingPOST"]>['requestBody']['content']['application/json']
/** 店铺商品评价 - post响应参数 */
export type _v1_bc_api_comment_commodity_view_post_res = Required<operations["commodityViewUsingPOST"]>['responses'][200]['content']['*/*']

/** delete - post请求参数 */
export type _v1_bc_api_comment_delete_post_req = Required<operations["deleteUsingPOST_1"]>['requestBody']['content']['application/json']
/** delete - post响应参数 */
export type _v1_bc_api_comment_delete_post_res = Required<operations["deleteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** Look - post请求参数 */
export type _v1_bc_api_comment_look_post_req = Required<operations["LookUsingPOST"]>['requestBody']['content']['application/json']
/** Look - post响应参数 */
export type _v1_bc_api_comment_look_post_res = Required<operations["LookUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** score - get请求参数 */
export type _v1_bc_api_comment_score_get_req = Required<operations["scoreUsingGET"]>['parameters']['query']
/** score - get响应参数 */
export type _v1_bc_api_comment_score_get_res = Required<operations["scoreUsingGET"]>['responses'][200]['content']['*/*']['data']

/** scorekey - get请求参数 */
export type _v1_bc_api_comment_scorekey_get_req = Required<operations["scorekeyUsingGET"]>['parameters']['query']
/** scorekey - get响应参数 */
export type _v1_bc_api_comment_scorekey_get_res = Required<operations["scorekeyUsingGET"]>['responses'][200]['content']['*/*']['data']

/** tags - get请求参数 */
export type _v1_bc_api_comment_tags_get_req = Required<operations["tagsUsingGET"]>['parameters']['query']
/** tags - get响应参数 */
export type _v1_bc_api_comment_tags_get_res = Required<operations["tagsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 申诉查询 - post请求参数 */
export type _v1_bc_company_comment_appeal_list_post_req = Required<operations["appealListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 申诉查询 - post响应参数 */
export type _v1_bc_company_comment_appeal_list_post_res = Required<operations["appealListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 申诉提交 - post请求参数 */
export type _v1_bc_company_comment_appeal_mark_post_req = Required<operations["markUsingPOST"]>['requestBody']['content']['application/json']
/** 申诉提交 - post响应参数 */
export type _v1_bc_company_comment_appeal_mark_post_res = Required<operations["markUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 申诉举证 - post请求参数 */
export type _v1_bc_company_comment_appeal_proof_post_req = Required<operations["proofUsingPOST"]>['requestBody']['content']['application/json']
/** 申诉举证 - post响应参数 */
export type _v1_bc_company_comment_appeal_proof_post_res = Required<operations["proofUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 订单评价列表 - post请求参数 */
export type _v1_bc_company_comment_commodity_list_post_req = Required<operations["commodityListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 订单评价列表 - post响应参数 */
export type _v1_bc_company_comment_commodity_list_post_res = Required<operations["commodityListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 订单评价回复 - post请求参数 */
export type _v1_bc_company_comment_commodity_reply_post_req = Required<operations["commodityReplyUsingPOST"]>['requestBody']['content']['application/json']
/** 订单评价回复 - post响应参数 */
export type _v1_bc_company_comment_commodity_reply_post_res = Required<operations["commodityReplyUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 默认好评 - get请求参数 */
export type _v1_bc_company_comment_defaultPraise_get_req = Required<operations["defaultPraiseUsingGET_1"]>['parameters']['query']
/** 默认好评 - get响应参数 */
export type _v1_bc_company_comment_defaultPraise_get_res = Required<operations["defaultPraiseUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 工单所需展示 - get请求参数 */
export type _v1_bc_company_comment_jobCommentLook_get_req = Required<operations["jobCommentLookUsingGET"]>['parameters']['query']
/** 工单所需展示 - get响应参数 */
export type _v1_bc_company_comment_jobCommentLook_get_res = Required<operations["jobCommentLookUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺的好评率 - get请求参数 */
export type _v1_bc_company_comment_shopCommentRate_get_req = Required<operations["shopCommentRateUsingGET"]>['parameters']['query']
/** 店铺的好评率 - get响应参数 */
export type _v1_bc_company_comment_shopCommentRate_get_res = Required<operations["shopCommentRateUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺评分 - get请求参数 */
export type _v1_bc_company_comment_shopScore_get_req = Required<operations["shopScoreUsingGET"]>['parameters']['query']
/** 店铺评分 - get响应参数 */
export type _v1_bc_company_comment_shopScore_get_res = Required<operations["shopScoreUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务人员的评价 - post请求参数 */
export type _v1_bc_company_comment_workComment_post_req = Required<operations["workCommentUsingPOST"]>['requestBody']['content']['application/json']
/** 服务人员的评价 - post响应参数 */
export type _v1_bc_company_comment_workComment_post_res = Required<operations["workCommentUsingPOST"]>['responses'][200]['content']['*/*']

/** 获取分享路径 - get请求参数 */
export type _v1_bc_app_common_getPage_get_req = Required<operations["getPageUsingGET"]>['parameters']['query']
/** 获取分享路径 - get响应参数 */
export type _v1_bc_app_common_getPage_get_res = Required<operations["getPageUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取分享二维码 - get请求参数 */
export type _v1_bc_app_common_getQrcode_get_req = Required<operations["getQrcodeUsingGET"]>['parameters']['query']
/** 获取分享二维码 - get响应参数 */
export type _v1_bc_app_common_getQrcode_get_res = Required<operations["getQrcodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取店铺基础信息 - get请求参数 */
export type _v1_bc_app_common_getShopInfo_get_req = Required<operations["getBaseInfoUsingGET"]>['parameters']['query']
/** 获取店铺基础信息 - get响应参数 */
export type _v1_bc_app_common_getShopInfo_get_res = Required<operations["getBaseInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 根据分类id获取店铺列表 - get请求参数 */
export type _v1_bc_app_common_getShopListBycategoryId_get_req = Required<operations["getShopListBycategoryIdUsingGET"]>['parameters']['query']
/** 根据分类id获取店铺列表 - get响应参数 */
export type _v1_bc_app_common_getShopListBycategoryId_get_res = Required<operations["getShopListBycategoryIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取所有一级服务类目 - get请求参数 */
export type _v1_bc_app_common_getStairCategory_get_req = Required<operations["getStairCategoryUsingGET_1"]>['parameters']['query']
/** 获取所有一级服务类目 - get响应参数 */
export type _v1_bc_app_common_getStairCategory_get_res = Required<operations["getStairCategoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 获取二维码 - get请求参数 */
export type _v1_bc_app_common_getWXQrcode_get_req = Required<operations["getWxCodeUsingGET"]>['parameters']['query']
/** 获取二维码 - get响应参数 */
export type _v1_bc_app_common_getWXQrcode_get_res = Required<operations["getWxCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 登录凭证校验 - get请求参数 */
export type _v1_bc_app_common_getWxMiniProgramSessionKey_get_req = Required<operations["getWxMiniProgramSessionKeyUsingGET"]>['parameters']['query']
/** 登录凭证校验 - get响应参数 */
export type _v1_bc_app_common_getWxMiniProgramSessionKey_get_res = Required<operations["getWxMiniProgramSessionKeyUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 新店列表 - get请求参数 */
export type _v1_bc_app_common_newList_get_req = Required<operations["newListUsingGET"]>['parameters']['query']
/** 新店列表 - get响应参数 */
export type _v1_bc_app_common_newList_get_res = Required<operations["newListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 优选店铺 - get请求参数 */
export type _v1_bc_app_common_preferredList_get_req = Required<operations["preferredListUsingGET"]>['parameters']['query']
/** 优选店铺 - get响应参数 */
export type _v1_bc_app_common_preferredList_get_res = Required<operations["preferredListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 隐私政策 - get请求参数 */
export type _v1_bc_app_common_privacyPolicy_get_req = Required<operations["privacyPolicyUsingGET"]>['parameters']['query']
/** 隐私政策 - get响应参数 */
export type _v1_bc_app_common_privacyPolicy_get_res = Required<operations["privacyPolicyUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 用户协议 - get请求参数 */
export type _v1_bc_app_common_userAgreement_get_req = Required<operations["userAgreementUsingGET"]>['parameters']['query']
/** 用户协议 - get响应参数 */
export type _v1_bc_app_common_userAgreement_get_res = Required<operations["userAgreementUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 授权协议 - get请求参数 */
export type _v1_bc_company_common_authorizationList_get_req = Required<operations["authorizationListUsingGET"]>['parameters']['query']
/** 授权协议 - get响应参数 */
export type _v1_bc_company_common_authorizationList_get_res = Required<operations["authorizationListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取所有区域地址 - get请求参数 */
export type _v1_bc_company_common_getAllDistrict_get_req = Required<operations["getAllDistrictUsingGET"]>['parameters']['query']
/** 获取所有区域地址 - get响应参数 */
export type _v1_bc_company_common_getAllDistrict_get_res = Required<operations["getAllDistrictUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 处理 - post请求参数 */
export type _v1_bc_admin_complaint_handle_post_req = Required<operations["do_handleUsingPOST"]>['requestBody']['content']['application/json']
/** 处理 - post响应参数 */
export type _v1_bc_admin_complaint_handle_post_res = Required<operations["do_handleUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_complaint_list_post_req = Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_complaint_list_post_res = Required<operations["listByPageUsingPOST"]>['responses'][200]['content']['*/*']

/** 纠纷详情 - get请求参数 */
export type _v1_bc_api_complaint_details_get_req = Required<operations["detailsUsingGET"]>['parameters']['query']
/** 纠纷详情 - get响应参数 */
export type _v1_bc_api_complaint_details_get_res = Required<operations["detailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 纠纷列表 - post请求参数 */
export type _v1_bc_api_complaint_list_post_req = Required<operations["listUsingPOST_4"]>['requestBody']['content']['application/json']
/** 纠纷列表 - post响应参数 */
export type _v1_bc_api_complaint_list_post_res = Required<operations["listUsingPOST_4"]>['responses'][200]['content']['*/*']

/** save - post请求参数 */
export type _v1_bc_api_complaint_save_post_req = Required<operations["saveUsingPOST"]>['requestBody']['content']['application/json']
/** save - post响应参数 */
export type _v1_bc_api_complaint_save_post_res = Required<operations["saveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** typeReasonList - get请求参数 */
export type _v1_bc_api_complaint_typeReason_get_req = Required<operations["typeReasonListUsingGET"]>['parameters']['query']
/** typeReasonList - get响应参数 */
export type _v1_bc_api_complaint_typeReason_get_res = Required<operations["typeReasonListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 修改客户状态 - post请求参数 */
export type _v1_bc_admin_consumer_changeStatus_post_req = Required<operations["changeStatusUsingPOST"]>['requestBody']['content']['application/json']
/** 修改客户状态 - post响应参数 */
export type _v1_bc_admin_consumer_changeStatus_post_res = Required<operations["changeStatusUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 客户信息详情 - get请求参数 */
export type _v1_bc_admin_consumer_detail_get_req = Required<operations["listUsingGET"]>['parameters']['query']
/** 客户信息详情 - get响应参数 */
export type _v1_bc_admin_consumer_detail_get_res = Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 发放优惠券 - post请求参数 */
export type _v1_bc_admin_consumer_distributeCoupon_post_req = Required<operations["distributeCouponUsingPOST"]>['requestBody']['content']['application/json']
/** 发放优惠券 - post响应参数 */
export type _v1_bc_admin_consumer_distributeCoupon_post_res = Required<operations["distributeCouponUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取配置 - get请求参数 */
export type _v1_bc_admin_consumer_getConfig_get_req = Required<operations["getConfigUsingGET"]>['parameters']['query']
/** 获取配置 - get响应参数 */
export type _v1_bc_admin_consumer_getConfig_get_res = Required<operations["getConfigUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取导入结果 - get请求参数 */
export type _v1_bc_admin_consumer_getImportResult_get_req = Required<operations["getImportResultUsingGET"]>['parameters']['query']
/** 获取导入结果 - get响应参数 */
export type _v1_bc_admin_consumer_getImportResult_get_res = Required<operations["getImportResultUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取统计数据 - get请求参数 */
export type _v1_bc_admin_consumer_getStatistics_get_req = Required<operations["getStatisticsUsingGET_1"]>['parameters']['query']
/** 获取统计数据 - get响应参数 */
export type _v1_bc_admin_consumer_getStatistics_get_res = Required<operations["getStatisticsUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 手动处理导入数据-测试 - get请求参数 */
export type _v1_bc_admin_consumer_handleData_get_req = Required<operations["handleDataUsingGET"]>['parameters']['query']
/** 手动处理导入数据-测试 - get响应参数 */
export type _v1_bc_admin_consumer_handleData_get_res = Required<operations["handleDataUsingGET"]>['responses'][200]['content']

/** 导入客户 - post请求参数 */
export type _v1_bc_admin_consumer_importData_post_req = Required<operations["importThirdConsumerUsingPOST_1"]>['requestBody']['content']['application/json']
/** 导入客户 - post响应参数 */
export type _v1_bc_admin_consumer_importData_post_res = Required<operations["importThirdConsumerUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 导入客户 - post请求参数 */
export type _v1_bc_admin_consumer_importThirdConsumer_post_req = Required<operations["importThirdConsumerUsingPOST"]>['requestBody']['content']['application/json']
/** 导入客户 - post响应参数 */
export type _v1_bc_admin_consumer_importThirdConsumer_post_res = Required<operations["importThirdConsumerUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 活动邀请 - post请求参数 */
export type _v1_bc_admin_consumer_inviteActivity_post_req = Required<operations["inviteActivityUsingPOST"]>['requestBody']['content']['application/json']
/** 活动邀请 - post响应参数 */
export type _v1_bc_admin_consumer_inviteActivity_post_res = Required<operations["inviteActivityUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 邀请注册 - post请求参数 */
export type _v1_bc_admin_consumer_inviteRegister_post_req = Required<operations["inviteRegisterUsingPOST"]>['requestBody']['content']['application/json']
/** 邀请注册 - post响应参数 */
export type _v1_bc_admin_consumer_inviteRegister_post_res = Required<operations["inviteRegisterUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 客户信息管理 - post请求参数 */
export type _v1_bc_admin_consumer_list_post_req = Required<operations["listUsingPOST_5"]>['requestBody']['content']['application/json']
/** 客户信息管理 - post响应参数 */
export type _v1_bc_admin_consumer_list_post_res = Required<operations["listUsingPOST_5"]>['responses'][200]['content']['*/*']

/** 客户关系详情 - get请求参数 */
export type _v1_bc_admin_consumer_thirdDetail_get_req = Required<operations["thirdDetailUsingGET"]>['parameters']['query']
/** 客户关系详情 - get响应参数 */
export type _v1_bc_admin_consumer_thirdDetail_get_res = Required<operations["thirdDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 客户关系管理 - post请求参数 */
export type _v1_bc_admin_consumer_thirdList_post_req = Required<operations["thirdListUsingPOST"]>['requestBody']['content']['application/json']
/** 客户关系管理 - post响应参数 */
export type _v1_bc_admin_consumer_thirdList_post_res = Required<operations["thirdListUsingPOST"]>['responses'][200]['content']['*/*']

/** 收住标签删除 - post请求参数 */
export type _v1_bc_admin_containTag_delete_post_req = Required<operations["deleteUsingPOST_2"]>['requestBody']['content']['application/json']
/** 收住标签删除 - post响应参数 */
export type _v1_bc_admin_containTag_delete_post_res = Required<operations["deleteUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 收住标签详情 - get请求参数 */
export type _v1_bc_admin_containTag_detail_get_req = Required<operations["detailUsingGET_4"]>['parameters']['query']
/** 收住标签详情 - get响应参数 */
export type _v1_bc_admin_containTag_detail_get_res = Required<operations["detailUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** 收住标签列表 - post请求参数 */
export type _v1_bc_admin_containTag_list_post_req = Required<operations["listUsingPOST_6"]>['requestBody']['content']['application/json']
/** 收住标签列表 - post响应参数 */
export type _v1_bc_admin_containTag_list_post_res = Required<operations["listUsingPOST_6"]>['responses'][200]['content']['*/*']

/** 收住标签新增 - post请求参数 */
export type _v1_bc_admin_containTag_save_post_req = Required<operations["saveUsingPOST_1"]>['requestBody']['content']['application/json']
/** 收住标签新增 - post响应参数 */
export type _v1_bc_admin_containTag_save_post_res = Required<operations["saveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 收住标签修改 - post请求参数 */
export type _v1_bc_admin_containTag_update_post_req = Required<operations["updateUsingPOST"]>['requestBody']['content']['application/json']
/** 收住标签修改 - post响应参数 */
export type _v1_bc_admin_containTag_update_post_res = Required<operations["updateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 合同详情 - get请求参数 */
export type _v1_bc_admin_contract_detail_get_req = Required<operations["getListUsingGET"]>['parameters']['query']
/** 合同详情 - get响应参数 */
export type _v1_bc_admin_contract_detail_get_res = Required<operations["getListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 合同列表 - post请求参数 */
export type _v1_bc_admin_contract_list_post_req = Required<operations["getListUsingPOST"]>['requestBody']['content']['application/json']
/** 合同列表 - post响应参数 */
export type _v1_bc_admin_contract_list_post_res = Required<operations["getListUsingPOST"]>['responses'][200]['content']['*/*']

/** 合同模板详情 - get请求参数 */
export type _v1_bc_admin_contract_template_detail_get_req = Required<operations["getTemplateDetailUsingGET"]>['parameters']['query']
/** 合同模板详情 - get响应参数 */
export type _v1_bc_admin_contract_template_detail_get_res = Required<operations["getTemplateDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 新增、修改合同模板 - post请求参数 */
export type _v1_bc_admin_contract_template_edit_post_req = Required<operations["editTemplateUsingPOST"]>['requestBody']['content']['application/json']
/** 新增、修改合同模板 - post响应参数 */
export type _v1_bc_admin_contract_template_edit_post_res = Required<operations["editTemplateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 合同模板列表 - get请求参数 */
export type _v1_bc_admin_contract_template_list_get_req = Required<operations["getTemplateListUsingGET"]>['parameters']['query']
/** 合同模板列表 - get响应参数 */
export type _v1_bc_admin_contract_template_list_get_res = Required<operations["getTemplateListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** callback - post请求参数 */
export type _v1_bc_api_contract_sign_callback_post_req = Required<operations["callbackUsingPOST"]>['requestBody']['content']['application/json']
/** callback - post响应参数 */
export type _v1_bc_api_contract_sign_callback_post_res = Required<operations["callbackUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 类目数据迁移 - get请求参数 */
export type _v1_bc_company_dataMigration_categories_get_req = Required<operations["categoriesUsingGET"]>['parameters']['query']
/** 类目数据迁移 - get响应参数 */
export type _v1_bc_company_dataMigration_categories_get_res = Required<operations["categoriesUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 证书数据迁移 - get请求参数 */
export type _v1_bc_company_dataMigration_certificates_get_req = Required<operations["certificatesUsingGET"]>['parameters']['query']
/** 证书数据迁移 - get响应参数 */
export type _v1_bc_company_dataMigration_certificates_get_res = Required<operations["certificatesUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺关联关系更新 - get请求参数 */
export type _v1_bc_company_dataMigration_relevanceUpdate_get_req = Required<operations["relevanceUpdateUsingGET"]>['parameters']['query']
/** 店铺关联关系更新 - get响应参数 */
export type _v1_bc_company_dataMigration_relevanceUpdate_get_res = Required<operations["relevanceUpdateUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取子区域列表 - get请求参数 */
export type _v1_bc_app_district_getSonList_get_req = Required<operations["getSonListUsingGET"]>['parameters']['query']
/** 获取子区域列表 - get响应参数 */
export type _v1_bc_app_district_getSonList_get_res = Required<operations["getSonListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取子区域列表 - get请求参数 */
export type _v1_bc_company_district_getSonList_get_req = Required<operations["getSonListUsingGET_1"]>['parameters']['query']
/** 获取子区域列表 - get响应参数 */
export type _v1_bc_company_district_getSonList_get_res = Required<operations["getSonListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** compareFaceVerify - post请求参数 */
export type _ali_face_compareFaceVerify_post_req = Required<operations["compareFaceVerifyUsingPOST"]>['requestBody']['content']['application/json']
/** compareFaceVerify - post响应参数 */
export type _ali_face_compareFaceVerify_post_res = Required<operations["compareFaceVerifyUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** describeFaceVerify - get请求参数 */
export type _ali_face_describeFaceVerify_get_req = Required<operations["describeFaceVerifyUsingGET"]>['parameters']['query']
/** describeFaceVerify - get响应参数 */
export type _ali_face_describeFaceVerify_get_res = Required<operations["describeFaceVerifyUsingGET"]>['responses'][200]['content']['*/*']['data']

/** initFaceVerifyIdPlus - post请求参数 */
export type _ali_face_initFaceVerifyIdPlus_post_req = Required<operations["initFaceVerifyIdPlusUsingPOST"]>['requestBody']['content']['application/json']
/** initFaceVerifyIdPlus - post响应参数 */
export type _ali_face_initFaceVerifyIdPlus_post_res = Required<operations["initFaceVerifyIdPlusUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 是否收藏服务 - get请求参数 */
export type _v1_bc_app_favorite_isFavoriteItem_get_req = Required<operations["isFavoriteItemUsingGET"]>['parameters']['query']
/** 是否收藏服务 - get响应参数 */
export type _v1_bc_app_favorite_isFavoriteItem_get_res = Required<operations["isFavoriteItemUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 收藏服务 - post请求参数 */
export type _v1_bc_app_favorite_itemAdd_post_req = Required<operations["itemAddUsingPOST"]>['requestBody']['content']['application/json']
/** 收藏服务 - post响应参数 */
export type _v1_bc_app_favorite_itemAdd_post_res = Required<operations["itemAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消收藏服务 - post请求参数 */
export type _v1_bc_app_favorite_itemCancel_post_req = Required<operations["itemCancelUsingPOST"]>['requestBody']['content']['application/json']
/** 取消收藏服务 - post响应参数 */
export type _v1_bc_app_favorite_itemCancel_post_res = Required<operations["itemCancelUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 服务列表 - post请求参数 */
export type _v1_bc_app_favorite_itemList_post_req = Required<operations["itemListUsingPOST"]>['requestBody']['content']['application/json']
/** 服务列表 - post响应参数 */
export type _v1_bc_app_favorite_itemList_post_res = Required<operations["itemListUsingPOST"]>['responses'][200]['content']['*/*']

/** 收藏店鋪 - post请求参数 */
export type _v1_bc_app_favorite_shopAdd_post_req = Required<operations["shopAddUsingPOST"]>['requestBody']['content']['application/json']
/** 收藏店鋪 - post响应参数 */
export type _v1_bc_app_favorite_shopAdd_post_res = Required<operations["shopAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消收藏店鋪 - post请求参数 */
export type _v1_bc_app_favorite_shopCancel_post_req = Required<operations["shopCancelUsingPOST"]>['requestBody']['content']['application/json']
/** 取消收藏店鋪 - post响应参数 */
export type _v1_bc_app_favorite_shopCancel_post_res = Required<operations["shopCancelUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 店鋪列表 - post请求参数 */
export type _v1_bc_app_favorite_shopList_post_req = Required<operations["shopListUsingPOST"]>['requestBody']['content']['application/json']
/** 店鋪列表 - post响应参数 */
export type _v1_bc_app_favorite_shopList_post_res = Required<operations["shopListUsingPOST"]>['responses'][200]['content']['*/*']

/** 确认 - post请求参数 */
export type _v1_bc_admin_feedback_doAction_post_req = Required<operations["doActionUsingPOST_1"]>['requestBody']['content']['application/json']
/** 确认 - post响应参数 */
export type _v1_bc_admin_feedback_doAction_post_res = Required<operations["doActionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_feedback_list_post_req = Required<operations["listByPageUsingPOST_1"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_feedback_list_post_res = Required<operations["listByPageUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 添加 - post请求参数 */
export type _v1_bc_company_feedback_add_post_req = Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']
/** 添加 - post响应参数 */
export type _v1_bc_company_feedback_add_post_res = Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 记录 - post请求参数 */
export type _v1_bc_company_feedback_list_post_req = Required<operations["listUsingPOST_7"]>['requestBody']
/** 记录 - post响应参数 */
export type _v1_bc_company_feedback_list_post_res = Required<operations["listUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

/** 类型 - get请求参数 */
export type _v1_bc_company_feedback_type_get_req = Required<operations["getTypeUsingGET"]>['parameters']['query']
/** 类型 - get响应参数 */
export type _v1_bc_company_feedback_type_get_res = Required<operations["getTypeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 添加 - post请求参数 */
export type _v1_bc_server_feedback_add_post_req = Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']
/** 添加 - post响应参数 */
export type _v1_bc_server_feedback_add_post_res = Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 记录 - post请求参数 */
export type _v1_bc_server_feedback_list_post_req = Required<operations["listUsingPOST_8"]>['requestBody']
/** 记录 - post响应参数 */
export type _v1_bc_server_feedback_list_post_res = Required<operations["listUsingPOST_8"]>['responses'][200]['content']['*/*']['data']

/** 类型 - get请求参数 */
export type _v1_bc_server_feedback_type_get_req = Required<operations["getTypeUsingGET_1"]>['parameters']['query']
/** 类型 - get响应参数 */
export type _v1_bc_server_feedback_type_get_res = Required<operations["getTypeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** config - get请求参数 */
export type _v1_bc_admin_invite_config_get_req = Required<operations["configUsingGET"]>['parameters']['query']
/** config - get响应参数 */
export type _v1_bc_admin_invite_config_get_res = Required<operations["configUsingGET"]>['responses'][200]['content']['*/*']['data']

/** save_config - post请求参数 */
export type _v1_bc_admin_invite_config_save_post_req = Required<operations["save_configUsingPOST"]>['requestBody']['content']['application/json']
/** save_config - post响应参数 */
export type _v1_bc_admin_invite_config_save_post_res = Required<operations["save_configUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_invite_detail_get_req = Required<operations["detailUsingGET_5"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_invite_detail_get_res = Required<operations["detailUsingGET_5"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_invite_list_post_req = Required<operations["listUsingPOST_9"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_invite_list_post_res = Required<operations["listUsingPOST_9"]>['responses'][200]['content']['*/*']

/** userList - get请求参数 */
export type _v1_bc_admin_invite_user_list_get_req = Required<operations["userListUsingGET"]>['parameters']['query']
/** userList - get响应参数 */
export type _v1_bc_admin_invite_user_list_get_res = Required<operations["userListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** config - get请求参数 */
export type _v1_bc_api_invite_config_get_req = Required<operations["configUsingGET_1"]>['parameters']['query']
/** config - get响应参数 */
export type _v1_bc_api_invite_config_get_res = Required<operations["configUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** info - get请求参数 */
export type _v1_bc_api_invite_info_get_req = Required<operations["infoUsingGET"]>['parameters']['query']
/** info - get响应参数 */
export type _v1_bc_api_invite_info_get_res = Required<operations["infoUsingGET"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_api_invite_list_get_req = Required<operations["listUsingGET_1"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_api_invite_list_get_res = Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** qrcode - get请求参数 */
export type _v1_bc_api_invite_qrcode_get_req = Required<operations["qrcodeUsingGET"]>['parameters']['query']
/** qrcode - get响应参数 */
export type _v1_bc_api_invite_qrcode_get_res = Required<operations["qrcodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** share - post请求参数 */
export type _v1_bc_api_invite_share_post_req = Required<operations["shareUsingPOST"]>['requestBody']
/** share - post响应参数 */
export type _v1_bc_api_invite_share_post_res = Required<operations["shareUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 加入足迹 - post请求参数 */
export type _v1_bc_app_item_browse_history_add_post_req = Required<operations["addUsingPOST_2"]>['requestBody']['content']['application/json']
/** 加入足迹 - post响应参数 */
export type _v1_bc_app_item_browse_history_add_post_res = Required<operations["addUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 删除足迹 - post请求参数 */
export type _v1_bc_app_item_browse_history_del_post_req = Required<operations["personalDoActionUsingPOST"]>['requestBody']['content']['application/json']
/** 删除足迹 - post响应参数 */
export type _v1_bc_app_item_browse_history_del_post_res = Required<operations["personalDoActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 足迹列表-按天分组 - post请求参数 */
export type _v1_bc_app_item_browse_history_getListGroupByDate_post_req = Required<operations["getListGroupByDateUsingPOST"]>['requestBody']['content']['application/json']
/** 足迹列表-按天分组 - post响应参数 */
export type _v1_bc_app_item_browse_history_getListGroupByDate_post_res = Required<operations["getListGroupByDateUsingPOST"]>['responses'][200]['content']['*/*']

/** 足迹列表 - post请求参数 */
export type _v1_bc_app_item_browse_history_list_post_req = Required<operations["listUsingPOST_10"]>['requestBody']['content']['application/json']
/** 足迹列表 - post响应参数 */
export type _v1_bc_app_item_browse_history_list_post_res = Required<operations["listUsingPOST_10"]>['responses'][200]['content']['*/*']

/** 修改平台资质 - post请求参数 */
export type _v1_bc_admin_licence_edit_post_req = Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']
/** 修改平台资质 - post响应参数 */
export type _v1_bc_admin_licence_edit_post_res = Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 平台合规管理 - get请求参数 */
export type _v1_bc_admin_licence_getAll_get_req = Required<operations["getAllUsingGET"]>['parameters']['query']
/** 平台合规管理 - get响应参数 */
export type _v1_bc_admin_licence_getAll_get_res = Required<operations["getAllUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 关闭 - post请求参数 */
export type _v1_bc_admin_marketing_close_post_req = Required<operations["closeUsingPOST"]>['requestBody']['content']['application/json']
/** 关闭 - post响应参数 */
export type _v1_bc_admin_marketing_close_post_res = Required<operations["closeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 推广详情 - get请求参数 */
export type _v1_bc_admin_marketing_detail_get_req = Required<operations["admin__detailUsingGET"]>['parameters']['query']
/** 推广详情 - get响应参数 */
export type _v1_bc_admin_marketing_detail_get_res = Required<operations["admin__detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 推广列表 - post请求参数 */
export type _v1_bc_admin_marketing_list_post_req = Required<operations["admin_listUsingPOST_2"]>['requestBody']['content']['application/json']
/** 推广列表 - post响应参数 */
export type _v1_bc_admin_marketing_list_post_res = Required<operations["admin_listUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 新增修改 - post请求参数 */
export type _v1_bc_admin_marketing_save_post_req = Required<operations["doSaveUsingPOST_2"]>['requestBody']['content']['application/json']
/** 新增修改 - post响应参数 */
export type _v1_bc_admin_marketing_save_post_res = Required<operations["doSaveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** apply_list - get请求参数 */
export type _v1_bc_admin_menu_apply_list_get_req = Required<operations["apply_listUsingGET"]>['parameters']['query']
/** apply_list - get响应参数 */
export type _v1_bc_admin_menu_apply_list_get_res = Required<operations["apply_listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** delete - post请求参数 */
export type _v1_bc_admin_menu_delete_post_req = Required<operations["deleteUsingPOST_3"]>['requestBody']['content']['application/json']
/** delete - post响应参数 */
export type _v1_bc_admin_menu_delete_post_res = Required<operations["deleteUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** all - get请求参数 */
export type _v1_bc_admin_menu_list_all_get_req = Required<operations["allUsingGET"]>['parameters']['query']
/** all - get响应参数 */
export type _v1_bc_admin_menu_list_all_get_res = Required<operations["allUsingGET"]>['responses'][200]['content']['*/*']['data']

/** tree - get请求参数 */
export type _v1_bc_admin_menu_tree_get_req = Required<operations["treeUsingGET"]>['parameters']['query']
/** tree - get响应参数 */
export type _v1_bc_admin_menu_tree_get_res = Required<operations["treeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** adminTree - get请求参数 */
export type _v1_bc_admin_menu_tree_admin_get_req = Required<operations["adminTreeUsingGET"]>['parameters']['query']
/** adminTree - get响应参数 */
export type _v1_bc_admin_menu_tree_admin_get_res = Required<operations["adminTreeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** adminTree1 - get请求参数 */
export type _v1_bc_admin_menu_tree_admin1_get_req = Required<operations["adminTree1UsingGET"]>['parameters']['query']
/** adminTree1 - get响应参数 */
export type _v1_bc_admin_menu_tree_admin1_get_res = Required<operations["adminTree1UsingGET"]>['responses'][200]['content']['*/*']['data']

/** treeAll - get请求参数 */
export type _v1_bc_admin_menu_tree_all_get_req = Required<operations["treeAllUsingGET"]>['parameters']['query']
/** treeAll - get响应参数 */
export type _v1_bc_admin_menu_tree_all_get_res = Required<operations["treeAllUsingGET"]>['responses'][200]['content']['*/*']['data']

/** updateOrCreate - post请求参数 */
export type _v1_bc_admin_menu_updateOrCreate_post_req = Required<operations["updateOrCreateUsingPOST_2"]>['requestBody']['content']['application/json']
/** updateOrCreate - post响应参数 */
export type _v1_bc_admin_menu_updateOrCreate_post_res = Required<operations["updateOrCreateUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** recognizeBankCard - post请求参数 */
export type _ali_ocr_recognizeBankCard_post_req = Required<operations["recognizeBankCardUsingPOST"]>['parameters']['query']
/** recognizeBankCard - post响应参数 */
export type _ali_ocr_recognizeBankCard_post_res = Required<operations["recognizeBankCardUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** recognizeBasic - post请求参数 */
export type _ali_ocr_recognizeBasic_post_req = Required<operations["recognizeBasicUsingPOST"]>['parameters']['query']
/** recognizeBasic - post响应参数 */
export type _ali_ocr_recognizeBasic_post_res = Required<operations["recognizeBasicUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** recognizeIdCard - post请求参数 */
export type _ali_ocr_recognizeIdCard_post_req = Required<operations["recognizeIdCardUsingPOST"]>['requestBody']['content']['application/json']
/** recognizeIdCard - post响应参数 */
export type _ali_ocr_recognizeIdCard_post_res = Required<operations["recognizeIdCardUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 活动提交 - post请求参数 */
export type _v1_bc_company_operation_activity_auditParticipation_post_req = Required<operations["auditParticipationUsingPOST"]>['requestBody']['content']['application/json']
/** 活动提交 - post响应参数 */
export type _v1_bc_company_operation_activity_auditParticipation_post_res = Required<operations["auditParticipationUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 活动详情 - get请求参数 */
export type _v1_bc_company_operation_activity_detail_get_req = Required<operations["detailUsingGET_6"]>['parameters']['query']
/** 活动详情 - get响应参数 */
export type _v1_bc_company_operation_activity_detail_get_res = Required<operations["detailUsingGET_6"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_operation_log_list_post_req = Required<operations["listUsingPOST_11"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_operation_log_list_post_res = Required<operations["listUsingPOST_11"]>['responses'][200]['content']['*/*']

/** history - get请求参数 */
export type _history_get_req = Required<operations["historyUsingGET"]>['parameters']['query']
/** history - get响应参数 */
export type _history_get_res = Required<operations["historyUsingGET"]>['responses'][200]['content']['*/*']

/** 试运营进度详情 - get请求参数 */
export type _v1_bc_admin_operation_schedule_detail_get_req = Required<operations["detailUsingGET_7"]>['parameters']['query']
/** 试运营进度详情 - get响应参数 */
export type _v1_bc_admin_operation_schedule_detail_get_res = Required<operations["detailUsingGET_7"]>['responses'][200]['content']['*/*']['data']

/** 试运营进度定时任务测试 - get请求参数 */
export type _v1_bc_admin_operation_schedule_timerTaskTest_get_req = Required<operations["timerTaskTestUsingGET"]>['parameters']['query']
/** 试运营进度定时任务测试 - get响应参数 */
export type _v1_bc_admin_operation_schedule_timerTaskTest_get_res = Required<operations["timerTaskTestUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 更新店铺营业状态测试 - get请求参数 */
export type _v1_bc_admin_operation_schedule_updateBusinessStatusTest_get_req = Required<operations["updateBusinessStatusTestUsingGET"]>['parameters']['query']
/** 更新店铺营业状态测试 - get响应参数 */
export type _v1_bc_admin_operation_schedule_updateBusinessStatusTest_get_res = Required<operations["updateBusinessStatusTestUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 更新试运营进度测试 - get请求参数 */
export type _v1_bc_admin_operation_schedule_updateOperationStatusTest_get_req = Required<operations["updateOperationStatusTestUsingGET"]>['parameters']['query']
/** 更新试运营进度测试 - get响应参数 */
export type _v1_bc_admin_operation_schedule_updateOperationStatusTest_get_res = Required<operations["updateOperationStatusTestUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 试运营进度详情 - get请求参数 */
export type _v1_bc_company_operation_schedule_detail_get_req = Required<operations["detailUsingGET_8"]>['parameters']['query']
/** 试运营进度详情 - get响应参数 */
export type _v1_bc_company_operation_schedule_detail_get_res = Required<operations["detailUsingGET_8"]>['responses'][200]['content']['*/*']['data']

/** 经营服务类目列表 - get请求参数 */
export type _v1_bc_company_organization_category_get_get_req = Required<operations["getUsingGET"]>['parameters']['query']
/** 经营服务类目列表 - get响应参数 */
export type _v1_bc_company_organization_category_get_get_res = Required<operations["getUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 经营服务类目列表 - get请求参数 */
export type _v1_bc_company_organization_category_list_get_req = Required<operations["listUsingGET_2"]>['parameters']['query']
/** 经营服务类目列表 - get响应参数 */
export type _v1_bc_company_organization_category_list_get_res = Required<operations["listUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 新增经营服务类目 - post请求参数 */
export type _v1_bc_company_organization_category_save_post_req = Required<operations["saveUsingPOST_2"]>['requestBody']['content']['application/json']
/** 新增经营服务类目 - post响应参数 */
export type _v1_bc_company_organization_category_save_post_res = Required<operations["saveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 经营服务类目列表 - get请求参数 */
export type _v1_bc_admin_organization_category_getById_get_req = Required<operations["getByIdUsingGET"]>['parameters']['query']
/** 经营服务类目列表 - get响应参数 */
export type _v1_bc_admin_organization_category_getById_get_res = Required<operations["getByIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 商家店铺入驻登录或注册 - get请求参数 */
export type _v1_bc_admin_organization_agencyOrHealthDataClean_get_req = Required<operations["agencyOrHealthDataCleanUsingGET"]>['parameters']['query']
/** 商家店铺入驻登录或注册 - get响应参数 */
export type _v1_bc_admin_organization_agencyOrHealthDataClean_get_res = Required<operations["agencyOrHealthDataCleanUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 平台/商家店铺入驻审核 - post请求参数 */
export type _v1_bc_admin_organization_auditEntering_post_req = Required<operations["auditEnteringUsingPOST"]>['requestBody']['content']['application/json']
/** 平台/商家店铺入驻审核 - post响应参数 */
export type _v1_bc_admin_organization_auditEntering_post_res = Required<operations["auditEnteringUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 平台/商家详情 - get请求参数 */
export type _v1_bc_admin_organization_detail_get_req = Required<operations["detailUsingGET_9"]>['parameters']['query']
/** 平台/商家详情 - get响应参数 */
export type _v1_bc_admin_organization_detail_get_res = Required<operations["detailUsingGET_9"]>['responses'][200]['content']['*/*']['data']

/** getUpdateLog - get请求参数 */
export type _v1_bc_admin_organization_getUpdateLog_get_req = Required<operations["getUpdateLogUsingGET"]>['parameters']['query']
/** getUpdateLog - get响应参数 */
export type _v1_bc_admin_organization_getUpdateLog_get_res = Required<operations["getUpdateLogUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取佣金比例列表 - post请求参数 */
export type _v1_bc_admin_organization_getWorkerCommissionList_post_req = Required<operations["getWorkerCommissionListUsingPOST"]>['requestBody']['content']['application/json']
/** 获取佣金比例列表 - post响应参数 */
export type _v1_bc_admin_organization_getWorkerCommissionList_post_res = Required<operations["getWorkerCommissionListUsingPOST"]>['responses'][200]['content']['*/*']

/** 平台/商家列表 - post请求参数 */
export type _v1_bc_admin_organization_list_post_req = Required<operations["listUsingPOST_12"]>['requestBody']['content']['application/json']
/** 平台/商家列表 - post响应参数 */
export type _v1_bc_admin_organization_list_post_res = Required<operations["listUsingPOST_12"]>['responses'][200]['content']['*/*']

/** 商家店铺入驻登录或注册 - post请求参数 */
export type _v1_bc_admin_organization_loginOrRegister_post_req = Required<operations["loginOrRegisterUsingPOST_2"]>['requestBody']['content']['application/json']
/** 商家店铺入驻登录或注册 - post响应参数 */
export type _v1_bc_admin_organization_loginOrRegister_post_res = Required<operations["loginOrRegisterUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 平台/商家店铺入驻审核 - post请求参数 */
export type _v1_bc_admin_organization_set_auditEntering_post_req = Required<operations["auditEnteringSetUsingPOST"]>['requestBody']['content']['application/json']
/** 平台/商家店铺入驻审核 - post响应参数 */
export type _v1_bc_admin_organization_set_auditEntering_post_res = Required<operations["auditEnteringSetUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 平台/商家详情 - get请求参数 */
export type _v1_bc_admin_organization_set_detail_get_req = Required<operations["detailSetUsingGET"]>['parameters']['query']
/** 平台/商家详情 - get响应参数 */
export type _v1_bc_admin_organization_set_detail_get_res = Required<operations["detailSetUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 平台/商家列表 - post请求参数 */
export type _v1_bc_admin_organization_set_list_post_req = Required<operations["listSetUsingPOST"]>['requestBody']['content']['application/json']
/** 平台/商家列表 - post响应参数 */
export type _v1_bc_admin_organization_set_list_post_res = Required<operations["listSetUsingPOST"]>['responses'][200]['content']['*/*']

/** 设置佣金比例 - post请求参数 */
export type _v1_bc_admin_organization_setWorkerCommission_post_req = Required<operations["setWorkerCommissionUsingPOST"]>['requestBody']['content']['application/json']
/** 设置佣金比例 - post响应参数 */
export type _v1_bc_admin_organization_setWorkerCommission_post_res = Required<operations["setWorkerCommissionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** timerTaskTest - get请求参数 */
export type _v1_bc_admin_organization_timerTaskTest_get_req = Required<operations["timerTaskTestUsingGET_1"]>['parameters']['query']
/** timerTaskTest - get响应参数 */
export type _v1_bc_admin_organization_timerTaskTest_get_res = Required<operations["timerTaskTestUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 获取所有一级服务类目 - get请求参数 */
export type _v1_bc_app_organization_getAllCategory_get_req = Required<operations["getAllCategoryUsingGET"]>['parameters']['query']
/** 获取所有一级服务类目 - get响应参数 */
export type _v1_bc_app_organization_getAllCategory_get_res = Required<operations["getAllCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取所有一级服务类目 - get请求参数 */
export type _v1_bc_app_organization_getStairCategory_get_req = Required<operations["getStairCategoryUsingGET_2"]>['parameters']['query']
/** 获取所有一级服务类目 - get响应参数 */
export type _v1_bc_app_organization_getStairCategory_get_res = Required<operations["getStairCategoryUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 根据注册用户查询平台/商家详情 - get请求参数 */
export type _v1_bc_company_organization_detailByUser_get_req = Required<operations["detailByUserUsingGET"]>['parameters']['query']
/** 根据注册用户查询平台/商家详情 - get响应参数 */
export type _v1_bc_company_organization_detailByUser_get_res = Required<operations["detailByUserUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取所有一级服务类目 - get请求参数 */
export type _v1_bc_company_organization_getAllCategory_get_req = Required<operations["getAllCategoryUsingGET_1"]>['parameters']['query']
/** 获取所有一级服务类目 - get响应参数 */
export type _v1_bc_company_organization_getAllCategory_get_res = Required<operations["getAllCategoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 查询审核记录 - get请求参数 */
export type _v1_bc_company_organization_getAuditDetail_get_req = Required<operations["getAuditDetailUsingGET"]>['parameters']['query']
/** 查询审核记录 - get响应参数 */
export type _v1_bc_company_organization_getAuditDetail_get_res = Required<operations["getAuditDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 查询审核记录 - get请求参数 */
export type _v1_bc_company_organization_getAuditRecord_get_req = Required<operations["getAuditRecordUsingGET"]>['parameters']['query']
/** 查询审核记录 - get响应参数 */
export type _v1_bc_company_organization_getAuditRecord_get_res = Required<operations["getAuditRecordUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取所有一级服务类目 - get请求参数 */
export type _v1_bc_company_organization_getStairCategory_get_req = Required<operations["getStairCategoryUsingGET_3"]>['parameters']['query']
/** 获取所有一级服务类目 - get响应参数 */
export type _v1_bc_company_organization_getStairCategory_get_res = Required<operations["getStairCategoryUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** 查询商家店铺状态 - get请求参数 */
export type _v1_bc_company_organization_getState_get_req = Required<operations["getStateUsingGET"]>['parameters']['query']
/** 查询商家店铺状态 - get响应参数 */
export type _v1_bc_company_organization_getState_get_res = Required<operations["getStateUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 商家主体详情 - get请求参数 */
export type _v1_bc_company_organization_info_get_req = Required<operations["infoUsingGET_1"]>['parameters']['query']
/** 商家主体详情 - get响应参数 */
export type _v1_bc_company_organization_info_get_res = Required<operations["infoUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 平台/商家修改 - post请求参数 */
export type _v1_bc_company_organization_modify_post_req = Required<operations["modifyUsingPOST_1"]>['requestBody']['content']['application/json']
/** 平台/商家修改 - post响应参数 */
export type _v1_bc_company_organization_modify_post_res = Required<operations["modifyUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 平台/商家新增 - post请求参数 */
export type _v1_bc_company_organization_save_post_req = Required<operations["saveUsingPOST_3"]>['requestBody']['content']['application/json']
/** 平台/商家新增 - post响应参数 */
export type _v1_bc_company_organization_save_post_res = Required<operations["saveUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 商家主体修改 - post请求参数 */
export type _v1_bc_company_organization_setting_post_req = Required<operations["settingUsingPOST"]>['requestBody']['content']['application/json']
/** 商家主体修改 - post响应参数 */
export type _v1_bc_company_organization_setting_post_res = Required<operations["settingUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取所有一级服务类目 - get请求参数 */
export type _v1_bc_server_organization_getAllCategory_get_req = Required<operations["getAllCategoryUsingGET_2"]>['parameters']['query']
/** 获取所有一级服务类目 - get响应参数 */
export type _v1_bc_server_organization_getAllCategory_get_res = Required<operations["getAllCategoryUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 获取所有一级服务类目 - get请求参数 */
export type _v1_bc_server_organization_getStairCategory_get_req = Required<operations["getStairCategoryUsingGET_4"]>['parameters']['query']
/** 获取所有一级服务类目 - get响应参数 */
export type _v1_bc_server_organization_getStairCategory_get_res = Required<operations["getStairCategoryUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** 根据商家编号获取门店工种信息 - get请求参数 */
export type _v1_bc_server_organization_getWorkerType_get_req = Required<operations["getWorkerTypeUsingGET"]>['parameters']['query']
/** 根据商家编号获取门店工种信息 - get响应参数 */
export type _v1_bc_server_organization_getWorkerType_get_res = Required<operations["getWorkerTypeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取服务人员关联的门店列表 - post请求参数 */
export type _v1_bc_server_organization_simpleList_post_req = Required<operations["simpleListUsingPOST"]>['requestBody']['content']['application/json']
/** 获取服务人员关联的门店列表 - post响应参数 */
export type _v1_bc_server_organization_simpleList_post_res = Required<operations["simpleListUsingPOST"]>['responses'][200]['content']['*/*']

/** 冻结服务人员 - post请求参数 */
export type _v1_bc_admin_organization_worker_auditFreeze_post_req = Required<operations["auditFreezeUsingPOST"]>['requestBody']['content']['application/json']
/** 冻结服务人员 - post响应参数 */
export type _v1_bc_admin_organization_worker_auditFreeze_post_res = Required<operations["auditFreezeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 查询服务人员详情 - post请求参数 */
export type _v1_bc_admin_organization_worker_detail_post_req = Required<operations["getWorkersUsingPOST_1"]>['parameters']['query']
/** 查询服务人员详情 - post响应参数 */
export type _v1_bc_admin_organization_worker_detail_post_res = Required<operations["getWorkersUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 查询已入驻店铺的服务人员列表 - post请求参数 */
export type _v1_bc_admin_organization_worker_getWorkers_post_req = Required<operations["getWorkersUsingPOST"]>['requestBody']['content']['application/json']
/** 查询已入驻店铺的服务人员列表 - post响应参数 */
export type _v1_bc_admin_organization_worker_getWorkers_post_res = Required<operations["getWorkersUsingPOST"]>['responses'][200]['content']['*/*']

/** 服务人员服务时长统计 - post请求参数 */
export type _v1_bc_admin_organization_worker_onlineStatus_post_req = Required<operations["onlineStatusUsingPOST"]>['requestBody']['content']['application/json']
/** 服务人员服务时长统计 - post响应参数 */
export type _v1_bc_admin_organization_worker_onlineStatus_post_res = Required<operations["onlineStatusUsingPOST"]>['responses'][200]['content']['*/*']

/** 服务人员入驻审核 - post请求参数 */
export type _v1_bc_company_organization_worker_auditJoining_post_req = Required<operations["auditJoiningUsingPOST"]>['requestBody']['content']['application/json']
/** 服务人员入驻审核 - post响应参数 */
export type _v1_bc_company_organization_worker_auditJoining_post_res = Required<operations["auditJoiningUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 服务人员查询 - post请求参数 */
export type _v1_bc_company_organization_worker_auditList_post_req = Required<operations["auditListUsingPOST"]>['requestBody']['content']['application/json']
/** 服务人员查询 - post响应参数 */
export type _v1_bc_company_organization_worker_auditList_post_res = Required<operations["auditListUsingPOST"]>['responses'][200]['content']['*/*']

/** 服务人员信息更新审核 - post请求参数 */
export type _v1_bc_company_organization_worker_auditUpdating_post_req = Required<operations["auditUpdatingUsingPOST"]>['requestBody']['content']['application/json']
/** 服务人员信息更新审核 - post响应参数 */
export type _v1_bc_company_organization_worker_auditUpdating_post_res = Required<operations["auditUpdatingUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 服务人员详情 - get请求参数 */
export type _v1_bc_company_organization_worker_detail_get_req = Required<operations["detailUsingGET_10"]>['parameters']['query']
/** 服务人员详情 - get响应参数 */
export type _v1_bc_company_organization_worker_detail_get_res = Required<operations["detailUsingGET_10"]>['responses'][200]['content']['*/*']['data']

/** 店铺服务人员批量解绑 - post请求参数 */
export type _v1_bc_company_organization_worker_disemploy_post_req = Required<operations["disemployUsingPOST"]>['requestBody']['content']['application/json']
/** 店铺服务人员批量解绑 - post响应参数 */
export type _v1_bc_company_organization_worker_disemploy_post_res = Required<operations["disemployUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 服务人员查询 - post请求参数 */
export type _v1_bc_company_organization_worker_simpleList_post_req = Required<operations["simpleListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 服务人员查询 - post响应参数 */
export type _v1_bc_company_organization_worker_simpleList_post_res = Required<operations["simpleListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 新增或更新服务人员关联门店 - post请求参数 */
export type _v1_bc_server_organization_worker_edit_post_req = Required<operations["editUsingPOST_1"]>['requestBody']['content']['application/json']
/** 新增或更新服务人员关联门店 - post响应参数 */
export type _v1_bc_server_organization_worker_edit_post_res = Required<operations["editUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 根据商家编号获取服务人员选定的工种信息 - get请求参数 */
export type _v1_bc_server_organization_worker_getWorkerDetail_get_req = Required<operations["getWorkerDetailUsingGET"]>['parameters']['query']
/** 根据商家编号获取服务人员选定的工种信息 - get响应参数 */
export type _v1_bc_server_organization_worker_getWorkerDetail_get_res = Required<operations["getWorkerDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务人员服务时长统计 - post请求参数 */
export type _v1_bc_server_organization_worker_onlineStatus_post_req = Required<operations["onlineStatusUsingPOST_1"]>['requestBody']['content']['application/json']
/** 服务人员服务时长统计 - post响应参数 */
export type _v1_bc_server_organization_worker_onlineStatus_post_res = Required<operations["onlineStatusUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 删除被照护人 - get请求参数 */
export type _v1_bc_app_patient_del_get_req = Required<operations["delUsingGET"]>['parameters']['query']
/** 删除被照护人 - get响应参数 */
export type _v1_bc_app_patient_del_get_res = Required<operations["delUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 被照护人详情 - get请求参数 */
export type _v1_bc_app_patient_detail_get_req = Required<operations["getDetailUsingGET_1"]>['parameters']['query']
/** 被照护人详情 - get响应参数 */
export type _v1_bc_app_patient_detail_get_res = Required<operations["getDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 新增、修改被照护人 - post请求参数 */
export type _v1_bc_app_patient_edit_post_req = Required<operations["editUsingPOST_2"]>['requestBody']['content']['application/json']
/** 新增、修改被照护人 - post响应参数 */
export type _v1_bc_app_patient_edit_post_res = Required<operations["editUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 被照护人列表 - get请求参数 */
export type _v1_bc_app_patient_list_get_req = Required<operations["getListUsingGET_1"]>['parameters']['query']
/** 被照护人列表 - get响应参数 */
export type _v1_bc_app_patient_list_get_res = Required<operations["getListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 广告-APP启动 - get请求参数 */
export type _v1_bc_public_ad_startup_get_req = Required<operations["startupUsingGET"]>['parameters']['query']
/** 广告-APP启动 - get响应参数 */
export type _v1_bc_public_ad_startup_get_res = Required<operations["startupUsingGET"]>['responses'][200]['content']['*/*']['data']

/** categoryTree - get请求参数 */
export type _v1_bc_public_article_category_tree_get_req = Required<operations["categoryTreeUsingGET_1"]>['parameters']['query']
/** categoryTree - get响应参数 */
export type _v1_bc_public_article_category_tree_get_res = Required<operations["categoryTreeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_public_article_detail_get_req = Required<operations["detailUsingGET_12"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_public_article_detail_get_res = Required<operations["detailUsingGET_12"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_public_article_list_post_req = Required<operations["listUsingPOST_13"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_public_article_list_post_res = Required<operations["listUsingPOST_13"]>['responses'][200]['content']['*/*']

/** convertToBase64 - post请求参数 */
export type _v1_bc_public_convertToBase64_post_req = Required<operations["convertToBase64UsingPOST"]>['requestBody']['content']['application/json']
/** convertToBase64 - post响应参数 */
export type _v1_bc_public_convertToBase64_post_res = Required<operations["convertToBase64UsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 客服app账号密码登录 - post请求参数 */
export type _v1_bc_public_customerServiceAccountLogin_post_req = Required<operations["customerServiceAccountLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 客服app账号密码登录 - post响应参数 */
export type _v1_bc_public_customerServiceAccountLogin_post_res = Required<operations["customerServiceAccountLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 个体创作推荐 - get请求参数 */
export type _v1_bc_public_guess_articles_get_req = Required<operations["getGuessContentArticlesUsingGET"]>['parameters']['query']
/** 个体创作推荐 - get响应参数 */
export type _v1_bc_public_guess_articles_get_res = Required<operations["getGuessContentArticlesUsingGET"]>['responses'][200]['content']['*/*']['data']

/** categoryTree - get请求参数 */
export type _v1_bc_app_public_article_category_tree_get_req = Required<operations["categoryTreeUsingGET_2"]>['parameters']['query']
/** categoryTree - get响应参数 */
export type _v1_bc_app_public_article_category_tree_get_res = Required<operations["categoryTreeUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_app_public_article_list_post_req = Required<operations["listUsingPOST_14"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_app_public_article_list_post_res = Required<operations["listUsingPOST_14"]>['responses'][200]['content']['*/*']

/** licence - get请求参数 */
export type _v1_bc_app_public_licence_get_req = Required<operations["licenceUsingGET"]>['parameters']['query']
/** licence - get响应参数 */
export type _v1_bc_app_public_licence_get_res = Required<operations["licenceUsingGET"]>['responses'][200]['content']['*/*']['data']

/** categoryTree - get请求参数 */
export type _v1_bc_merchant_public_article_category_tree_get_req = Required<operations["categoryTreeUsingGET_3"]>['parameters']['query']
/** categoryTree - get响应参数 */
export type _v1_bc_merchant_public_article_category_tree_get_res = Required<operations["categoryTreeUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_merchant_public_article_detail_get_req = Required<operations["detailUsingGET_13"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_merchant_public_article_detail_get_res = Required<operations["detailUsingGET_13"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_merchant_public_article_list_post_req = Required<operations["listUsingPOST_15"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_merchant_public_article_list_post_res = Required<operations["listUsingPOST_15"]>['responses'][200]['content']['*/*']

/** categoryTree - get请求参数 */
export type _v1_bc_server_public_article_category_tree_get_req = Required<operations["categoryTreeUsingGET_4"]>['parameters']['query']
/** categoryTree - get响应参数 */
export type _v1_bc_server_public_article_category_tree_get_res = Required<operations["categoryTreeUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_server_public_article_detail_get_req = Required<operations["detailUsingGET_14"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_server_public_article_detail_get_res = Required<operations["detailUsingGET_14"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_server_public_article_list_post_req = Required<operations["listUsingPOST_16"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_server_public_article_list_post_res = Required<operations["listUsingPOST_16"]>['responses'][200]['content']['*/*']

/** 服务人员其他简历-店铺 - get请求参数 */
export type _v1_bc_admin_resume_worker_company_get_req = Required<operations["workerDetailUsingGET"]>['parameters']['query']
/** 服务人员其他简历-店铺 - get响应参数 */
export type _v1_bc_admin_resume_worker_company_get_res = Required<operations["workerDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务人员简历详情 - get请求参数 */
export type _v1_bc_admin_resume_worker_detail_get_req = Required<operations["detailUsingGET_15"]>['parameters']['query']
/** 服务人员简历详情 - get响应参数 */
export type _v1_bc_admin_resume_worker_detail_get_res = Required<operations["detailUsingGET_15"]>['responses'][200]['content']['*/*']['data']

/** 服务人员简历列表 - get请求参数 */
export type _v1_bc_admin_resume_worker_list_get_req = Required<operations["listUsingGET_3"]>['parameters']['query']
/** 服务人员简历列表 - get响应参数 */
export type _v1_bc_admin_resume_worker_list_get_res = Required<operations["listUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** 简历详情 - get请求参数 */
export type _v1_bc_app_resume_detail_get_req = Required<operations["detailUsingGET_16"]>['parameters']['query']
/** 简历详情 - get响应参数 */
export type _v1_bc_app_resume_detail_get_res = Required<operations["detailUsingGET_16"]>['responses'][200]['content']['*/*']['data']

/** 简历详情 - get请求参数 */
export type _v1_bc_company_resume_detail_get_req = Required<operations["detailUsingGET_17"]>['parameters']['query']
/** 简历详情 - get响应参数 */
export type _v1_bc_company_resume_detail_get_res = Required<operations["detailUsingGET_17"]>['responses'][200]['content']['*/*']['data']

/** 简历详情 - get请求参数 */
export type _v1_bc_company_resume_detail_worker_get_req = Required<operations["workerDetailUsingGET_1"]>['parameters']['query']
/** 简历详情 - get响应参数 */
export type _v1_bc_company_resume_detail_worker_get_res = Required<operations["workerDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 更新简历 - post请求参数 */
export type _v1_bc_company_resume_update_post_req = Required<operations["UpdateUsingPOST"]>['requestBody']['content']['application/json']
/** 更新简历 - post响应参数 */
export type _v1_bc_company_resume_update_post_res = Required<operations["UpdateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 简历详情 - get请求参数 */
export type _v1_bc_server_resume_detail_get_req = Required<operations["detailUsingGET_18"]>['parameters']['query']
/** 简历详情 - get响应参数 */
export type _v1_bc_server_resume_detail_get_res = Required<operations["detailUsingGET_18"]>['responses'][200]['content']['*/*']['data']

/** 更新简历 - post请求参数 */
export type _v1_bc_server_resume_update_post_req = Required<operations["UpdateUsingPOST_1"]>['requestBody']['content']['application/json']
/** 更新简历 - post响应参数 */
export type _v1_bc_server_resume_update_post_res = Required<operations["UpdateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** bindUser - post请求参数 */
export type _v1_bc_admin_role_bindUser_post_req = Required<operations["bindUserUsingPOST"]>['requestBody']['content']['application/json']
/** bindUser - post响应参数 */
export type _v1_bc_admin_role_bindUser_post_res = Required<operations["bindUserUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** remove - post请求参数 */
export type _v1_bc_admin_role_delete_post_req = Required<operations["removeUsingPOST_1"]>['requestBody']['content']['application/json']
/** remove - post响应参数 */
export type _v1_bc_admin_role_delete_post_res = Required<operations["removeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_role_detail_get_req = Required<operations["detailUsingGET_19"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_role_detail_get_res = Required<operations["detailUsingGET_19"]>['responses'][200]['content']['*/*']['data']

/** 角色列表 - post请求参数 */
export type _v1_bc_admin_role_list_post_req = Required<operations["listUsingPOST_17"]>['requestBody']['content']['application/json']
/** 角色列表 - post响应参数 */
export type _v1_bc_admin_role_list_post_res = Required<operations["listUsingPOST_17"]>['responses'][200]['content']['*/*']

/** bindMenu - post请求参数 */
export type _v1_bc_admin_role_menu_bind_post_req = Required<operations["bindMenuUsingPOST"]>['requestBody']['content']['application/json']
/** bindMenu - post响应参数 */
export type _v1_bc_admin_role_menu_bind_post_res = Required<operations["bindMenuUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** getMenuIdsByRoleId - get请求参数 */
export type _v1_bc_admin_role_menu_list_get_req = Required<operations["getMenuIdsByRoleIdUsingGET"]>['parameters']['query']
/** getMenuIdsByRoleId - get响应参数 */
export type _v1_bc_admin_role_menu_list_get_res = Required<operations["getMenuIdsByRoleIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** updateOrCreate - post请求参数 */
export type _v1_bc_admin_role_updateOrCreate_post_req = Required<operations["updateOrCreateUsingPOST_3"]>['requestBody']['content']['application/json']
/** updateOrCreate - post响应参数 */
export type _v1_bc_admin_role_updateOrCreate_post_res = Required<operations["updateOrCreateUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 模板列表 - get请求参数 */
export type _v1_bc_admin_role_im_template_all_get_req = Required<operations["allUsingGET_1"]>['parameters']['query']
/** 模板列表 - get响应参数 */
export type _v1_bc_admin_role_im_template_all_get_res = Required<operations["allUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 关联模板 - post请求参数 */
export type _v1_bc_admin_role_im_template_bind_post_req = Required<operations["bindUsingPOST"]>['requestBody']['content']['application/json']
/** 关联模板 - post响应参数 */
export type _v1_bc_admin_role_im_template_bind_post_res = Required<operations["bindUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 店铺名片审核详情 - get请求参数 */
export type _v1_bc_admin_shop_card_auditDetail_get_req = Required<operations["auditDetailUsingGET"]>['parameters']['query']
/** 店铺名片审核详情 - get响应参数 */
export type _v1_bc_admin_shop_card_auditDetail_get_res = Required<operations["auditDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺名片审核信息 - post请求参数 */
export type _v1_bc_admin_shop_card_auditInfo_post_req = Required<operations["auditInfoUsingPOST"]>['requestBody']['content']['application/json']
/** 店铺名片审核信息 - post响应参数 */
export type _v1_bc_admin_shop_card_auditInfo_post_res = Required<operations["auditInfoUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 店铺名片审核列表 - post请求参数 */
export type _v1_bc_admin_shop_card_getAuditList_post_req = Required<operations["getAuditListUsingPOST"]>['requestBody']['content']['application/json']
/** 店铺名片审核列表 - post响应参数 */
export type _v1_bc_admin_shop_card_getAuditList_post_res = Required<operations["getAuditListUsingPOST"]>['responses'][200]['content']['*/*']

/** 店铺名片详情 - get请求参数 */
export type _v1_bc_company_shop_card_detail_get_req = Required<operations["detailUsingGET_20"]>['parameters']['query']
/** 店铺名片详情 - get响应参数 */
export type _v1_bc_company_shop_card_detail_get_res = Required<operations["detailUsingGET_20"]>['responses'][200]['content']['*/*']['data']

/** 店铺名片更改记录 - post请求参数 */
export type _v1_bc_company_shop_card_getRecords_post_req = Required<operations["getRecordsUsingPOST"]>['requestBody']['content']['application/json']
/** 店铺名片更改记录 - post响应参数 */
export type _v1_bc_company_shop_card_getRecords_post_res = Required<operations["getRecordsUsingPOST"]>['responses'][200]['content']['*/*']

/** 店铺名片更改记录详情 - get请求参数 */
export type _v1_bc_company_shop_card_recordDetail_get_req = Required<operations["recordDetailUsingGET"]>['parameters']['query']
/** 店铺名片更改记录详情 - get响应参数 */
export type _v1_bc_company_shop_card_recordDetail_get_res = Required<operations["recordDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺名片修改 - post请求参数 */
export type _v1_bc_company_shop_card_saveOrUpdate_post_req = Required<operations["saveOrUpdateUsingPOST_1"]>['requestBody']['content']['application/json']
/** 店铺名片修改 - post响应参数 */
export type _v1_bc_company_shop_card_saveOrUpdate_post_res = Required<operations["saveOrUpdateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 店铺协议 - get请求参数 */
export type _v1_bc_admin_shop_agreement_get_req = Required<operations["agreementUsingGET"]>['parameters']['query']
/** 店铺协议 - get响应参数 */
export type _v1_bc_admin_shop_agreement_get_res = Required<operations["agreementUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺信息修改审核 - post请求参数 */
export type _v1_bc_admin_shop_audit_post_req = Required<operations["auditUsingPOST_1"]>['parameters']['query']
/** 店铺信息修改审核 - post响应参数 */
export type _v1_bc_admin_shop_audit_post_res = Required<operations["auditUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 店铺列表 - post请求参数 */
export type _v1_bc_admin_shop_getList_post_req = Required<operations["getListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 店铺列表 - post响应参数 */
export type _v1_bc_admin_shop_getList_post_res = Required<operations["getListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 保证金账户初始化 - get请求参数 */
export type _v1_bc_admin_shop_initMarginAccount_get_req = Required<operations["initMarginAccountUsingGET"]>['parameters']['query']
/** 保证金账户初始化 - get响应参数 */
export type _v1_bc_admin_shop_initMarginAccount_get_res = Required<operations["initMarginAccountUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺信息修改列表查询 - post请求参数 */
export type _v1_bc_admin_shop_list_post_req = Required<operations["listUsingPOST_18"]>['parameters']['query']
/** 店铺信息修改列表查询 - post响应参数 */
export type _v1_bc_admin_shop_list_post_res = Required<operations["listUsingPOST_18"]>['responses'][200]['content']['*/*']

/** 店铺手续费合同 - get请求参数 */
export type _v1_bc_admin_shop_marginAgreement_get_req = Required<operations["marginAgreementUsingGET"]>['parameters']['query']
/** 店铺手续费合同 - get响应参数 */
export type _v1_bc_admin_shop_marginAgreement_get_res = Required<operations["marginAgreementUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 搜索机构 - post请求参数 */
export type _v1_bc_admin_shop_organizationList_post_req = Required<operations["organizationListUsingPOST"]>['requestBody']['content']['application/json']
/** 搜索机构 - post响应参数 */
export type _v1_bc_admin_shop_organizationList_post_res = Required<operations["organizationListUsingPOST"]>['responses'][200]['content']['*/*']

/** 获取店铺基础信息 - get请求参数 */
export type _v1_bc_app_shop_getBaseInfo_get_req = Required<operations["getBaseInfoUsingGET_4"]>['parameters']['query']
/** 获取店铺基础信息 - get响应参数 */
export type _v1_bc_app_shop_getBaseInfo_get_res = Required<operations["getBaseInfoUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** 店铺信息修改 - post请求参数 */
export type _v1_bc_app_shop_modify_post_req = Required<operations["modifyUsingPOST_2"]>['requestBody']['content']['application/json']
/** 店铺信息修改 - post响应参数 */
export type _v1_bc_app_shop_modify_post_res = Required<operations["modifyUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 机构详情 - get请求参数 */
export type _v1_bc_app_shop_organizationDetail_get_req = Required<operations["organizationDetailUsingGET"]>['parameters']['query']
/** 机构详情 - get响应参数 */
export type _v1_bc_app_shop_organizationDetail_get_res = Required<operations["organizationDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 搜索机构 - post请求参数 */
export type _v1_bc_app_shop_organizationList_post_req = Required<operations["organizationListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 搜索机构 - post响应参数 */
export type _v1_bc_app_shop_organizationList_post_res = Required<operations["organizationListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 店铺协议 - get请求参数 */
export type _v1_bc_company_shop_agreement_get_req = Required<operations["agreementUsingGET_1"]>['parameters']['query']
/** 店铺协议 - get响应参数 */
export type _v1_bc_company_shop_agreement_get_res = Required<operations["agreementUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 店铺注销 - post请求参数 */
export type _v1_bc_company_shop_cancellation_post_req = Required<operations["cancellationUsingPOST"]>['requestBody']
/** 店铺注销 - post响应参数 */
export type _v1_bc_company_shop_cancellation_post_res = Required<operations["cancellationUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 商品下架查询 - get请求参数 */
export type _v1_bc_company_shop_checkUndercarriage_get_req = Required<operations["checkUndercarriageUsingGET"]>['parameters']['query']
/** 商品下架查询 - get响应参数 */
export type _v1_bc_company_shop_checkUndercarriage_get_res = Required<operations["checkUndercarriageUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺认领 - get请求参数 */
export type _v1_bc_company_shop_claim_get_req = Required<operations["claimUsingGET"]>['parameters']['query']
/** 店铺认领 - get响应参数 */
export type _v1_bc_company_shop_claim_get_res = Required<operations["claimUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺紧急联系设置 - post请求参数 */
export type _v1_bc_company_shop_contact_post_req = Required<operations["emergencyContactUsingPOST"]>['requestBody']['content']['application/json']
/** 店铺紧急联系设置 - post响应参数 */
export type _v1_bc_company_shop_contact_post_res = Required<operations["emergencyContactUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 店铺详情 - get请求参数 */
export type _v1_bc_company_shop_detail_get_req = Required<operations["detailUsingGET_21"]>['parameters']['query']
/** 店铺详情 - get响应参数 */
export type _v1_bc_company_shop_detail_get_res = Required<operations["detailUsingGET_21"]>['responses'][200]['content']['*/*']['data']

/** 店铺设置 - post请求参数 */
export type _v1_bc_company_shop_edit_post_req = Required<operations["editUsingPOST_3"]>['requestBody']['content']['application/json']
/** 店铺设置 - post响应参数 */
export type _v1_bc_company_shop_edit_post_res = Required<operations["editUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 店铺商品配送地址设置 - post请求参数 */
export type _v1_bc_company_shop_editShippingAddress_post_req = Required<operations["editShippingAddressUsingPOST"]>['requestBody']['content']['application/json']
/** 店铺商品配送地址设置 - post响应参数 */
export type _v1_bc_company_shop_editShippingAddress_post_res = Required<operations["editShippingAddressUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 店铺商品配送地址查询 - get请求参数 */
export type _v1_bc_company_shop_getShippingAddress_get_req = Required<operations["getShippingAddressUsingGET_1"]>['parameters']['query']
/** 店铺商品配送地址查询 - get响应参数 */
export type _v1_bc_company_shop_getShippingAddress_get_res = Required<operations["getShippingAddressUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 获取店铺的类目 - get请求参数 */
export type _v1_bc_company_shop_getShopCategory_get_req = Required<operations["getShopCategoryUsingGET_1"]>['parameters']['query']
/** 获取店铺的类目 - get响应参数 */
export type _v1_bc_company_shop_getShopCategory_get_res = Required<operations["getShopCategoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 获取店铺的二级类目 - get请求参数 */
export type _v1_bc_company_shop_getShopCategoryById_get_req = Required<operations["getShopCategoryByIdUsingGET"]>['parameters']['query']
/** 获取店铺的二级类目 - get响应参数 */
export type _v1_bc_company_shop_getShopCategoryById_get_res = Required<operations["getShopCategoryByIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取店铺类目树型 - get请求参数 */
export type _v1_bc_company_shop_getShopItreeCategory_get_req = Required<operations["getItreeUsingGET"]>['parameters']['query']
/** 获取店铺类目树型 - get响应参数 */
export type _v1_bc_company_shop_getShopItreeCategory_get_res = Required<operations["getItreeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取店铺的一级类目 - get请求参数 */
export type _v1_bc_company_shop_getShopParentCategory_get_req = Required<operations["getShopParentCategoryUsingGET"]>['parameters']['query']
/** 获取店铺的一级类目 - get响应参数 */
export type _v1_bc_company_shop_getShopParentCategory_get_res = Required<operations["getShopParentCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取符合条件的服务人员 - post请求参数 */
export type _v1_bc_company_shop_getShopWorker_post_req = Required<operations["getShopWorkerUsingPOST_1"]>['requestBody']['content']['application/json']
/** 获取符合条件的服务人员 - post响应参数 */
export type _v1_bc_company_shop_getShopWorker_post_res = Required<operations["getShopWorkerUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 店铺信息修改 - post请求参数 */
export type _v1_bc_company_shop_modify_post_req = Required<operations["modifyUsingPOST_3"]>['requestBody']['content']['application/json']
/** 店铺信息修改 - post响应参数 */
export type _v1_bc_company_shop_modify_post_res = Required<operations["modifyUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 材料提交列表 - get请求参数 */
export type _v1_bc_company_shop_platformOrder_get_req = Required<operations["platformOrderUsingGET"]>['parameters']['query']
/** 材料提交列表 - get响应参数 */
export type _v1_bc_company_shop_platformOrder_get_res = Required<operations["platformOrderUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 搜索符合条件的服务人员 - post请求参数 */
export type _v1_bc_company_shop_searchShopWorker_post_req = Required<operations["searchShopWorkerUsingPOST"]>['requestBody']['content']['application/json']
/** 搜索符合条件的服务人员 - post响应参数 */
export type _v1_bc_company_shop_searchShopWorker_post_res = Required<operations["searchShopWorkerUsingPOST"]>['responses'][200]['content']['*/*']

/** 紧急联系 - get请求参数 */
export type _v1_bc_server_shop_contact_get_req = Required<operations["workerShopContactListUsingGET"]>['parameters']['query']
/** 紧急联系 - get响应参数 */
export type _v1_bc_server_shop_contact_get_res = Required<operations["workerShopContactListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取服务人员的店铺列表 - post请求参数 */
export type _v1_bc_server_shop_getByWorkerAndAddress_post_req = Required<operations["getByWorkerAndAddressUsingPOST_1"]>['requestBody']['content']['application/json']
/** 获取服务人员的店铺列表 - post响应参数 */
export type _v1_bc_server_shop_getByWorkerAndAddress_post_res = Required<operations["getByWorkerAndAddressUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 搜索店铺 - post请求参数 */
export type _v1_bc_server_shop_getListByKeywords_post_req = Required<operations["getListByKeywordsUsingPOST_1"]>['requestBody']['content']['application/json']
/** 搜索店铺 - post响应参数 */
export type _v1_bc_server_shop_getListByKeywords_post_res = Required<operations["getListByKeywordsUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 获取店铺的职业列表 - get请求参数 */
export type _v1_bc_server_shop_getWorkerType_get_req = Required<operations["getWorkerTypeUsingGET_1"]>['parameters']['query']
/** 获取店铺的职业列表 - get响应参数 */
export type _v1_bc_server_shop_getWorkerType_get_res = Required<operations["getWorkerTypeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 机构设施删除 - post请求参数 */
export type _v1_bc_company_shop_facility_delete_post_req = Required<operations["deleteUsingPOST_4"]>['requestBody']['content']['application/json']
/** 机构设施删除 - post响应参数 */
export type _v1_bc_company_shop_facility_delete_post_res = Required<operations["deleteUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** 机构设施详情 - get请求参数 */
export type _v1_bc_company_shop_facility_detail_get_req = Required<operations["detailUsingGET_22"]>['parameters']['query']
/** 机构设施详情 - get响应参数 */
export type _v1_bc_company_shop_facility_detail_get_res = Required<operations["detailUsingGET_22"]>['responses'][200]['content']['*/*']['data']

/** 机构设施列表 - post请求参数 */
export type _v1_bc_company_shop_facility_list_post_req = Required<operations["listUsingPOST_19"]>['requestBody']['content']['application/json']
/** 机构设施列表 - post响应参数 */
export type _v1_bc_company_shop_facility_list_post_res = Required<operations["listUsingPOST_19"]>['responses'][200]['content']['*/*']

/** 机构设施新增 - post请求参数 */
export type _v1_bc_company_shop_facility_save_post_req = Required<operations["saveUsingPOST_4"]>['requestBody']['content']['application/json']
/** 机构设施新增 - post响应参数 */
export type _v1_bc_company_shop_facility_save_post_res = Required<operations["saveUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** 机构设施修改 - post请求参数 */
export type _v1_bc_company_shop_facility_update_post_req = Required<operations["updateUsingPOST_1"]>['requestBody']['content']['application/json']
/** 机构设施修改 - post响应参数 */
export type _v1_bc_company_shop_facility_update_post_res = Required<operations["updateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 店铺资质详情 - get请求参数 */
export type _v1_bc_company_shop_license_detail_get_req = Required<operations["detailUsingGET_23"]>['parameters']['query']
/** 店铺资质详情 - get响应参数 */
export type _v1_bc_company_shop_license_detail_get_res = Required<operations["detailUsingGET_23"]>['responses'][200]['content']['*/*']['data']

/** 店铺资质列表 - post请求参数 */
export type _v1_bc_company_shop_license_list_post_req = Required<operations["listUsingPOST_20"]>['requestBody']['content']['application/json']
/** 店铺资质列表 - post响应参数 */
export type _v1_bc_company_shop_license_list_post_res = Required<operations["listUsingPOST_20"]>['responses'][200]['content']['*/*']

/** overview - get请求参数 */
export type _v1_bc_company_stat_overview_get_req = Required<operations["overviewUsingGET"]>['parameters']['query']
/** overview - get响应参数 */
export type _v1_bc_company_stat_overview_get_res = Required<operations["overviewUsingGET"]>['responses'][200]['content']['*/*']['data']

/** getMobileFromToken - get请求参数 */
export type _ali_sms_getMobileFromToken_get_req = Required<operations["getMobileFromTokenUsingGET"]>['parameters']['query']
/** getMobileFromToken - get响应参数 */
export type _ali_sms_getMobileFromToken_get_res = Required<operations["getMobileFromTokenUsingGET"]>['responses'][200]['content']['*/*']['data']

/** sendBankCardCode - get请求参数 */
export type _ali_sms_sendBankCardCode_get_req = Required<operations["sendBankCardCodeUsingGET"]>['parameters']['query']
/** sendBankCardCode - get响应参数 */
export type _ali_sms_sendBankCardCode_get_res = Required<operations["sendBankCardCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** sendBindCode - get请求参数 */
export type _ali_sms_sendBindCode_get_req = Required<operations["sendBindCodeUsingGET"]>['parameters']['query']
/** sendBindCode - get响应参数 */
export type _ali_sms_sendBindCode_get_res = Required<operations["sendBindCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** sendLoginCode - get请求参数 */
export type _ali_sms_sendLoginCode_get_req = Required<operations["sendLoginCodeUsingGET"]>['parameters']['query']
/** sendLoginCode - get响应参数 */
export type _ali_sms_sendLoginCode_get_res = Required<operations["sendLoginCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** sendRegisterCode - get请求参数 */
export type _ali_sms_sendRegisterCode_get_req = Required<operations["sendRegisterCodeUsingGET"]>['parameters']['query']
/** sendRegisterCode - get响应参数 */
export type _ali_sms_sendRegisterCode_get_res = Required<operations["sendRegisterCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** accountStat - get请求参数 */
export type _v1_bc_admin_stat_account_get_req = Required<operations["accountStatUsingGET"]>['parameters']['query']
/** accountStat - get响应参数 */
export type _v1_bc_admin_stat_account_get_res = Required<operations["accountStatUsingGET"]>['responses'][200]['content']['*/*']['data']

/** settled - get请求参数 */
export type _v1_bc_admin_stat_settled_get_req = Required<operations["settledUsingGET"]>['parameters']['query']
/** settled - get响应参数 */
export type _v1_bc_admin_stat_settled_get_res = Required<operations["settledUsingGET"]>['responses'][200]['content']['*/*']['data']

/** initBusinessCardPrice - get请求参数 */
export type _v1_bc_admin_test_initBusinessCardPrice_get_req = Required<operations["initBusinessCardPriceUsingGET"]>['parameters']['query']
/** initBusinessCardPrice - get响应参数 */
export type _v1_bc_admin_test_initBusinessCardPrice_get_res = Required<operations["initBusinessCardPriceUsingGET"]>['responses'][200]['content']['*/*']['data']

/** accountStat - get请求参数 */
export type _v1_bc_admin_test_testz_get_req = Required<operations["accountStatUsingGET_1"]>['parameters']['query']
/** accountStat - get响应参数 */
export type _v1_bc_admin_test_testz_get_res = Required<operations["accountStatUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** worker - get请求参数 */
export type _v1_bc_admin_test_worker_get_req = Required<operations["workerUsingGET"]>['parameters']['query']
/** worker - get响应参数 */
export type _v1_bc_admin_test_worker_get_res = Required<operations["workerUsingGET"]>['responses'][200]['content']['*/*']['data']

/** fetchStsUploadCredential - get请求参数 */
export type _v1_bc_oss_sts_upload_credential_get_req = Required<operations["fetchStsUploadCredentialUsingGET"]>['parameters']['query']
/** fetchStsUploadCredential - get响应参数 */
export type _v1_bc_oss_sts_upload_credential_get_res = Required<operations["fetchStsUploadCredentialUsingGET"]>['responses'][200]['content']['*/*']['data']

/** fetchStsViewCredential - get请求参数 */
export type _v1_bc_oss_sts_view_credential_get_req = Required<operations["fetchStsViewCredentialUsingGET"]>['parameters']['query']
/** fetchStsViewCredential - get响应参数 */
export type _v1_bc_oss_sts_view_credential_get_res = Required<operations["fetchStsViewCredentialUsingGET"]>['responses'][200]['content']['*/*']['data']

/** uploadOssFrom - get请求参数 */
export type _v1_bc_oss_url_upload_get_req = Required<operations["uploadOssFromUsingGET"]>['parameters']['query']
/** uploadOssFrom - get响应参数 */
export type _v1_bc_oss_url_upload_get_res = Required<operations["uploadOssFromUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 用户地址列表 - get请求参数 */
export type _v1_bc_admin_user_address_list_get_req = Required<operations["getUserAddressListUsingGET_1"]>['parameters']['query']
/** 用户地址列表 - get响应参数 */
export type _v1_bc_admin_user_address_list_get_res = Required<operations["getUserAddressListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 添加地址 - post请求参数 */
export type _v1_bc_app_address_add_post_req = Required<operations["addUsingPOST_3"]>['requestBody']['content']['application/json']
/** 添加地址 - post响应参数 */
export type _v1_bc_app_address_add_post_res = Required<operations["addUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 地址删除 - get请求参数 */
export type _v1_bc_app_address_del_get_req = Required<operations["delUsingGET_1"]>['parameters']['query']
/** 地址删除 - get响应参数 */
export type _v1_bc_app_address_del_get_res = Required<operations["delUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 地址详情 - get请求参数 */
export type _v1_bc_app_address_detail_get_req = Required<operations["detailUsingGET_24"]>['parameters']['query']
/** 地址详情 - get响应参数 */
export type _v1_bc_app_address_detail_get_res = Required<operations["detailUsingGET_24"]>['responses'][200]['content']['*/*']['data']

/** 地址修改 - post请求参数 */
export type _v1_bc_app_address_edit_post_req = Required<operations["addUsingPOST_4"]>['requestBody']['content']['application/json']
/** 地址修改 - post响应参数 */
export type _v1_bc_app_address_edit_post_res = Required<operations["addUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** 地址列表 - get请求参数 */
export type _v1_bc_app_address_list_get_req = Required<operations["listUsingGET_4"]>['parameters']['query']
/** 地址列表 - get响应参数 */
export type _v1_bc_app_address_list_get_res = Required<operations["listUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** addSubAccount - post请求参数 */
export type _v1_bc_admin_account_add_subaccount_post_req = Required<operations["addSubAccountUsingPOST"]>['requestBody']['content']['application/json']
/** addSubAccount - post响应参数 */
export type _v1_bc_admin_account_add_subaccount_post_res = Required<operations["addSubAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_account_del_post_req = Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_account_del_post_res = Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_account_detail_get_req = Required<operations["detailUsingGET_25"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_account_detail_get_res = Required<operations["detailUsingGET_25"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_account_doAction_post_req = Required<operations["doActionUsingPOST_2"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_account_doAction_post_res = Required<operations["doActionUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** editSubAccount - post请求参数 */
export type _v1_bc_admin_account_edit_subaccount_post_req = Required<operations["editSubAccountUsingPOST"]>['requestBody']['content']['application/json']
/** editSubAccount - post响应参数 */
export type _v1_bc_admin_account_edit_subaccount_post_res = Required<operations["editSubAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_account_list_post_req = Required<operations["listUsingPOST_21"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_account_list_post_res = Required<operations["listUsingPOST_21"]>['responses'][200]['content']['*/*']

/** getMenuIdsByUserId - get请求参数 */
export type _v1_bc_admin_account_menu_list_get_req = Required<operations["getMenuIdsByUserIdUsingGET"]>['parameters']['query']
/** getMenuIdsByUserId - get响应参数 */
export type _v1_bc_admin_account_menu_list_get_res = Required<operations["getMenuIdsByUserIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** organizationList - get请求参数 */
export type _v1_bc_admin_account_organization_list_get_req = Required<operations["organizationListUsingGET"]>['parameters']['query']
/** organizationList - get响应参数 */
export type _v1_bc_admin_account_organization_list_get_res = Required<operations["organizationListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** getPermissionsByUserId - get请求参数 */
export type _v1_bc_admin_account_permission_list_get_req = Required<operations["getPermissionsByUserIdUsingGET"]>['parameters']['query']
/** getPermissionsByUserId - get响应参数 */
export type _v1_bc_admin_account_permission_list_get_res = Required<operations["getPermissionsByUserIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** setDefaultAvatar - get请求参数 */
export type _v1_bc_admin_account_setDefaultAvatar_get_req = Required<operations["setDefaultAvatarUsingGET"]>['parameters']['query']
/** setDefaultAvatar - get响应参数 */
export type _v1_bc_admin_account_setDefaultAvatar_get_res = Required<operations["setDefaultAvatarUsingGET"]>['responses'][200]['content']

/** userInfo - get请求参数 */
export type _v1_bc_admin_account_user_info_get_req = Required<operations["userInfoUsingGET"]>['parameters']['query']
/** userInfo - get响应参数 */
export type _v1_bc_admin_account_user_info_get_res = Required<operations["userInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

/** wxkLogin - post请求参数 */
export type _v1_bc_admin_account_wxkLogin_post_req = Required<operations["wxkLoginUsingPOST"]>['requestBody']['content']['application/json']
/** wxkLogin - post响应参数 */
export type _v1_bc_admin_account_wxkLogin_post_res = Required<operations["wxkLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 用户实名认证 - get请求参数 */
export type _v1_bc_app_user_certificateByCertifyId_get_req = Required<operations["certificateByCertifyIdUsingGET"]>['parameters']['query']
/** 用户实名认证 - get响应参数 */
export type _v1_bc_app_user_certificateByCertifyId_get_res = Required<operations["certificateByCertifyIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 用户注销 - post请求参数 */
export type _v1_bc_app_user_destroy_post_req = Required<operations["destroyUsingPOST"]>['requestBody']['content']['application/json']
/** 用户注销 - post响应参数 */
export type _v1_bc_app_user_destroy_post_res = Required<operations["destroyUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取用户详情 - get请求参数 */
export type _v1_bc_app_user_detail_get_req = Required<operations["detailUsingGET_26"]>['parameters']['query']
/** 获取用户详情 - get响应参数 */
export type _v1_bc_app_user_detail_get_res = Required<operations["detailUsingGET_26"]>['responses'][200]['content']['*/*']['data']

/** 修改用户信息 - post请求参数 */
export type _v1_bc_app_user_edit_post_req = Required<operations["editUsingPOST_4"]>['requestBody']['content']['application/json']
/** 修改用户信息 - post响应参数 */
export type _v1_bc_app_user_edit_post_res = Required<operations["editUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** 手机号快速验证 - post请求参数 */
export type _v1_bc_app_user_getPhoneNumber_post_req = Required<operations["getPhoneNumberUsingPOST"]>['requestBody']['content']['application/json']
/** 手机号快速验证 - post响应参数 */
export type _v1_bc_app_user_getPhoneNumber_post_res = Required<operations["getPhoneNumberUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 登录 - post请求参数 */
export type _v1_bc_app_user_login_post_req = Required<operations["loginUsingPOST"]>['requestBody']['content']['application/json']
/** 登录 - post响应参数 */
export type _v1_bc_app_user_login_post_res = Required<operations["loginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 短信验证码登录 - post请求参数 */
export type _v1_bc_app_user_mobileCodeLogin_post_req = Required<operations["mobileCodeLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 短信验证码登录 - post响应参数 */
export type _v1_bc_app_user_mobileCodeLogin_post_res = Required<operations["mobileCodeLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 手机号一键登录 - post请求参数 */
export type _v1_bc_app_user_mobileQuicklyLogin_post_req = Required<operations["mobileQuicklyLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 手机号一键登录 - post响应参数 */
export type _v1_bc_app_user_mobileQuicklyLogin_post_res = Required<operations["mobileQuicklyLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 无感登录 - post请求参数 */
export type _v1_bc_app_user_refreshLogin_post_req = Required<operations["refreshLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 无感登录 - post响应参数 */
export type _v1_bc_app_user_refreshLogin_post_res = Required<operations["refreshLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 微信授权登录 - post请求参数 */
export type _v1_bc_app_user_wechatLogin_post_req = Required<operations["wechatLoginUsingPOST"]>['requestBody']['content']['application/json']
/** 微信授权登录 - post响应参数 */
export type _v1_bc_app_user_wechatLogin_post_res = Required<operations["wechatLoginUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 银行卡详情 - get请求参数 */
export type _v1_bc_server_workerBankCard_detail_get_req = Required<operations["detailUsingGET_27"]>['parameters']['query']
/** 银行卡详情 - get响应参数 */
export type _v1_bc_server_workerBankCard_detail_get_res = Required<operations["detailUsingGET_27"]>['responses'][200]['content']['*/*']['data']

/** 绑定银行卡 - post请求参数 */
export type _v1_bc_server_workerBankCard_edit_post_req = Required<operations["editUsingPOST_5"]>['requestBody']['content']['application/json']
/** 绑定银行卡 - post响应参数 */
export type _v1_bc_server_workerBankCard_edit_post_res = Required<operations["editUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

/** 获取申请详情 - get请求参数 */
export type _v1_bc_server_workerCertificate_applyDetail_get_req = Required<operations["applyDetailUsingGET"]>['parameters']['query']
/** 获取申请详情 - get响应参数 */
export type _v1_bc_server_workerCertificate_applyDetail_get_res = Required<operations["applyDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 配置字典List - get请求参数 */
export type _v1_bc_company_company_configList_get_req = Required<operations["configListUsingGET_1"]>['parameters']['query']
/** 配置字典List - get响应参数 */
export type _v1_bc_company_company_configList_get_res = Required<operations["configListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 配置字典 - get请求参数 */
export type _v1_bc_company_company_configMap_get_req = Required<operations["configMapUsingGET"]>['parameters']['query']
/** 配置字典 - get响应参数 */
export type _v1_bc_company_company_configMap_get_res = Required<operations["configMapUsingGET"]>['responses'][200]['content']['*/*']['data']

/** getLanguageList - get请求参数 */
export type _v1_bc_app_workerConfig_getLanguageList_get_req = Required<operations["getLanguageListUsingGET_1"]>['parameters']['query']
/** getLanguageList - get响应参数 */
export type _v1_bc_app_workerConfig_getLanguageList_get_res = Required<operations["getLanguageListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** getOriginList - get请求参数 */
export type _v1_bc_app_workerConfig_getOriginList_get_req = Required<operations["getOriginListUsingGET_1"]>['parameters']['query']
/** getOriginList - get响应参数 */
export type _v1_bc_app_workerConfig_getOriginList_get_res = Required<operations["getOriginListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 申请入驻店铺 - post请求参数 */
export type _v1_bc_server_worker_applyEnterShop_post_req = Required<operations["applyEnterShopUsingPOST"]>['requestBody']['content']['application/json']
/** 申请入驻店铺 - post响应参数 */
export type _v1_bc_server_worker_applyEnterShop_post_res = Required<operations["applyEnterShopUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 自动登录 - post请求参数 */
export type _v1_bc_server_worker_autoLogin_post_req = Required<operations["autoLoginUsingPOST_1"]>['requestBody']['content']['application/json']
/** 自动登录 - post响应参数 */
export type _v1_bc_server_worker_autoLogin_post_res = Required<operations["autoLoginUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 背景审查 - get请求参数 */
export type _v1_bc_server_worker_backgroundCheck_get_req = Required<operations["backgroundCheckUsingGET"]>['parameters']['query']
/** 背景审查 - get响应参数 */
export type _v1_bc_server_worker_backgroundCheck_get_res = Required<operations["backgroundCheckUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务人员注销 - post请求参数 */
export type _v1_bc_server_worker_cancellation_post_req = Required<operations["cancellationUsingPOST_1"]>['requestBody']
/** 服务人员注销 - post响应参数 */
export type _v1_bc_server_worker_cancellation_post_res = Required<operations["cancellationUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 人脸 + 身份证认证 - get请求参数 */
export type _v1_bc_server_worker_certificateByCertifyId_get_req = Required<operations["certificateByCertifyIdUsingGET_1"]>['parameters']['query']
/** 人脸 + 身份证认证 - get响应参数 */
export type _v1_bc_server_worker_certificateByCertifyId_get_res = Required<operations["certificateByCertifyIdUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 认证主页 - get请求参数 */
export type _v1_bc_server_worker_certificationInfo_get_req = Required<operations["certificationInfoUsingGET"]>['parameters']['query']
/** 认证主页 - get响应参数 */
export type _v1_bc_server_worker_certificationInfo_get_res = Required<operations["certificationInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取详情 - get请求参数 */
export type _v1_bc_server_worker_detail_get_req = Required<operations["detailUsingGET_28"]>['parameters']['query']
/** 获取详情 - get响应参数 */
export type _v1_bc_server_worker_detail_get_res = Required<operations["detailUsingGET_28"]>['responses'][200]['content']['*/*']['data']

/** 修改行业 - post请求参数 */
export type _v1_bc_server_worker_editIndustry_post_req = Required<operations["editIndustryUsingPOST"]>['requestBody']['content']['application/json']
/** 修改行业 - post响应参数 */
export type _v1_bc_server_worker_editIndustry_post_res = Required<operations["editIndustryUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取职业 - get请求参数 */
export type _v1_bc_server_worker_getWorkerType_get_req = Required<operations["getWorkerTypeUsingGET_2"]>['parameters']['query']
/** 获取职业 - get响应参数 */
export type _v1_bc_server_worker_getWorkerType_get_res = Required<operations["getWorkerTypeUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 登录 - post请求参数 */
export type _v1_bc_server_worker_login_post_req = Required<operations["loginUsingPOST_1"]>['requestBody']['content']['application/json']
/** 登录 - post响应参数 */
export type _v1_bc_server_worker_login_post_res = Required<operations["loginUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 手机号一键登录 - post请求参数 */
export type _v1_bc_server_worker_mobileQuicklyLogin_post_req = Required<operations["mobileQuicklyLoginUsingPOST_1"]>['requestBody']['content']['application/json']
/** 手机号一键登录 - post响应参数 */
export type _v1_bc_server_worker_mobileQuicklyLogin_post_res = Required<operations["mobileQuicklyLoginUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 手机号注册 - post请求参数 */
export type _v1_bc_server_worker_register_post_req = Required<operations["registerUsingPOST"]>['requestBody']['content']['application/json']
/** 手机号注册 - post响应参数 */
export type _v1_bc_server_worker_register_post_res = Required<operations["registerUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 人脸识别照片保存 - post请求参数 */
export type _v1_bc_server_worker_saveFaceImage_post_req = Required<operations["saveFaceImageUsingPOST"]>['requestBody']['content']['application/json']
/** 人脸识别照片保存 - post响应参数 */
export type _v1_bc_server_worker_saveFaceImage_post_res = Required<operations["saveFaceImageUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** delete - post请求参数 */
export type _v1_bc_admin_workerType_delete_post_req = Required<operations["deleteUsingPOST_5"]>['requestBody']['content']['application/json']
/** delete - post响应参数 */
export type _v1_bc_admin_workerType_delete_post_res = Required<operations["deleteUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

/** 详情 - get请求参数 */
export type _v1_bc_admin_workerType_detail_get_req = Required<operations["detailUsingGET_29"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_admin_workerType_detail_get_res = Required<operations["detailUsingGET_29"]>['responses'][200]['content']['*/*']['data']

/** 工种列表 - post请求参数 */
export type _v1_bc_admin_workerType_list_post_req = Required<operations["listUsingPOST_22"]>['requestBody']['content']['application/json']
/** 工种列表 - post响应参数 */
export type _v1_bc_admin_workerType_list_post_res = Required<operations["listUsingPOST_22"]>['responses'][200]['content']['*/*']

/** 详情 - get请求参数 */
export type _v1_bc_admin_workerType_role_get_req = Required<operations["roleUsingGET"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_admin_workerType_role_get_res = Required<operations["roleUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 工种角色列表 - get请求参数 */
export type _v1_bc_admin_workerType_roleList_get_req = Required<operations["roleListUsingGET"]>['parameters']['query']
/** 工种角色列表 - get响应参数 */
export type _v1_bc_admin_workerType_roleList_get_res = Required<operations["roleListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 工种角色列表 - get请求参数 */
export type _v1_bc_admin_workerType_roleListLikeCategory_get_req = Required<operations["roleListLikeCategoryUsingGET"]>['parameters']['query']
/** 工种角色列表 - get响应参数 */
export type _v1_bc_admin_workerType_roleListLikeCategory_get_res = Required<operations["roleListLikeCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 新增或修改 - post请求参数 */
export type _v1_bc_admin_workerType_save_post_req = Required<operations["saveUsingPOST_5"]>['requestBody']['content']['application/json']
/** 新增或修改 - post响应参数 */
export type _v1_bc_admin_workerType_save_post_res = Required<operations["saveUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

/** 获取类目所有工种 - get请求参数 */
export type _v1_bc_company_workerType_commuteList_get_req = Required<operations["commuteListUsingGET"]>['parameters']['query']
/** 获取类目所有工种 - get响应参数 */
export type _v1_bc_company_workerType_commuteList_get_res = Required<operations["commuteListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 根据行业获取工种 - get请求参数 */
export type _v1_bc_server_workerType_getCertificateList_get_req = Required<operations["getCertificateListUsingGET"]>['parameters']['query']
/** 根据行业获取工种 - get响应参数 */
export type _v1_bc_server_workerType_getCertificateList_get_res = Required<operations["getCertificateListUsingGET"]>['responses'][200]['content']['*/*']['data']

