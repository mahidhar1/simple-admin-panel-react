import React from 'react'

const ENUM_STATUS = {
    loading: 'loading', 
    success: 'success', 
    error: 'error'
}

type StatusProps = {
    status: 'loading' | 'success' | 'error'
}

const Status = (props: StatusProps) => {
    let message; 
    if (props.status === 'loading') {
        message = "is loading data"; 
    } else if (props.status === 'success') {
        message = "data fetched succesfully"; 
    } else if(props.status === 'error') {
        message = "error in fetching data"; 
    }
  return (
      <div>{ message}</div>
  )
}

export default Status