import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export default function Card({title, onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
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
    alignSelf: 'center',
    minWidth: 230,
    minHeight: 130,
    marginVertical: 100,
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
