import React from 'react'

import { IURL } from '../../interfaces'
import {
  Container,
  Item,
} from './style'
// import { unixTime } from '../../utils'

const Component = ({
  // url,
  ip,
  status,
  // lastUpdate
}: IURL) => {
  const imageSrc = status === 1
    ? 'https://www.iconsdb.com/icons/preview/green/checkmark-xxl.png'
    : 'https://www.iconsdb.com/icons/preview/soylent-red/error-6-xxl.png'
  const alt = status === 1 ? 'Success Icon' : 'Failed Icon'
  return (
    <Container>
      {/* <Item>
        Domain: {url}
      </Item> */}
      <Item>
        Server IP: {ip}
        &nbsp;
        <img
          style={{
            width: 16,
            height: 16
          }}
          src={imageSrc}
          alt={alt}
        />
      </Item>
      {/* {
        lastUpdate && (
          <Item>
            Last update: {lastUpdate ? unixTime(lastUpdate) : ''}
          </Item>
        )
      } */}
    </Container>
  )
}

export default Component
