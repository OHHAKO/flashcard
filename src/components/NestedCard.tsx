import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Card from './Card';

const stackGap = 3;

export function NestedCard({count}: {count: number}): React.JSX.Element[] {
  const stackedCards = new Array(count).fill(null);

  const stackStyle = (index: number): ViewStyle => ({
    top: -(stackGap * index),
    left: stackGap * index,
    zIndex: -index,
  });

  return stackedCards.map((e, index) => (
    <Card key={index} style={[styles.nestedCard, stackStyle(index + 1)]} />
  ));
}

const styles = StyleSheet.create({
  nestedCard: {
    position: 'absolute',
  },
});
