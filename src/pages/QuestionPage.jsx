// src/pages/QuestionPage.jsx

import React, { useEffect, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { isCampaignEnded } from '../utils/campaign'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './QuestionPageB.css'

const choiceMarks = ['A', 'B', 'C', 'D', 'E']

export default function QuestionPage({ questionIndex, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const q = QUESTIONS[questionIndex]

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

  if (false && isCampaignEnded()) {
    return (
      <div className="question-b-page">
        <main className="question-b-phone">
          <section className="question-b-card">
            <h2 className="question-b-title">終了しました</h2>
            <p className="question-b-guide">
              この診断の受付は終了しました。
              <br />
              ご興味をお持ちいただき、ありがとうございました。
            </p>
          </section>
        </main>
      </div>
    )
  }

  const handleNext = () => {
    if (selected === null) return

    onAnswer(questionIndex, selected)
    setSelected(null)
  }

  return (
    <div className="question-b-page">
      <main className="question-b-phone">
        <section className="question-b-card">
          <div className="question-b-progress">
            <div className="question-b-progress-label">
              <span>Salon Check</span>
              <strong>
                {questionIndex + 1} / {QUESTIONS.length}
              </strong>
            </div>

            <div className="question-b-progress-bar">
              <span
                style={{
                  width: `${((questionIndex + 1) / QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="question-b-visual-slot">
            <span>IMAGE SLOT</span>
            <p>質問ごとの画像は後でまとめて差し替え</p>
          </div>

          <p className="question-b-guide">
            いまの気持ちに近いものを選んでください
          </p>

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

                <span className="question-b-choice-text">{option}</span>

                <span className="question-b-choice-image-slot" aria-hidden="true">
                  img
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
        </section>
      </main>
    </div>
  )
}