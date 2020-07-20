import path from 'path'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { IURL } from '../../../interfaces'

const filePath = path.join(process.cwd(), 'public/sample-data.json')
const SUCCESS = 1
const NOT_FOUND = 0

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.method !== 'POST') {
      throw new Error('Bad request')
    }

    // Demo purpose so that a sync flow would be accepted
    const rawData = await fs.readFileSync(filePath)
    let sampleURLData = JSON.parse(rawData.toString())
    const requestedUrl: URL = new URL(_req.body.url)
    // const indexUrl: number = sampleURLData.findIndex((item: IURL) => item.url?.includes(requestedUrl.hostname))

    // Invalid url
    // if (indexUrl < 0) {
    if (!requestedUrl || !requestedUrl.hostname) {
      return res.status(200).json({
        ok: true,
        data: NOT_FOUND,
        error: 'Domain is invalid!'
      })
    }

    const status = SUCCESS
    // sampleURLData[indexUrl].lastUpdate = Math.floor(+new Date() / 1000)
    // await fs.writeFileSync(filePath, JSON.stringify(sampleURLData))

    res.status(200).json({
      ok: true,
      data: {
        status,
        items: sampleURLData.map((item: IURL) => ({
          ip: item.ip
        })),
      }
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      data: NOT_FOUND,
      error: err.message
    })
  }
}

export default handler
