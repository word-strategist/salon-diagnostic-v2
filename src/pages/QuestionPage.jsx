import React from 'react'
import { useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { isCampaignEnded } from '../utils/campaign'

export default function QuestionPage({ questionIndex, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const q = QUESTIONS[questionIndex]

  if (isCampaignEnded()) {
    return (
      <div className="page">
        <section className="mock-section">
          <div className="phone-card question-card">
            <h2 className="question-title">終了しました</h2>

            <div className="hero-copy">
              <p>この診断の受付は終了しました。</p>
              <p>ご興味をお持ちいただき、ありがとうございました。</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const handleNext = () => {
    if (selected === null) return
    onAnswer(questionIndex, selected)
    setSelected(null)
  }

  const progressPercent = ((questionIndex + 1) / QUESTIONS.length) * 100

  return (
    <div className="page">
      <section className="mock-section">
        <div className="phone-card question-card">
          <div className="progress-wrap">
            <div className="progress-top">
              <span>診断中</span>
              <span>
                {questionIndex + 1} / {QUESTIONS.length}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="banner">
            <img src="/images/banner-question.png" alt="診断中のイメージ" />
          </div>

          <h2 className="question-title">{q.text}</h2>

          <div className="choice-list">
            {q.options.map((option, i) => (
              <button
                key={i}
                type="button"
                className="choice-item"
                onClick={() => setSelected(i)}
                style={
                  selected === i
                    ? {
                        borderColor: '#d4af37',
                        background: '#fffaf1',
                        color: '#5a4a4a',
                      }
                    : undefined
                }
              >
                {option}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="next-button"
            onClick={handleNext}
            disabled={selected === null}
            style={
              selected === null
                ? {
                    opacity: 0.45,
                    cursor: 'not-allowed',
                  }
                : undefined
            }
          >
            {questionIndex === QUESTIONS.length - 1
              ? '診断結果を見る →'
              : '次へ進む →'}
          </button>
        </div>
      </section>
    </div>
  )
}