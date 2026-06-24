import './ResultPageAView.css'
import Timer from '../components/Timer'

export default function ResultPageAView({
  copy,
  mainProduct,
  campaignEnded,
  expiredOrEnded,
  ctaLabel,
  ctaAreaRef,
  handleCtaClick,
  handleResetDiagnosis,
  COMMON_COPY,
  CAMPAIGN_END_AT,
  setIsExpired,
}) {
  return (
    <div className="page result-a-page">
      <section className="mock-section">
        <div className="phone-card result-a-phone-card">
          <div className="result-a-hero">
            <div className="result-a-image-wrap">
                <img
                src="/images/kamikawa-a.jpg"
                alt="専門家診断のイメージ"
                className="result-a-expert-image"
                />

              <div className="result-a-badge">
                専門家診断レポート
              </div>
            </div>

            <h1 className="result-a-title">
                診断結果：
                現在は基礎改善を優先する段階です
            </h1>

            <p className="result-a-lead">
              現在の状況を分析した結果、
              優先的に見直すべきポイントが見えてきました。
            </p>
          </div>

          <div className="result-a-card">
            <div className="result-a-card-label">
              専門家所見
            </div>

            <p>{copy.CAUSE}</p>
          </div>

          <div className="result-a-card">
            <div className="result-a-card-label">
              改善ポイント
            </div>

            <p>{copy.SOLUTION}</p>
          </div>

          {!expiredOrEnded && (
            <div className="result-a-card">
              <div className="result-a-card-label">
                優先して取り組む理由
              </div>

              <p>{copy.URGENCY}</p>
            </div>
          )}

{/* =========================
   A/Bモック期間中
   Timer停止
=========================

{!campaignEnded && (
  <Timer
    mode="fixed"
    targetDate={CAMPAIGN_END_AT}
    isConsultation={mainProduct?.isConsultation}
    onExpireChange={setIsExpired}
    title="特別案内の終了まで"
    subtitle="診断者限定でご案内しています"
  />
)}

========================= */}

          {expiredOrEnded && (
            <div className="result-a-expired">
              <p>{COMMON_COPY.EXPIRED_LABEL}</p>
              <h3>{COMMON_COPY.EXPIRED_TITLE}</h3>
              <p>{COMMON_COPY.EXPIRED_TEXT}</p>
            </div>
          )}

          {!expiredOrEnded && mainProduct && (
            <div className="result-a-offer">
              <div className="result-a-offer-label">
                専門家からの提案
              </div>

              <h3>{mainProduct.name}</h3>

              <p>{mainProduct.description}</p>

              <p className="result-a-precta">
                {copy.PRE_CTA}
              </p>

              <div ref={ctaAreaRef}>
                <button
                  className="result-a-cta"
                  onClick={handleCtaClick}
                >
                  {ctaLabel}
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            className="result-a-reset"
            onClick={handleResetDiagnosis}
          >
            もう一度診断する（確認用）
          </button>
        </div>
      </section>
    </div>
  )
}