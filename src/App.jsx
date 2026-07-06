import React, { useEffect, useState } from 'react'
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from 'react-router-dom'

import TopPageB from './pages/TopPageB'
import TopPageB2 from './pages/TopPageB2'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'
import Footer from './components/Footer'

import { calcResult } from './utils/judgement'
import {
  getAbVariant,
  getEntryChannel,
  saveEntryVariant,
} from './data/abVariant'
import {
  createResultExpiry,
  getCampaignStatus,
  isResultExpired,
} from './utils/campaign'

/* =========================
   保存キー
========================= */

const SESSION_KEYS = {
  answers: 'salon_diagnosis_answers',
}

const LOCAL_KEYS = {
  result: 'salon_diagnosis_result',
  completedAt: 'salon_diagnosis_completed_at',
  expiresAt: 'salon_result_expires_at',
  resultExpired: 'salon_result_expired',
  entryVariant: 'salon_result_entry_variant',
  entryChannel: 'salon_result_entry_channel',
}

/* =========================
   保存データ操作
========================= */

function safelyParseJson(value, fallback = null) {
  if (!value) return fallback

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function clearSavedResultContent() {
  localStorage.removeItem(LOCAL_KEYS.result)
  sessionStorage.removeItem(SESSION_KEYS.answers)
}

function clearAllDiagnosisData() {
  sessionStorage.removeItem(SESSION_KEYS.answers)

  localStorage.removeItem(LOCAL_KEYS.result)
  localStorage.removeItem(LOCAL_KEYS.completedAt)
  localStorage.removeItem(LOCAL_KEYS.expiresAt)
  localStorage.removeItem(LOCAL_KEYS.resultExpired)
  localStorage.removeItem(LOCAL_KEYS.entryVariant)
  localStorage.removeItem(LOCAL_KEYS.entryChannel)

  // 旧仕様の保存値も削除
  localStorage.removeItem('diagnosis_answers')
  localStorage.removeItem('diagnosis_result')
  localStorage.removeItem('diagnosis_date')
}

/* =========================
   開発確認用プレビュー
========================= */

function getHashSearchParams() {
  const hash = window.location.hash || ''
  const query = hash.includes('?') ? hash.split('?')[1] : ''

  return new URLSearchParams(query)
}

function isDevelopmentPreviewEnabled() {
  const searchParams = new URLSearchParams(window.location.search)
  const hashParams = getHashSearchParams()

  return (
    searchParams.get('preview') === '1' ||
    hashParams.get('preview') === '1'
  )
}

/* =========================
   開発・レビュー専用
   Result直接表示
========================= */

const PREVIEW_RESULT_KEYS = new Set([
  '1-A',
  '2-A',
  '3-A',
  '1-B',
  '2-B',
  '3-B',
  '1-C',
  '2-C',
  '3-C',
  '1-D',
  '2-D',
])

function getPreviewResultKey() {
  const searchParams = new URLSearchParams(window.location.search)
  const hashParams = getHashSearchParams()

  const resultKey =
    searchParams.get('result') ||
    hashParams.get('result')

  return PREVIEW_RESULT_KEYS.has(resultKey)
    ? resultKey
    : null
}

function buildRoute(path, variant) {
  const params = new URLSearchParams()

  if (variant) {
    params.set('variant', variant)
  }

  if (isDevelopmentPreviewEnabled()) {
    params.set('preview', '1')
  }

  const query = params.toString()

  return query ? `${path}?${query}` : path
}

/* =========================
   共通案内画面
========================= */

function StatusScreen({ label, title, text }) {
  return (
    <div className="page">
      <section className="mock-section">
        <div
          className="phone-card"
          style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px 24px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ flex: 1 }}>
            {label && (
              <p
                style={{
                  marginBottom: '16px',
                  color: '#c7798d',
                  fontWeight: 700,
                }}
              >
                {label}
              </p>
            )}

            <h1
              style={{
                margin: '0 0 24px',
                color: '#3f2d29',
                fontSize: '28px',
                lineHeight: 1.5,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                margin: 0,
                color: '#705d58',
                fontSize: '15px',
                lineHeight: 2,
                whiteSpace: 'pre-line',
              }}
            >
              {text}
            </p>
          </div>

          <Footer />
        </div>
      </section>
    </div>
  )
}

/* =========================
   アプリルート
========================= */

function AppRoutes() {
  const navigate = useNavigate()

  const [now, setNow] = useState(Date.now())
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [resultExpiresAt, setResultExpiresAt] = useState(null)
  const [resultExpired, setResultExpired] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const variant = getAbVariant()
  const previewEnabled = isDevelopmentPreviewEnabled()

  const campaignStatus = previewEnabled
    ? 'active'
    : getCampaignStatus(now)

  let ActiveTopPage = null

  if (variant === 'b') {
    ActiveTopPage = TopPageB
  }

  if (variant === 'b2') {
    ActiveTopPage = TopPageB2
  }

  /* =========================
     時刻更新
  ========================= */

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [])

/* =========================
   保存データ復元
========================= */

useEffect(() => {
  const previewResultKey = previewEnabled
    ? getPreviewResultKey()
    : null

  if (previewResultKey && variant) {
    const [level, type] = previewResultKey.split('-')
    const previewResult = { level, type }
    const completedAt = new Date().toISOString()
    const expiresAt = createResultExpiry(completedAt)
    const channel = getEntryChannel()

    setAnswers([])
    setResult(previewResult)
    setResultExpiresAt(expiresAt)
    setResultExpired(false)

    sessionStorage.setItem(
      SESSION_KEYS.answers,
      JSON.stringify([])
    )

    localStorage.setItem(
      LOCAL_KEYS.result,
      JSON.stringify(previewResult)
    )
    localStorage.setItem(
      LOCAL_KEYS.completedAt,
      completedAt
    )
    localStorage.setItem(
      LOCAL_KEYS.expiresAt,
      expiresAt
    )
    localStorage.setItem(
      LOCAL_KEYS.entryVariant,
      variant
    )
    localStorage.setItem(
      LOCAL_KEYS.entryChannel,
      channel
    )
    localStorage.removeItem(LOCAL_KEYS.resultExpired)

    setIsHydrated(true)
    navigate(buildRoute('/result', variant))
    return
  }

  const savedAnswers = safelyParseJson(
    sessionStorage.getItem(SESSION_KEYS.answers),
    []
  )

  const savedResult = safelyParseJson(
    localStorage.getItem(LOCAL_KEYS.result)
  )

  const savedExpiresAt = localStorage.getItem(
    LOCAL_KEYS.expiresAt
  )

  const savedExpired =
    localStorage.getItem(LOCAL_KEYS.resultExpired) === 'true'

  const savedVariant = localStorage.getItem(
    LOCAL_KEYS.entryVariant
  )

  if (savedVariant === 'b' || savedVariant === 'b2') {
    saveEntryVariant(savedVariant)
  }

  setAnswers(Array.isArray(savedAnswers) ? savedAnswers : [])

  if (
    savedResult &&
    savedExpiresAt &&
    !isResultExpired(savedExpiresAt)
  ) {
    setResult(savedResult)
    setResultExpiresAt(savedExpiresAt)
    setResultExpired(false)
  } else if (
    savedExpired ||
    (savedResult &&
      savedExpiresAt &&
      isResultExpired(savedExpiresAt))
  ) {
    clearSavedResultContent()
    localStorage.setItem(LOCAL_KEYS.resultExpired, 'true')

    setResult(null)
    setResultExpiresAt(savedExpiresAt)
    setResultExpired(true)
  }

  setIsHydrated(true)
}, [])

  /* =========================
     Result期限監視
  ========================= */

  useEffect(() => {
    if (
      !result ||
      !resultExpiresAt ||
      !isResultExpired(resultExpiresAt, now)
    ) {
      return
    }

    clearSavedResultContent()
    localStorage.setItem(LOCAL_KEYS.resultExpired, 'true')

    setResult(null)
    setResultExpired(true)
  }, [now, result, resultExpiresAt])

  /* =========================
     診断開始
  ========================= */

  const handleStart = () => {
    if (campaignStatus !== 'active' || !variant) return

    clearAllDiagnosisData()

    setAnswers([])
    setResult(null)
    setResultExpiresAt(null)
    setResultExpired(false)

    navigate(buildRoute('/question/0', variant))
  }

  /* =========================
     回答処理
  ========================= */

  const handleAnswer = (questionIndex, answerIndex) => {
    if (campaignStatus !== 'active') return

    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex

    setAnswers(newAnswers)

    sessionStorage.setItem(
      SESSION_KEYS.answers,
      JSON.stringify(newAnswers)
    )

    if (questionIndex !== 9) {
      navigate(
        buildRoute(`/question/${questionIndex + 1}`, variant)
      )
      return
    }

    const finalResult = calcResult(newAnswers)
    const completedAt = new Date().toISOString()
    const expiresAt = createResultExpiry(completedAt)
    const channel = getEntryChannel()

    setResult(finalResult)
    setResultExpiresAt(expiresAt)
    setResultExpired(false)

    localStorage.setItem(
      LOCAL_KEYS.result,
      JSON.stringify(finalResult)
    )
    localStorage.setItem(
      LOCAL_KEYS.completedAt,
      completedAt
    )
    localStorage.setItem(
      LOCAL_KEYS.expiresAt,
      expiresAt
    )
    localStorage.setItem(
      LOCAL_KEYS.entryVariant,
      variant
    )
    localStorage.setItem(
      LOCAL_KEYS.entryChannel,
      channel
    )
    localStorage.removeItem(LOCAL_KEYS.resultExpired)

    navigate(buildRoute('/result', variant))
  }

  /* =========================
     初期読込
  ========================= */

  if (!isHydrated) {
    return null
  }

  /* =========================
     ルート表示
  ========================= */

  const bypassCampaignStatus = previewEnabled

  return (
    <Routes>
      <Route
        path="/"
element={
  !bypassCampaignStatus && campaignStatus === 'before' ? (
    <StatusScreen
      label="2日間限定"
      title="この診断はまだ開始していません"
      text={
        '2026年7月7日（火）8:00より\n公開を開始します。'
      }
    />
  ) : !bypassCampaignStatus && campaignStatus === 'ended' ? (
    <StatusScreen
      label="受付終了"
      title="この診断は終了しました"
      text="ご参加ありがとうございました。"
    />
  ) : !ActiveTopPage ? (
    <StatusScreen
      label="ご案内"
      title="専用のご案内URLからアクセスしてください"
      text="このページから診断を開始することはできません。"
    />
  ) : (
    <ActiveTopPage onStart={handleStart} />
  )
}
      />

      <Route
        path="/question/:index"
        element={
          campaignStatus === 'active' ? (
            <QuestionWrapper onAnswer={handleAnswer} />
          ) : (
            <StatusScreen
              label="受付終了"
              title={
                campaignStatus === 'before'
                  ? 'この診断はまだ開始していません'
                  : 'この診断は終了しました'
              }
              text={
                campaignStatus === 'before'
                  ? '2026年7月7日（火）8:00より公開を開始します。'
                  : 'ご参加ありがとうございました。'
              }
            />
          )
        }
      />

      <Route
        path="/result"
        element={
          result && resultExpiresAt ? (
            <ResultPage
              result={result}
              resultExpiresAt={resultExpiresAt}
            />
          ) : resultExpired ? (
            <StatusScreen
              label="閲覧期間終了"
              title="診断結果の閲覧期間は終了しました"
              text={
                '診断結果を確認できる期間は、\n診断完了から24時間です。'
              }
            />
          ) : campaignStatus === 'before' ? (
            <StatusScreen
              label="2日間限定"
              title="この診断はまだ開始していません"
              text="2026年7月7日（火）8:00より公開を開始します。"
            />
          ) : campaignStatus === 'ended' ? (
            <StatusScreen
              label="受付終了"
              title="この診断は終了しました"
              text="ご参加ありがとうございました。"
            />
          ) : ActiveTopPage ? (
            <ActiveTopPage onStart={handleStart} />
          ) : (
            <StatusScreen
              label="ご案内"
              title="診断結果を表示できません"
              text="専用のご案内URLからアクセスしてください。"
            />
          )
        }
      />
    </Routes>
  )
}

/* =========================
   Questionラッパー
========================= */

function QuestionWrapper({ onAnswer }) {
  const { index } = useParams()
  const questionIndex = Number.parseInt(index, 10)

  if (
    !Number.isInteger(questionIndex) ||
    questionIndex < 0 ||
    questionIndex > 9
  ) {
    return (
      <StatusScreen
        label="エラー"
        title="質問ページを表示できません"
        text="専用のご案内URLから、もう一度アクセスしてください。"
      />
    )
  }

  return (
    <QuestionPage
      questionIndex={questionIndex}
      onAnswer={onAnswer}
    />
  )
}

/* =========================
   App
========================= */

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}