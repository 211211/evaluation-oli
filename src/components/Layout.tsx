import Head from 'next/head'
import React, {ReactNode} from 'react'
import styled from 'styled-components'

export const LayoutContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  max-width: 960px;
`

interface LayoutProps {
  children?: ReactNode
  title?: string
}

export const Layout: React.FC<LayoutProps> = ({children, title = 'Evaluation - Invalidating url'}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <LayoutContainer>{children}</LayoutContainer>
  </div>
)
