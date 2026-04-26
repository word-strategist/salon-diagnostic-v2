import React from 'react'
import { useState, useEffect, useMemo } from 'react'

const COLORS = {
  red: '#ff2d2d',
  text: '#5a4a4a',
  muted: '#9f8e8e',
}

export default function Timer({
  isConsultation = false,
  onExpireChange,
  mode = 'offer', // 'offer' | 'fixed'
  targetDate = null,
  title,
  subtitle,
  expiredText = '終了しました',
}) {
  const STORAGE_KEY = useMemo(() => {
    if (mode !== 'offer') return null
    return isConsultation
      ? 'consultation_offer_deadline'
      : 'product_offer_deadline'
  }, [mode, isConsultation])

  const getInitialTime = () => {
    const now = Date.now()

    if (mode === 'fixed' && targetDate) {
      const fixedDeadline = new Date(targetDate).getTime()
      return Math.max(0, Math.floor((fixedDeadline - now) / 1000))
    }

    if (mode === 'offer' && STORAGE_KEY) {
      const savedDeadline = localStorage.getItem(STORAGE_KEY)

      if (savedDeadline) {
        return Math.max(0, Math.floor((Number(savedDeadline) - now) / 1000))
      }

      const newDeadline = now + 24 * 60 * 60 * 1000
      localStorage.setItem(STORAGE_KEY, String(newDeadline))
      return 24 * 60 * 60
    }

    return 0
  }

  const [time, setTime] = useState(getInitialTime)

  useEffect(() => {
    setTime(getInitialTime())
  }, [mode, targetDate, STORAGE_KEY])

  useEffect(() => {
    if (onExpireChange) {
      onExpireChange(time <= 0)
    }
  }, [time, onExpireChange])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now()

      if (mode === 'fixed' && targetDate) {
        const fixedDeadline = new Date(targetDate).getTime()
        const remaining = Math.max(0, Math.floor((fixedDeadline - now) / 1000))
        setTime(remaining)
        return
      }

      if (mode === 'offer' && STORAGE_KEY) {
        const savedDeadline = localStorage.getItem(STORAGE_KEY)
        if (!savedDeadline) return

        const remaining = Math.max(
          0,
          Math.floor((Number(savedDeadline) - now) / 1000)
        )

        setTime(remaining)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [mode, targetDate, STORAGE_KEY])

  const days = Math.floor(time / 86400)
  const hours = Math.floor((time % 86400) / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  const d = String(days)
  const h = String(hours).padStart(2, '0')
  const m = String(minutes).padStart(2, '0')
  const s = String(seconds).padStart(2, '0')

  const displayTitle =
    title ??
    (isConsultation ? '無料相談の予約期限まで' : 'この特別オファーの残り時間')

  const displaySubtitle =
    subtitle ??
    (isConsultation
      ? '期限を過ぎると予約が締め切られます'
      : 'このご案内は24時間限定です')

  return (
    <div
      style={{
        //border: `2px solid ${COLORS.red}`,
       // borderRadius: '12px',
        //padding: '24px 16px',
        textAlign: 'center',
        maxWidth: '480px',
        margin: '0 auto 16px',
        boxSizing: 'border-box',
      }}
    >
      <p
        style={{
          color: COLORS.white,
          fontSize: 'clamp(13px, 3vw, 15px)',
          marginBottom: '12px',
        }}
      >
        {displayTitle}
      </p>

      {time > 0 ? (
        <>
          <div
            style={{
              color: COLORS.red,
              fontSize: days > 0 ? 'clamp(28px, 8vw, 44px)' : 'clamp(36px, 10vw, 52px)',
              fontWeight: 'bold',
              letterSpacing: days > 0 ? '2px' : '4px',
              lineHeight: 1.2,
            }}
          >
            {days > 0 ? `${d}日 ${h}:${m}:${s}` : `${h}:${m}:${s}`}
          </div>

          <p
            style={{
              color: COLORS.muted,
              fontSize: 'clamp(11px, 2.5vw, 13px)',
              marginTop: '8px',
            }}
          >
            {displaySubtitle}
          </p>
        </>
      ) : (
        <div
          style={{
            color: COLORS.red,
            fontSize: 'clamp(28px, 8vw, 40px)',
            fontWeight: 'bold',
          }}
        >
          {expiredText}
        </div>
      )}
    </div>
  )
}