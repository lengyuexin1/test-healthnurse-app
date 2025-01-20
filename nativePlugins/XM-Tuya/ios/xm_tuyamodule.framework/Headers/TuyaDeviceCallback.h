//
//  TuyaDeviceCallback.h
//  xm-tuyamodule
//
//  Created by Hu on 2022/4/10.
//

#import <Foundation/Foundation.h>
#import "DCUni/DCUniModule.h"
#import <ThingSmartHomeKit/ThingSmartKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface TuyaDeviceCallback : NSObject {
@public
    UniModuleKeepAliveCallback callback;
    ThingSmartDevice *device;
}

@property (nonatomic, strong) UniModuleKeepAliveCallback dpsCallback;
@property (nonatomic, strong) UniModuleKeepAliveCallback updateCallback;
@property (nonatomic, strong) ThingSmartDevice *device;

- (instancetype)dpsDevice:(NSString *)devId dpsCallback:(UniModuleKeepAliveCallback) initCallback;
- (instancetype)updateDevice:(NSString *)devId updateCallback:(UniModuleKeepAliveCallback) initCallback;
- (void)onDestroy;
@end

NS_ASSUME_NONNULL_END
