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
          <div className="top-b-badge">SALON SELF CHECK</div>

          <div className="top-b-reel">
            <p>毎日投稿しているのに</p>
            <p>予約が増えない</p>
            <p>クーポンを出しても</p>
            <p>安いお客様ばかり</p>
            <p>HPBに頼り続けるのが</p>
            <p>少し不安になってきた</p>
          </div>

          <h1>
            あなたのサロンが
            <br />
            今どこで止まっているか
            <br />
            60秒でセルフチェック
          </h1>

          <p className="top-b-lead">
            SNS時代のサロン集客は、
            <br />
            「頑張る量」より
            <br />
            「見直す順番」が大切です。
          </p>

          <button className="top-b-cta" onClick={handleStart}>
            無料でチェックをはじめる
          </button>

          <p className="top-b-note">
            登録不要・完全無料｜約60秒
          </p>
        </section>

        <section className="top-b-flow">
          <div className="top-b-flow-item">01　今の集客状態を確認</div>
          <div className="top-b-flow-item">02　止まっている原因を可視化</div>
          <div className="top-b-flow-item">03　次に見直す一手がわかる</div>
        </section>
      </main>
    </div>
  )
}

export default TopPageB