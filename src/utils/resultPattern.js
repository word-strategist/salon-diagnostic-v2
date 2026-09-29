import { QUESTIONS } from '../data/questions.js'
import {
  ANSWER_FACT_LABELS,
  PATTERN_COPY,
} from '../data/patternCopy.js'

/* =========================
   第5回 診断結果パターン
   Q番号は1始まり、answers の位置は0始まり
========================= */

export const RESULT_VERSION = 5

export const PATTERN_KEYS = ['01', '02', '03', '04', '05', '06']

// 上から順に判定し、最初に一致したものを採用する。Q10（answers[9]）は使わない
export function determinePattern(answers) {
  const [q1, q2, q3, q4, , q6] = answers

  if (q1 === 0 && q2 === 0) return '01'
  if (q3 === 1) return '02'
  if (q6 === 0) return '03'
  if (q4 === 1 || q4 === 2) return '04'
  if (q4 === 0 && q3 === 0) return '05'
  return '06'
}

// 結果表示・再訪問時の再現に必要な回答だけを保存する
export function pickResultAnswers(answers) {
  return {
    q1: answers[0],
    q2: answers[1],
    q3: answers[2],
    q4: answers[3],
    q6: answers[5],
    q10: answers[9],
  }
}

export function isCurrentResult(result) {
  return Boolean(
    result &&
      result.version === RESULT_VERSION &&
      PATTERN_KEYS.includes(result.pattern) &&
      result.answers
  )
}

/* =========================
   表示用の文言を組み立てる
========================= */

function resolve(value, answers) {
  if (value && typeof value === 'object' && value.by) {
    return value.variants[answers[value.by]] ?? null
  }

  return value ?? null
}

function getOptionText(questionIndex, answerIndex) {
  return QUESTIONS[questionIndex]?.options[answerIndex] ?? ''
}

export function buildResultContent(result) {
  const copy = PATTERN_COPY[result.pattern]
  if (!copy) return null

  const { answers } = result

  return {
    pattern: result.pattern,
    name: copy.name,
    lead: resolve(copy.lead, answers),
    facts: [
      { label: ANSWER_FACT_LABELS.q3, text: getOptionText(2, answers.q3) },
      { label: ANSWER_FACT_LABELS.q4, text: getOptionText(3, answers.q4) },
      { label: ANSWER_FACT_LABELS.q6, text: getOptionText(5, answers.q6) },
    ],
    points: copy.points.map((point) => resolve(point, answers)),
    priority: resolve(copy.priority, answers),
    outcome: resolve(copy.outcome, answers),
    // Q10で選んだ「今のサロンに最も必要なもの」（案内の見出しで引用）
    wishText: getOptionText(9, answers.q10),
  }
}
