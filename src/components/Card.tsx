import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Card({title, style, onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, style]}>
      {({pressed}) => (
        <>
          {pressed && <View style={styles.dim} />}
          <Text style={styles.cardWord}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignContent: 'center',
    aspectRatio: '2/1',
    width: '90%',
    maxWidth: 400,
    maxHeight: 200,
    marginVertical: 20,
    borderColor: 'black',
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  cardWord: {
    fontSize: 24,
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
