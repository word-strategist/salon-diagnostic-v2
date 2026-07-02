import React from 'react'

/* =========================
   共通フッター
========================= */

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        marginTop: '32px',
        padding: '24px 12px 8px',
        borderTop: '1px solid #eadbd6',
        textAlign: 'center',
      }}
    >
      <nav
        aria-label="法的情報"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          lineHeight: 1.8,
        }}
      >
        <a
          href="https://este.salonshukyaku.com/p/tokushouhou"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#8e7b76',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          特定商取引法に基づく表記
        </a>

        <span
          aria-hidden="true"
          style={{ color: '#cbbab5' }}
        >
          |
        </span>

        <a
          href="https://este.salonshukyaku.com/p/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#8e7b76',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          プライバシーポリシー
        </a>
      </nav>
    </footer>
  )
}