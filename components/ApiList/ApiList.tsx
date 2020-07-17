import * as React from 'react'
import { ApiItem } from '../../components'
import { IURL } from '../../interfaces'

type Props = {
  items: IURL[]
}

const ApiList = ({ items }: Props) => {
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

export default ApiList
