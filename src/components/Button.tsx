import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};
export default function Button({title, style, onPress}: Props) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      {({pressed}) => (
        <Text style={[styles.buttonText, pressed && styles.pressed]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  pressed: {
    opacity: 0.5,
  },
});
