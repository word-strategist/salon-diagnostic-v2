// src/pages/TopPageB.jsx

import { useEffect } from 'react'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageB.css'

function TopPageB({ onStart }) {
  useEffect(() => {
    sendTrackingEvent({
      event_type: 'page_view',
      session_id: getSessionId(),
      page: 'top_b',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
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
      <main className="top-b-shell">
        <section className="top-b-hero">
          <div className="top-b-badge">B Pattern｜縦型テロップ診断</div>

<div className="top-b-video-frame">

  <div className="top-b-video-glow" />

    <div className="top-b-video-title">
      <span>SELF CHECK</span>

      <h1>
        あなたのサロン集客は
        <br />
        どこで止まっている？
      </h1>
    </div>

    <div className="top-b-caption-track">
      <p>毎日投稿している</p>
      <p>クーポンも出している</p>
      <p>HPBにも掲載している</p>
      <p>LINEも送っている</p>
      <p>それでも予約が安定しない</p>
      <p>原因は努力不足じゃない</p>
      <p>見直す順番かもしれません</p>
    </div>

    <div className="top-b-video-footer">
      <p>60秒で今の状態をチェック</p>
    </div>

  </div>

          <p className="top-b-lead">
            SNS・HPB・LINE。
            頑張っているのに予約が安定しないなら、
            今の集客状態をセルフチェックしてみてください。
          </p>

          <button className="top-b-cta" onClick={handleStart}>
            60秒でチェックする
          </button>

          <p className="top-b-note">
            登録不要・完全無料｜スマホでかんたん
          </p>
        </section>

        <section className="top-b-flow">
          <p className="top-b-flow-title">チェックで分かること</p>

          <div className="top-b-flow-item">01　今の集客状態</div>
          <div className="top-b-flow-item">02　予約が止まるポイント</div>
          <div className="top-b-flow-item">03　最初に見直す一手</div>
        </section>
      </main>
    </div>
  )
}

export default TopPageB