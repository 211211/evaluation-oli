import axios from 'axios'
import qs from 'querystring'

const BASE_URL = process.env.BASE_URL
const API_SUFFIX = process.env.API_SUFFIX

export const postRequest = async (path: string, body?: any) => {
    const url = `${BASE_URL}${API_SUFFIX}${path}`
    const { data, status } = await axios.post(
        url,
        qs.stringify(body)
    )

    if (status !== 200) {
        return
    }

    return data
}
