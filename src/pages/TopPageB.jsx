import './TopPageB.css'

function TopPageB() {
  const handleStart = () => {
    window.location.href = '/question?variant=b'
  }

  return (
    <div className="top-b-page">
      <main className="top-b-shell">
        <section className="top-b-hero">
          <div className="top-b-badge">SALON DIAGNOSIS</div>

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
            60秒で診断します
          </h1>

          <p className="top-b-lead">
            SNS時代のサロン集客は、
            <br />
            「頑張る量」より
            <br />
            「見直す順番」が大切です。
          </p>

          <button className="top-b-cta" onClick={handleStart}>
            無料で診断をはじめる
          </button>

          <p className="top-b-note">
            登録不要・完全無料｜診断は約60秒
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