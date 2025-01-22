//
//  XmTuya.h
//  XmTuya
//
//  Created by Hu on 2022/2/24.
//

#import <Foundation/Foundation.h>
#import "DcUni/DCUniModule.h"
#import "MJExtension.h"

NS_ASSUME_NONNULL_BEGIN

@interface XmTuyaModule : DCUniModule
+ (BOOL)isBlankString:(NSString *)string;
+(void) invoke2Web:(UniModuleKeepAliveCallback)callback success:(BOOL)success errMsg:(NSString*) errMsg;
+(void) invoke2Web:(UniModuleKeepAliveCallback)callback success:(BOOL)success errMsg:(NSString*) errMsg data:(NSObject*) data;
+(void) invokeAndKeepAlive2Web:(UniModuleKeepAliveCallback)callback success:(BOOL)success errMsg:(NSString*) errMsg;
+(void) invokeAndKeepAlive2Web:(UniModuleKeepAliveCallback)callback success:(BOOL)success errMsg:(NSString*) errMsg data:(NSObject*) data;
+(void) returnFailedCallback:(UniModuleKeepAliveCallback)callback error:(NSError *_Nullable)error;
+(void) returnSuccessCallback:(UniModuleKeepAliveCallback)callback data:(NSObject *_Nullable)data;
+(void) returnFailedCallbackWithKeep:(UniModuleKeepAliveCallback)callback error:(NSError *_Nullable)error;
+(void) returnSuccessCallbackWithKeep:(UniModuleKeepAliveCallback)callback data:(NSObject *_Nullable)data;
+(NSDictionary *)buildReturnData:(BOOL)success errMsg:(NSString*) errMsg data:(NSObject*) data;
@end

NS_ASSUME_NONNULL_END
