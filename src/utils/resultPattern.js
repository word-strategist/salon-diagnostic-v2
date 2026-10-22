import { QUESTIONS } from '../data/questions.js'
import {
  BRIDGE_COMMON,
  PATTERN_COPY,
} from '../data/patternCopy.js'
import { RESULT_VISUALS } from '../data/resultVisuals.js'

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
   表示用の文言を組み立てる（判定・案内先の決定には関与しない）
========================= */

function getOptionText(questionIndex, answerIndex) {
  return QUESTIONS[questionIndex]?.options[answerIndex] ?? ''
}

// ④あなたに合った進め方：パターン × type（Q10①〜④＝A〜D）の橋渡し文
function resolveBridge(copy, type) {
  const cell = copy.bridges?.[type]
  if (!cell) return null

  if (cell.common) {
    const common = BRIDGE_COMMON[cell.common]
    return common
      ? { kind: 'common', heading: common.heading, body: common.body }
      : null
  }

  return {
    kind: 'dedicated',
    heading: null,
    body: cell.text,
    pathHeading: cell.pathHeading ?? null,
    choiceBefore: cell.choiceBefore ?? null,
    choiceAfter: cell.choiceAfter ?? null,
    choiceQuote: cell.choiceQuote ?? null,
  }
}

// 写真枠・図解・強調（05・06の試作のみ。設定の無いパターンは null）
function resolveVisual(copy, pattern, variant) {
  const visual = RESULT_VISUALS[pattern]
  if (!visual) return null
  if (visual.variants && !visual.variants.includes(variant)) return null

  // 強調は②の段落と完全一致した場合だけ。文言変更で外れたら開発時に警告する
  const emphasis = visual.variantEmphasis?.[variant] ?? visual.emphasis
  const found =
    emphasis !== null && copy.why.split('\n\n').includes(emphasis)

  if (emphasis !== null && !found && import.meta.env?.DEV) {
    console.warn(`[resultVisuals] ${pattern} の強調文が②に見つかりません`)
  }

  return { ...visual, emphasis: found ? emphasis : null }
}

// 入口（variant）専用の文言があれば上書きする（bridges はセル単位）
function resolveCopy(pattern, variant) {
  const base = PATTERN_COPY[pattern]
  const override = base?.variantCopy?.[variant]
  if (!override) return base

  return {
    ...base,
    ...override,
    bridges: { ...base.bridges, ...override.bridges },
  }
}

export function buildResultContent(result, variant = null) {
  const copy = resolveCopy(result.pattern, variant)
  if (!copy) return null

  return {
    pattern: result.pattern,
    name: copy.name,
    result: copy.result,
    whyHeading: copy.whyHeading ?? null,
    why: copy.why,
    need: copy.need,
    bridge: resolveBridge(copy, result.type),
    // Q10で選んだ回答（④で「あなたが選んだのは…」として引用）
    wishText: getOptionText(9, result.answers?.q10),
    visual: resolveVisual(copy, result.pattern, variant),
  }
}
