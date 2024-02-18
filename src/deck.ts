/** https://github.com/OHHAKO/flashcard/issues/4 완료하기 전에 쓸 임시 코드. */

/** 개별 카드 */
type Card = {
  en: string;
  ko: string;
};

/** 다음에 보여줄 카드를 가져온다. 더이상 외울 게 없으면 null을 반환. */
export function getNextCard(): Card | null {
  return null;
}
