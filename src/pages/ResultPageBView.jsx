import './ResultPageBView.css'

const RESULT_LABELS = {
  A: '発信整理タイプ',
  B: 'HPB見直しタイプ',
  C: '相談整理タイプ',
  D: '時短仕組み化タイプ',
}

const LEVEL_LABELS = {
  1: 'まず整える段階',
  2: '伸ばす準備段階',
  3: '次のステージ段階',
}

export default function ResultPageBView({
  resultKey,
  copy,
  mainProduct,
  expiredOrEnded,
  ctaLabel,
  ctaAreaRef,
  handleCtaClick,
  handleResetDiagnosis,
  COMMON_COPY,
}) {
  const [level, type] = resultKey.split('-')
  const typeLabel = RESULT_LABELS[type] || '整理タイプ'
  const levelLabel = LEVEL_LABELS[level] || '現在地確認'

  return (
    <div className="result-b-page">
      <main className="result-b-phone">
        <section className="result-b-card">
          {/* =========================
              Progress
          ========================= */}

          <div className="result-b-progress">
            <div className="result-b-progress-label">
              <span>Salon Check</span>
              <strong>診断結果</strong>
            </div>

            <div className="result-b-progress-bar">
              <span />
            </div>
          </div>

          {/* =========================
              Result Hero
          ========================= */}

          <section className="result-b-hero">
            <p className="result-b-kicker">
              診断おつかれさまでした！
              <br />
              あなたのタイプはこちら
            </p>

            <div className="result-b-type-box">
              <span>TYPE</span>
              <strong>{type}</strong>
            </div>

            <h1>{typeLabel}</h1>

            <p className="result-b-level">
              {levelLabel}
            </p>

            <div
              className="result-b-visual-slot"
              aria-label="診断タイプ画像の予定位置"
            />
          </section>

          {/* =========================
              Current Cause
          ========================= */}

          <section className="result-b-info-card">
            <div className="result-b-icon">○</div>

            <div>
              <h2>今のあなたに起きていること</h2>
              <p>{copy.CAUSE}</p>
            </div>
          </section>

          {/* =========================
              Solution
          ========================= */}

          <section className="result-b-info-card">
            <div className="result-b-icon">♡</div>

            <div>
              <h2>ここから整えていくこと</h2>
              <p>{copy.SOLUTION}</p>
            </div>
          </section>

          {/* =========================
              Urgency
          ========================= */}

          <section className="result-b-info-card">
            <div className="result-b-icon">!</div>

            <div>
              <h2>今、取り組んでおきたい理由</h2>
              <p>{copy.URGENCY}</p>
            </div>
          </section>

          {/* =========================
              Expired
          ========================= */}

          {expiredOrEnded && (
            <section className="result-b-expired">
              <p>{COMMON_COPY.EXPIRED_LABEL}</p>
              <h2>{COMMON_COPY.EXPIRED_TITLE}</h2>
              <p>{COMMON_COPY.EXPIRED_TEXT}</p>
            </section>
          )}

          {/* =========================
              Product Offer
          ========================= */}

          {!expiredOrEnded && mainProduct && (
            <section
              className="result-b-offer"
              ref={ctaAreaRef}
            >
              <div className="result-b-card-heading">
                <div className="result-b-icon">◇</div>

                <h2>
                  診断者限定のご案内があります
                </h2>
              </div>

              <p className="result-b-offer-copy">
                {copy.PRE_CTA}
              </p>

              <div className="result-b-product-box">
                <span>
                  あなたに合った次の一歩
                </span>

                <strong>
                  {mainProduct.name}
                </strong>

                <p>
                  {mainProduct.description}
                </p>
              </div>

              <button
                type="button"
                className="result-b-cta"
                onClick={handleCtaClick}
              >
                {ctaLabel}
                <span>›</span>
              </button>

              <p className="result-b-note">
                ※画像・イラストは後でまとめて差し替えます
              </p>
            </section>
          )}

          {/* =========================
              Reset
          ========================= */}

          <button
            type="button"
            className="result-b-reset"
            onClick={handleResetDiagnosis}
          >
            もう一度診断する（確認用）
          </button>
        </section>
      </main>
    </div>
  )
}