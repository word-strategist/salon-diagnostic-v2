import React, { useEffect, useState } from 'react'
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from 'react-router-dom'

import TopPage from './pages/TopPage'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'

import { calcResult } from './utils/judgement'

const STORAGE_KEYS = {
  answers: 'diagnosis_answers',
  result: 'diagnosis_result',
  date: 'diagnosis_date',
}

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function AppRoutes() {
  const navigate = useNavigate()

  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers)
    const savedResult = localStorage.getItem(STORAGE_KEYS.result)
    const savedDate = localStorage.getItem(STORAGE_KEYS.date)
    const today = getToday()

    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))

    if (savedDate === today && savedResult) {
      setResult(JSON.parse(savedResult))
    } else {
      localStorage.removeItem(STORAGE_KEYS.answers)
      localStorage.removeItem(STORAGE_KEYS.result)
      localStorage.removeItem(STORAGE_KEYS.date)
    }
  }, [])

  const handleStart = () => {
    // 共有・確認用：TOPから押したら必ず質問ページへ入る
    localStorage.removeItem(STORAGE_KEYS.answers)
    localStorage.removeItem(STORAGE_KEYS.result)
    localStorage.removeItem(STORAGE_KEYS.date)

    setAnswers([])
    setResult(null)

    navigate('/question/0')
  }

  const handleAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex

    if (questionIndex === 9) {
      const finalResult = calcResult(newAnswers)

      setAnswers(newAnswers)
      setResult(finalResult)

      localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(newAnswers))
      localStorage.setItem(STORAGE_KEYS.result, JSON.stringify(finalResult))
      localStorage.setItem(STORAGE_KEYS.date, getToday())

      navigate('/result')
    } else {
      setAnswers(newAnswers)
      localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(newAnswers))
      navigate(`/question/${questionIndex + 1}`)
    }
  }

  return (
    <Routes>
      <Route path="/" element={<TopPage onStart={handleStart} />} />

      <Route
        path="/question/:index"
        element={<QuestionWrapper onAnswer={handleAnswer} />}
      />

      <Route
        path="/result"
        element={
          result ? (
            <ResultPage result={result} />
          ) : (
            <TopPage onStart={handleStart} />
          )
        }
      />
    </Routes>
  )
}

function QuestionWrapper({ onAnswer }) {
  const { index } = useParams()
  const questionIndex = parseInt(index, 10)

  return (
    <QuestionPage
      questionIndex={questionIndex}
      onAnswer={onAnswer}
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}