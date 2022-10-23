import React from 'react'
import { Name } from './Person.types'

type PersonListProps = {
    names: Name[]
}

const PersonList = (props: PersonListProps) => {
  return (
      <div>
          <ul>
              {
                  props.names.map((obj, i) => <li key={i}>{obj.first} { obj.last}</li>)
              }
          </ul>
    </div>
  )
}

export default PersonList