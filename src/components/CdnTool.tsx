import React, { useState } from 'react'
import styled from 'styled-components'
// import { DebugList } from '@/components/DebugList'
import { Layout } from '@/components/Layout'
import { ApiList } from '@/components/ApiList'
import {
  // isMobile,
  postRequest,
  isValidHttpUrl
} from 'utils'
// import { MOBILE, DESKTOP } from 'config'
import { LogEntry } from 'interfaces'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Input = styled.input`
  width: 582px;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  height: 44px;
  font-size: 16px;
  background-color: transparent;
  padding: 0 16px;

  &:hover {
    box-shadow: 0 1px 6px 0 rgba(33,36,0.28);
    border-color: rgba(223,225,229,0);
  }
`

const Button = styled.button`
  height: 44px;
  border-Radius: 24px;
  border: 1px solid #dfe1e5;
  font-size: 16px;
  padding: 0 16px;
`


export const CdnTool = () => {
  const [url, setUrl] = useState<string>('')
  const [nodes, setNodes] = useState<any>([])
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

        postRequest('/invalidate', {
          url,
        })
          .then((res: any) => {
            setLogs(res.logs)
            if (res.ok && res.data && Array.isArray(res.data.nodes) && res.data.nodes.length) {
              setNodes(res.data.nodes)
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
          style={{
            borderColor: error ? 'red' : '#dfe1e5'
          }}
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
      <br />
      {/* <DebugList items={logs} /> */}
      <br />
      <ApiList items={nodes} />
    </Layout>
  )
}
