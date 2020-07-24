import {LogEntry} from '@/interfaces'
import React, {MouseEvent, useState} from 'react'
import styled from 'styled-components'

export interface DebugListProps {
  items: LogEntry[]
}

const StyledMessage = styled.code`
  white-space: pre-wrap;
  font-size: 12px;
`

export const DebugList: React.FC<DebugListProps> = ({items}) => {
  const [show, setShow] = useState(false)

  if (!items || !items.length) {
    return null
  }

  const handleClick = (event: MouseEvent) => {
    event.preventDefault()
    setShow(!show)
  }

  return (
    <div>
      <a href='' onClick={handleClick}>
        Debug Log
      </a>
      {show && (
        <ul>
          {items.map(({type, message}) => (
            <li key={type}>
              <StyledMessage>
                <strong>{type}:</strong>
              </StyledMessage>{' '}
              <StyledMessage>{message}</StyledMessage>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
