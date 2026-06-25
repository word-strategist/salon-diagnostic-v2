import './ResultPageBView.css'

export default function ResultPageBView({
  copy,
  mainProduct,
  expiredOrEnded,
  ctaLabel,
  ctaAreaRef,
  handleCtaClick,
  handleResetDiagnosis,
  COMMON_COPY,
}) {
  return (
    <div className="page result-b-page">
      <section className="mock-section">
        <div className="phone-card result-b-phone-card">
          <div className="result-b-hero">
            <div className="result-b-kicker">
              セルフチェック結果
            </div>

            <h1 className="result-b-title">
              今のあなたの現在地が
              見えてきました
            </h1>

            <p className="result-b-lead">
              まずは、今どこで止まりやすいのかを確認しましょう。
            </p>
          </div>

          <div className="result-b-status-card">
            <div className="result-b-status-label">
              現在地
            </div>

            <h2>
              頑張っているのに、
              次の一手が見えづらい状態です
            </h2>
          </div>

          <div className="result-b-step-card">
            <span>01</span>
            <div>
              <h3>今の課題</h3>
              <p>{copy.CAUSE}</p>
            </div>
          </div>

          <div className="result-b-step-card">
            <span>02</span>
            <div>
              <h3>見直すポイント</h3>
              <p>{copy.SOLUTION}</p>
            </div>
          </div>

          <div className="result-b-step-card">
            <span>03</span>
            <div>
              <h3>最初の一手</h3>
              <p>{copy.URGENCY}</p>
            </div>
          </div>

          {expiredOrEnded && (
            <div className="result-b-expired">
              <p>{COMMON_COPY.EXPIRED_LABEL}</p>
              <h3>{COMMON_COPY.EXPIRED_TITLE}</h3>
              <p>{COMMON_COPY.EXPIRED_TEXT}</p>
            </div>
          )}

          {!expiredOrEnded && mainProduct && (
            <div className="result-b-offer">
              <div className="result-b-offer-label">
                あなたにおすすめ
              </div>

              <h3>{mainProduct.name}</h3>

              <p>{mainProduct.description}</p>

              <div ref={ctaAreaRef}>
                <button
                  className="result-b-cta"
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
            className="result-b-reset"
            onClick={handleResetDiagnosis}
          >
            もう一度診断する（確認用）
          </button>
        </div>
      </section>
    </div>
  )
}