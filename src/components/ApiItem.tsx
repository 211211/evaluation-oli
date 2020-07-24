import React from 'react'
import styled from 'styled-components'
import { IURL } from 'interfaces'
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`

export const Item = styled.div`
    display: flex;
    align-items: center;
`

export const ApiItem = ({
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
