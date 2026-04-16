import {
  calculateScores,
  determineFinalLevel,
  determineType,
} from '../data/scoring';

export function calcResult(answers) {
  const { p1, p2, p3 } = calculateScores(answers);

  const level = determineFinalLevel(p1, p2, p3);

  let type = determineType(answers[9]);
  if (level === 3 && type === 'D') type = 'C';

  return { level, type };
}