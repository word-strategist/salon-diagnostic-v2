import { useEffect } from 'react'
import Footer from '../components/Footer'
import { ICONS } from '../data/icons'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageB.css'
import Timer from '../components/Timer'
import { CAMPAIGN_END_AT } from '../utils/campaign'

const TOP_IMAGE =
  '/images/top/TOP人物_B_v1_2026-07-04.png'

const TOP_SUPPORT_IMAGES = {
  intro: '/images/result/Result診断説明人物_v1_2026-07-04.png',
  voiceA: '/images/result/ResultVoice人物_A_v1_2026-07-04.png',
  voiceB: '/images/result/ResultVoice人物_B_v1_2026-07-04.png',
}

const TELOPS = [
  {
    id: 'method',
    text: 'その集客方法、',
    className: 'top-b-telop-normal',
  },
  {
    id: 'effort',
    text: '頑張ってるのに',
    className: 'top-b-telop-normal',
  },
  {
    id: 'why',
    text: 'なぜか',
    className: 'top-b-telop-accent',
  },
  {
    id: 'unstable',
    text: '予約が安定しない…',
    className: 'top-b-telop-normal',
  },
]

const EMPATHY_ITEMS = [
  {
    id: 'sns',
    icon: ICONS.sns,
    text: 'SNSも頑張ってるのに\n新規が増えない…',
  },
  {
    id: 'hpb',
    icon: ICONS.hpb,
    text: 'ホットペッパーも\n載せてる、反応がイマイチ…',
  },
  {
    id: 'repeat',
    icon: ICONS.heart,
    text: 'リピートしてくれる人は\nいるけど、毎月バラバラ…',
  },
  {
    id: 'priority',
    icon: ICONS.priority,
    text: '何から手をつければ\nいいのか、よくわからない…',
  },
]

const BENEFIT_ITEMS = [
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

const VOICE_ITEMS = [
  {
    id: 'voice-1',
    text: '自分のタイプがわかって\nやることが明確になりました！',
  },
  {
    id: 'voice-2',
    text: 'モヤモヤしていた理由が\n腑に落ちて、行動できるように！',
  },
]

function MultilineText({ text }) {
  const lines = text.split('\n')

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ))
}

export default function TopPageB({ onStart }) {
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
      page: 'top_b',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    onStart()
  }

  const handleScroll = () => {
    document
      .getElementById('top-b-empathy')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
        <main className="top-b-page">
          <div className="top-b-phone">
            <Timer
              mode="fixed"
              targetDate={CAMPAIGN_END_AT}
              title="無料診断の受付終了まで"
              subtitle="期間限定で無料公開中"
              expiredText="終了しました"
            />

            <section className="top-b-firstview">
          <div
            className="top-b-hero-image"
            aria-label="サロンオーナー"
          >
            <img
              src={TOP_IMAGE}
              alt=""
              loading="eager"
            />
          </div>

          <div className="top-b-hero-overlay" />

          <div
            className="top-b-telop-stage"
            aria-label="集客の悩みを表すテロップ"
          >
            {TELOPS.map((telop) => (
              <p
                key={telop.id}
                className={`top-b-telop-item ${telop.className}`}
              >
                {telop.text}
              </p>
            ))}
          </div>

          <div className="top-b-firstview-bottom">
            <div className="top-b-firstview-action">
              <p className="top-b-empathy-copy">
                それ、あなただけじゃないかも。
              </p>

              <p className="top-b-firstview-value">
                今の集客状態と、
                <br />
                次に整えるポイントが分かります。
              </p>

              <button
                type="button"
                className="top-b-firstview-cta"
                onClick={handleStart}
              >
                <span>無料診断をはじめる</span>
                <span aria-hidden="true">›</span>
              </button>

              <p className="top-b-firstview-note">
                無料・登録不要・10問・約1分
              </p>

            </div>
          </div>
        </section>

        <section
          id="top-b-empathy"
          className="top-b-section top-b-empathy-section"
        >
          <header className="top-b-section-heading">
            <p>こんなことで</p>
            <h2>悩んでいませんか？</h2>
          </header>

          <div className="top-b-empathy-list">
            {EMPATHY_ITEMS.map((item, index) => (
              <article
                key={item.id}
                className={`top-b-empathy-item ${
                  index % 2 === 1 ? 'is-reverse' : ''
                }`}
              >
                <div
                  className="top-b-person-slot"
                  aria-label=""
                  aria-hidden="true"
                >
                  <img
                    src={item.icon}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <p>
                  <MultilineText text={item.text} />
                </p>
              </article>
            ))}
          </div>

          <p className="top-b-reaction-copy">
            うんうん、わかります…
          </p>

          <div className="top-b-section-closing">
            <p>
              原因がわかれば、
              <br />
              やるべきことが見えてきます。
            </p>

            <span aria-hidden="true">﹀</span>
          </div>
        </section>

        <section className="top-b-section top-b-benefit-section">
          <header className="top-b-section-heading">
            <p>この診断で</p>
            <h2>わかること</h2>
          </header>

          <div className="top-b-benefit-list">
            {BENEFIT_ITEMS.map((item) => (
              <article
                key={item.id}
                className="top-b-benefit-card"
              >
                <span
                  className="top-b-benefit-icon"
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
            className="top-b-support-image"
            aria-label="診断で分かることを説明する女性イラスト"
          >
            <img
              src={TOP_SUPPORT_IMAGES.intro}
              alt=""
              loading="lazy"
            />
          </div>

          <p className="top-b-benefit-copy">
            モヤモヤが
            <br />
            スッと整理されます。
          </p>

          <span className="top-b-section-arrow" aria-hidden="true">
            ﹀
          </span>
        </section>

        <section className="top-b-section top-b-cta-section">
          <div className="top-b-time-copy">
            <p>診断はたったの10問</p>
            <h2>1分で終わります</h2>
          </div>

          <div className="top-b-stopwatch" aria-hidden="true">
            ◷
          </div>

          <p className="top-b-voice-heading">
            受けた方の声
          </p>

          <div className="top-b-voice-list">
            {VOICE_ITEMS.map((voice, index) => (
              <article
                key={voice.id}
                className={`top-b-voice-item ${
                  index % 2 === 1 ? 'is-reverse' : ''
                }`}
              >
                <div className="top-b-voice-card">
                  <p>
                    <MultilineText text={voice.text} />
                  </p>
                </div>

                <div
                  className="top-b-voice-person"
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
              </article>
            ))}
          </div>

          <p className="top-b-disclaimer">
            ※個人の感想です
          </p>

          <div className="top-b-cta-box">
            <p>
              まずは今の状態を
              <br />
              整理してみませんか？
            </p>

            <button
              type="button"
              className="top-b-cta"
              onClick={handleStart}
            >
              <span>無料診断をはじめる</span>
              <span aria-hidden="true">›</span>
            </button>

            <p className="top-b-note">
              無料・登録不要・10問・約1分
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}