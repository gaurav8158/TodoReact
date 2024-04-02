import React from 'react'

const UpperBar = ({status, length}) => {
  return (
    <div className={`upperbox-${status}`}>
        <div>{`${status}(${length})`}</div>
    </div>
  )
}

export default UpperBar