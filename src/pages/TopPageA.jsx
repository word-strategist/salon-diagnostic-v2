import { useEffect } from 'react'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageA.css'

export default function TopPageA({ onStart }) {
  useEffect(() => {
    sendTrackingEvent({
      event_type: 'page_view',
      session_id: getSessionId(),
      page: 'top_a',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [])

  const handleStart = () => {
    sendTrackingEvent({
      event_type: 'start_click',
      session_id: getSessionId(),
      page: 'top_a_first_view',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    onStart()
  }

  return (
    <main className="top-a">
      <section className="top-a-hero">
        <div className="top-a-bg-glow" />

        <div className="top-a-visual">
          <div className="top-a-image-card">
            <img
              src="/images/kamikawa-a.jpg"
              alt=""
              className="top-a-person"
            />
          </div>
        </div>

        <div className="top-a-copy">
          <p className="top-a-label">A Pattern｜止めるTOP</p>

          <h1>
            あなたのサロン、<br />
            本当にこのままで<br />
            大丈夫ですか？
          </h1>

          <p className="top-a-lead">
            頑張っているのに予約が安定しない理由を、今の状態から診断します。
          </p>

          <button type="button" className="top-a-cta" onClick={handleStart}>
            無料で診断する
          </button>

          <p className="top-a-note">※診断は一度きりです</p>
        </div>
      </section>

      <section className="top-a-section">
        <p className="top-a-kicker">頑張っているのに</p>
        <h2>予約が安定しない。</h2>
      </section>

      <section className="top-a-section top-a-words">
        <span>SNS</span>
        <span>HPB</span>
        <span>紹介</span>
        <span>LINE</span>
        <p>何を優先すればいいか分からない。</p>
      </section>

      <section className="top-a-section">
        <h2>
          今の状態が分かれば、<br />
          次にやることはシンプルになります。
        </h2>

        <button type="button" className="top-a-cta" onClick={handleStart}>
          診断をはじめる
        </button>
      </section>
    </main>
  )
}