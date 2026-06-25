// src/pages/TopPageA.jsx

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
          <div className="top-a-orbit-card top-a-orbit-card-1">
            集客タイプ診断
          </div>

          <div className="top-a-orbit-card top-a-orbit-card-2">
            改善ポイント
          </div>

          <div className="top-a-image-card">
            <img
              src="/images/kamikawa-a.jpg"
              alt=""
              className="top-a-person"
            />
          </div>

          <div className="top-a-expert-card">
            <p>専門家診断レポート</p>
            <strong>あなたの集客状態を分析します</strong>
          </div>
        </div>

        <div className="top-a-copy">
          <p className="top-a-label">A Pattern｜専門家診断型</p>

          <h1>
            頑張っているのに、<br />
            予約が安定しない理由を<br />
            診断します。
          </h1>

          <p className="top-a-lead">
            SNS、HPB、LINE、紹介。
            いろいろ試しているのに成果が安定しないなら、
            努力不足ではなく「改善する順番」がズレているのかもしれません。
          </p>

          <button type="button" className="top-a-cta" onClick={handleStart}>
            無料で診断を受ける
          </button>

          <p className="top-a-note">※診断は約60秒・登録不要</p>
        </div>
      </section>

      <section className="top-a-section top-a-problem">
        <p className="top-a-kicker">こんな状態ではありませんか？</p>

        <div className="top-a-check-list">
          <p>✓ SNSは更新している</p>
          <p>✓ HPBにも掲載している</p>
          <p>✓ LINEや紹介も試している</p>
          <p>✓ でも、予約に波がある</p>
        </div>

        <h2>
          必要なのは、<br />
          さらに頑張ることではなく、<br />
          今の状態を正しく知ることです。
        </h2>
      </section>

      <section className="top-a-section top-a-report">
        <p className="top-a-kicker">診断で分かること</p>

        <div className="top-a-report-grid">
          <div>
            <span>01</span>
            <strong>今の集客タイプ</strong>
          </div>
          <div>
            <span>02</span>
            <strong>予約が止まる原因</strong>
          </div>
          <div>
            <span>03</span>
            <strong>最初に改善すべきポイント</strong>
          </div>
        </div>

        <button type="button" className="top-a-cta" onClick={handleStart}>
          診断をはじめる
        </button>
      </section>
    </main>
  )
}