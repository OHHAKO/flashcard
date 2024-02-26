import type {Word} from './data/words';
import {Heapq} from 'ts-heapq';

/** 덱에 담길 개별 엔트리 */
type QueueEntry = {
  word: Word; // 단어
  lastStudied: number; // 마지막으로 본 시간 (unix timestamp)
  memorized: boolean; // 외웠으면 true
};

export class Deck {
  /** 단어 목록으로부터 덱을 생성한다. */
  static fromWords(words: Word[]): Deck {
    // 단어 목록을 큐 엔트리로 변환한 후 덱을 생성한다.
    const entries = words.map((word, i) => ({
      word,
      lastStudied: i, // 마지막으로 본 시간을 인덱스로 초기화하여 처음에는 지정된 순서대로 나오도록 함
      memorized: false, // 못외운 상태로 초기화
    }));
    return new Deck(entries);
  }

  /** 저장된 덱 정보로부터 덱을 생성한다. */
  static fromJson(json: string): Deck {
    const entries = JSON.parse(json) as QueueEntry[];
    return new Deck(entries);
  }

  /** 단어들이 들어있는 우선순위 큐 */
  private readonly queue: Heapq<QueueEntry>;

  private constructor(entries: QueueEntry[]) {
    // 우선순위 큐를 만든다. 1) 못외운 카드 우선, 2) 마지막으로 본 시간이 오래된 카드 우선
    this.queue = new Heapq<QueueEntry>(entries, (a, b) => {
      if (!a.memorized && b.memorized) {
        return true;
      }
      if (a.memorized && !b.memorized) {
        return false;
      }
      return a.lastStudied < b.lastStudied;
    });
  }

  /** 다음 카드를 알려준다. 덱의 상태를 변경하지는 않는다. */
  peek(): Word {
    return this.queue.top().word;
  }

  /** 방금 본 카드를 외웠는지 여부를 갱신한다. */
  update(isMemorized: boolean, now: number): void {
    const entry = this.queue.pop();
    const newEntry = {
      ...entry,
      memorized: isMemorized,
      lastStudied: now,
    };
    this.queue.push(newEntry);
  }

  /** 덱 상태를 JSON으로 내보낸다. */
  saveJson(): string {
    return JSON.stringify(this.queue.heap);
  }

  size(): number {
    return this.queue.length();
  }
}
