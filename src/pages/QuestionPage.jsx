import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { QUESTIONS } from '../data/questions'
import { ICONS } from '../data/icons'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './QuestionPageB.css'

const QUESTION_HEADER_IMAGE =
  '/images/question/QuestionHeader_v1_2026-07-04.png'

const choiceMarks = ['A', 'B', 'C', 'D', 'E']

const QUESTION_ICONS = [
  ICONS.person,
  ICONS.current,
  ICONS.priority,
  ICONS.sns,
  ICONS.person,
  ICONS.hpb,
  ICONS.line,
  ICONS.heart,
  ICONS.type,
  ICONS.priority,
]

const QUESTION_MESSAGES = [
  'まずは、今のお店の状態を見ていきましょう。',
  '売上の現在地を、近いものから選んでください。',
  '今いちばん重く感じていることを教えてください。',
  'ここからは、日々の発信について見ていきましょう。',
  '普段の運営体制に近いものを選んでください。',
  '集客の入り口について整理していきます。',
  '新しい取り組みへの向き合い方を見ていきましょう。',
  'これまでの学びや投資経験を確認します。',
  '少し先の理想の状態を見ていきましょう。',
  '最後に、今のあなたに必要だと感じるものを選んでください。',
]

export default function QuestionPage({ questionIndex, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const q = QUESTIONS[questionIndex]
  const questionIcon = QUESTION_ICONS[questionIndex] || ICONS.current

  const message =
    QUESTION_MESSAGES[questionIndex] ||
    'いまの気持ちに近いものを選んでください'

  useEffect(() => {
    sendTrackingEvent({
      event_type: 'question_view',
      session_id: getSessionId(),
      step: questionIndex + 1,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [questionIndex])

  useEffect(() => {
    const handleBeforeUnload = () => {
      sendTrackingEvent({
        event_type: 'question_exit',
        session_id: getSessionId(),
        step: questionIndex + 1,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [questionIndex])

  const handleNext = () => {
    if (selected === null) return

    onAnswer(questionIndex, selected)
    setSelected(null)
  }

  if (!q) return null

  return (
    <div className="question-b-page">
      <main className="question-b-phone">
        <section className="question-b-card">
          <div className="question-b-progress">
            <div className="question-b-progress-label">
              <span>Salon Check</span>
              <strong>{questionIndex + 1} / {QUESTIONS.length}</strong>
            </div>

            <div className="question-b-progress-bar">
              <span
                style={{
                  width: `${((questionIndex + 1) / QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="question-b-visual" aria-hidden="true">
            <img src={QUESTION_HEADER_IMAGE} alt="" loading="eager" />
          </div>

          <p className="question-b-guide">{message}</p>

          <h2 className="question-b-title">{q.text}</h2>

          <div className="question-b-choice-list">
            {q.options.map((option, i) => (
              <button
                key={i}
                type="button"
                className={`question-b-choice ${
                  selected === i ? 'is-selected' : ''
                }`}
                onClick={() => setSelected(i)}
              >
                <span className="question-b-choice-mark">
                  {choiceMarks[i] || i + 1}
                </span>

                <span className="question-b-choice-text">
                  {option}
                </span>

                <span
                  className="question-b-choice-image-slot"
                  aria-hidden="true"
                >
                  <img src={questionIcon} alt="" loading="lazy" />
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="question-b-next"
            onClick={handleNext}
            disabled={selected === null}
          >
            {questionIndex === QUESTIONS.length - 1
              ? '診断結果を見る'
              : '次へ進む'}
            <span>›</span>
          </button>

          <Footer />
        </section>
      </main>
    </div>
  )
}