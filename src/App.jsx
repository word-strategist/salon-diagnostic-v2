import React from 'react'
import { useEffect, useState } from 'react'
import TopPage from './pages/TopPage'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'
import { calcResult } from './utils/judgement'
import { getSessionId, sendTrackingEvent } from './utils/tracking'
import { RESULT_PRODUCT_MAP } from './data/resultMap'

const STORAGE_KEYS = {
  page: 'diagnosis_page',
  answers: 'diagnosis_answers',
  result: 'diagnosis_result',
  completed: 'diagnosis_completed',
  offerVisited: 'diagnosis_offer_visited',
  productDeadline: 'product_offer_deadline',
  consultationDeadline: 'consultation_offer_deadline',
}

export default function App() {
  const [page, setPage] = useState('top')
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const savedPage = localStorage.getItem(STORAGE_KEYS.page)
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers)
    const savedResult = localStorage.getItem(STORAGE_KEYS.result)
    const savedCompleted = localStorage.getItem(STORAGE_KEYS.completed)

    const parsedAnswers = savedAnswers ? JSON.parse(savedAnswers) : []
    const parsedResult = savedResult ? JSON.parse(savedResult) : null
    const isCompleted = savedCompleted === 'true'

    setAnswers(parsedAnswers)
    setResult(parsedResult)

    // 完了済みユーザーは必ず結果ページへ戻す
    if (isCompleted && parsedResult) {
      setPage('result')
      localStorage.setItem(STORAGE_KEYS.page, 'result')
      setLoaded(true)
      return
    }

    // 未完了ユーザーの整合性チェック
    if (!isCompleted) {
      // resultページ指定なのにresultがない → TOPへ
      if (savedPage === 'result' && !parsedResult) {
        setPage('top')
        localStorage.setItem(STORAGE_KEYS.page, 'top')
        setLoaded(true)
        return
      }

      // question系ページなのにanswersが壊れている → TOPへ
      if (
        savedPage &&
        savedPage.startsWith('question') &&
        !Array.isArray(parsedAnswers)
      ) {
        setPage('top')
        localStorage.setItem(STORAGE_KEYS.page, 'top')
        setLoaded(true)
        return
      }

      // 通常復元
      if (savedPage) {
        setPage(savedPage)
      }
    }

    setLoaded(true)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const savedCompleted = localStorage.getItem(STORAGE_KEYS.completed) === 'true'
      const savedResult = localStorage.getItem(STORAGE_KEYS.result)

      if (savedCompleted && savedResult) {
        setPage('result')
        return
      }

      setPage('top')
      setResult(null)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const saveProgress = (nextPage, nextAnswers) => {
    setPage(nextPage)
    setAnswers(nextAnswers)
    localStorage.setItem(STORAGE_KEYS.page, nextPage)
    localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(nextAnswers))
    window.history.pushState(null, '', window.location.href)
  }

  const handleStart = () => {
    saveProgress('question', [])
    setResult(null)

    localStorage.removeItem(STORAGE_KEYS.result)
    localStorage.removeItem(STORAGE_KEYS.completed)
    localStorage.removeItem(STORAGE_KEYS.offerVisited)
    localStorage.removeItem(STORAGE_KEYS.productDeadline)
    localStorage.removeItem(STORAGE_KEYS.consultationDeadline)
  }

  const handleAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex

    if (questionIndex === 9) {
      const finalResult = calcResult(newAnswers)

      const resultKey = `${finalResult.level}-${finalResult.type}`
      const productKey = RESULT_PRODUCT_MAP[resultKey] || ''
      const sessionId = getSessionId()

      sendTrackingEvent({
        event_type: 'result_view',
        session_id: sessionId,
        result_key: resultKey,
        level: finalResult.level,
        type: finalResult.type,
        product_key: productKey,
        answers: newAnswers,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      })

      setAnswers(newAnswers)
      setResult(finalResult)
      setPage('result')

      localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(newAnswers))
      localStorage.setItem(STORAGE_KEYS.page, 'result')
      localStorage.setItem(STORAGE_KEYS.result, JSON.stringify(finalResult))
      localStorage.setItem(STORAGE_KEYS.completed, 'true')
      window.history.pushState(null, '', window.location.href)
    } else {
      saveProgress('question-' + (questionIndex + 1), newAnswers)
    }
  }

  const handleRetry = () => {
    localStorage.removeItem(STORAGE_KEYS.page)
    localStorage.removeItem(STORAGE_KEYS.answers)
    localStorage.removeItem(STORAGE_KEYS.result)
    localStorage.removeItem(STORAGE_KEYS.completed)
    localStorage.removeItem(STORAGE_KEYS.offerVisited)
    localStorage.removeItem(STORAGE_KEYS.productDeadline)
    localStorage.removeItem(STORAGE_KEYS.consultationDeadline)

    setAnswers([])
    setResult(null)
    setPage('top')
    window.history.pushState(null, '', window.location.href)
  }

  const currentQuestion = page.startsWith('question-')
    ? parseInt(page.split('-')[1])
    : page === 'question'
      ? 0
      : null

  if (!loaded) return null

  return (
    <div className="app-shell">
      {page === 'top' && !result && <TopPage onStart={handleStart} />}

      {currentQuestion !== null && !result && (
        <QuestionPage
          questionIndex={currentQuestion}
          onAnswer={handleAnswer}
        />
      )}

      {result && (
        <ResultPage result={result} onRetry={handleRetry} />
      )}
    </div>
  )
}