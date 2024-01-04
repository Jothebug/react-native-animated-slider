import { View } from 'react-native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderConfigs } from './types';
import { SCREEN_WIDTH, getIndex, getValue } from './utils';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { TrackLine } from './components';

const Slider = ({
  name,
  onChange,
  initialValue,
  // slider configs
  numSteps = 12,
  stepCost = 1,
  maxValue = 15,
  minValue = 0,
  circleSize = 10,
  thumbSize = 16,
  pathHeight = 3,
  marginHorizontal = 25,
  thumbStyleProps,
  sliderContainerStyle,
  nodeStyleProps = {
    inactiveColor: '#143136',
    activeColor: '#FA8167',
    valueStyle: undefined,
  },
}: SliderConfigs) => {
  const sliderWidth = SCREEN_WIDTH - marginHorizontal * 2;
  const nodeWidth = sliderWidth / numSteps;
  const pathWidth = nodeWidth - circleSize;
  const thumbRadius = thumbSize / 2;
  const numIndices = numSteps - 1;

  const translateX = useSharedValue(circleSize);
  const indexChange = useSharedValue(initialValue);

  const currentTranslateX = useSharedValue(translateX.value);
  const thumbSliderStyle = {
    ...thumbStyleProps,
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize,
    backgroundColor: '#fff',
    borderColor: '#FA8167',
    borderWidth: 2,
  };

  const thumbAnimStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
      left: -thumbRadius,
    }),
    []
  );

  const containerStyle = {
    width: sliderWidth,
    height: thumbSize,
    backgroundColor: 'red',
  };

  const gesture = useMemo(() => {
    const slideGesture = Gesture.Pan()
      .hitSlop(10)
      .maxPointers(1)
      .minPointers(1)
      .onUpdate((e) => {
        const est = e.translationX + currentTranslateX.value;
        const newIndex = getIndex(Math.round(est / nodeWidth), 0, numIndices);
        let newTranslateX = newIndex * nodeWidth + circleSize;
        // diểm đầu slider
        if (newIndex === 0) {
          newTranslateX = thumbRadius;
        }
        // điểm cuối slider
        if (newIndex === numIndices) {
          newTranslateX = sliderWidth - circleSize;
        }
        translateX.value = newTranslateX;
      })
      .onEnd(() => {
        const finalIndex = getIndex(
          Math.round(translateX.value / nodeWidth),
          0,
          numIndices
        );
        if (onChange && finalIndex !== indexChange.value) {
          let value = getValue(finalIndex, stepCost);
          if (indexChange.value === numIndices) {
            value = maxValue;
          }
          runOnJS(onChange)({ name, value });
          indexChange.value = finalIndex;
        }
        currentTranslateX.value = translateX.value;
      });

    const singleTap = Gesture.Tap()
      .hitSlop(10)
      .numberOfTaps(1)
      .onStart((e) => {
        const newIndex = getIndex(Math.floor(e.x / nodeWidth), 0, numIndices);
        let newTranslateX = newIndex * nodeWidth + circleSize;
        if (newIndex === 0) {
          newTranslateX = thumbRadius;
        }
        if (newIndex === numIndices) {
          newTranslateX = sliderWidth - circleSize;
        }
        translateX.value = newTranslateX;
        currentTranslateX.value = newTranslateX;
        if (onChange && indexChange.value !== newIndex) {
          let value = newIndex * stepCost;
          if (newIndex === numIndices) {
            value = maxValue;
          }
          runOnJS(onChange)({ name, value });
          indexChange.value = newIndex;
        }
      });

    return Gesture.Simultaneous(slideGesture, singleTap);
  }, [
    currentTranslateX,
    nodeWidth,
    numIndices,
    circleSize,
    translateX,
    thumbRadius,
    sliderWidth,
    onChange,
    indexChange,
    stepCost,
    name,
    maxValue,
  ]);

  return (
    <GestureDetector gesture={gesture}>
      <View style={[containerStyle, sliderContainerStyle]}>
        <TrackLine
          numSteps={numSteps}
          nodeWidth={nodeWidth}
          sliderWidth={sliderWidth}
          pathWidth={pathWidth}
          translateX={translateX}
          pathHeight={pathHeight}
          nodeStyleProps={nodeStyleProps}
          minValue={minValue}
          maxValue={maxValue}
          stepCost={stepCost}
          circleSize={circleSize}
          thumbSize={thumbSize}
        />
        <View style={styles.absoluteThumbContainer}>
          <Animated.View style={[thumbSliderStyle, thumbAnimStyle]} />
        </View>
      </View>
    </GestureDetector>
  );
};

export default Slider;

const styles = StyleSheet.create({
  absoluteThumbContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
