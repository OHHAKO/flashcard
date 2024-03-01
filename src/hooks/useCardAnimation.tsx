import {Animated} from 'react-native';

const SLIDE_OFFSET = 40;

export default function useCardAnimation() {
  const frontCard = {
    posY: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };

  const backCard = {
    posY: new Animated.Value(-SLIDE_OFFSET),
    opacity: new Animated.Value(0),
  };

  const animateFrontCard = (endCallback: () => void) => {
    Animated.timing(frontCard.opacity, {
      toValue: 0,
      delay: 300,
      useNativeDriver: true,
      duration: 800,
    }).start(endCallback);
  };

  const animateBothEndsCard = (endCallback: () => void) => {
    const slideDuration = 200;

    Animated.sequence([
      Animated.timing(frontCard.posY, {
        toValue: -SLIDE_OFFSET,
        useNativeDriver: true,
        duration: slideDuration,
      }),
      Animated.timing(frontCard.opacity, {
        toValue: 0,
        delay: 200,
        useNativeDriver: true,
        duration: 200,
      }),
      Animated.timing(backCard.opacity, {
        delay: 300,
        toValue: 1,
        useNativeDriver: true,
        duration: 200,
      }),
      Animated.timing(backCard.posY, {
        toValue: 0,
        useNativeDriver: true,
        duration: slideDuration,
      }),
      Animated.timing(backCard.opacity, {
        toValue: 100,
        useNativeDriver: true,
        duration: 200,
      }),
    ]).start(endCallback);
  };

  return {
    frontCard,
    backCard,
    animateFrontCard,
    animateBothEndsCard,
  };
}
