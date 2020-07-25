import {LogEntry} from '@/interfaces'
import {generateCacheKeysWithNodes, makeRequestOptions, transferInvalidationResult} from '@/utils'
import {NextApiRequest, NextApiResponse} from 'next'

const logs: LogEntry[] = []

const formatMessage = (message: any) => (typeof message === 'string' ? message : JSON.stringify(message, null, 2))

const log = (type: string, message: any) => {
  logs.push({type, message: formatMessage(message)})
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      throw new Error('Bad request')
    }

    // create a URL instance from requested url
    const requestedUrl: URL = new URL(req.body.url)

    // generate all available cached-keys for given url
    const variations = generateCacheKeysWithNodes(requestedUrl)

    log('info', {variations})

    // Skip if no variations were created
    if (!Array.isArray(variations) || !variations.length) {
      return res.status(200).json({
        ok: true,
        error: 'Invalid Domain!',
        logs,
      })
    }

    // prepare headers
    const requestOptions = makeRequestOptions(req.body.url)

    // execute all variations and map 1vs1 the result to the sent request
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

    // parsed html result
    const invalidationResult = transferInvalidationResult(await Promise.all(promises))

    return res.status(200).json({
      ok: true,
      data: invalidationResult,
      logs,
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message,
      logs,
    })
  }
}

export default handler
