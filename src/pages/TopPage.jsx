import React from 'react'
import { Timer as TimerIcon, BadgeDollarSign, Zap, UserCheck } from "lucide-react";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import { isCampaignEnded, shouldShowTopTimer, CAMPAIGN_END_AT } from "../utils/campaign";

export default function TopPage({ onStart }) {
  const isEnded = isCampaignEnded();
  const showTopTimer = shouldShowTopTimer();

  console.log('campaign debug:', { isEnded, showTopTimer, now: new Date().toISOString(), end: CAMPAIGN_END_AT });

  const handleStartClick = () => {
    if (isEnded) return;
    onStart();
  };

  // 終了後は通常のTOPコンテンツを見せず、終了画面だけ表示
  if (isEnded) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1f3a 0%, #2d3561 100%)',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '24px',
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(24px, 6vw, 34px)',
              fontWeight: 'bold',
              marginBottom: '16px',
              lineHeight: '1.5',
            }}
          >
            この診断は終了しました
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              lineHeight: '1.8',
              margin: 0,
            }}
          >
            たくさんのご参加ありがとうございました。<br />
            現在、この診断の受付は終了しております。
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1f3a 0%, #2d3561 100%)',
      fontFamily: 'sans-serif',
      color: '#ffffff',
    }}>

      {/* TOPタイマー：4/7 20:00〜4/9 23:59の間だけ表示 */}
      {showTopTimer && (
        <div style={{ padding: '24px 20px 0' }}>
          <Timer
            mode="fixed"
            targetDate={CAMPAIGN_END_AT}
            title="この診断の終了まで"
            subtitle="終了後、この診断は受けられません"
            expiredText="終了しました"
          />
        </div>
      )}

      {/* バナー */}
      <img
        src="https://i.ibb.co/Jj14xWy4/2026-01-12.png"
        alt="バナー"
        style={{ width: '100%', display: 'block' }}
      />

      {/* バナー下文言 */}
      <div style={{ textAlign: 'center', padding: '18px 20px 0' }}>
        <p style={{
  color: '#ff2d2d',
  fontSize: '22px',
  fontWeight: '800',
  textAlign: 'center',
  marginBottom: '8px'
}}>
  ⚠️ 4月9日(木)23:59まで
</p>

<p style={{
  color: '#d4af37',
  fontSize: '16px',
  textAlign: 'center',
  marginTop: 0
}}>
  この診断は3日間限定です
</p>
      </div>

      {/* ブロック1：ファーストビュー */}
      <div style={{ textAlign: 'center', padding: '20px 20px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p style={{ color: '#d4af37', fontSize: 'clamp(15px, 3vw, 18px)', marginBottom: '16px' }}>
            毎月の掲載費のために、身を削って働いていませんか？
          </p>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 'bold', lineHeight: '1.7', marginBottom: '24px' }}>
            広告費ゼロでも、優良顧客が自然と集まる。<br />
            あなたのサロンを「高収益体質」に変えるための<br />
            <span style={{ color: '#d4af37' }}>個人サロン経営・健康診断</span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', marginBottom: '40px', color: '#cccccc' }}>
            あなたの課題レベル（集客・リピート・単価）を1分で判定します！
          </p>

          <div
            style={{
              textAlign: 'center',
              marginTop: '24px',
              marginBottom: '24px',
            }}
          >
            <p
              style={{
                color: '#d4af37',
                fontSize: 'clamp(14px,3vw,16px)',
                fontWeight: 'bold',
                lineHeight: '1.7',
                margin: 0,
              }}
            >
              ⚠️この診断は一度しか受けることができません。
            </p>

            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: 'clamp(13px,3vw,14px)',
                lineHeight: '1.8',
                textAlign: 'center',
                marginTop: '16px',
                marginBottom: 0,
              }}
            >
              回答内容に基づいて、あなたのサロンに最適な解決策をご案内します。
              <br />
              できるだけ正確にお答えください。
            </p>
          </div>

          <button
            onClick={handleStartClick}
            style={{
              background: '#d4af37',
              color: '#1a1f3a',
              border: 'none',
              borderRadius: '50px',
              padding: '20px 40px',
              fontSize: 'clamp(15px, 3.5vw, 18px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
              width: '100%',
              maxWidth: '480px',
              boxSizing: 'border-box',
            }}
          >
            1分で完了！サロンの「伸びしろ」を診断する
          </button>

          <p
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(12px,2.8vw,13px)',
              textAlign: 'center',
              marginTop: '12px',
              marginBottom: 0,
              lineHeight: '1.7',
            }}
          >
            ※診断は無料です。
          </p>
        </div>
      </div>

      {/* ブロック2：悩み訴求 */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' }}>
            こんな悩みありませんか？
          </h2>
          {[
            '売上の多くが掲載費に消えていく…',
            'スマホの予約通知が鳴らない。明日の予約表が真っ白で、夜も眠れない',
            'クーポン目当ての一見客ばかり。リピートにつながらず、毎月集客に追われている',
            '値上げをしたら、今いるお客様さえいなくなってしまうのでは…と踏み出せない',
            'SNS集客を試してみたいけど、どこから始めれば…',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
              <span style={{ color: '#d4af37', fontSize: '20px', flexShrink: 0 }}>☑︎</span>
              <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', lineHeight: '1.7', margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ブロック3：診断内容 */}
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ color: '#d4af37', fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 'bold', marginBottom: '16px' }}>
            この診断で分かること
          </h2>
          <p style={{ marginBottom: '32px', color: '#cccccc', fontSize: 'clamp(14px, 3vw, 16px)' }}>たった10問・1分の診断で</p>
          {[
            '今のあなたの経営ステージを「見える化」',
            '脱・ホットペッパー依存への具体策',
            '上川式・高単価サロンへの最短ルート',
          ].map((item, i) => (
            <div key={i} style={{
              border: '1px solid #d4af37',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              textAlign: 'left',
              fontSize: 'clamp(14px, 3vw, 16px)',
            }}>
              <span style={{ color: '#d4af37', fontWeight: 'bold', marginRight: '12px' }}>{i + 1}.</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ブロック4：診断の特徴 */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {[
              { Icon: TimerIcon, label: '簡単', desc: 'たった10問・1分で完了' },
              { Icon: BadgeDollarSign, label: '無料', desc: '完全無料で診断' },
              { Icon: Zap, label: '原因が分かる', desc: 'あなたに最適な集客法が見つかる' },
              { Icon: UserCheck, label: '専門家監修', desc: 'サロン集客のプロが設計' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                  <item.Icon size={34} color="#d4af37" strokeWidth={2.2} />
                </div>

                <div style={{
                  color: '#d4af37',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }}>
                  {item.label}
                </div>

                <div style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: '#cccccc'
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ブロック5：監修者 */}
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ color: '#d4af37', fontSize: 'clamp(17px, 3.5vw, 20px)', fontWeight: 'bold', marginBottom: '32px' }}>
            監修者紹介
          </h2>
          <img
            src="https://i.ibb.co/jPFtBBsF/2026-01-14.jpg"
            alt="上川敏寿"
            style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #d4af37', marginBottom: '20px' }}
          />
          <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: 'clamp(15px, 3.5vw, 18px)', marginBottom: '4px' }}>
            上川 敏寿（かみかわ としひさ）
          </p>
          <p style={{ color: '#cccccc', fontSize: 'clamp(12px, 2.5vw, 14px)', marginBottom: '20px' }}>
            株式会社プライドワン・コーポレーション代表取締役<br />
            個人サロン集客専門コンサルタント
          </p>
          <p style={{ fontSize: 'clamp(13px, 2.8vw, 15px)', lineHeight: '1.8', textAlign: 'left', color: '#dddddd' }}>
            起業14年以上、全国各地の個人サロンを支援。「宣伝費をかけない集客」「ホットペッパーに頼らない集客」の専門家として、多くのサロンオーナーの成功をサポート。
          </p>
        </div>
      </div>

      {/* ブロック6：クロージングCTA */}
      <div style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <button
            onClick={handleStartClick}
            style={{
              background: '#d4af37',
              color: '#1a1f3a',
              border: 'none',
              borderRadius: '50px',
              padding: '20px 40px',
              fontSize: 'clamp(15px, 3.5vw, 18px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
              marginBottom: '16px',
              width: '100%',
              maxWidth: '480px',
              boxSizing: 'border-box',
            }}
          >
            1分で完了！サロンの「伸びしろ」を診断する
          </button>
          <p style={{ color: '#cccccc', fontSize: '14px', marginTop: '12px' }}>約1分で完了します</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}