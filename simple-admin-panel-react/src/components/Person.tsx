import React from 'react'
import { PersonProps } from './Person.types'


const Person = (props: PersonProps) => {
  return (
      <div><h2>{props.name.first} { props.name.last}</h2></div>
  )
}

export default Person