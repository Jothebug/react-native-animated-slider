#include <jni.h>
#include "react-native-animated-slider.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_animatedslider_AnimatedSliderModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return animatedslider::multiply(a, b);
}
