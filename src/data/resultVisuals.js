/* =========================
   第5回 結果ページ 写真枠・図解・強調（05・06のローカル試作）
   2026/10/14 試作承認。共通UIとしての正式採用は未承認。

   ・ここに無いパターン（01〜04）は、写真枠・図解・強調を表示しない。
   ・写真は 2:1・中央トリミングで表示（2026/10/14 B案承認）。
     src が null の間は「写真（仮）」の枠を表示する。
     表示用は WebP（860×573・品質96）。承認済みのPNG原本（1536×1024）は
     build対象外の design-assets/result/ に保持し、画面では使用しない。
   ・diagram.kind：'flow'（順に進む流れ）／'aspects'（同等に並ぶ観点）
     items は図解のラベルのみ。見出し・説明文は付けない。
   ・emphasis：②なぜこの結果なのか の段落と完全一致する一文。
     文言は patternCopy.js を正とし、一致しない場合は強調しない（開発時に警告）。
========================= */

// 業種を限定しない美容サロンオーナーの日常写真（05・06共通）
const PHOTO_OWNER_DAILY =
  '/images/result/a_bright_warm_softly_lit_interior_scene_wide_h_860w.webp'

// variants：表示する入口を限定する場合のみ指定（未指定は入口を問わない）
// variantEmphasis.{入口}：その入口だけ強調文を差し替える場合に指定
// 01〜04：2026/10/21 写真の仮設置（比較試作・b5bのみ。05・06と同じ写真）
const PHOTO_TRIAL_B5B = {
  photo: { src: PHOTO_OWNER_DAILY },
  diagram: null,
  emphasis: null,
  variants: ['b5b'],
}

export const RESULT_VISUALS = {
  '01': PHOTO_TRIAL_B5B,
  '02': PHOTO_TRIAL_B5B,
  '03': PHOTO_TRIAL_B5B,
  '04': PHOTO_TRIAL_B5B,

  '05': {
    photo: { src: PHOTO_OWNER_DAILY },
    diagram: { kind: 'flow', items: ['投稿', '興味', '予約'] },
    emphasis: '発信を見たお客さまが、予約するまでのどこかで迷っている可能性があります。',
    // b5bの試作文章（patternCopy.js の variantCopy.b5b）に合わせた強調文
    variantEmphasis: {
      b5b: 'あなたの発信に興味を持ったお客さまは、迷わず予約まで進めるでしょうか。',
    },
  },

  '06': {
    photo: { src: PHOTO_OWNER_DAILY },
    diagram: { kind: 'aspects', items: ['客数', '客単価', '来店頻度'] },
    emphasis: null,
  },
}
