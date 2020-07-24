import { NextApiRequest, NextApiResponse } from 'next'
import { generateCacheKeysWithNodes } from 'utils'
import { NOT_FOUND, SUCCESS, SUFFIX } from 'config'

export interface LogEntry {
  type: string
  message: string
}

const logs: LogEntry[] = [];

const formatMessage = (message: any) => typeof message === 'string' ? message : JSON.stringify(message, null, 2)

const log = (type: string, message: any) => {
  logs.push({ type, message: formatMessage(message) });
}

const makeRequestOptions = (url: string): RequestInit => {

  const uri = new URL(url)

  const headers = new Headers()
  headers.append("Host", uri.host)

  return {
    method: 'PURGE',
    headers,
  }
}

const getTitleRegex = /<title.*?>(.*?)<\/title>/g

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      throw new Error('Bad request')
    }

    const requestedUrl: URL = new URL(req.body.url)
    const variations = generateCacheKeysWithNodes(requestedUrl, req.body.headers as Headers)

    log('info', JSON.stringify({ variations }))

    // Skip if no variations were created
    if (!Array.isArray(variations) || !variations.length) {
      return res
        .status(200)
        .json({
          ok: true,
          error: 'Invalid Domain!',
          logs,
        })
    }

    const requestOptions = makeRequestOptions(req.body.url);

    const promises = variations.map((url: string) => {
      return new Promise((resolve, reject) => {
        return fetch(url, requestOptions)
          .then(response => response.text())
          .then(html => resolve({
            url,
            html,
          }))
          .catch(error => {
            log('error', error)
            reject(error.message)
          })
      })
    })

    try {
      const responses = await Promise.all(promises)
      let nodes: any = []
      if (Array.isArray(responses)) {
        nodes = responses.map(({ url, html }: any) => {
          const sentUrl = new URL(url)
          const matchedTitle = getTitleRegex.exec(html)
          const isFailure: boolean = (!matchedTitle || !Array.isArray(matchedTitle) || matchedTitle[1] === '412 Precondition Failed')
          return {
            ip: sentUrl.host,
            url: sentUrl.pathname,
            status: isFailure ? NOT_FOUND : SUCCESS,
            message: matchedTitle ? matchedTitle[1] : 'Unknown reason',
            cachedKey: sentUrl.pathname.replace(SUFFIX, '')
          }
        })
      }
      // console.log({ responses })
      return res.status(200).json({
        ok: true,
        data: {
          nodes
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
