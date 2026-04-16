export function calculateScores(answers) {
  let p1 = 0, p2 = 0, p3 = 0;

  // Q1: 開業年数
  if (answers[0] === 0) p1 += 2;
  else if (answers[0] === 1) p2 += 2;
  else if (answers[0] === 2) p3 += 2;

  // Q2: 月商（正式版）
  if (answers[1] === 0) p1 += 2;
  else if (answers[1] === 1) p1 += 1;
  else if (answers[1] === 2) p2 += 1;
  else if (answers[1] === 3) p2 += 2;
  else if (answers[1] === 4) p3 += 2;

  // Q3: 悩み
  if (answers[2] === 0) p1 += 2;
  else if (answers[2] === 1) p2 += 2;
  else if (answers[2] === 2) p3 += 2;

  // Q4: SNS運用（選択肢順序が逆）
  if (answers[3] === 0) p3 += 2;
  else if (answers[3] === 1) p2 += 2;
  else if (answers[3] === 2) p1 += 2;

  // Q5: サロン体制
  if (answers[4] === 0) p1 += 2;
  else if (answers[4] === 1) p2 += 2;
  else if (answers[4] === 2) p3 += 2;

  // Q6: ホットペッパー依存度
  if (answers[5] === 0) p1 += 2;
  else if (answers[5] === 1) p2 += 2;
  else if (answers[5] === 2) p3 += 2;

  // Q7: 行動特性（全選択肢で全レベル+1）
  p1 += 1;
  p2 += 1;
  p3 += 1;

  // Q8: 投資経験
  if (answers[7] === 0) p1 += 2;
  else if (answers[7] === 1) p2 += 2;
  else if (answers[7] === 2) p3 += 2;

  // Q9: 3ヶ月後の理想
  if (answers[8] === 0) p1 += 2;
  else if (answers[8] === 1) p2 += 2;
  else if (answers[8] === 2) p3 += 2;

  return { p1, p2, p3 };
}

export function determineFinalLevel(p1, p2, p3) {
  const max = Math.max(p1, p2, p3);
  const l1 = p1 === max;
  const l2 = p2 === max;
  const l3 = p3 === max;

  if (l1 && l2 && !l3) return 1;
  if (l2 && l3 && !l1) return 2;
  if (l1 && l3 && !l2) return 1;
  if (l1 && l2 && l3) return 1;

  if (l1) return 1;
  if (l2) return 2;
  if (l3) return 3;

  return 1;
}

export function determineType(answerIndex) {
  const typeMap = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
  };

  return typeMap[answerIndex] ?? 'A';
}