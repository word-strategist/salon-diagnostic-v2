import { useEffect, useRef, useState } from 'react'
import { RESULTS } from '../data/results'
import { PRODUCTS } from '../data/products'
import { RESULT_PRODUCT_MAP } from '../data/resultMap'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import { CAMPAIGN_END_AT } from '../utils/campaign'
import ResultPageAView from './ResultPageAView'
import ResultPageBView from './ResultPageBView'

const RESULT_COPY = {
  '1-A': {
    CAUSE: `行動できないのは、
あなたの意志が弱いからではありません。

「何をすべきか」が
見えていないだけです。`,
    SOLUTION: `考えなくても投稿が動く仕組みがあれば、
あなたはお客様だけに向き合っていられます。

ホットペッパーがなくても
予約が入るサロンは、
そういう仕組みを持っています。`,
    URGENCY: `今日と同じ明日を繰り返すか、
仕組みに任せて動き始めるか。

その分岐点が、今です。`,
    PRE_CTA: `診断者限定で、
通常月額9,800円のツールを
1,980円でご案内しています。

「まず試してみる」
その一歩が、最も早い変化です。`,
  },

  '2-A': {
    CAUSE: `集客の入口が
ホットペッパー1本のままでは、
どれだけ頑張っても
売上の天井は変わりません。`,
    SOLUTION: `新しい集客の柱を
1本立てるだけで、
状況は大きく変わります。

インスタからの予約が入り始めたとき、
ホットペッパーへの依存は
自然と薄れていきます。`,
    URGENCY: `「いつかやろう」が
一番危ない先送りです。

動こうとしている今が、
始めどきです。`,
    PRE_CTA: `診断者限定で、
通常月額9,800円のツールを
1,980円でご案内しています。

あなたはすでに、
動く準備ができています。`,
  },

  '3-A': {
    CAUSE: `今の売上の天井は、
あなたの「時間の限界」です。

仕組みに任せることで、
その天井は外れます。`,
    SOLUTION: `投稿を自動化して、
あなたがいなくても
集客が動き続ける状態を作る。

それが次のフェーズです。`,
    URGENCY: `土台があるからこそ、
仕組みが最速で機能します。

今のあなたに、
このツールは最も効きます。`,
    PRE_CTA: `診断者限定で、
通常月額9,800円のツールを
1,980円でご案内しています。

仕組みを整えた先に、
時間を確保しながら
安定して集客できる状態があります。`,
  },

  '1-B': {
    CAUSE: `やり方が間違っているのではなく、
正しいやり方を
まだ知らないだけです。`,
    SOLUTION: `ホットペッパーには、
成果が出る使い方があります。

それを知った瞬間、
今まで払っていた掲載費が
「投資」に変わります。`,
    URGENCY: `知らないまま払い続けるか、
正しい使い方で結果を出すか。

その差は、
今日の選択で決まります。`,
    PRE_CTA: `診断者限定で、
通常10,000円のマニュアルを
4,980円でご案内しています。

同じ掲載費で、
結果が変わります。`,
  },

  '2-B': {
    CAUSE: `伸び悩みの多くは、
基礎のどこかに
小さな抜け漏れがあります。

それを埋めるだけで、
また動き始めます。`,
    SOLUTION: `基礎を一度整理することで、
今まで気づかなかった
伸びしろが見えてきます。

その一手で、
売上の天井が上がります。`,
    URGENCY: `伸び悩んでいる今が、
基礎を見直す最適なタイミングです。

動き続けている間は
なかなか立ち止まれません。`,
    PRE_CTA: `診断者限定で、
通常10,000円のマニュアルを
4,980円でご案内しています。

あと一手で、
また動き始めます。`,
  },

  '3-B': {
    CAUSE: `今の戦略は、
今のステージには合っています。

でも次のステージには、
次の戦略が必要です。`,
    SOLUTION: `差別化された戦略を持つことで、
価格競争から抜け出し、
選ばれ続けるサロンになれます。`,
    URGENCY: `土台があるからこそ、
上級戦略が最速で機能します。

今のあなただから、
活かせる内容があります。`,
    PRE_CTA: `診断者限定の特別価格で
ご案内しています。

次のステージへの投資として、
最も費用対効果が高い一手です。`,
  },

  '1-C': {
    CAUSE: `一人で考え続けても
答えが出ないのは、
あなたの考えが足りないからではありません。

外から整理する目線が
必要なだけです。`,
    SOLUTION: `今の状態を一度整理するだけで、
やることの優先順位が見えてきます。

「次にこれをやればいい」が分かった瞬間、
動き出せます。`,
    URGENCY: `一人で悩み続けた時間より、
プロと話した90分の方が
先を変えることがあります。

その90分が、今だけ無料です。`,
    PRE_CTA: `通常90分30,000円の診断会を、
診断者限定で無料でご案内しています。

「何から始めればいいか」
その答えを、一緒に見つけましょう。`,
  },

  '2-C': {
    CAUSE: `次が見えないのは、
戦略がないからではありません。

今の状態を
客観的に整理できていないだけです。`,
    SOLUTION: `現状を整理して、
次の戦略が見えた瞬間、
また動けるようになります。`,
    URGENCY: `立ち止まっている時間が長いほど、
動ける人との差が広がります。

今が、整理するタイミングです。`,
    PRE_CTA: `通常90分30,000円の診断会を、
診断者限定で無料でご案内しています。

次の一手が見えれば、
また動き出せます。`,
  },

  '3-C': {
    CAUSE: `経営判断の精度は、
一人で考えるより
外の視点を入れた方が上がります。`,
    SOLUTION: `今の状態を整理して、
次の経営判断に必要な視点を
一緒に作ります。`,
    URGENCY: `判断を先送りするほど、
機会は遠ざかります。

今の状態だからこそ、
話せることがあります。`,
    PRE_CTA: `通常90分30,000円の診断会を、
診断者限定で無料でご案内しています。

次の判断を、
一緒に整理しましょう。`,
  },

  '1-D': {
    CAUSE: `時間は待っていても
生まれません。

仕組みで作るものです。`,
    SOLUTION: `今、手作業でやっていることを
ChatGPTに任せることで、
集客に使える時間を作れます。`,
    URGENCY: `忙しいまま頑張り続けても、
売上の天井は変わりません。

時間を作る仕組みを、
今日から始めてください。`,
    PRE_CTA: `診断者限定で、
通常19,800円のマニュアルを
9,800円でご案内しています。

時間が戻れば、
できることが変わります。`,
  },

  '2-D': {
    CAUSE: `時間不足の多くは、
手放せる作業を
まだ手放していないことが原因です。`,
    SOLUTION: `自動化できることを任せることで、
あなたの時間は戦略に使えるようになります。`,
    URGENCY: `忙しさを続けることが
最大のリスクです。

今日、仕組みを手に入れてください。`,
    PRE_CTA: `診断者限定で、
通常19,800円のマニュアルを
9,800円でご案内しています。

時間を作った人だけが、
次のステージに行けます。`,
  },
}

const COMMON_COPY = {
  EXPIRED_LABEL: '受付終了',
  EXPIRED_TITLE: 'この診断は終了しました',
  EXPIRED_TEXT: '最新のご案内はLINEよりお受け取りください。',
  LINE_NOTE: '※LINEで最新のご案内を受け取れます',
}

function normalizeProductKeys(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
}

function getResultVariant() {
  const params = new URLSearchParams(window.location.search)
  const queryVariant = params.get('variant')?.toUpperCase()

  if (queryVariant === 'B' || queryVariant === 'B2') {
    localStorage.setItem('result_variant', 'B')
    return 'B'
  }

  if (queryVariant === 'A') {
    localStorage.setItem('result_variant', 'A')
    return 'A'
  }

  const savedVariant = localStorage.getItem('result_variant')
  if (savedVariant === 'A' || savedVariant === 'B') return savedVariant

  return 'A'
}

export default function ResultPage({ result }) {
  const key = `${result.level}-${result.type}`
  const data = RESULTS[key] ?? RESULTS['1-A']
  const copy = RESULT_COPY[key] || RESULT_COPY['1-A']

  const productKeys = normalizeProductKeys(
    RESULT_PRODUCT_MAP[key] ?? RESULT_PRODUCT_MAP['1-A']
  )

  const products = productKeys.map((k) => PRODUCTS[k]).filter(Boolean)
  const mainProduct = products[0]

  const campaignEnded = false
  const [isExpired, setIsExpired] = useState(false)

  const expiredOrEnded = false
  const expiredRedirectUrl = 'https://sendenhi-zero.com/line'
  const ctaUrl = expiredOrEnded ? expiredRedirectUrl : mainProduct?.url

  const ctaLabel = expiredOrEnded
    ? 'LINE登録してご案内を受け取る'
    : mainProduct?.cta ?? '詳細を見る'

  const ctaAreaRef = useRef(null)
  const hasLoggedCtaView = useRef(false)
  const variant = getResultVariant()

  useEffect(() => {
    sendTrackingEvent({
      event_type: 'result_view',
      session_id: getSessionId(),
      result_key: key,
      level: result.level,
      type: result.type,
      product_key: productKeys.join(','),
      answers: JSON.parse(localStorage.getItem('diagnosis_answers') || '[]'),
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [key, productKeys, result.level, result.type])

  useEffect(() => {
    if (!ctaAreaRef.current || !mainProduct || expiredOrEnded) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoggedCtaView.current) {
          hasLoggedCtaView.current = true

          sendTrackingEvent({
            event_type: 'cta_view',
            session_id: getSessionId(),
            result_key: key,
            level: result.level,
            type: result.type,
            product_key: productKeys.join(','),
            cta_url: ctaUrl || '',
            is_expired: expiredOrEnded,
            page_url: window.location.href,
            user_agent: navigator.userAgent,
          })
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ctaAreaRef.current)

    return () => observer.disconnect()
  }, [
    ctaUrl,
    expiredOrEnded,
    key,
    mainProduct,
    productKeys,
    result.level,
    result.type,
  ])

  const handleCtaClick = async () => {
    localStorage.setItem('diagnosis_offer_visited', 'true')

    await sendTrackingEvent({
      event_type: 'cta_click',
      session_id: getSessionId(),
      result_key: key,
      product_key: productKeys.join(','),
      cta_url: ctaUrl || '',
      is_expired: expiredOrEnded,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    if (ctaUrl) {
      window.location.href = ctaUrl
    }
  }

  const handleResetDiagnosis = () => {
    localStorage.removeItem('diagnosis_answers')
    localStorage.removeItem('diagnosis_result')
    localStorage.removeItem('diagnosis_date')
    localStorage.removeItem('diagnosis_page')
    localStorage.removeItem('diagnosis_offer_visited')
    localStorage.removeItem('product_offer_deadline')
    localStorage.removeItem('consultation_offer_deadline')

    window.location.href = '/'
  }

  if (!data) return null

  const viewProps = {
    data,
    copy,
    resultKey: key,
    mainProduct,
    campaignEnded,
    expiredOrEnded,
    ctaLabel,
    ctaAreaRef,
    handleCtaClick,
    handleResetDiagnosis,
    COMMON_COPY,
    CAMPAIGN_END_AT,
    setIsExpired,
  }

  if (variant === 'B') {
    return <ResultPageBView {...viewProps} />
  }

  return <ResultPageAView {...viewProps} />
}