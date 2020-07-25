import {ResultItem, ResultItemProps} from '@/components/ResultItem'
import * as React from 'react'
import {StyledResultList} from './ResultList.styled'

interface ApiListProps {
  items: ResultItemProps[]
}

export const ResultList: React.FC<ApiListProps> = ({items}) => {
  return (
    <StyledResultList>
      {items.map((item: ResultItemProps) => (
        <ResultItem {...item} key={`${item.ip}-${item.cachedKey}`} />
      ))}
    </StyledResultList>
  )
}
