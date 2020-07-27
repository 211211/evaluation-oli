import {InvalidationStatus, suffix} from '@/config'
import {Node} from '@/interfaces'

export const makeRequestOptions = (url: string): RequestInit => {
  const uri = new URL(url)

  const headers = new Headers()
  headers.append('Host', uri.host)

  return {
    method: 'PURGE',
    headers,
  }
}

export const getResponseStatusString = (html: string): string => {
  let statusString = ''
  try {
    const matched = /<title.*?>(.*?)<\/title>/g.exec(html)

    if (Array.isArray(matched) && matched.length > 0) {
      statusString = matched[1]
    }

    return statusString
  } catch (_) {
    return statusString
  }
}

const SUCESSS_PURGE = 'Successful purge'
const PRECONDITION_FAILED = '412 Precondition Failed'

export const getResponseStatus = (statusString: string): string => {
  switch (statusString) {
    case SUCESSS_PURGE:
      return InvalidationStatus.Success
    case PRECONDITION_FAILED:
      return InvalidationStatus.NotFound
    default:
      return InvalidationStatus.Error
  }
}

interface TransferInvalidationResultProps {
  url: string
  html: string
}

export const transferInvalidationResult = (responses: TransferInvalidationResultProps[]): Node[] => {
  const nodes = responses.map(
    ({url, html}: any): Node => {
      const sentUrl = new URL(url)
      const message = getResponseStatusString(html)

      return {
        message,
        ip: sentUrl.host,
        url: sentUrl.pathname,
        status: getResponseStatus(message),
        cachedKey: sentUrl.pathname.replace(suffix, ''),
      }
    },
  )

  return nodes
}
