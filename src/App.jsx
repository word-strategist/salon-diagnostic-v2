import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

import TopPage from './pages/TopPage'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'

import { calcResult } from './utils/judgement'

const STORAGE_KEYS = {
  answers: 'diagnosis_answers',
  result: 'diagnosis_result',
  completed: 'diagnosis_completed',
}

function AppRoutes() {
  const navigate = useNavigate()

  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  // 初期復元
useEffect(() => {
  const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers)
  const savedResult = localStorage.getItem(STORAGE_KEYS.result)
  const savedCompleted = localStorage.getItem(STORAGE_KEYS.completed)

  if (savedAnswers) setAnswers(JSON.parse(savedAnswers))

  if (savedCompleted === 'true' && savedResult) {
    const parsedResult = JSON.parse(savedResult)
    setResult(parsedResult)
    navigate('/result')
    return
  }

  if (savedResult) {
    setResult(JSON.parse(savedResult))
  }
}, [])

  // 診断開始
const handleStart = () => {
  const completed = localStorage.getItem('diagnosis_completed')

  if (completed === 'true') {
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
      localStorage.setItem(STORAGE_KEYS.completed, 'true')

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
        element={
          <QuestionWrapper
            answers={answers}
            onAnswer={handleAnswer}
          />
        }
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

// URLのindexを使うためのラッパー
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