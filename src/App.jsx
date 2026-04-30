import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

import TopPage from './pages/TopPage'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'

import { calcResult } from './utils/judgement'

const STORAGE_KEYS = {
  answers: 'diagnosis_answers',
  result: 'diagnosis_result',
  date: 'diagnosis_date',
}

// 今日の日付（YYYY-MM-DD）
function getToday() {
  return new Date().toISOString().split('T')[0]
}

function AppRoutes() {
  const navigate = useNavigate()

  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  // 初期復元
  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers)
    const savedResult = localStorage.getItem(STORAGE_KEYS.result)
    const savedDate = localStorage.getItem(STORAGE_KEYS.date)

    const today = getToday()

    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))

    // 今日の診断なら結果を復元
    if (savedDate === today && savedResult) {
      setResult(JSON.parse(savedResult))
    } else {
      // 日付変わったらリセット
      localStorage.removeItem(STORAGE_KEYS.answers)
      localStorage.removeItem(STORAGE_KEYS.result)
      localStorage.removeItem(STORAGE_KEYS.date)
    }
  }, [])

  // 診断開始
  const handleStart = () => {
    const savedDate = localStorage.getItem(STORAGE_KEYS.date)
    const today = getToday()

    // 今日すでに診断済みなら結果へ
    if (savedDate === today) {
      navigate('/result')
      return
    }

    localStorage.removeItem(STORAGE_KEYS.answers)
    localStorage.removeItem(STORAGE_KEYS.result)

    setAnswers([])
    setResult(null)

    navigate('/question/0')
  }

  // 回答処理
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

import { useParams } from 'react-router-dom'

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