import { Text } from 'react-native';
import React, { memo } from 'react';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';

interface AnimatedValueProps {
  value?: number;
  animatedStyle?: AnimatedStyle<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

export const AnimatedValue = memo(
  ({ value, animatedStyle, valueStyle }: AnimatedValueProps) => {
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={[styles.text, valueStyle]}>{`${value}`}</Text>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  text: {
    color: '#000',
    fontSize: 12,
  },
});
