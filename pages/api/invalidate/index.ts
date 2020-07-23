import { NextApiRequest, NextApiResponse } from 'next'
import { generateCacheKeysWithNodes } from '../../../utils'

// {
//   ok: true | false,
//   data: any
//   error: string
// }
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.method !== 'POST') {
      throw new Error('Bad request')
    }

    const requestedUrl: URL = new URL(_req.body.url)
    const variations = generateCacheKeysWithNodes(requestedUrl, _req.body.headers as Headers)
    console.log({variations})
    if (Array.isArray(variations) && variations.length) {
      const requestOptions = {
        method: 'PURGE',
        headers: _req.body.headers
      }

      const promises = variations.map((url: string) => {
        return new Promise((resolve, reject) => {
          return fetch(url, requestOptions)
            .then(response => resolve(response.text()))
            .then(result => console.log(result))
            .catch(error => {
              console.log('error', error)
              reject(error.message)
            })
        })
      })

      await Promise.all(promises)
        .then(() => {
          res.status(200).json({
            ok: true,
            data: variations
          })
        })
        // we still return 200 because request reached our server
        .catch((error) => {
          res.status(200).json({
            ok: true,
            error
          })
        })
    } else {
      return res
        .status(200)
        .json({
          ok: true,
          error: 'Domain is invalid!'
        })
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message
    })
  }
}

export default handler
