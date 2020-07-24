import {CdnTool} from '@/components/CdnTool'
import React from 'react'
import {createGlobalStyle} from 'styled-components'
import {normalize} from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0 1rem;
  }
`

const Index = () => (
  <>
    <GlobalStyle />
    <CdnTool />
  </>
)

export default Index
