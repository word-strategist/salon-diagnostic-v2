export function getAbVariant() {
  const params = new URLSearchParams(window.location.search)
  const variant = params.get('variant')

  if (variant === 'a') return 'a'
  if (variant === 'b') return 'b'

  return 'a'
}
