import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
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
import Card from './src/components/Card';
import {words} from './src/data/words';
import Button from './src/components/Button';
import {NestedCard} from './src/components/NestedCard';

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

function App(): React.JSX.Element {
  const [step, setStep] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPressCorrect = () => {
    const isLast = words.length === step + 1;
    if (isLast) {
      Alert.alert(
        '모두 외웠습니다!\n더 외울 카드가 없어요. 처음으로 돌아갑니다.',
      );
      setStep(0);
      setFlipped(false);
      return;
    }

    setStep(e => e + 1);

    setFlipped(false);
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
          <View>
            <Card
              onPress={onPress}
              title={flipped ? words[step].ko : words[step].en}
            />
            <NestedCard count={2} />
          </View>

          <View style={[styles.buttons, flipped && styles.appear]}>
            <Button
              title="외웠음"
              style={{backgroundColor: 'forestgreen'}}
              onPress={onPressCorrect}
            />
            <Button
              title="못외웠음"
              style={{backgroundColor: 'indianred'}}
              onPress={() => console.log('틀렸어요 click')}
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
