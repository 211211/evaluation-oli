import React from 'react'
import styled from 'styled-components'

interface MessageLineProps {
  status: 'error' | 'message' | 'none'
}

const StyledMessageLine = styled.div<MessageLineProps>(
  ({status}) => `
  color: ${status === 'error' ? 'red' : 'green'};
  margin-bottom: 1.5rem;
`,
)

export const MessageLine: React.FC<MessageLineProps> = ({children, status = 'none'}) =>
  status === 'none' ? null : <StyledMessageLine status={status}>{children}</StyledMessageLine>
