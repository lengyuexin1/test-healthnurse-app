#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "BuglyProxy.h"
#import "TuyaDeviceCallback.h"
#import "XmConfigModule.h"
#import "XmHomeModule.h"
#import "XmTuyaModule.h"
#import "XmUserModule.h"

FOUNDATION_EXPORT double xm_tuyamoduleVersionNumber;
FOUNDATION_EXPORT const unsigned char xm_tuyamoduleVersionString[];

