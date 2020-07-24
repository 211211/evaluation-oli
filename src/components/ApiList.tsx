import * as React from 'react'
import { ApiItem } from '@/components/ApiItem'
import { IURL } from 'interfaces'

type Props = {
  items: IURL[]
}

export const ApiList = ({ items }: Props) => {
  return (
    <>
      {items.map((item: IURL) => (
        <React.Fragment key={item.ip}>
          <ApiItem  {...item} />
          <br />
        </React.Fragment>
      ))}
    </>
  )
}
