import React, { useState } from 'react'
import { isValidHttpUrl } from '../utils'
import styled from 'styled-components'

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
  border-color: error ? red : #dfe1e5;
  padding: 0 16px;

  &:hover {
    box-shadow: 0 1px 6px 0 rgba(32;33,36,0.28);
    border-color: rgba(223,225,229,0);
  }
`

const Button = styled.button`
  height: 44px;
  border-Radius: 24px;
  border: 1px solid #dfe1e5;
  font-s  ize: 16px;
  padding: 0 16px;
`

import Layout from '../components/Layout'
import { isMobile, postRequest } from '../utils'
import { MOBILE, DESKTOP } from '../config'

const IndexPage = () => {
  const [url, setUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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
            console.log({ res })
            if (res.ok && Array.isArray(res.data) && res.data.length) {
              console.log({data: res.data})
              setMessage(`Invalidation successfully!`)
              setUrl('')
              setError('')
            } else {
              console.log('44444444444')
              setError(res.error)
            }
          })
          .catch((error: any) => {
            console.log('11111111')
            console.log(error)
            setError(error.message)
          })
      } else {
        console.log('22222222')
        setError('Please enter a valid url')
      }
    } catch (error) {
      console.log('afdasdfsdafasdfasdfadsffa')
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <h1>Welcome 👋</h1>
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
      <br />
    </Layout>
  )
}

export default IndexPage
