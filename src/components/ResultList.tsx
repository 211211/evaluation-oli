import {ResultItem, ResultItemProps} from '@/components/ResultItem'
import * as React from 'react'
import styled from 'styled-components'

type ApiListProps = {
  items: ResultItemProps[]
}

const StyledResultList = styled.div`
  width: 100%;
  max-width: 970px;
  margin-bottom: 1.5rem;
`

export const ResultList: React.FC<ApiListProps> = ({items}) => {
  console.log({items})
  return (
    <StyledResultList>
      {items.map((item: ResultItemProps) => (
        <ResultItem {...item} key={`${item.ip}-${item.cachedKey}`} />
      ))}
    </StyledResultList>
  )
}
