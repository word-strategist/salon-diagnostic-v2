import React from 'react'
import { useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { isCampaignEnded } from '../utils/campaign'

export default function QuestionPage({ questionIndex, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const q = QUESTIONS[questionIndex]

  if (isCampaignEnded()) {
    return (
      <div
        className="question-page"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          background: '#1a1f3a',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '640px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '24px',
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(20px, 5vw, 28px)',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            終了しました
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              lineHeight: '1.8',
              margin: 0,
            }}
          >
            この診断の受付は終了しました。<br />
            ご興味をお持ちいただき、ありがとうございました。
          </p>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (selected === null) return
    onAnswer(questionIndex, selected)
    setSelected(null)
  }

  return (
    <div
      className="question-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        boxSizing: 'border-box',
        background: '#1a1f3a',
      }}
    >
      <p
        style={{
          color: '#d4af37',
          fontSize: '18px',
          marginBottom: '16px',
          fontWeight: 'bold',
          width: '100%',
          maxWidth: '560px',
          textAlign: 'center',
          marginTop: 0,
        }}
      >
        {questionIndex + 1} / {QUESTIONS.length}
      </p>

      <h2
        style={{
          color: '#ffffff',
          fontSize: 'clamp(16px, 4vw, 22px)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          width: '100%',
          maxWidth: '600px',
          lineHeight: '1.6',
          marginTop: 0,
        }}
      >
        {q.text}
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '560px',
        }}
      >
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              background: selected === i ? '#d4af37' : '#ffffff',
              color: '#1a1f3a',
              border: selected === i ? '3px solid #d4af37' : '3px solid transparent',
              borderRadius: '12px',
              padding: '18px 24px',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selected === null}
        style={{
          marginTop: '32px',
          background: selected === null ? '#555555' : '#d4af37',
          color: selected === null ? '#999999' : '#1a1f3a',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 60px',
          fontSize: 'clamp(15px, 4vw, 18px)',
          fontWeight: 'bold',
          cursor: selected === null ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          boxShadow: selected === null ? 'none' : '0 4px 20px rgba(212,175,55,0.4)',
          width: '100%',
          maxWidth: '560px',
          boxSizing: 'border-box',
        }}
      >
        {questionIndex === QUESTIONS.length - 1 ? '診断結果を見る' : '次へ'}
      </button>
    </div>
  )
}