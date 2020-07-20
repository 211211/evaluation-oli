import React from 'react'

import { IURL } from '../../interfaces'
import {
  Container,
  Item,
} from './style'
// import { unixTime } from '../../utils'
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

  // const SuccessIcon = () => {
  //   return <FontAwesomeIcon icon={faCircle} />
  // }

  // const FailedIcon = () => {
  //   return <FontAwesomeIcon icon={faTimesCircle} />
  // }

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
