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
  // lastUpdate
}: IURL) => {
  return (
    <Container>
      {/* <Item>
        Domain: {url}
      </Item> */}
      <Item>
        Server IP: {ip}
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
