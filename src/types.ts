import type { ViewStyle } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type ThumbStyleProps = {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

export type NodeStyleProps = {
  valueStyle?: StyleProp<TextStyle>;
  inactiveColor: string;
  activeColor: string;
};

export type SliderStyleProps = {
  pathHeight?: number;
  circleSize: number;
  thumbSize?: number;
  marginHorizontal?: number;
  sliderContainerStyle?: StyleProp<ViewStyle>;
  thumbStyleProps?: ThumbStyleProps;
  nodeStyleProps: NodeStyleProps;
};

export type SliderConfigs = SliderStyleProps & {
  initialValue?: number;
  numSteps: number;
  stepCost: number;
  maxValue?: number;
  minValue?: number;
  name?: string;
  onChange?: (event: PressEvent) => void;
};

export type PressEvent = {
  name?: string;
  value?: number;
};

export type CalculatedProps = {
  sliderWidth?: number;
  nodeWidth?: number;
  pathWidth?: number;
  thumbRadius?: number;
  numIndices?: number;
  translateX: SharedValue<number>;
};
