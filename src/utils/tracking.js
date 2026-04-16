const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyFcKTQQNe6bZIi8OZWgmw7VoM2pF6FLivmtHdCwGPA1Hs7eep6_hikHMj94hAyKeb7/exec'

export function getSessionId() {
  const key = 'diag_session_id'
  let sessionId = localStorage.getItem(key)

  if (!sessionId) {
    sessionId = `sess_${crypto.randomUUID()}`
    localStorage.setItem(key, sessionId)
  }

  return sessionId
}

export async function sendTrackingEvent(payload) {
  try {
    console.log('tracking payload:', payload)

    const response = await fetch(GAS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    const text = await response.text()
    console.log('tracking response status:', response.status)
    console.log('tracking response body:', text)

    try {
      return JSON.parse(text)
    } catch {
      return { ok: false, message: 'response is not json', raw: text }
    }
  } catch (error) {
    console.error('tracking error:', error)
    return { ok: false, message: error.message }
  }
}