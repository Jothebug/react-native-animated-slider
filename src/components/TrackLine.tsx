import { View } from 'react-native';
import React, { memo } from 'react';
import type { CalculatedProps, SliderConfigs } from '../types';
import { StyleSheet } from 'react-native';
import Node from './Node';

export type TrackLineProps = SliderConfigs & CalculatedProps;

const TrackLine = ({
  numSteps,
  nodeWidth,
  pathWidth,
  translateX,
  pathHeight,
  nodeStyleProps,
  minValue,
  maxValue,
  stepCost,
  circleSize,
  thumbSize,
}: TrackLineProps) => {
  return (
    <View style={styles.container}>
      {Array(numSteps)
        .fill('_')
        .map((_, index) => {
          const firstNode = index === 0;
          const lastNode = index === numSteps - 1;
          return (
            <Node
              key={index}
              index={index}
              firstNode={firstNode}
              lastNode={lastNode}
              nodeWidth={nodeWidth}
              pathWidth={pathWidth}
              translateX={translateX}
              pathHeight={pathHeight}
              nodeStyleProps={nodeStyleProps}
              minValue={minValue}
              maxValue={maxValue}
              stepCost={stepCost}
              circleSize={circleSize}
              thumbSize={thumbSize}
              numSteps={numSteps}
            />
          );
        })}
    </View>
  );
};

export default memo(TrackLine);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
