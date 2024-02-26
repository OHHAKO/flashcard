import React from 'react';
import {Animated, ViewStyle} from 'react-native';
import Card, {AnimatedCard} from './Card';

type Props = {
  count: number;
  backCardPosY: Animated.Value;
  backCardOpacity: Animated.Value;
};

export function NestedCard({
  count,
  backCardPosY,
  backCardOpacity,
}: Props): React.JSX.Element[] {
  const stackedCards = new Array(count)
    .fill(null)
    .map((e, index) => (
      <Card key={index} style={styles(index)} flipped={false} />
    ));

  const backCard = (
    <AnimatedCard
      key={count}
      animatedStyle={styles(count)}
      opacity={backCardOpacity}
      posY={backCardPosY}
      flipped={false}
    />
  );

  stackedCards.push(backCard);

  return stackedCards;
}

const STACK_GAP = 4;

const styles = (index: number): ViewStyle => ({
  position: 'absolute',
  top: -(STACK_GAP * index) - STACK_GAP,
  left: STACK_GAP * index + STACK_GAP,
  zIndex: -(index + STACK_GAP),
});
