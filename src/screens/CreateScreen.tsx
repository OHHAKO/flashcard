import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import {Section} from '../components/Section';
import Input from '../components/Input';
import {AnimatedCard} from '../components/Card';

export default function CreateScreen() {
  const [enText, setEnText] = useState<string>('');
  const [koText, setKoText] = useState<string>('');

  const onPress = () => {
    // 1. deck에 넣기
    // storage.set(STORAGE_KEY.deck, deck?.saveJson());
    // 2. input 비우기
    // 3. 성공했다고 알려주기
    // 4. 애니메이션
  };

  return (
    <ScreenContainer style={styles.container}>
      <Section title="새로운 카드 만들기" style={{paddingHorizontal: 16}} />

      <View style={styles.content}>
        <AnimatedCard
          word={{en: enText, ko: koText}}
          flipped={false}
          style={styles.card}
        />
        <View>
          <Text style={styles.label}>외울 영단어</Text>
          <Input
            style={styles.input}
            value={enText}
            onChange={e => setEnText(e.nativeEvent.text)}
          />
          <Text style={[styles.label, {marginTop: 16}]}>한글 뜻</Text>
          <Input
            style={styles.input}
            value={koText}
            onChange={e => setKoText(e.nativeEvent.text)}
          />

          <View style={styles.buttonArea}>
            <Button title="만들기" onPress={onPress} />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },

  card: {
    alignSelf: 'center',
    width: 200,
  },

  label: {
    marginVertical: 8,
    fontSize: 18,
  },

  input: {
    fontSize: 18,
  },

  buttonArea: {
    marginVertical: 14,
  },
});
