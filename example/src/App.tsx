import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from 'react-native-animated-slider';

const App = () => {
  const nodeStyleProps = {
    inactiveColor: '#143136',
    activeColor: '#FA8167',
    valueStyle: undefined,
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <SafeAreaView style={styles.container}>
        <Slider
          circleSize={10}
          numSteps={12}
          nodeStyleProps={nodeStyleProps}
          stepCost={1}
          marginHorizontal={25}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  gestureHandler: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
  },
});
