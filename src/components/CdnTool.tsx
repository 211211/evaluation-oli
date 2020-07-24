import {DebugList} from '@/components/DebugList'
import {Layout} from '@/components/Layout'
import {ResultList} from '@/components/ResultList'
import {LogEntry} from '@/interfaces'
import {isValidHttpUrl, postRequest} from '@/utils'
import React, {useState} from 'react'
import styled from 'styled-components'
import {InputBar} from './InputBar'
import {MessageLine} from './MessageLine'

const StyledHeading = styled.h1`
  margin-bottom: 3rem;
`

export const CdnTool = () => {
  const [nodes, setNodes] = useState<any>([])
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const onSubmit = (url: string) => {
    setMessage('')
    setLoading(true)
    try {
      if (url.trim().includes(' ')) {
        setError('Please remove white space in your url!')
        return
      }

      if (isValidHttpUrl(url.trim())) {
        postRequest('/invalidate', {url})
          .then((res: any) => {
            setLogs(res.logs)
            if (res.ok && res.data && Array.isArray(res.data.nodes) && res.data.nodes.length) {
              setNodes(res.data.nodes)
              setMessage(`Invalidation successful`)
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
      <StyledHeading>Welcome to the CDN Tool 👋</StyledHeading>
      <InputBar disabled={loading} hasError={!!error} onSubmit={onSubmit} />
      <MessageLine status={error ? 'error' : message ? 'message' : 'none'}>{error || message}</MessageLine>
      <ResultList items={nodes} />
      <DebugList items={logs} />
    </Layout>
  )
}
