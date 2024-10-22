import React, { useEffect, useRef } from 'react';
import { Image, View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';
import footPrints from '../../assets/splash-screen/footprints.png';
import isologotype from '../../assets/splash-screen/isologotipo.png';

const SplashScreen = ({ navigation }) => {
  // Crea un array de referencias para las animaciones
  const animatedValues = useRef(Array.from({ length: 8 }, () => new Animated.Value(0))).current;

  useEffect(() => {
    const startAnimations = () => {
      const animations = animatedValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 100,
          delay: index * 100,
          useNativeDriver: true,
        })
      );

      Animated.stagger(100, animations).start(() => {
        setTimeout(() => {
          navigation.replace('StartedScreen');
        }, 700);
      });
    };

    startAnimations();
  }, [navigation, animatedValues]);

  return (
    <View style={{ paddingTop: Constants.statusBarHeight, position: 'relative', flex: 1, backgroundColor: '#F3E9EC' }}>
      <View>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((optionNumber) => (
          <Animated.View
            style={[
              styles.foot,
              styles[`option${optionNumber}`],
              { opacity: animatedValues[optionNumber - 1] },
            ]}
            key={optionNumber}
          >
            <Image style={styles.image} source={footPrints} />
          </Animated.View>
        ))}
      </View>
      <View style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <Image style={{position: 'absolute', top: 476}} source={isologotype} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  foot: {
    position: 'absolute',
    left: 200,
  },
  image: {
    width: 40,  // Ajusta el tamaño de la imagen
    height: 40,
  },
  option1: {
    top: 209.26,
    left: -20,
  },
  option2: {
    top: 167.46,
    left: 19.1,
  },
  option3: {
    top: 128.36,
    left: 43.37,
  },
  option4: {
    top: 108.14,
    left: 91.91,
  },
  option5: {
    top: 85.21,
    left: 143.15,
  },
  option6: {
    top: 59.6,
    left: 192.69,
  },
  option7: {
    top: 20.49,
    left: 225.39,
  },
  option8: {
    top: -24,
    left: 252.36,
  },
});
