// src/pages/TopPageB2.jsx

import { useEffect, useState } from 'react'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageB2.css'

const STORY_STEPS = [
  {
    label: 'SELF CHECK',
    title: 'あなたのサロン集客は\nどこで止まっている？',
    text: 'スクロールしながら、今の状態を確認してください。',
  },
  {
    label: '01',
    title: '毎日投稿している',
    text: 'でも、予約につながっている実感がない。',
  },
  {
    label: '02',
    title: 'クーポンも出している',
    text: 'だけど、安さで選ばれるお客様が増えてしまう。',
  },
  {
    label: '03',
    title: 'HPBにも掲載している',
    text: 'やめるのは怖い。でも、頼り続けるのも不安。',
  },
  {
    label: '04',
    title: 'それでも\n予約が安定しない',
    text: '原因は、努力不足ではないかもしれません。',
    emphasis: true,
  },
  {
    label: 'ANSWER',
    title: '見直すべきなのは\n頑張る量ではなく順番。',
    text: '今の集客状態を60秒で確認できます。',
    cta: true,
  },
]

function TopPageB2({ onStart }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    sendTrackingEvent({
      event_type: 'page_view',
      session_id: getSessionId(),
      page: 'top_b2',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const index = Math.min(
        STORY_STEPS.length - 1,
        Math.max(0, Math.round(scrollTop / windowHeight))
      )

      setActiveIndex(index)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStart = () => {
    sendTrackingEvent({
      event_type: 'start_click',
      session_id: getSessionId(),
      page: 'top_b2_scroll_story',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    onStart()
  }

  const activeStep = STORY_STEPS[activeIndex]

  return (
    <div className="top-b2-page">
      <div className="top-b2-fixed">
        <div className="top-b2-bg-glow" />

        <div
          className={`top-b2-content ${
            activeStep.emphasis ? 'is-emphasis' : ''
          }`}
          key={activeIndex}
        >
          <span>{activeStep.label}</span>

          <h1>
            {activeStep.title.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < activeStep.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p>{activeStep.text}</p>

          {activeStep.cta && (
            <>
              <button
                type="button"
                className="top-b2-cta"
                onClick={handleStart}
              >
                60秒でチェックする
              </button>

              <p className="top-b2-note">
                登録不要・完全無料｜スマホでかんたん
              </p>
            </>
          )}
        </div>

        <div className="top-b2-progress">
          {STORY_STEPS.map((_, index) => (
            <span
              key={index}
              className={index === activeIndex ? 'is-active' : ''}
            />
          ))}
        </div>

        {!activeStep.cta && (
          <div className="top-b2-scroll-hint">
            Scroll
            <span>↓</span>
          </div>
        )}
      </div>

      <div className="top-b2-scroll-space">
        {STORY_STEPS.map((_, index) => (
          <section key={index} />
        ))}
      </div>
    </div>
  )
}

export default TopPageB2