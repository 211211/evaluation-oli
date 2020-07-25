import {DebugList} from '@/components/DebugList'
import {Layout} from '@/components/Layout'
import {ResultList} from '@/components/ResultList'
import {Invalidate, LogEntry} from '@/interfaces'
import {isValidHttpsUrl, postRequest} from '@/utils'
import React, {useState} from 'react'
import styled from 'styled-components'
import {InputBar} from './InputBar'
import {MessageLine} from './MessageLine'

const StyledHeading = styled.h1`
  margin-bottom: 3rem;
`

export const CdnTool = () => {
  const [nodes, setNodes] = useState<any>([])
  const [error, setError] = useState<string | undefined>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const onSubmit = async (url: string) => {
    setMessage('')
    setLoading(true)

    try {
      if (url.trim().includes(' ')) {
        setError('Please remove white space in your url!')
        return
      }

      if (!isValidHttpsUrl(url.trim())) {
        setError('Please enter a valid https request')
        return
      }

      const {
        ok = false,
        data = [],
        error: responsedError = 'Unknown error',
        logs: responsedLogs = [],
      }: Invalidate = await postRequest('/invalidate', {url})
      setLogs(responsedLogs)
      if (!ok) {
        setError(responsedError)
        return
      }

      // show node list
      setNodes(data)
      setMessage(`Invalidation successful`)
      setError('')
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
