import { Dimensions } from 'react-native';

function getIndex(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

function getValue(index: number, stepCost: number) {
  'worklet';
  return index * stepCost;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export { SCREEN_WIDTH, getIndex, getValue };
