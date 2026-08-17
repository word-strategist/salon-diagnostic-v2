import { useEffect } from 'react'
import Footer from '../components/Footer'
import { ICONS } from '../data/icons'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageB3.css'
import Timer from '../components/Timer'
import { CAMPAIGN_END_AT } from '../utils/campaign'

const TOP_IMAGE =
  '/images/top/TOP人物_B2_v1_2026-07-04.png'

const TOP_SUPPORT_IMAGES = {
  intro: '/images/result/Result診断説明人物_v1_2026-07-04.png',
  future: '/images/result/Result未来人物_v1_2026-07-04.png',
  voiceA: '/images/result/ResultVoice人物_A_v1_2026-07-04.png',
  voiceB: '/images/result/ResultVoice人物_B_v1_2026-07-04.png',
}

const EMPATHY_ITEMS = [
  {
    id: 'sns',
    title: 'SNS',
    icon: ICONS.sns,
    text: '頑張って発信しているのに、新規が増えない…',
  },
  {
    id: 'hpb',
    title: 'HPB',
    icon: ICONS.hpb,
    text: '掲載や更新を続けても、反応が少ない…',
  },
  {
    id: 'line',
    title: 'LINE',
    icon: ICONS.line,
    text: '配信しても、閲覧や反応につながらない…',
  },
  {
    id: 'referral',
    title: '紹介',
    icon: ICONS.referral,
    text: '紹介に頼りたいけれど、なかなか増えない…',
  },
]

const DIAGNOSIS_ITEMS = [
  {
    id: 'status',
    icon: ICONS.current,
    text: 'あなたの集客の\n今の状態',
  },
  {
    id: 'type',
    icon: ICONS.type,
    text: 'あなたのサロンに\n合った集客タイプ',
  },
  {
    id: 'priority',
    icon: ICONS.priority,
    text: '優先して取り組むべき\nポイント',
  },
]

const VOICES = [
  {
    id: 'voice-1',
    text: '自分のタイプがわかって、やることが明確になりました！',
  },
  {
    id: 'voice-2',
    text: 'モヤモヤしていた理由が腑に落ちて、行動できるようになりました！',
  },
]

function MultilineText({ text }) {
  return text.split('\n').map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ))
}

export default function TopPageB3({ onStart }) {
  useEffect(() => {
    sendTrackingEvent({
      event_type: 'page_view',
      session_id: getSessionId(),
      page: 'top_b3',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [])

  const handleStart = () => {
    sendTrackingEvent({
      event_type: 'start_click',
      session_id: getSessionId(),
      page: 'top_b3',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    onStart()
  }

  const handleScroll = () => {
    document
      .getElementById('top-b3-empathy')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="top-b3-page">
    <div className="top-b3-phone">
        <Timer
        mode="fixed"
        targetDate={CAMPAIGN_END_AT}
        title="無料診断の受付終了まで"
        subtitle="期間限定で無料公開中"
        expiredText="終了しました"
        />

  <section className="top-b3-hero">
    <div className="top-b3-hero-content">
      <p className="top-b3-hero-eyebrow">
        その理由、すぐわかります
      </p>

      <div className="top-b3-hero-copy">
        <p>あなたのサロンが</p>
        <p>
          <strong>「選ばれにくい理由」</strong>
        </p>
        <p>を確認</p>
      </div>

      <p className="top-b3-hero-subcopy">
        今の集客状態と、
        <br />
        次に整えるポイントがわかります。
      </p>

      <button
        type="button"
        className="top-b3-main-cta"
        onClick={handleStart}
      >
        <span>無料診断をはじめる</span>
        <span aria-hidden="true">›</span>
      </button>

      <p className="top-b3-note">
        無料・登録不要・10問・約1分
      </p>
    </div>

    <div
      className="top-b3-hero-visual"
      aria-label="サロンオーナー"
    >
      <img
        src={TOP_IMAGE}
        alt=""
        loading="eager"
      />
    </div>

    <button
      type="button"
      className="top-b3-next-preview"
      onClick={handleScroll}
    >
      <span>もう少し詳しく見る</span>
      <span aria-hidden="true">﹀</span>
    </button>
  </section>

        <section
          id="top-b3-empathy"
          className="top-b3-section top-b3-empathy"
        >
          <header className="top-b3-section-heading">
            <h2>こんなお悩み、ありませんか？</h2>
          </header>

          <div className="top-b3-empathy-grid">
            {EMPATHY_ITEMS.map((item) => (
              <article
                key={item.id}
                className="top-b3-empathy-card"
              >
                <div
                  className="top-b3-empathy-icon"
                  aria-hidden="true"
                >
                  <img
                    src={item.icon}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <p className="top-b3-empathy-message">
            いろいろ試しているからこそ、
            <br />
            何から整えるべきか分かりにくくなります。
          </p>

          <div className="top-b3-scroll-hook">
            <p>
              だからこそ、
              <br />
              まずは今の状態を整理してみませんか？
            </p>

            <span aria-hidden="true">﹀</span>
          </div>
        </section>

        <section className="top-b3-section top-b3-diagnosis">
          <header className="top-b3-section-heading">
            <p>この診断で</p>
            <h2>分かること</h2>
          </header>

          <div className="top-b3-diagnosis-visual">
            <div className="top-b3-diagnosis-board">
              {DIAGNOSIS_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className="top-b3-diagnosis-card"
                >
                  <span
                    className="top-b3-diagnosis-icon"
                    aria-hidden="true"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      loading="lazy"
                    />
                  </span>

                  <p>
                    <MultilineText text={item.text} />
                  </p>
                </article>
              ))}
            </div>

            <div
              className="top-b3-diagnosis-illustration"
              aria-label="診断で分かることを説明する女性イラスト"
            >
              <img
                src={TOP_SUPPORT_IMAGES.intro}
                alt=""
                loading="lazy"
              />
            </div>
          </div>

          <p className="top-b3-diagnosis-message">
            診断後は、
            <br />
            次の一歩が明確になります。
          </p>

          <span className="top-b3-section-arrow" aria-hidden="true">
            ﹀
          </span>
        </section>

        <section className="top-b3-section top-b3-benefits">
          <header className="top-b3-section-heading">
            <p>診断を受けると</p>
            <h2>こんな変化があります</h2>
          </header>

          <div className="top-b3-benefit-grid">
            <article className="top-b3-benefit-card">
              <span aria-hidden="true">
                <img
                  src={ICONS.current}
                  alt=""
                  loading="lazy"
                />
              </span>
              <p>
                やるべきことが
                <br />
                スッキリ整理
              </p>
            </article>

            <article className="top-b3-benefit-card">
              <span aria-hidden="true">
                <img
                  src={ICONS.type}
                  alt=""
                  loading="lazy"
                />
              </span>
              <p>
                自分に合う方法が
                <br />
                見つかる
              </p>
            </article>

            <article className="top-b3-benefit-card">
              <span aria-hidden="true">
                <img
                  src={ICONS.priority}
                  alt=""
                  loading="lazy"
                />
              </span>
              <p>
                ムリなく成果につながる
                <br />
                行動が分かる
              </p>
            </article>
          </div>

          <div
            className="top-b3-future-image"
            aria-label="診断後の変化を表す女性イラスト"
          >
            <img
              src={TOP_SUPPORT_IMAGES.future}
              alt=""
              loading="lazy"
            />
          </div>

          <p className="top-b3-benefit-message">
            今の状態が見えると、
            <br />
            次に進みやすくなります。
          </p>

          <span className="top-b3-section-arrow" aria-hidden="true">
            ﹀
          </span>
        </section>

        <section className="top-b3-section top-b3-voices">
          <header className="top-b3-section-heading">
            <p>受けた方の声</p>
            <h2>一人で悩まなくて大丈夫です</h2>
          </header>

          <div className="top-b3-voice-list">
            {VOICES.map((voice, index) => (
              <article
                key={voice.id}
                className={`top-b3-voice-item ${
                  index % 2 === 1 ? 'is-reverse' : ''
                }`}
              >
                <div
                  className="top-b3-voice-person"
                  aria-label="利用者イラスト"
                >
                  <img
                    src={
                      index % 2 === 0
                        ? TOP_SUPPORT_IMAGES.voiceA
                        : TOP_SUPPORT_IMAGES.voiceB
                    }
                    alt=""
                    loading="lazy"
                  />
                </div>

                <p>{voice.text}</p>
              </article>
            ))}
          </div>

          <p className="top-b3-disclaimer">
            ※個人の感想です
          </p>

          <span className="top-b3-section-arrow" aria-hidden="true">
            ﹀
          </span>
        </section>

        <section className="top-b3-final-cta">
          <p>
            まずは今の状態を
            <br />
            一緒に見てみましょう。
          </p>

          <button
            type="button"
            className="top-b3-main-cta"
            onClick={handleStart}
          >
            <span>診断をはじめる</span>
            <span aria-hidden="true">›</span>
          </button>

          <p className="top-b3-note">
            無料・登録不要・10問・約1分
          </p>
        </section>

        <Footer />
      </div>
    </main>
  )
}