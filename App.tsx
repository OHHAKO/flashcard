import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AnimatedCard} from './src/components/Card';
import {words} from './src/data/words';
import Button from './src/components/Button';
import {NestedCard} from './src/components/NestedCard';
import {Deck} from './src/deck';

type SectionProps = PropsWithChildren<{
  title?: string;
  style?: StyleProp<ViewStyle>;
}>;

function Section({children, title, style}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.sectionContainer, style]}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const POS_Y = 40;

function App(): React.JSX.Element {
  const [deck, setDeck] = useState<Deck>(Deck.fromWords(words));
  const [flipped, setFlipped] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';

  const cardPosY = new Animated.Value(0);
  const frontCardOpacity = new Animated.Value(1);
  const backCardOpacity = new Animated.Value(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onNext = (correct: boolean) => {
    deck.update(correct, Date.now());
    setDeck(deck);

    // 사라지기
    if (correct) {
      Animated.timing(frontCardOpacity, {
        toValue: 0,
        delay: 300,
        useNativeDriver: true,
        duration: 800,
      }).start(() => {
        setFlipped(false);
      });
    } else {
      Animated.sequence([
        Animated.timing(cardPosY, {
          toValue: -POS_Y,
          useNativeDriver: true,
        }),
        Animated.timing(frontCardOpacity, {
          toValue: 0,
          delay: 200,
          useNativeDriver: true,
          duration: 200,
        }),
        Animated.timing(backCardOpacity, {
          delay: 300,
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }),
        Animated.timing(cardPosY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(backCardOpacity, {
          toValue: 100,
          useNativeDriver: true,
          duration: 200,
        }),
      ]).start();
    }
  };

  const onPress = () => {
    setFlipped(prev => !prev);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Section title="FlashCard" style={{flexGrow: 1}}>
          <Text style={styles.highlight}>카드</Text>를 눌러서 단어 뜻을 확인해
          보세요.
        </Section>
        <View style={styles.content}>
          <View
            style={[
              {
                width: 320,
                height: 200,
              },
            ]}>
            <AnimatedCard
              word={deck.peek()}
              flipped={flipped}
              opacity={frontCardOpacity}
              posY={cardPosY}
              onPress={onPress}
              animatedStyle={{position: 'absolute', left: 0}}
            />

            <NestedCard
              count={2}
              backCardPosY={cardPosY}
              backCardOpacity={backCardOpacity}
            />
          </View>

          <View style={[styles.buttons, flipped && styles.appear]}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  sectionContainer: {
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  content: {
    flexGrow: 2,
    alignItems: 'center',
  },

  buttons: {
    marginTop: 16,
    flexDirection: 'row',
    width: '70%',
    gap: 10,
    opacity: 0,
  },

  appear: {
    opacity: 1,
  },
});

export default App;
