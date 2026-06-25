export function getAbVariant() {
  const searchParams = new URLSearchParams(window.location.search)
  const searchVariant = searchParams.get('variant')?.toLowerCase()

  if (searchVariant === 'a' || searchVariant === 'b') {
    localStorage.setItem('ab_variant', searchVariant)
    return searchVariant
  }

  const hash = window.location.hash || ''
  const hashQuery = hash.includes('?') ? hash.split('?')[1] : ''
  const hashParams = new URLSearchParams(hashQuery)
  const hashVariant = hashParams.get('variant')?.toLowerCase()

  if (hashVariant === 'a' || hashVariant === 'b') {
    localStorage.setItem('ab_variant', hashVariant)
    return hashVariant
  }

  const savedVariant = localStorage.getItem('ab_variant')
  if (savedVariant === 'a' || savedVariant === 'b') {
    return savedVariant
  }

  return 'a'
}