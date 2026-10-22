import { useEffect } from 'react'
import Footer from '../components/Footer'
import { ICONS } from '../data/icons'
import { getSessionId, sendTrackingEvent } from '../utils/tracking'
import './TopPageB2.css'
import Timer from '../components/Timer'
import { CAMPAIGN_END_AT } from '../utils/campaign'
import TopFvDark from './TopFvDark'

const TOP_IMAGE =
  '/images/top/TOP人物_B2_v1_2026-07-04.png'

const TOP_SUPPORT_IMAGES = {
  intro: '/images/result/Result診断説明人物_v1_2026-07-04.png',
  future: '/images/result/Result未来人物_v1_2026-07-04.png',
  voiceA: '/images/result/ResultVoice人物_A_v1_2026-07-04.png',
  voiceB: '/images/result/ResultVoice人物_B_v1_2026-07-04.png',
}

// textV5：第5回TOP（b5a・b5b）のみの文言。従来のB2は text を使う
const EMPATHY_ITEMS = [
  {
    id: 'sns',
    title: 'SNS',
    icon: ICONS.sns,
    text: '頑張って発信しているのに、新規が増えない…',
    textV5: '頑張っているのに\n新規が増えない…',
  },
  {
    id: 'hpb',
    title: 'HPB',
    icon: ICONS.hpb,
    text: '掲載や更新を続けても、反応が少ない…',
    textV5: '掲載や更新をしても\n反応がほとんどない',
  },
  {
    id: 'line',
    title: 'LINE',
    icon: ICONS.line,
    text: '配信しても、閲覧や反応につながらない…',
    textV5: '時間をかけて配信しても\n閲覧や反応につながらない',
  },
  {
    id: 'referral',
    title: '紹介',
    icon: ICONS.referral,
    text: '紹介に頼りたいけれど、なかなか増えない…',
    textV5: '口コミを期待するも\nなかなか増えない…',
  },
]

const DIAGNOSIS_ITEMS = [
  {
    id: 'status',
    icon: ICONS.current,
    text: 'あなたの集客の\n今の状態',
    textV5: 'あなたの現在の集客状態',
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
    textV5: '取り組みの優先ポイント',
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

// fvVariant：未指定なら従来のB2 FV。'a' / 'b' は第5回の黒系FV（タイマーA案・B案）
// pageId：計測用のページ名（未指定なら従来どおり top_b2）
export default function TopPageB2({
  onStart,
  fvVariant = null,
  pageId = 'top_b2',
}) {
  useEffect(() => {
    sendTrackingEvent({
      event_type: 'page_view',
      session_id: getSessionId(),
      page: pageId,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })
  }, [pageId])

  const handleStart = () => {
    sendTrackingEvent({
      event_type: 'start_click',
      session_id: getSessionId(),
      page: pageId,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    })

    onStart()
  }

  // 第5回TOP（黒系FV使用時）のみの表記。従来のB2は変更しない
  const isV5 = Boolean(fvVariant)

  const handleScroll = () => {
    document
      .getElementById('top-b2-empathy')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main
      className={`top-b2-page${fvVariant ? ' top-b2-page--v5' : ''}`}
    >
    <div className="top-b2-phone">
        {fvVariant ? (
          <TopFvDark
            layout={fvVariant}
            onStart={handleStart}
            onScroll={handleScroll}
          />
        ) : (
        <>
        <Timer
        mode="fixed"
        targetDate={CAMPAIGN_END_AT}
        title="無料診断の受付終了まで"
        subtitle="期間限定で無料公開中"
        expiredText="終了しました"
        />

        <section className="top-b2-hero">
          <div className="top-b2-hero-content">
            <div className="top-b2-hero-copy">
              <p>サロン集客、</p>
              <p>頑張っているのに</p>
              <p>うまくつながらない…</p>
            </div>

            <p className="top-b2-hero-subcopy">
              10問に答えると、
              <br />
              今の集客状態と
              <br />
              優先して取り組むポイントが分かります。
            </p>

            <button
              type="button"
              className="top-b2-main-cta"
              onClick={handleStart}
            >
              <span>無料診断をはじめる</span>
              <span aria-hidden="true">›</span>
            </button>

            <p className="top-b2-note">
              無料・登録不要・10問・約1分
            </p>
          </div>

          <div
            className="top-b2-hero-visual"
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
            className="top-b2-next-preview"
            onClick={handleScroll}
          >
            <span>こんなお悩み、ありませんか？</span>
            <span aria-hidden="true">﹀</span>
          </button>
        </section>
        </>
        )}

        <section
          id="top-b2-empathy"
          className="top-b2-section top-b2-empathy"
        >
          <header className="top-b2-section-heading">
            <h2>
              {isV5 ? (
                <>
                  こんなお悩み、
                  <br />
                  ありませんか？
                </>
              ) : (
                'こんなお悩み、ありませんか？'
              )}
            </h2>
          </header>

          <div className="top-b2-empathy-grid">
            {EMPATHY_ITEMS.map((item) => (
              <article
                key={item.id}
                className="top-b2-empathy-card"
              >
                <div
                  className="top-b2-empathy-icon"
                  aria-hidden="true"
                >
                  <img
                    src={item.icon}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <h3>{item.title}</h3>
                <p>
                  {isV5 && item.textV5 ? (
                    <MultilineText text={item.textV5} />
                  ) : (
                    item.text
                  )}
                </p>
              </article>
            ))}
          </div>

          <p className="top-b2-empathy-message">
            {isV5 ? (
              <>
                いろいろ頑張って試しているからこそ、
                <br />
                何をすれば良いのかわかりませんよね。
              </>
            ) : (
              <>
                いろいろ試しているからこそ、
                <br />
                何から整えるべきか分かりにくくなります。
              </>
            )}
          </p>

          <div className="top-b2-scroll-hook">
            <p>
              {isV5 ? (
                <>
                  あなたが今抱えている問題を
                  <br />
                  知りたいとは思いませんか？
                </>
              ) : (
                <>
                  だからこそ、
                  <br />
                  まずは今の状態を整理してみませんか？
                </>
              )}
            </p>

            <span aria-hidden="true">﹀</span>
          </div>
        </section>

        <section className="top-b2-section top-b2-diagnosis">
          <header className="top-b2-section-heading">
            <p>この診断で</p>
            <h2>{isV5 ? 'わかること' : '分かること'}</h2>
          </header>

          <div className="top-b2-diagnosis-visual">
            <div className="top-b2-diagnosis-board">
              {DIAGNOSIS_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className="top-b2-diagnosis-card"
                >
                  <span
                    className="top-b2-diagnosis-icon"
                    aria-hidden="true"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      loading="lazy"
                    />
                  </span>

                  <p>
                    <MultilineText
                      text={isV5 && item.textV5 ? item.textV5 : item.text}
                    />
                  </p>
                </article>
              ))}
            </div>

            <div
              className="top-b2-diagnosis-illustration"
              aria-label="診断で分かることを説明する女性イラスト"
            >
              <img
                src={TOP_SUPPORT_IMAGES.intro}
                alt=""
                loading="lazy"
              />
            </div>
          </div>

          <p className="top-b2-diagnosis-message">
            診断後は、
            <br />
            {isV5 ? '次の『一歩』が明確になります。' : '次の一歩が明確になります。'}
          </p>

          <span className="top-b2-section-arrow" aria-hidden="true">
            ﹀
          </span>
        </section>

        <section className="top-b2-section top-b2-benefits">
          <header className="top-b2-section-heading">
            <p>診断を受けると</p>
            <h2>こんな変化があります</h2>
          </header>

          <div className="top-b2-benefit-grid">
            <article className="top-b2-benefit-card">
              <span aria-hidden="true">
                <img
                  src={ICONS.current}
                  alt=""
                  loading="lazy"
                />
              </span>
              <p>
                {isV5 ? (
                  'すぐにやることがわかります'
                ) : (
                  <>
                    やるべきことが
                    <br />
                    スッキリ整理
                  </>
                )}
              </p>
            </article>

            <article className="top-b2-benefit-card">
              <span aria-hidden="true">
                <img
                  src={ICONS.type}
                  alt=""
                  loading="lazy"
                />
              </span>
              <p>
                {isV5 ? (
                  '自分に合う方法が見つかります'
                ) : (
                  <>
                    自分に合う方法が
                    <br />
                    見つかる
                  </>
                )}
              </p>
            </article>

            <article className="top-b2-benefit-card">
              <span aria-hidden="true">
                <img
                  src={ICONS.priority}
                  alt=""
                  loading="lazy"
                />
              </span>
              <p>
                {isV5 ? (
                  '成果へ向けた行動に移せます'
                ) : (
                  <>
                    ムリなく成果につながる
                    <br />
                    行動が分かる
                  </>
                )}
              </p>
            </article>
          </div>

          <div
            className="top-b2-future-image"
            aria-label="診断後の変化を表す女性イラスト"
          >
            <img
              src={TOP_SUPPORT_IMAGES.future}
              alt=""
              loading="lazy"
            />
          </div>

          <p className="top-b2-benefit-message">
            今の状態が見えると、
            <br />
            次に進みやすくなります。
          </p>

          <span className="top-b2-section-arrow" aria-hidden="true">
            ﹀
          </span>
        </section>

        <section className="top-b2-section top-b2-voices">
          <header className="top-b2-section-heading">
            <p>受けた方の声</p>
            <h2>
              {isV5 ? '1人で悩まなくて大丈夫です' : '一人で悩まなくて大丈夫です'}
            </h2>
          </header>

          <div className="top-b2-voice-list">
            {VOICES.map((voice, index) => (
              <article
                key={voice.id}
                className={`top-b2-voice-item ${
                  index % 2 === 1 ? 'is-reverse' : ''
                }`}
              >
                <div
                  className="top-b2-voice-person"
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

          <p className="top-b2-disclaimer">
            ※個人の感想です
          </p>

          <span className="top-b2-section-arrow" aria-hidden="true">
            ﹀
          </span>
        </section>

        <section className="top-b2-final-cta">
          <p>
            まずは今の状態を
            <br />
            一緒に見てみましょう。
          </p>

          <button
            type="button"
            className="top-b2-main-cta"
            onClick={handleStart}
          >
            <span>診断をはじめる</span>
            <span aria-hidden="true">›</span>
          </button>

          <p className="top-b2-note">
            無料・登録不要・10問・約1分
          </p>
        </section>

        <Footer />
      </div>
    </main>
  )
}