//
//  BuglyProxy.h
//  xm-tuyamodule
//
//  Created by Hu on 2022/4/8.
//

#import <Foundation/Foundation.h>
#import "DcUni/UniPluginProtocol.h"
#import "XmTuyaModule.h"
#import <ThingSmartHomeKit/ThingSmartKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface BuglyProxy : NSObject <UniPluginProtocol>
+(BOOL)initSDKResult;
@end

NS_ASSUME_NONNULL_END
