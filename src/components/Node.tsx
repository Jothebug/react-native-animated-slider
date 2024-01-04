import { View } from 'react-native';
import React, { memo } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { AnimatedValue } from './AnimatedValue';
import type { TrackLineProps } from './TrackLine';

interface NodeProps extends TrackLineProps {
  index: number;
  firstNode: boolean;
  lastNode: boolean;
}

const Node = ({
  index,
  firstNode,
  lastNode,
  circleSize,
  pathHeight,
  pathWidth,
  nodeWidth = 0,
  translateX,
  nodeStyleProps,
  minValue,
  maxValue,
  stepCost = 1,
  thumbSize,
}: NodeProps) => {
  const nodePosition = useSharedValue(index * nodeWidth);
  const progressColor = useDerivedValue(() =>
    translateX.value >= nodePosition.value ? 1 : 0
  );
  const circleIcon = {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize,
  };
  const reactLine = {
    width: pathWidth,
    height: pathHeight,
  };
  const valueContainer = {
    marginTop: thumbSize,
    right: circleSize,
  };

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progressColor.value,
      [0, 1],
      [nodeStyleProps.inactiveColor, nodeStyleProps.activeColor]
    ),
  }));

  const valueAnimatedStyle = useAnimatedStyle(() => ({
    opacity:
      parseFloat(`${translateX.value - circleSize}`).toFixed(2) ===
      parseFloat(`${nodePosition.value}`).toFixed(2)
        ? 1
        : 0,
  }));
  return (
    <>
      <View style={styles.trackCard}>
        {!firstNode && (
          <Animated.View style={[reactLine, trackAnimatedStyle]} />
        )}
        <Animated.View style={[circleIcon, trackAnimatedStyle]} />
      </View>
      <View style={valueContainer}>
        {firstNode && (
          <AnimatedValue
            value={minValue}
            valueStyle={nodeStyleProps?.valueStyle}
          />
        )}
        {lastNode && (
          <AnimatedValue
            value={maxValue}
            valueStyle={nodeStyleProps?.valueStyle}
          />
        )}
        {!lastNode && !firstNode && (
          <AnimatedValue
            value={index * stepCost}
            animatedStyle={valueAnimatedStyle}
            valueStyle={nodeStyleProps?.valueStyle}
          />
        )}
      </View>
    </>
  );
};

export default memo(Node);

const styles = StyleSheet.create({
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
