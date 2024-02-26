import React from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Word} from '../data/words';

type Props = {
  word?: Word;
  flipped: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function Card({word, style, flipped, onPress}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, style]}
      disabled={!onPress}>
      {({pressed}) => (
        <>
          {pressed && <View style={styles.dim} />}
          <Text style={styles.cardWord}>{flipped ? word?.ko : word?.en}</Text>
        </>
      )}
    </Pressable>
  );
}

type AnimatedProps = {
  posY: Animated.Value;
  opacity: Animated.Value;
  animatedStyle?: ViewStyle;
} & Props;

export function AnimatedCard(props: AnimatedProps) {
  return (
    <Animated.View
      style={[
        {
          transform: [{translateY: props.posY}],
          opacity: props.opacity,
        },
        props.animatedStyle,
      ]}>
      <Card {...props} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 320,
    height: 200,
    borderColor: 'black',
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  cardWord: {
    fontSize: 42,
    textAlign: 'center',
  },
  dim: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.2,
  },
});
