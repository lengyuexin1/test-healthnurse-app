//
//  XmUserModule.h
//  XmTuya
//
//  Created by Hu on 2022/2/24.
//

#import <Foundation/Foundation.h>
#import "DcUni/DCUniModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface XmUserModule : DCUniModule
@property (nonatomic, strong) UniModuleKeepAliveCallback onNeedLoginBack;
@end

NS_ASSUME_NONNULL_END
