import {InvalidationStatus, SUFFIX} from '@/config'
import {generateCacheKeysWithNodes} from '@/utils'
import {NextApiRequest, NextApiResponse} from 'next'

export interface LogEntry {
  type: string
  message: string
}

const logs: LogEntry[] = []

const formatMessage = (message: any) => (typeof message === 'string' ? message : JSON.stringify(message, null, 2))

const log = (type: string, message: any) => {
  logs.push({type, message: formatMessage(message)})
}

const makeRequestOptions = (url: string): RequestInit => {
  const uri = new URL(url)

  const headers = new Headers()
  headers.append('Host', uri.host)

  return {
    method: 'PURGE',
    headers,
  }
}

const getResponseStatusString = (html: string): string | null => {
  const matched = /<title.*?>(.*?)<\/title>/g.exec(html)
  let statusString = ''

  if (Array.isArray(matched) && matched.length > 0) {
    statusString = matched[1]
  }

  return statusString
}

const getResponseStatus = (statusString: string): string | null => {
  switch (statusString) {
    case 'Successful purge':
      return InvalidationStatus.Success
    case '412 Precondition Failed':
      return InvalidationStatus.NotFound
    default:
      return InvalidationStatus.Error
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      throw new Error('Bad request')
    }

    const requestedUrl: URL = new URL(req.body.url)
    const variations = generateCacheKeysWithNodes(requestedUrl, req.body.headers as Headers)

    log('info', {variations})

    // Skip if no variations were created
    if (!Array.isArray(variations) || !variations.length) {
      return res.status(200).json({
        ok: true,
        error: 'Invalid Domain!',
        logs,
      })
    }

    const requestOptions = makeRequestOptions(req.body.url)

    const promises = variations.map(async (url: string) => {
      try {
        const response = await fetch(url, requestOptions)
        const html = await response.text()
        return {url, html}
      } catch (e) {
        log('error', e)
        throw e
      }
    })

    try {
      const responses = await Promise.all(promises)
      let nodes: any = []
      if (Array.isArray(responses)) {
        nodes = responses.map(({url, html}: any) => {
          const sentUrl = new URL(url)
          console.log(html)
          const message = getResponseStatusString(html)

          return {
            message,
            ip: sentUrl.host,
            url: sentUrl.pathname,
            status: getResponseStatus(message || ''),
            cachedKey: sentUrl.pathname.replace(SUFFIX, ''),
          }
        })
      }
      // console.log({ responses })
      return res.status(200).json({
        ok: true,
        data: {
          nodes,
        },
        logs,
      })
    } catch (error) {
      return res.status(200).json({
        ok: true,
        error,
        logs,
      })
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message,
      logs,
    })
  }
}

export default handler
