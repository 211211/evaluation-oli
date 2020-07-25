// we only accept https request
export function isValidHttpsUrl(url: string) {
  let _url

  try {
    _url = new URL(url)
  } catch (_) {
    return false
  }

  return _url.protocol === 'https:'
}
