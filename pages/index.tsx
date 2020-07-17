import React, { useState, useEffect } from 'react'
import sampleURLData from '../sample-data.json'
import { ApiList } from '../components'
import { isValidHttpUrl } from '../utils'

import Layout from '../components/Layout'
import { postRequest } from '../utils/request'

const IndexPage = () => {
  const [url, setUrl] = useState<string>('')
  const [items, setItems] = useState<any>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // init data
  useEffect(() => {
    // store current data into localStorage
    const storageItems = window.localStorage.getItem('items') || ''
    if (storageItems) {
      setItems(JSON.parse(storageItems))
    } else {
      window.localStorage.setItem('items', JSON.stringify(sampleURLData))
      setItems(sampleURLData)
    }
  }, [])

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value.trim())
  }

  const onSubmit = () => {
    setLoading(true)
    try {
      if (url.trim().includes(' ')) {
        setError('Please remove white space in your url!')
        return
      }

      // todo
      if (isValidHttpUrl(url.trim())) {
        postRequest('/invalidate', { url }).then((res: any) => {
          console.log({ res })
          if (res.data.items && Array.isArray(res.data.items)) {
            setItems(res.data.items)
            window.localStorage.setItem('items', JSON.stringify(res.data.items))
          }

          setUrl('')
          setError('')
        })
      } else {
        setError('Please enter a valid url')
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <h1>Welcome 👋</h1>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <input
          style={{
            width: 200,
            border: '1px solid grey',
            borderColor: error ? 'red' : 'grey'
          }}
          placeholder={'Please enter url'}
          name='url'
          type='text'
          value={url}
          onChange={onChange}
          disabled={loading}
        />
        &nbsp;&nbsp;
        <button
          onClick={onSubmit}
          disabled={loading}
        >
          Clear cache
        </button>
      </div>
      {
        error && (
          <span style={{ color: 'red' }}>{error}</span>
        )
      }
      <br />
      <ApiList items={items} />
    </Layout>
  )
}

export default IndexPage
