import React from 'react'

const Description = ({ title, text }) => {
    return (
        <div className='px-6 py-2 w-full text-gray-dark-booking font-semibold'>
            <h1 className='leading-none text-2xl font-bold'>{title}</h1>
            <p className='my-6 text-gray-booking'>{text}</p>
        </div>
    )
}

export default Description