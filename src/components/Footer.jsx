import React from 'react'
export default function Footer() {
  return (
    <div
      style={{
        padding: '30px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <p style={{ color: '#888888', fontSize: '13px' }}>
        <a
          href="https://este.salonshukyaku.com/p/tokushouhou"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#888888' }}
        >
          特定商取引法
        </a>
        　｜　
        <a
          href="https://este.salonshukyaku.com/p/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#888888' }}
        >
          プライバシーポリシー
        </a>
      </p>
    </div>
  )
}