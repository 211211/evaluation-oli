import React from 'react'

import { IURL } from '../../interfaces'
import {
  Container,
  Item,
} from './style'
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Component = ({
  // url,
  ip,
  status,
  // lastUpdate
}: IURL) => {
  const imageSrc = status === 1
    ? <FontAwesomeIcon icon={faCheckCircle} color={'green'} />
    : <FontAwesomeIcon icon={faTimesCircle} color={'red'} />

  return (
    <Container>
      {/* <Item>
        Domain: {url}
      </Item> */}
      <Item>
        Server IP: {ip}
        &nbsp;
        {imageSrc}
      </Item>
    </Container>
  )
}

export default Component
