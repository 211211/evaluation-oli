import {faCheckCircle, faQuestionCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import {StyledDetailsRow, StyledIcon, StyledItem, StyledResultItem, StyledRow} from './ResultItem.styled'

export type ResultItemProps = {
  url?: string
  ip: string
  status?: string
  message?: string
  cachedKey?: string
  // lastUpdate: number
}

export const ResultItem: React.FC<ResultItemProps> = ({url, ip, status, message, cachedKey = ''}) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = () => setExpanded(!expanded)

  let statusIcon = null
  switch (status) {
    case 'success':
      statusIcon = <FontAwesomeIcon icon={faCheckCircle} color={'green'} />
      break
    case 'not-found':
      statusIcon = <FontAwesomeIcon icon={faQuestionCircle} color={'grey'} />
      break
    default:
      statusIcon = <FontAwesomeIcon icon={faTimesCircle} color={'red'} />
  }

  return (
    <StyledResultItem onClick={handleExpand}>
      <StyledRow>
        <StyledItem>
          <StyledIcon>{statusIcon}</StyledIcon> Server: {ip}
        </StyledItem>
        &nbsp;<StyledItem>{status}</StyledItem>
      </StyledRow>
      {expanded && (
        <StyledDetailsRow>
          <div>
            <strong>Message:</strong> {message}
          </div>
          <div>
            <strong>Path:</strong> {url}
          </div>
          <div>
            <strong>Cached-key:</strong> {cachedKey}
          </div>
        </StyledDetailsRow>
      )}
    </StyledResultItem>
  )
}
