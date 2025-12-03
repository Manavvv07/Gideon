import React from 'react'

const Answer = ({text}) => {
  return (
    <div className='answer-container'>
        <p className='answer'>{text}</p>
    </div>
  )
}

export default Answer