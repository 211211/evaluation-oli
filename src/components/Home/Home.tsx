import React, { useState } from 'react'
import {
  Container,
  Input,
  Button,
} from './style'
import { Layout, DebugList } from 'components'
import { isMobile, postRequest, isValidHttpUrl } from 'utils'
import { MOBILE, DESKTOP } from 'config'
import { LogEntry } from 'interfaces'

const Home = () => {
  const [url, setUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value.trim())
  }

  const onSubmit = () => {
    setMessage('')
    setLoading(true)
    try {
      if (url.trim().includes(' ')) {
        setError('Please remove white space in your url!')
        return
      }


      if (isValidHttpUrl(url.trim())) {
        const headers = new Headers()
        headers.append('ua_device', isMobile() ? MOBILE : DESKTOP)
        headers.append("Host", url)

        postRequest('/invalidate', {
          url,
          headers
        })
          .then((res: any) => {
            setLogs(res.logs)
            if (res.ok && Array.isArray(res.data) && res.data.length) {
              setMessage(`Invalidation successfully!`)
              setUrl('')
              setError('')
            } else {
              setError(res.error)
            }
          })
          .catch((caughtError: any) => {
            setError(caughtError.message)
          })
      } else {
        setError('Please enter a valid url')
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <h1>Welcome to the CDN Tool 👋</h1>
      <Container>
        <Input
          placeholder={'Please enter url'}
          name='url'
          type='text'
          value={url}
          onChange={onChange}
          disabled={loading}
        />
        &nbsp;&nbsp;
        <Button
          onClick={onSubmit}
          disabled={loading}
        >
          Clear cache
        </Button>
      </Container>
      {
        error && (
          <span style={{ color: 'red' }}>{error}</span>
        )
      }
      {
        message && (
          <span style={{ color: 'green' }}>{message}</span>
        )
      }
      <DebugList items={logs} />
      <br />
    </Layout>
  )
}

export default Home
