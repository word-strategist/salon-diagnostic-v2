import { useEffect, useState } from 'react'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageB.css'

const TELOPS = [
  'その集客方法、',
  '頑張ってるのに',
  'なぜか',
  '予約が安定しない…',
]

export default function TopPageB({ onStart }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    sendTrackingEvent({
      event_type: 'page_view',
      session_id: getSessionId(),
      page: 'top_b',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    const timer = setInterval(() => {
      setStep((prev) => (prev < TELOPS.length - 1 ? prev + 1 : prev))
    }, 700)

    return () => clearInterval(timer)
  }, [])

  const handleStart = () => {
    sendTrackingEvent({
      event_type: 'start_click',
      session_id: getSessionId(),
      page: 'top_b_first_view',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    onStart()
  }

  return (
    <div className="top-b-page">
      <section className="top-b-firstview">
        <div className="top-b-status">9:41</div>

        <div className="top-b-hero-image" />

        <div className="top-b-telop">
          {step >= 0 && <p>{TELOPS[0]}</p>}
          {step >= 1 && <p>{TELOPS[1]}</p>}
          {step >= 2 && <p className="is-pink">{TELOPS[2]}</p>}
          {step >= 3 && <p>{TELOPS[3]}</p>}
        </div>

        {step >= 3 && (
          <>
            <p className="top-b-dark-copy">
              それ、あなただけじゃないかも。
            </p>

            <p className="top-b-scroll">
              スクロールして一緒に整理してみませんか？
            </p>

            <div className="top-b-arrow">∨</div>
          </>
        )}
      </section>

      <section className="top-b-section">
        <h2>
          <span>こんなお悩み、</span>
          <br />
          ありませんか？
        </h2>

        <div className="top-b-chat-list">
          <div className="top-b-chat">
            <span>毎日SNSを更新している…</span>
          </div>

          <div className="top-b-chat">
            <span>ホットペッパーも続けている…</span>
          </div>

          <div className="top-b-chat">
            <span>それでも予約が安定しない…</span>
          </div>
        </div>
      </section>

      <section className="top-b-section">
        <h2>
          頑張る量ではなく
          <br />
          <span>順番</span>
          があるかもしれません。
        </h2>

        <button
          className="top-b-cta"
          onClick={handleStart}
        >
          60秒でチェックする
        </button>

        <p className="top-b-note">
          登録不要・完全無料
        </p>
      </section>
    </div>
  )
}