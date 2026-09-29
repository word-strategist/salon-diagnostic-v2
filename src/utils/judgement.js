import {
  calculateScores,
  determineFinalLevel,
  determineType,
} from '../data/scoring.js';
import {
  RESULT_VERSION,
  determinePattern,
  pickResultAnswers,
} from './resultPattern.js';

// level：p1〜p3の採点結果（保存・計測用。画面には表示しない）
// type：Q10の回答（A〜D）。案内先の決定に使う
// pattern：Q1・Q2・Q3・Q4・Q6による診断結果（01〜06）。Q10は使わない
export function calcResult(answers) {
  const { p1, p2, p3 } = calculateScores(answers);

  const level = determineFinalLevel(p1, p2, p3);
  const type = determineType(answers[9]);
  const pattern = determinePattern(answers);

  return {
    version: RESULT_VERSION,
    level,
    type,
    pattern,
    answers: pickResultAnswers(answers),
  };
}
