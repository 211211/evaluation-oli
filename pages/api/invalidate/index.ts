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
    const indexUrl: number = sampleURLData.findIndex((item: IURL) => item.url === _req.body.url)

    // Invalid url
    if (indexUrl < 0) {
      throw new Error('Bad request')
    }

    const status = SUCCESS
    sampleURLData[indexUrl].lastUpdate = Math.floor(+new Date() / 1000)
    await fs.writeFileSync(filePath, JSON.stringify(sampleURLData))

    res.status(200).json({
      ok: true,
      data: {
        status,
        items: sampleURLData,
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
