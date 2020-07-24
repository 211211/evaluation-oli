// tslint:disable-next-line: no-submodule-imports
import Head from 'next/head'
import React, {ReactNode} from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({children, title = 'Evaluation - Invalidating url'}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <div
      style={{
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {children}
    </div>
  </div>
)
