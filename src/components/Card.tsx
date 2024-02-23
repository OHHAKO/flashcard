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

type Props = {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Card({title, style, onPress}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, style]}
      disabled={!onPress}>
      {({pressed}) => (
        <>
          {pressed && <View style={styles.dim} />}
          <Text style={styles.cardWord}>{title}</Text>
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
