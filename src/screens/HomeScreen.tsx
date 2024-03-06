import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import {NestedCard} from '../components/NestedCard';
import {AnimatedCard} from '../components/Card';
import useCardAnimation from '../hooks/useCardAnimation';
import {STORAGE_KEY, storage} from '../storage';
import {Deck} from '../deck';
import {words} from '../data/words';
import {Section} from '../components/Section';
import ScreenContainer from '../components/ScreenContainer';

export default function HomeScreen() {
  const [deck, setDeck] = useState<Deck | undefined>();
  const [flipped, setFlipped] = useState<boolean>(false);
  const {frontCard, backCard, animateFrontCard, animateBothEndsCard} =
    useCardAnimation();

  const onNext = (correct: boolean) => {
    if (!deck) {
      return;
    }

    deck.update(correct, Date.now());
    setDeck(deck);
    storage.set(STORAGE_KEY.deck, deck?.saveJson());

    if (correct) {
      animateFrontCard(() => setFlipped(false));
    } else {
      animateBothEndsCard(() => setFlipped(false));
    }
  };

  const onPress = () => {
    setFlipped(prev => !prev);
  };

  useEffect(() => {
    const jsonItem = storage.getString(STORAGE_KEY.deck);
    setDeck(jsonItem ? Deck.fromJson(jsonItem) : Deck.fromWords(words));
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Section title="FlashCard" style={{flexGrow: 1}}>
          <Text style={styles.highlight}>카드</Text>를 눌러서 단어 뜻을 확인해
          보세요.
        </Section>
        <View style={styles.content}>
          <View style={styles.cardSection}>
            <AnimatedCard
              word={deck?.peek()}
              flipped={flipped}
              onPress={onPress}
              animatedStyle={{
                position: 'absolute',
                left: 0,
                transform: [{translateY: frontCard.posY}],
                opacity: frontCard.opacity,
              }}
            />

            <NestedCard
              count={2}
              lastCardAnimatedStyle={{
                transform: [{translateY: backCard.posY}],
                opacity: backCard.opacity,
              }}
            />
          </View>

          {flipped ? (
            <View style={styles.buttonSection}>
              <View style={styles.buttons}>
                <Button
                  title="외웠음"
                  style={{backgroundColor: 'forestgreen'}}
                  onPress={() => onNext(true)}
                />
                <Button
                  title="못외웠음"
                  style={{backgroundColor: 'indianred'}}
                  onPress={() => onNext(false)}
                />
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </ScreenContainer>
  );
}

const BOTTOM = 12;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  highlight: {
    fontWeight: '700',
  },

  content: {
    position: 'relative',
    flexGrow: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  cardSection: {
    width: 320,
    height: 400,
    bottom: BOTTOM + 66,
  },

  buttonSection: {
    position: 'absolute',
    bottom: BOTTOM,
    width: '100%',
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});
