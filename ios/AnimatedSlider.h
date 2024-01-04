#ifdef __cplusplus
#import "react-native-animated-slider.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAnimatedSliderSpec.h"

@interface AnimatedSlider : NSObject <NativeAnimatedSliderSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AnimatedSlider : NSObject <RCTBridgeModule>
#endif

@end
