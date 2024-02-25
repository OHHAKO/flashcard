import {Word} from './data/words';
import {Deck} from './deck';

describe('덱', () => {
  const words: Word[] = [
    {en: 'dog', ko: '개'},
    {en: 'cat', ko: '고양이'},
    {en: 'flower', ko: '꽃'},
  ];

  it('덱의 크기는 처음에 준 단어의 수와 같아야 한다', () => {
    const deck = Deck.fromWords(words);
    expect(deck.size()).toBe(3);
  });

  it('단어를 순서대로 가져와야 한다', () => {
    const deck = Deck.fromWords(words);
    const now = Date.now();

    expect(deck.peek()).toEqual(words[0]);
    deck.update(false, now + 0);
    expect(deck.peek()).toEqual(words[1]);
    deck.update(false, now + 1);
    expect(deck.peek()).toEqual(words[2]);
    deck.update(false, now + 2);
    expect(deck.peek()).toEqual(words[0]);
  });

  it('외운 단어는 보여주지 않는다', () => {
    const deck = Deck.fromWords(words);
    const now = Date.now();

    // 첫번째 단어는 외웠고, 이후 두 개는 못 외웠다.
    deck.update(true, now + 0);
    deck.update(false, now + 1);
    deck.update(false, now + 2);
    // 다음 단어를 가져오면 이미 외운 words[0]이 아니라 words[1]이 나온다.
    expect(deck.peek()).toEqual(words[1]);
  });

  it('모든 단어를 외웠으면 가장 오래된 단어를 보여준다', () => {
    const deck = Deck.fromWords(words);
    const now = Date.now();

    // 모든 단어를 외웠다.
    deck.update(true, now + 0);
    deck.update(true, now + 1);
    deck.update(true, now + 2);

    // 다음 단어를 가져오면 words[0]
    expect(deck.peek()).toEqual(words[0]);
  });

  it('저장하고 불러오기', () => {
    const deck = Deck.fromWords(words);
    const now = Date.now();

    // 첫번째 단어를 외운걸로 표시.
    deck.update(true, now + 0);

    // 현재 덱을 JSON으로 덤프한 후 이걸로 새 덱을 만든다.
    const dump = deck.saveJson();
    const newDeck = Deck.fromJson(dump);

    // 새 덱의 다음 단어는 words[0]이 아니라 words[1]이어야 한다.
    expect(newDeck.peek()).toEqual(words[1]);
  });
});
