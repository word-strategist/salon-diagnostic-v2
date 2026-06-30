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
      <main className="top-b-phone">
        <section className="top-b-firstview">
          <div className="top-b-status">9:41</div>

          <div className="top-b-hero-image">
            <img src="/images/top-b-woman.jpg" alt="悩んでいるサロンオーナー" />
          </div>

          <div className="top-b-telop">
            <p>その集客方法、</p>
            <p>頑張ってるのに</p>
            <p className="is-pink">なぜか</p>
            <p>予約が安定しない…</p>
          </div>

          <p className="top-b-dark-copy">
            それ、あなただけじゃないかも。
          </p>

          <p className="top-b-scroll">スクロールして一緒に整理してみませんか？</p>
          <div className="top-b-arrow">⌄</div>
        </section>

        <section className="top-b-section top-b-empathy">
          <h2>
            こんなことで
            <br />
            <span>悩んでいませんか？</span>
          </h2>

          <div className="top-b-chat-list">
            <div className="top-b-chat">
              <span> SNSも頑張ってるのに新規が増えない…</span>
            </div>
            <div className="top-b-chat">
              <span>ホットペッパーに載せても、反応がイマイチ…</span>
            </div>
            <div className="top-b-chat">
              <span>リピートしてくれる人はいるけど、毎月バラバラ…</span>
            </div>
            <div className="top-b-chat">
              <span>何から手をつければいいのか、よくわからない…</span>
            </div>
          </div>

          <p className="top-b-small-note">うんうん、わかります…</p>

          <p className="top-b-message">
            原因がわかれば、
            <br />
            やるべきことが見えてきます。
          </p>

          <div className="top-b-arrow">⌄</div>
        </section>

        <section className="top-b-section top-b-benefit">
          <h2>
            この診断で
            <br />
            わかること
          </h2>

          <div className="top-b-benefit-cards">
            <div className="top-b-benefit-card">
              <span className="top-b-icon">⌕</span>
              <p>あなたの集客の今の状態</p>
            </div>
            <div className="top-b-benefit-card">
              <span className="top-b-icon">♡</span>
              <p>あなたのサロンに合った集客タイプ</p>
            </div>
            <div className="top-b-benefit-card">
              <span className="top-b-icon">♢</span>
              <p>優先して取り組むべきポイント</p>
            </div>
          </div>

          <div className="top-b-soft-image">
            <img src="/images/top-b-desk.jpg" alt="ノートと花のイメージ" />
          </div>

          <p className="top-b-message">
            モヤモヤが
            <br />
            スッと整理されます。
          </p>

          <div className="top-b-arrow">⌄</div>
        </section>

        <section className="top-b-section top-b-cta-section">
          <h2>
            診断はたったの10問
            <br />
            3分で終わります
          </h2>

          <div className="top-b-stopwatch">⏱</div>

          <p className="top-b-voice-label">受けた方の声</p>

          <div className="top-b-voice-card">
            <p>自分のタイプがわかってやることが明確になりました！</p>
          </div>

          <div className="top-b-voice-card">
            <p>モヤモヤしていた理由が腑に落ちて、行動できるように！</p>
          </div>

          <div className="top-b-cta-box">
            <p>
              まずは今の状態を
              <br />
              整理してみませんか？
            </p>

            <button type="button" className="top-b-cta" onClick={handleStart}>
              診断をはじめる
              <span>›</span>
            </button>

            <p className="top-b-note">無料・登録不要・1日1回</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TopPageB