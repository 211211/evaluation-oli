import { NextApiRequest, NextApiResponse } from 'next'
import { generateCacheKeysWithNodes } from '../../../utils'

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

// {
//   ok: true | false,
//   data: any
//   error: string
// }
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
          .then(response => resolve(response.text()))
          .then(result => console.log(result))
          .catch(error => {
            log('error', error)
            reject(error.message)
          })
      })
    })

    try {
      await Promise.all(promises)
      return res.status(200).json({
        ok: true,
        data: variations,
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
